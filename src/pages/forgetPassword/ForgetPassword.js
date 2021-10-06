import React, { useState } from "react";
import { Grid, CircularProgress, Typography, Button, TextField, Fade } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import useStyles from "./styles";
import "./forgetPassword.scss";
import logo from "../../images/logo.svg";
import { callApi } from "../../utils/call-api";
import { subUrl } from "../../constants/api-sub-url";
import { firebase, table } from "../../config";
import UseEnterKeyListener from "../Verification/useEnterKeyListener";

function ForgetPassword(props) {
  UseEnterKeyListener({
    querySelectorToExecuteClick: "#submitButton"
  });
  var classes = useStyles();
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [success, setSuccess] = useState(null);
  var [email, setEmail] = useState("");
  const onSubmit = () => {
    setIsLoading(true)
    setError("")
    firebase.firestore().collection(table.Staff)
      .where("email", "==", email)
      .get().then(res => {
        if (res.empty) {
          setError("Email doesn't exist.");
          setIsLoading(false);
        }
        else {
          const payload = {
            Email: email.toLowerCase(),
          };
          callApi(subUrl.forgetPassword, "post", null, payload)
            .then(() => {
              setSuccess("Please check your email and follow the instructions.");
              setTimeout(() => {
                setIsLoading(false);
                setError("");
                props.history.push("/login")
              }, 3000);
            })
            .catch(() => {
              setError("Failed to send instructions.");
              setIsLoading(false);
            });
        }
      })
  }
  return (
    <Grid container className={classes.container}>
      <div className={classes.formContainer}>
        <img src={logo} alt="logo" className={classes.logotypeImage} />
        <div>
          <React.Fragment>
            <Typography variant="h6" className={classes.greeting}>
              Reset Password with ICD Finlit to get started.
            </Typography>
            <TextField
              id="email"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              value={email}
              onChange={e => setEmail(e.target.value)}
              margin="normal"
              placeholder="Email Address"
              type="email"
              fullWidth
            />
            <Fade in={error !== null || error !== ""}>
              <Typography color="secondary" className={classes.errorMessage}>
                {error}
              </Typography>
            </Fade>
            <Fade in={success !== null || success !== ""}>
              <Typography color="secondary" className={classes.successMessage}>
                {success}
              </Typography>
            </Fade>
            <div className={classes.formButtons}>
              {isLoading ? (
                <CircularProgress size={26} className={classes.loginLoader} />
              ) : (
                <Button id="submitButton"
                  disabled={!email}
                  onClick={onSubmit}
                  variant="contained"
                  size="large"
                  className={classes.submitBtn}
                >
                  Send Instructions
                </Button>
              )}
            </div>
          </React.Fragment>
        </div>
      </div>
    </Grid>
  );
}

export default withRouter(ForgetPassword);