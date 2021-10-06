import React, { useState } from "react";
import { parse as parseQs } from "qs";
import { Grid, CircularProgress, Typography, Button, TextField, Fade } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import useStyles from "./styles";
import logo from "../../images/logo.svg";
import { callApi } from "../../utils/call-api";
import { subUrl } from "../../constants/api-sub-url";
import UseEnterKeyListener from "../Verification/useEnterKeyListener";

function ResetPassword(props) {
  UseEnterKeyListener({
    querySelectorToExecuteClick: "#submitButton"
  });
  const [email, setEmail] = React.useState("");
  const [token, setToken] = React.useState("");
  React.useEffect(() => {
    const qs = parseQs(props.location.search.substr(1));
    setToken(qs.token)
    callApi(subUrl.verifyForgetPassword + qs.token, "get", null, null)
      .then(res => {
        setEmail(res.email);
        setLoading(false)
      })
      .catch(() => props.history.push("/login"));
  }, []);
  var classes = useStyles();
  var [isLoading, setIsLoading] = useState(false);
  var [loading, setLoading] = useState(true);
  var [error, setError] = useState(null);
  var [success, setSuccess] = useState(null);
  const [newPasswordType, setNewPasswordType] = useState(true);
  const [confirmPasswordType, setConfirmPasswordType] = useState(true);
  var [loginValue, setLoginValue] = useState("");
  var [passwordValue, setPasswordValue] = useState("");
  const onConfirm = () => {
    setError("")
    setSuccess("")
    setIsLoading(true);
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(loginValue)) {
      setError(
        "Password must contain atleast 8 characters with atleast 1 lowercase,1 uppercase,1 numeric & 1 special character.",
      );
      setIsLoading(false);
    }
    else if (loginValue !== passwordValue) {
      setError("Password doesn't match.");
      setIsLoading(false);
    } else {
      const payload = {
        Email: email.toLowerCase(),
      };
      callApi(subUrl.verifyForgetPassword + token, "get", null, payload).then(() => {
        setSuccess("Password set Successfully");
        setTimeout(() => {
          setIsLoading(false);
          setSuccess("");
          props.history.push("/login");
        }, 2000);
      }).catch(err => {
        setError(err.message);
        setIsLoading(false);
      })
    }
  };
  const onNewPasswordEyeIconClick = () => {
    if (newPasswordType) {
      return setNewPasswordType(false);
    }
    setNewPasswordType(true);
  };
  const onConfirmPasswordEyeIconClick = () => {
    if (confirmPasswordType) {
      return setConfirmPasswordType(false);
    }
    setConfirmPasswordType(true);
  };
  return (
    <Grid container className={classes.container}>
      {loading ? (
        <CircularProgress
          color="black"
          size={26}
          className={classes.loginLoader}
        />
      ) : (
        <div className={classes.formContainer}>
          <img src={logo} alt="logo" className={classes.logotypeImage} />
          <div>
            <React.Fragment>
              <Typography variant="h6" className={classes.greeting}>
                Set a Password with ICD Finlit to get started.
              </Typography>
              {newPasswordType ? (
                <div className={classes.passwordBoxes}>
                  <TextField
                    id="loginValue"
                    InputProps={{
                      classes: {
                        underline: classes.textFieldUnderline,
                        input: classes.textField,
                      },
                    }}
                    value={loginValue}
                    onChange={e => setLoginValue(e.target.value)}
                    margin="normal"
                    placeholder="Set Password"
                    type="password"
                    fullWidth
                  />
                  <VisibilityOffIcon
                    onClick={onNewPasswordEyeIconClick}
                    className={classes.eyes}
                  />
                </div>
              ) : (
                <div className={classes.passwordBoxes}>
                  <TextField
                    id="loginValue"
                    InputProps={{
                      classes: {
                        underline: classes.textFieldUnderline,
                        input: classes.textField,
                      },
                    }}
                    value={loginValue}
                    onChange={e => setLoginValue(e.target.value)}
                    margin="normal"
                    placeholder="Set Password"
                    type="text"
                    fullWidth
                  />
                  <VisibilityIcon
                    onClick={onNewPasswordEyeIconClick}
                    className={classes.eyes}
                  />
                </div>
              )}
              {confirmPasswordType ? (
                <div className={classes.passwordBoxes}>
                  <TextField
                    id="password"
                    InputProps={{
                      classes: {
                        underline: classes.textFieldUnderline,
                        input: classes.textField,
                      },
                    }}
                    value={passwordValue}
                    onChange={e => setPasswordValue(e.target.value)}
                    margin="normal"
                    placeholder="Confirm Password"
                    type="password"
                    fullWidth
                  />
                  <VisibilityOffIcon
                    onClick={onConfirmPasswordEyeIconClick}
                    className={classes.eyes}
                  />
                </div>
              ) : (
                <div className={classes.passwordBoxes}>
                  <TextField
                    id="password"
                    InputProps={{
                      classes: {
                        underline: classes.textFieldUnderline,
                        input: classes.textField,
                      },
                    }}
                    value={passwordValue}
                    onChange={e => setPasswordValue(e.target.value)}
                    margin="normal"
                    placeholder="Confirm Password"
                    type="text"
                    fullWidth
                  />
                  <VisibilityIcon
                    onClick={onConfirmPasswordEyeIconClick}
                    className={classes.eyes}
                  />
                </div>
              )}
              <Fade in={error}>
                <Typography color="red" className={classes.errorMessage}>
                  {error}
                </Typography>
              </Fade>
              <Fade in={success}>
                <Typography color="green" className={classes.successMessage}>
                  {success}
                </Typography>
              </Fade>
              <div className={classes.formButtons}>
                {isLoading ? (
                  <CircularProgress size={26} className={classes.loginLoader} />
                ) : (
                  <Button id="submitButton"
                    disabled={
                      loginValue.length === 0 || passwordValue.length === 0
                    }
                    onClick={onConfirm}
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.submitBtn}
                  >
                    Confirm
                  </Button>
                )}
              </div>
            </React.Fragment>
          </div>
        </div>
      )}
    </Grid>
  );
}

export default withRouter(ResetPassword);