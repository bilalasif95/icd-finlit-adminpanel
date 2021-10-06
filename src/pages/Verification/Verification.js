import React, { useState, useEffect } from "react";
import { Grid, CircularProgress, Typography, Fade } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import useStyles from "./styles";
import logo from "../../images/logo.svg";
import Mobile from "../../images/mobile.png";
import { callApi } from "../../utils/call-api";
import { subUrl } from "../../constants/api-sub-url";
import { useUserDispatch } from "../../context/UserContext";
import { firebase } from "../../config";
import UseEnterKeyListener from "./useEnterKeyListener";

function Verification(props) {
    UseEnterKeyListener({
        querySelectorToExecuteClick: "#submitButton"
    });
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false);
    const [code, setCode] = useState(0);
    const [error, setError] = useState(null);
    const [token, setToken] = useState("");
    const [loading, setLoading] = useState(true);
    const userDispatch = useUserDispatch();
    const onConfirm = () => {
        setError("")
        setIsLoading(true);
        callApi(subUrl.authenticateQRCode, "post", token, { token: code })
            .then((res) => {
                localStorage.setItem("loginTime", new Date());
                userDispatch({ type: 'LOGIN_SUCCESS' })
                props.history.push('/app/dashboard')
                localStorage.setItem('loggedIn', true)
            })
            .catch(() => {
                setError("Invalid Code.");
                setIsLoading(false);
            });
    };
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                user.getIdToken().then((token) => {
                    setToken(token)
                    setLoading(false)
                })
                    .catch(() => {
                        props.history.push("/login");
                    })
            }
        })
    }, []);
    return (
        <Grid container className={classes.container}>
            {loading ? (
                <CircularProgress
                    color="black"
                    size={26}
                    className={classes.loginLoader}
                />
            ) : (
                <div className="google-auth">
                    <img src={logo} alt="logo" className="img-fluid d-block mx-auto" />
                    <div className="Auth-Cont">
                        <h2>Google Authentication</h2>
                        <p>A verificaion code has been updated in your Google Authenticator App. Please</p>
                    </div>
                    <div className="auth-tabs">
                        <div className="AuthtabCont">
                            <div className="tabCont">
                                <img src={Mobile} alt="mobile icon" />
                                <div className="authBox">
                                    <input onChange={(e) => setCode(e.target.value)} type="number" min="0" className="form-control" placeholder="Google Authentication Code" autofocus="true" />
                                </div>
                            </div>
                            <Fade in={error}>
                                <Typography color="red" className={classes.errorMessage}>
                                    {error}
                                </Typography>
                            </Fade>
                            <div className={classes.formButtons}>
                                {isLoading ? (
                                    <CircularProgress size={26} className={classes.loginLoader} />
                                ) : (
                                    <button id="submitButton" disabled={!code || isLoading} onClick={onConfirm} className="btn btn-default authbtn">Submit</button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Grid>
    );
}

export default withRouter(Verification);