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
import { firebase } from "../../config";
import UseEnterKeyListener from "../Verification/useEnterKeyListener";

function SetPassword(props) {
  UseEnterKeyListener({
    querySelectorToExecuteClick: "#submitButton"
  });
  const [qs, setQS] = React.useState("");
  React.useEffect(() => {
    setQS(parseQs(props.location.search.substr(1)));
  }, []);
  var classes = useStyles();
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const [newPasswordType, setNewPasswordType] = useState(true);
  const [confirmPasswordType, setConfirmPasswordType] = useState(true);
  var [loginValue, setLoginValue] = useState("");
  var [passwordValue, setPasswordValue] = useState("");
  const onConfirm = () => {
    setError("")
    setIsLoading(true);
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(
        loginValue,
      )
    ) {
      setError(
        "Password must contain atleast 8 characters with atleast 1 lowercase,1 uppercase,1 numeric & 1 special character.",
      );
      setIsLoading(false);
    }
    else if (loginValue !== passwordValue) {
      setError("Password doesn't match.");
      setIsLoading(false);
    } else {
      callApi(subUrl.signup + qs.token, "post", null, { password: loginValue, confirmPassword: passwordValue })
        .then(res => {
          if (res.code === 2105) {
            firebase.auth().signInWithEmailAndPassword(res.data.email, loginValue)
            setSuccess(res.message);
            setTimeout(() => {
              props.history.push("/googleAuth");
              setError("")
              setIsLoading(false);
            }, 2000)
          }
          else {
            setError(res.message);
            setIsLoading(false);
          }
        })
        .catch(() => {
          setError("Something went wrong.");
          setIsLoading(false);
        });
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
            <Fade in={success}>
              <Typography color="green" className={classes.successMessage}>
                {success}
              </Typography>
            </Fade>
            <Fade in={error}>
              <Typography color="red" className={classes.errorMessage}>
                {error}
              </Typography>
            </Fade>
            <div className={classes.formButtons}>
              {isLoading ? (
                <CircularProgress size={26} className={classes.loginLoader} />
              ) : (
                <Button
                  disabled={
                    loginValue.length === 0 || passwordValue.length === 0
                  }
                  id="submitButton"
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
    </Grid>
  );
}

export default withRouter(SetPassword);