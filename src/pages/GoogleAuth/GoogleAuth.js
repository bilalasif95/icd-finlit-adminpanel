import React, { useState, useEffect } from "react";
import { Tabs, Tab, Grid, CircularProgress, Typography, Fade } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import useStyles from "./styles";
import logo from "../../images/logo.svg";
import Auth from "../../images/auth.png";
import Copy from "../../images/copy.svg";
import Copied from "../../images/copied.svg";
import Info from "../../images/info.svg";
import { callApi } from "../../utils/call-api";
import { subUrl } from "../../constants/api-sub-url";
import { firebase } from "../../config";
import UseEnterKeyListener from "../Verification/useEnterKeyListener";

function Verification(props) {
    UseEnterKeyListener({
        querySelectorToExecuteClick: "#submitButton"
    });
    const [imageUrl, setImageURL] = useState("");
    const [secret, setSecret] = useState("");
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false);
    const [activeTabId, setActiveTabId] = useState(0);
    const [code, setCode] = useState(0);
    const [token, setToken] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [textCopied, setTextCopied] = useState(false);
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                user.getIdToken().then((token) => {
                    setToken(token)
                    callApi(subUrl.generateQRCode, "post", token, null)
                        .then(res => {
                            setImageURL(res.data.ImageUrl)
                            setSecret(res.data.Secret)
                            setLoading(false)
                        })
                        .catch(() => {
                            props.history.push("/login");
                        })
                })
            }
        })
    }, []);
    const onConfirm = () => {
        setError("")
        setIsLoading(true);
        callApi(subUrl.authenticateQRCode, "post", token, { token: code })
            .then((res) => {
                props.history.push("/login");
            })
            .catch(() => {
                setError("Invalid Code.");
                setIsLoading(false);
            });
    };
    const CopyText = (text) => {
        setTextCopied(false);
        navigator.clipboard.writeText(text).then((res) => {
            setTextCopied(true);
            setTimeout(() => {
                setTextCopied(false);
            }, 1500)
        }).catch((error) => {
            setTextCopied(false);
        })
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
                <div className="google-auth">
                    <img src={logo} alt="logo" className="img-fluid d-block mx-auto" />
                    <div className="Auth-Cont">
                        <h2>Enable Google Authentication</h2>
                        <p>Google Authentication should be installed on your device to use 2FA</p>
                    </div>
                    <div className="auth-tabs">
                        <Tabs
                            indicatorColor="primary"
                            textColor="secondary"
                            value={activeTabId}
                            onChange={(e, id) => setActiveTabId(id)}
                            className={classes.iconsBar}
                        >
                            <Tab label="Download App" classes={{ root: classes.tab }} />
                            <Tab label="Scan QR Code" classes={{ root: classes.tab }} />
                            <Tab label="Backup Key" classes={{ root: classes.tab }} />
                            <Tab label="Enable Google Authentication" classes={{ root: classes.tab }} />
                        </Tabs>
                        {activeTabId === 0 &&
                            (loading ? (
                                <div className={classes.loading}>
                                    <CircularProgress color="secondary" size={60} thickness={5} />
                                </div>
                            ) : (
                                <div className="AuthtabCont">
                                    <div className="DownloadAuthImg">
                                        <img className="img-fluid mx-auto d-block" src={Auth} alt="App Store" />
                                    </div>
                                    <button id="submitButton" onClick={() => setActiveTabId(1)} className="btn btn-default authbtn">Next</button>
                                </div>
                            ))}
                        {activeTabId === 1 &&
                            (loading ? (
                                <div className={classes.loading}>
                                    <CircularProgress color="secondary" size={60} thickness={5} />
                                </div>
                            ) : (
                                <div className="AuthtabCont">
                                    <div className="tabCont">
                                        <div className="qr-tab">
                                            <img className="img-fluid qr-img" src={imageUrl} alt="QR Code" />
                                            <p className="qr-text">{secret}</p>
                                        </div>
                                    </div>
                                    <button id="submitButton" onClick={() => setActiveTabId(2)} className="btn btn-default authbtn">Next</button>
                                </div>
                            ))}
                        {activeTabId === 2 &&
                            (loading ? (
                                <div className={classes.loading}>
                                    <CircularProgress color="secondary" size={60} thickness={5} />
                                </div>
                            ) : (
                                <div className="AuthtabCont">
                                    <div className="tabCont">
                                        <div className="Keybox">
                                            <h4 className="CopyKey">{secret} <span>{textCopied ? <img onClick={() => CopyText(secret)} alt="copy" src={Copied} /> : <img onClick={() => CopyText(secret)} alt="copy" src={Copy} />}</span> </h4>
                                        </div>
                                        <p className="mt-3">Please save this key on paper. This key will allow you to recover your Google Authentication in case of phone loss.</p>
                                        <p className="processText"><span><img src={Info} alt="info" /></span> User needs to open asupport ticket to re-set Google Aunthentication. It may take at least 7days to process.</p>
                                    </div>
                                    <button id="submitButton" onClick={() => setActiveTabId(3)} className="btn btn-default authbtn">Next</button>
                                </div>
                            ))}
                        {activeTabId === 3 &&
                            (loading ? (
                                <div className={classes.loading}>
                                    <CircularProgress color="secondary" size={60} thickness={5} />
                                </div>
                            ) : (
                                <div className="AuthtabCont">
                                    <div className="tabCont">
                                        <div className="authBox">
                                            <input onChange={(e) => setCode(e.target.value)} type="number" min="0" className="form-control" placeholder="Google Authentication Code" autoFocus="true" />
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
                                            <button id="submitButton" disabled={!code || isLoading} onClick={onConfirm} className="btn btn-default authbtn">Enable Google Authentication</button>
                                        )}
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </Grid>
    );
}

export default withRouter(Verification);