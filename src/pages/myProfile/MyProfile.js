import React, { useState, useRef } from "react";
import useStyles from "./styles";
import Widget from "../../components/Widget/Widget";
import "./myProfile.scss";
import { Row, Col } from 'reactstrap';
import { CircularProgress } from "@material-ui/core";
import { Tabs, Tab } from "@material-ui/core";
import TextField from "../../components/Basic-component/textFiled";
import { firebase, table } from "../../config";
import Camera from "../../images/camera.svg";
import UseEnterKeyListener from "../Verification/useEnterKeyListener";

export default function MyProfilePage() {
  UseEnterKeyListener({
    querySelectorToExecuteClick: "#submitButton"
  });
  const [activeTabId, setActiveTabId] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [firstNameShownOnTop, setFirstNameShownOnTop] = useState("");
  const [firstNameEdit, setFirstNameEdit] = useState(false);
  const [lastName, setLastName] = useState("");
  const [lastNameShownOnTop, setLastNameShownOnTop] = useState("");
  const [lastNameEdit, setLastNameEdit] = useState(false);
  const [email, setEmail] = useState("");
  const inputOpenFileRef = useRef(null);
  const [contactNumber, setContactNumber] = useState("");
  const [userRole, setUserRole] = useState("");
  const [department, setDepartment] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [picture, setPicture] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [staffID, setStaffID] = useState("");
  var classes = useStyles();
  React.useEffect(() => {
    setLoading(true)
    firebase
      .firestore()
      .collection(table.Staff)
      .where("email", "==", window.localStorage.getItem("email"))
      .onSnapshot(snapshot => {
        if (snapshot.empty) {
          setLoading(false);
        } else {
          snapshot.docChanges().forEach(change => {
            setStaffID(change.doc.id)
            setFirstName(change.doc.data().firstName)
            setFirstNameShownOnTop(change.doc.data().firstName)
            setLastName(change.doc.data().lastName)
            setLastNameShownOnTop(change.doc.data().lastName)
            setEmail(change.doc.data().email)
            setContactNumber(change.doc.data().phone)
            setUserRole(change.doc.data().role)
            setPicture(change.doc.data().profile)
            setDepartment(change.doc.data().department)
            setLoading(false)
          });
        }
      });
  }, []);
  const EditFirstName = () => {
    if (firstNameEdit) {
      return setFirstNameEdit(false)
    }
    setFirstNameEdit(true)
  }
  const EditLastName = () => {
    if (lastNameEdit) {
      return setLastNameEdit(false)
    }
    setLastNameEdit(true)
  }
  const onUpdate = () => {
    setError("");
    setUpdateLoading(true)
    firebase
      .firestore()
      .collection(table.Staff)
      .where("email", "==", email)
      .get()
      .then(res => {
        if (!res.empty) {
          firebase
            .firestore()
            .collection(table.Staff)
            .doc(res.docs[0].id)
            .set({
              firstName: firstName,
              lastName: lastName,
            }, { merge: true })
            .then(() => {
              setError("Profile updated Successfully.");
              setTimeout(() => {
                setUpdateLoading(false);
                setError("");
              }, 1500);
            })
        }
      })
  }
  const showOpenFileDlg = () => {
    inputOpenFileRef.current.click();
  };
  const onChangeFile = () => {
    var file = document.querySelector("#file");
    if (/\.(jpg|jpeg|png)$/i.test(file.files[0].name) === false) {
      alert("Accepted only JPG, PNG or JPEG formats");
    } else {
      const input = inputOpenFileRef;
      const files = input.current.files;
      if (files && files[0]) {
        const reader = new FileReader();
        reader.onload = e => {
          setPicture(e.target.result);
        };
        reader.readAsDataURL(files[0]);
      }
      const upload = firebase.storage().ref(`StaffImages/${staffID}/${files[0].name}`).put(files[0]);
      upload.on(
        "state_changed",
        snapshot => { },
        error => { },
        () => {
          firebase.storage().ref(`StaffImages/${staffID}`)
            .child(files[0].name)
            .getDownloadURL()
            .then(url => {
              setPicture(url)
              firebase
                .firestore()
                .collection(table.Staff)
                .where("email", "==", email)
                .get()
                .then(res => {
                  if (!res.empty) {
                    firebase
                      .firestore()
                      .collection(table.Staff)
                      .doc(res.docs[0].id)
                      .set({
                        profile: url,
                        lastName: lastName,
                      }, { merge: true })
                  }
                })
            })
        }
      )
    }
  };
  const onChangePassword = () => {
    setError("");
    setUpdateLoading(true);
    const user = firebase.auth().currentUser;
    const cred = firebase.auth.EmailAuthProvider.credential(user.email, oldPassword);
    user.reauthenticateWithCredential(cred).then(() => {
      user.updatePassword(newPassword).then(() => {
        setError("Password changed Successfully");
        setTimeout(() => {
          setOldPassword("")
          setNewPassword("")
          setUpdateLoading(false);
          setError("");
        }, 1500);
      }).catch(err => {
        setError(err.message);
        setUpdateLoading(false);
      })
    }).catch(err => {
      setError(err.message)
      setUpdateLoading(false);
    })
  }
  return (
    <Widget disableWidgetMenu>
      <Row>
        <Col md={12}>
          <div className="ProfileBox">
            <div className="ProfileList">
              <div onClick={showOpenFileDlg} className="ProfileImg">
                <div className="Overlay">
                  <img alt="Camera" src={Camera} />
                </div>
                {picture ?
                  <img
                    src={picture}
                    alt="ProfileImage"
                    className={classes.profile}
                  />
                  :
                  <h1>{(firstNameShownOnTop && firstNameShownOnTop[0]) + (lastNameShownOnTop && lastNameShownOnTop[0])}</h1>
                }
              </div>
              <input
                type="file"
                id="file"
                ref={inputOpenFileRef}
                onChange={onChangeFile}
                style={{
                  display: "none"
                }}
              />
              <div className="ProfileName">
                <h1>{loading ? <>Loading...</> : <>{firstNameShownOnTop} {lastNameShownOnTop}</>} / Edit Profile</h1>
              </div>
            </div>
            <Tabs
              indicatorColor="primary"
              textColor="secondary"
              value={activeTabId}
              onChange={(e, id) => {
                setActiveTabId(id);
                setError("");
              }}
              className={classes.iconsBar}
            >
              <Tab label="Edit Profile" classes={{ root: classes.tab }} />
              <Tab label="Password" classes={{ root: classes.tab }} />
            </Tabs>
            {activeTabId === 0 && (
              <>
                <h1 className="FormTitle">Edit Profile</h1>
                <Row className="marRow">
                  <Col md={6}>
                    <div className={`${"FormContent"} ${firstNameEdit ? "editingField" : "editField"}`}>
                      {firstNameEdit ?
                        <TextField
                          label="First Name"
                          value={loading ? "Loading..." : firstName}
                          placeholder="Enter First Name"
                          onChange={e => setFirstName(e.target.value)}
                        />
                        :
                        <TextField
                          label="First Name"
                          value={loading ? "Loading..." : firstName}
                          readOnly={true}
                        />
                      }
                      <button data-testid="button-MyProfilePage" onClick={EditFirstName} className="EditBtn btn btn-default">Edit</button>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className={`${"FormContent"} ${lastNameEdit ? "editingField" : "editField"}`}>
                      {lastNameEdit ?
                        <TextField
                          label="Last Name"
                          value={loading ? "Loading..." : lastName}
                          placeholder="Enter Last Name"
                          onChange={e => setLastName(e.target.value)}
                        />
                        :
                        <TextField
                          label="Last Name"
                          value={loading ? "Loading..." : lastName}
                          readOnly={true}
                        />
                      }
                      <button data-testid="button-MyProfilePage2" onClick={EditLastName} className="EditBtn btn btn-default">Edit</button>
                    </div>
                  </Col>
                </Row>
                <Row className="marRow">
                  <Col md={6}>
                    <div className="FormContent">
                      <TextField
                        label="Email"
                        readOnly={true}
                        value={loading ? "Loading..." : email}
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="FormContent">
                      <TextField
                        label="Contact No."
                        readOnly={true}
                        value={loading ? "Loading..." : contactNumber}
                      />
                    </div>
                  </Col>
                </Row>
                <Row className="marRow">
                  <Col md={6}>
                    <div className="FormContent">
                      <div className="textTransformedInput">
                        <TextField
                          label="User Role"
                          readOnly={true}
                          value={loading ? "Loading..." : userRole}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="FormContent">
                      <div className="textTransformedInput">
                        <TextField
                          label="Department"
                          readOnly={true}
                          value={loading ? "Loading..." : department}
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
                {error && (
                  <>
                    {error.includes("Success") ? (
                      <div style={{ width: "100%" }}>
                        <p style={{ color: "green", textAlign: "center" }}>
                          {error}
                        </p>
                      </div>
                    ) : (
                      <div style={{ width: "100%" }}>
                        <p style={{ color: "red", textAlign: "center" }}>
                          {error}
                        </p>
                      </div>
                    )}
                  </>
                )}
                <div className={classes.btnCont}>
                  {updateLoading ? (
                    <CircularProgress
                      size={26}
                      className={classes.loginLoader}
                    />
                  ) : (
                    <button id="submitButton" data-testid="button-MyProfilePage3" disabled={updateLoading || (!firstNameEdit && !lastNameEdit) || !firstName || !lastName} onClick={onUpdate} className="btn btn-default updateBtn">Update</button>
                  )}
                </div>
              </>
            )}
            {activeTabId === 1 && (
              <>
                <h1 className="FormTitle">Password</h1>
                <Row className="marRow">
                  <Col md={6}>
                    <div className="FormContent editingField">
                      <TextField
                        label="Old Password"
                        type="password"
                        placeholder="Enter Old Password"
                        autoFocus={true}
                        value={oldPassword}
                        onChange={e => setOldPassword(e.target.value)}
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="FormContent editingField">
                      <TextField
                        label="New Password"
                        type="password"
                        placeholder="Enter New Password"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                      />
                    </div>
                  </Col>
                </Row>
                {error && (
                  <>
                    {error.includes("Success") ? (
                      <div style={{ width: "100%" }}>
                        <p style={{ color: "green", textAlign: "center" }}>
                          {error}
                        </p>
                      </div>
                    ) : (
                      <div style={{ width: "100%" }}>
                        <p style={{ color: "red", textAlign: "center" }}>
                          {error}
                        </p>
                      </div>
                    )}
                  </>
                )}
                <div className={classes.btnCont}>
                  {updateLoading ? (
                    <CircularProgress
                      size={26}
                      className={classes.loginLoader}
                    />
                  ) : (
                    <button id="submitButton" onClick={onChangePassword} disabled={updateLoading || !oldPassword || !newPassword} className="btn btn-default updateBtn">Change</button>
                  )}
                </div>
              </>
            )}
          </div>
        </Col>
      </Row>
    </Widget>
  );
}
