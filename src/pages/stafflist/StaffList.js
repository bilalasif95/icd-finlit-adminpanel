import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import { firebase, statuses, types, table, timestamp, roles } from "../../config";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { CircularProgress } from "@material-ui/core";
import "./staff.scss";
import Widget from "../../components/Widget/Widget";
import Table from "../../components/Basic-component/table";
import MenuDropDown from "../../components/Basic-component/menuDropDown";
import { Person as PersonIcon } from "@material-ui/icons";
import { People as StaffIcon } from "@material-ui/icons";
import TextField from "../../components/Basic-component/textFiled";
import NativeDropdown from "../../components/Basic-component/nativeDropDown";
import Button from "../../components/Basic-component/button";
import Dailog from "../../components/Basic-component/Dailog";
import { Close as AddIcon } from "@material-ui/icons";
import { callApi } from "../../utils/call-api";
import { subUrl } from "../../constants/api-sub-url";
import UseEnterKeyListener from "../Verification/useEnterKeyListener";

export default function StaffListPage() {
  UseEnterKeyListener({
    querySelectorToExecuteClick: "#submitButton"
  });
  var classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [OpenModal, setOpenModal] = useState(false);
  const [OpenModal1, setOpenModal1] = useState(false);
  const [action, setAction] = useState("");
  const [data, setData] = useState([]);
  const [rolesArray, setRolesArray] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [staffStatus, setStaffStatus] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [departmentsArray, setDepartmentsArray] = useState([]);
  const [mainData, setMainData] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const open = Boolean(anchorEl);
  const [permissions, setPermissions] = useState({});
  const invite = () => {
    setLoading(true);
    setError("");
    if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/.test(email)) {
      setError("Email is incorrect.");
      setLoading(false);
    }
    else {
      firebase
        .firestore()
        .collection(table.Staff)
        .where("email", "==", email.toLowerCase())
        .get()
        .then(res => {
          if (res.empty) {
            firebase
              .firestore()
              .collection(table.Staff)
              .where("phone", "==", contactNumber)
              .get()
              .then(res => {
                if (res.empty) {
                  const payload = {
                    FirstName: firstName,
                    LastName: lastName,
                    Department: selectedDepartment,
                    Phone: contactNumber,
                    Role: selectedRole,
                    Email: email.toLowerCase(),
                  };
                  firebase.auth().onAuthStateChanged((user) => {
                    if (user) {
                      user.getIdToken().then((token) => {
                        callApi(subUrl.inviteStaff, "post", token, payload)
                          .then(() => {
                            setError("Invitation sent Successfully.");
                            setTimeout(() => {
                              setLoading(false);
                              setError("");
                              setContactNumber("");
                              setOpenModal(false);
                            }, 1500);
                          })
                          .catch(() => {
                            setError("Failed to send invitation.");
                            setLoading(false);
                          });
                      })
                    }
                  })
                }
                else {
                  setError("Phone Number already exists");
                  setLoading(false);
                }
              })
          } else {
            setError("Email already exists");
            setLoading(false);
          }
        });
    }
  };
  useEffect(() => {
    firebase.firestore().collection(table.StaffRoles).doc(localStorage.getItem("role"))
      .onSnapshot(res => {
        setPermissions(res.data())
      })
    firebase
      .firestore()
      .collection(table.StaffRoles)
      .onSnapshot(querySnapShot => {
        const arr = [];
        querySnapShot.docs.forEach(doc => {
          arr.push({
            value: doc.id,
            name: doc.id,
          });
        });
        setRolesArray(arr);
        setSelectedRole(arr && arr[0] && arr[0].value);
      });
    firebase
      .firestore()
      .collection(table.Departments)
      .onSnapshot(querySnapShot => {
        const arr = [];
        querySnapShot.docs.forEach(doc => {
          arr.push({
            value: doc.id,
            name: doc.id,
          });
        });
        setDepartmentsArray(arr);
        setSelectedDepartment(arr && arr[0] && arr[0].value);
      });
  }, []);
  const actionClick = (value, id) => {
    setAction(value);
    setOpenModal1(true);
    handleClose();
  };
  const handleOpen = e => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const OpenDailog = () => {
    setOpenModal(true);
  };
  const handleCloseDailog = () => {
    setError("");
    setLoading(false);
    setOpenModal(false);
  };
  const handleCloseDailog1 = () => {
    setError("");
    setLoading(false);
    setOpenModal1(false);
  };
  useEffect(() => {
    setDataLoading(true);
    firebase
      .firestore()
      .collection(table.Staff)
      .where("emailVerified", "==", true)
      .where("email", "!=", window.localStorage.getItem("email"))
      .onSnapshot(snapshot => {
        const postData = [];
        snapshot.forEach(doc =>
          postData.push({
            ...doc.data(),
            id: doc.id,
          }),
        );
        setData(postData);
        setDataLoading(false);
      }, () => {
        setDataLoading(false);
        setMessage("Permission Denied.")
      }
      )
    firebase
      .firestore()
      .collection(table.StaffSummary)
      .onSnapshot(snapshot => {
        const postData = [];
        snapshot.forEach(doc =>
          postData.push({
            ...doc.data(),
            id: doc.id,
          }),
        );
        setMainData(postData);
        setDataLoading(false);
      });
  }, []);
  const cols = [
    {
      field: "firstName",
      title: "Full Name",
      filtering: false,
      customFilterAndSearch: (term, rowData) => (rowData.firstName + ' ' + rowData.lastName).toLowerCase().indexOf(term.toLowerCase()) !== -1,
      render: rowData => (
        <div className={classes.userName}>
          <div className={classes.userImg}>
            {rowData.profile ? (
              <img
                src={rowData.profile}
                alt="Profile"
                className={classes.imgIcon}
              />
            ) : (
              <img
                src="https://i.imgur.com/Vne9QFK.png"
                alt="Profile"
                className={classes.imgIcon}
              />
            )}
          </div>
          <p className={classes.fields}>
            {rowData.firstName} {rowData.lastName}
          </p>
        </div>
      ),
    },
    {
      title: "Contact No.", filtering: false, field: "phone", render: rowData => <p className={classes.fields}>
        {rowData.phone}
      </p>
    },
    {
      title: "User Role", filterPlaceholder: "Select Role", lookup: { "chief executive officer": "Chief Executive Officer", "director": "Director", "manager": "Manager", "administration": "Administration", "team": "Team", "staff member": "Staff Member" }, field: "role", render: rowData => <p style={{ textTransform: "capitalize" }} className={classes.fields}>
        {rowData.role}
      </p>
    },
    {
      title: "Email", filtering: false, field: "email", render: rowData => <p className={classes.fields}>
        {rowData.email}
      </p>
    },
    {
      title: "Department", filterPlaceholder: "Select Department", lookup: { "customer experience": "Customer Experience", "finance": "Finance", "hr": "HR", "marketing": "Marketing", "technology": "Technology" }, field: "department", render: rowData => <p style={{ textTransform: "capitalize" }} className={classes.fields}>
        {rowData.department}
      </p>
    },
    {
      title: "Status",
      field: "status",
      searchable: false,
      filterPlaceholder: "Select Status",
      lookup: { "Enabled": statuses.enabled, "Suspended": statuses.suspended },
      cellStyle: {
        textAlign: "center",
      },
      render: rowData => (
        <>
          {rowData.status === statuses.enabled ? (
            <div className={classes.userEnabledStatus}>
              <p className={classes.enabled}>{rowData.status}</p>
            </div>
          ) : (
            <div className={classes.userSuspendStatus}>
              <p className={classes.suspended}>{rowData.status}</p>
            </div>
          )}
        </>
      ),
    },
  ];
  const onRequest = () => {
    setLoading(true);
    firebase
      .firestore()
      .collection(table.StaffApprovals)
      .doc()
      .set({
        submittedBy: firebase
          .firestore()
          .doc("Staff/" + window.localStorage.getItem("userID")),
        employeeId: firebase.firestore().doc("Staff/" + employeeId),
        createdAt: timestamp(),
        updatedAt: timestamp(),
        approvalStatus: statuses.pending,
        type: action === "Suspend" ? types.suspendAccount : types.enableAccount,
        reason: reason,
        approvedBy: {
          employee1: "",
          employee2: "",
        },
      })
      .then(() => {
        setError("Request submitted Successfully.");
        setTimeout(() => {
          setLoading(false);
          setError("");
          setOpenModal1(false);
        }, 1500);
      })
      .catch(() => {
        setLoading(false);
        setError("Permission Denied.")
      })
  };
  const CEO = mainData.filter(res => res.id === roles.CEO);
  const Administration = mainData.filter(res => res.id === roles.Administration);
  const StaffMember = mainData.filter(res => res.id === roles.StaffMember);
  const onContactNumberChange = (e) => {
    if (!/^[0-9]{0,20}$/.test(e.target.value)) {
      e.preventDefault();
    } else {
      setContactNumber(e.target.value)
    }
  }
  return (
    <Widget disableWidgetMenu>
      <div className={classes.title}>Staff Management</div>
      <div className={classes.staffList}>
        <div className={classes.designationBox}>
          <div className={classes.desCount}>
            <div className={classes.designation}>Chief Executive Officer</div>
            {dataLoading ? <div style={{ marginTop: "0.5rem" }}>Loading...</div> : <div className={classes.nofDes}>{CEO && CEO[0] && CEO[0].count}</div>}
          </div>
          <div className={classes.personImg}>
            <PersonIcon className={classes.iconColor} />
          </div>
        </div>
        <div className={classes.designationBox}>
          <div className={classes.desCount}>
            <div className={classes.designation}>Administration</div>
            {dataLoading ? <div style={{ marginTop: "0.5rem" }}>Loading...</div> : <div className={classes.nofDes}>{Administration && Administration[0] && Administration[0].count}</div>}
          </div>
          <div className={classes.personImg}>
            <StaffIcon className={classes.iconColor} />
          </div>
        </div>
        <div className={classes.designationBox}>
          <div className={classes.desCount}>
            <div className={classes.designation}>Staff Members</div>
            {dataLoading ? <div style={{ marginTop: "0.5rem" }}>Loading...</div> : <div className={classes.nofDes}>{StaffMember && StaffMember[0] && StaffMember[0].count}</div>}
          </div>
          <div className={classes.personImg}>
            <StaffIcon className={classes.iconColor} />
          </div>
        </div>
      </div>
      <div className={classes.addUserButton}>
        <Button disabled={!(permissions && permissions.staffManagement && permissions.staffManagement.addUser)} onClick={() => OpenDailog()} className={classes.addUser}>
          <AddIcon className={classes.addIcon} />
          Add User
        </Button>
      </div>
      {dataLoading ? (
        <div className={classes.loading}>
          <CircularProgress color="secondary" size={60} thickness={5} />
        </div>
      ) : (
        <div className="StaffTable">
          <Table
            title="Staff List"
            columns={cols}
            filtering={true}
            message={message}
            data={data}
            actions={[
              {
                icon: () => <MoreVertIcon />,
                onClick: (e, rowData) => {
                  setAnchorEl(e.currentTarget);
                  setEmployeeId(rowData.id);
                  setStaffStatus(rowData.status);
                  setDropDownOpen(true);
                },
              },
            ]}
          />
        </div>
      )}
      {dropDownOpen && (
        <MenuDropDown
          options={permissions && permissions.staffManagement && permissions.staffManagement.userSuspension &&
            staffStatus === statuses.enabled
            ? [
              { name: "Enable", dot: "#0667EB", disabled: true },
              { name: "Suspend", dot: "#E6492D", disabled: false },
            ] :
            permissions && permissions.staffManagement && permissions.staffManagement.userEnable && staffStatus === statuses.suspended ?
              [
                { name: "Enable", dot: "#0667EB", disabled: false },
                { name: "Suspend", dot: "#E6492D", disabled: true },
              ] : [
                { name: "Enable", dot: "#0667EB", disabled: true },
                { name: "Suspend", dot: "#E6492D", disabled: true },
              ]
          }
          onClick={actionClick}
          anchorEl={anchorEl}
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
        />
      )}
      <Dailog
        open={OpenModal}
        handleClose={() => {
          handleCloseDailog();
          setError("");
          setLoading(false);
        }}
        maxWidth={"sm"}
        content={
          <form className={classes.addForm}>
            <div className={classes.charTitle}>Add User</div>
            <div className={classes.fieldContainer}>
              <div className={classes.field}>
                <TextField
                  label="First name"
                  autoFocus={true}
                  placeholder="Enter Name"
                  onChange={e => setFirstName(e.target.value)}
                />
              </div>
              <div className={classes.field}>
                <TextField
                  label="Last name"
                  placeholder="Enter Name"
                  onChange={e => setLastName(e.target.value)}
                />
              </div>
              <div className={classes.field}>
                <TextField
                  label="Email"
                  type="email"
                  placeholder="Enter Email"
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className={classes.field}>
                <TextField
                  min={"0"}
                  label="Contact No."
                  type="number"
                  value={contactNumber}
                  placeholder="Enter Contact Number"
                  onChange={onContactNumberChange}
                />
              </div>
              <div className={classes.field}>
                <NativeDropdown
                  onChange={e => setSelectedRole(e.target.value)}
                  label="User Role"
                  data={rolesArray}
                />
              </div>
              <div className={classes.field}>
                <NativeDropdown
                  onChange={e => setSelectedDepartment(e.target.value)}
                  label="Department"
                  data={departmentsArray}
                />
              </div>
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
                {loading ? (
                  <CircularProgress
                    size={26}
                    className={classes.loginLoader}
                  />
                ) : (
                  <Button
                    id="submitButton"
                    disabled={
                      !firstName || !lastName || !email || !contactNumber
                    }
                    onClick={invite}
                    className={`${classes.inviteBtn} ${"submitButton"}`}
                  >
                    Invite
                  </Button>
                )}
              </div>
            </div>
          </form>
        }
      >
        <AddIcon className={classes.closeIcon} onClick={handleCloseDailog} />
      </Dailog>
      <Dailog
        open={OpenModal1}
        handleClose={() => {
          handleCloseDailog1();
          setError("");
          setLoading(false);
        }}
        maxWidth={"sm"}
        content={
          <div className={classes.reason}>
            <div className={classes.charTitle}>Reason</div>
            <form>
              <div className={classes.fieldContainerL}>
                <div className={classes.fieldL}>
                  <TextField
                    onChange={e => setReason(e.target.value)}
                    type="textarea"
                    autoFocus={true}
                    label="Mention Reason"
                    placeholder="Add Text here"
                    multiline
                    rows={4}
                    rowsMax={8}
                  />
                </div>
              </div>
            </form>
            {error && <>{error.includes("Success") ?
              <div style={{ width: "100%" }}><p style={{ color: "green", textAlign: "center" }}>{error}</p></div>
              :
              <div style={{ width: "100%" }}><p style={{ color: "red", textAlign: "center" }}>{error}</p></div>
            }</>}
            <div className={classes.btnCont}>
              {loading ? <CircularProgress size={26} className={classes.loginLoader} /> : <Button id="submitButton" disabled={!reason} onClick={onRequest} className={`${classes.reqBtn} ${"submitButton"}`}>Request</Button>}
            </div>
          </div>} >
        <AddIcon className={classes.closeIcon} onClick={handleCloseDailog1} />
      </Dailog >
    </Widget >
  );
}