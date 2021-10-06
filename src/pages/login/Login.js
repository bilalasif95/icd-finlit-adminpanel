import React, { useState } from "react";
import { Grid, CircularProgress, Typography, Button, TextField, Fade } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import useStyles from "./styles";
import "./login.scss";
import logo from "../../images/logo.svg";
import { useUserDispatch, loginUser } from "../../context/UserContext";
import UseEnterKeyListener from "../Verification/useEnterKeyListener";


function Login(props) {
  UseEnterKeyListener({
    querySelectorToExecuteClick: "#submitButton"
});
  var classes = useStyles();
  var userDispatch = useUserDispatch();
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  const [newPasswordType, setNewPasswordType] = useState(true);
  var [loginValue, setLoginValue] = useState("");
  var [passwordValue, setPasswordValue] = useState("");
  const onNewPasswordEyeIconClick = () => {
    if (newPasswordType) {
      return setNewPasswordType(false);
    }
    setNewPasswordType(true);
  };
  return (
    <Grid container className={classes.container}>
      <div className={classes.formContainer}>
        <img src={logo} alt="logo" className={classes.logotypeImage} />
        <div>
          <React.Fragment>
            <Typography variant="h6" className={classes.greeting}>
              Signin with ICD Finlit to get started.
            </Typography>
            <TextField
              id="email"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              value={loginValue}
              onChange={e => setLoginValue(e.target.value)}
              margin="normal"
              placeholder="Email Address"
              type="email"
              fullWidth
            />
            {newPasswordType ? (
              <div className="passBox">
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
                    placeholder="Password"
                    type="password"
                    fullWidth
                  />
                  <VisibilityOffIcon
                    onClick={onNewPasswordEyeIconClick}
                    className={classes.eyes}
                  />
                </div>
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
                  placeholder="Password"
                  type="text"
                  fullWidth
                />
                <VisibilityIcon
                  onClick={onNewPasswordEyeIconClick}
                  className={classes.eyes}
                />
              </div>
            )}
            <Fade in={error}>
              <Typography color="secondary" className={classes.errorMessage}>
                {error}
              </Typography>
            </Fade>
            <Button
              data-testid="button-Login"
              color="primary"
              size="large"
              onClick={() => props.history.push("/forgetPassword")}
              className={`${classes.forgetButton} ${"forgetPass"}`}
            >
              Forget Password
            </Button>
            <div className={classes.formButtons}>
              {isLoading ? (
                <CircularProgress size={26} className={classes.loginLoader} />
              ) : (
                <Button id="submitButton"
                  disabled={
                    loginValue.length === 0 || passwordValue.length === 0
                  }
                  onClick={() =>
                    loginUser(
                      userDispatch,
                      loginValue,
                      passwordValue,
                      props.history,
                      setIsLoading,
                      setError,
                    )
                  }
                  variant="contained"
                  size="large"
                  className={classes.submitBtn}
                >
                  Confirm
                </Button>
              )}
              <FormControlLabel
                className={classes.copyright}
                control={
                  <Checkbox
                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                    name="checkedI"
                  />
                }
                label="Keep me signed in"
              />
            </div>
          </React.Fragment>
        </div>
      </div>
    </Grid>
  );
}

export default withRouter(Login);