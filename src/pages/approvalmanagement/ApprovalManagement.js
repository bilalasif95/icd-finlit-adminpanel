import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import { firebase, table, statuses, types } from "../../config";
import Widget from "../../components/Widget";
import Table from "../../components/Basic-component/table";
import { Tabs, Tab, CircularProgress } from "@material-ui/core";
import MenuDropDown from "../../components/Basic-component/menuDropDown";
import Dailog from "../../components/Basic-component/Dailog";
import { Close as AddIcon } from "@material-ui/icons";
import InfoIcon from "@material-ui/icons/Info";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import moment from "moment";

export default function ApprovalManagementPage() {
  var classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [infoAnchorEl, setInfoAnchorEl] = useState(null);
  const [OpenModal, setOpenModal] = useState(false);
  const [activeTabId, setActiveTabId] = useState(0);
  const [activeType, setActiveType] = useState(0);
  const [type, setType] = useState("");
  const [data, setData] = useState([]);
  const [id, setID] = useState("");
  const [message, setMessage] = useState("");
  const [permissions, setPermissions] = useState({});
  const [updateStatus, setUpdateStatus] = useState("");
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [infoDropDownOpen, setInfoDropDownOpen] = useState(false);
  const [individualStaffData, setIndividualStaffData] = useState({});
  const [requestByFirstName, setRequestByFirstName] = useState("");
  const [requestByLastName, setRequestByLastName] = useState("");
  const [snapShotArraySize, setSnapShotArraySize] = useState(0);
  const [change, setChange] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const open = Boolean(anchorEl);
  const infoOpen = Boolean(infoAnchorEl);
  useEffect(() => {
    firebase.firestore().collection(table.StaffRoles).doc(localStorage.getItem("role"))
      .onSnapshot(res => {
        setPermissions(res.data())
      })
    setDataLoading(true);
    if (activeType === 0) {
      firebase
        .firestore()
        .collection(table.StaffApprovals)
        .orderBy("createdAt", "desc")
        .onSnapshot(snapshot => {
          setSnapShotArraySize(snapshot.size)
          if (snapshot.empty) {
            setDataLoading(false);
          } else {
            snapshot.docChanges().forEach(change => {
              change.doc
                .data()
                .employeeId.get()
                .then(res => {
                  if (change.type === "added") {
                    setData(prevStaffData =>
                      prevStaffData.concat({
                        ...change.doc.data(),
                        ...res.data(),
                        id: change.doc.id,
                      }),
                    );
                    setDataLoading(false);
                  }
                  else if (change.type === "modified") {
                    setChange(change)
                  }
                  else {
                    setDataLoading(false);
                  }
                })
                .catch(() => {
                  setDataLoading(false);
                  setMessage("Permission Denied.")
                })
            })
          }
        }, () => {
          setDataLoading(false);
          setMessage("Permission Denied.")
        }
        )
    }
    if (activeType === 1) {
      firebase
        .firestore()
        .collection(table.CustomerApprovals)
        .orderBy("createdAt", "desc")
        .onSnapshot(snapshot => {
          setSnapShotArraySize(snapshot.size)
          if (snapshot.empty) {
            setDataLoading(false);
          } else {
            snapshot.docChanges().forEach(change => {
              change.doc
                .data()
                .customerId.get()
                .then(res => {
                  if (change.type === "added") {
                    setData(prevCustomerData =>
                      prevCustomerData.concat({
                        ...change.doc.data(),
                        ...res.data(),
                        approvalCreatedAt: change.doc.data().createdAt,
                        id: change.doc.id,
                      }),
                    );
                    setDataLoading(false);
                  }
                  else if (change.type === "modified") {
                    setChange(change)
                  }
                  else {
                    setDataLoading(false);
                  }
                })
                .catch(() => {
                  setDataLoading(false);
                  setMessage("Permission Denied.")
                })
            });
          }
        }, () => {
          setDataLoading(false);
          setMessage("Permission Denied.")
        }
        )
    }
    if (activeType === 2) {
      firebase
        .firestore()
        .collection(table.CharityApprovals)
        .orderBy("createdAt", "desc")
        .onSnapshot(snapshot => {
          setSnapShotArraySize(snapshot.size)
          if (snapshot.empty) {
            setDataLoading(false);
          } else {
            snapshot.docChanges().forEach(change => {
              change.doc
                .data()
                .customerId.get()
                .then(res => {
                  if (change.type === "added") {
                    setData(prevCharityData =>
                      prevCharityData.concat({
                        ...change.doc.data(),
                        ...res.data(),
                        id: change.doc.id,
                        approvalCreatedAt: change.doc.data().createdAt,
                      }),
                    );
                    setDataLoading(false);
                  }
                  else if (change.type === "modified") {
                    setChange(change)
                  }
                  else {
                    setDataLoading(false);
                  }
                })
                .catch(() => {
                  setDataLoading(false);
                  setMessage("Permission Denied.")
                })
            });
          }
        }, () => {
          setDataLoading(false);
          setMessage("Permission Denied.")
        }
        )
    }
    if (activeType === 3) {
      firebase
        .firestore()
        .collection(table.FeeApprovals)
        .orderBy("createdAt", "desc")
        .onSnapshot(snapshot => {
          setSnapShotArraySize(snapshot.size)
          if (snapshot.empty) {
            setDataLoading(false);
          } else {
            snapshot.docChanges().forEach(change => {
              change.doc
                .data()
                .employeeId.get()
                .then(res => {
                  if (change.type === "added") {
                    setData(prevFeeData =>
                      prevFeeData.concat({
                        ...change.doc.data(),
                        ...res.data(),
                        id: change.doc.id,
                      }),
                    );
                    setDataLoading(false);
                  }
                  else if (change.type === "modified") {
                    setChange(change)
                  }
                  else {
                    setDataLoading(false);
                  }
                })
                .catch(() => {
                  setDataLoading(false);
                  setMessage("Permission Denied.")
                })
            });
          }
        }, () => {
          setDataLoading(false);
          setMessage("Permission Denied.")
        }
        )
    }
  }, [activeType]);

  const getcustomData = id => {
    let tableType =
      activeType === 0
        ? table.StaffApprovals
        : activeType === 1
          ? table.CustomerApprovals
          : activeType === 2
            ? table.CharityApprovals
            : table.FeeApprovals;
    let idType =
      activeType === 0
        ? "employeeId"
        : activeType === 1
          ? "customerId"
          : activeType === 2
            ? "customerId"
            : "employeeId";
    let type =
      id === 0
        ? "all"
        : id === 1
          ? "pending"
          : id === 2
            ? "accepted"
            : "rejected";

    if (type === "all") {
      firebase
        .firestore()
        .collection(table[tableType])
        .orderBy("createdAt", "desc")
        .onSnapshot(snapshot => {
          setSnapShotArraySize(snapshot.size)
          if (snapshot.empty) {
            setDataLoading(false);
          } else {
            snapshot.docChanges().forEach(change => {
              change.doc
                .data()
              [idType].get()
                .then(res => {
                  if (change.type === "added") {
                    setData(prevStaffData =>
                      prevStaffData.concat({
                        ...change.doc.data(),
                        ...res.data(),
                        id: change.doc.id,
                        approvalCreatedAt: change.doc.data().createdAt,
                      }),
                    );
                    setDataLoading(false);
                  }
                  else if (change.type === "modified") {
                    setChange(change)
                  }
                  else {
                    setDataLoading(false);
                  }
                })
                .catch(() => {
                  setDataLoading(false);
                  setMessage("Permission Denied.")
                })
            });
          }
        }, () => {
          setDataLoading(false);
          setMessage("Permission Denied.")
        }
        )
    } else {
      firebase
        .firestore()
        .collection(table[tableType])
        .where("approvalStatus", "==", statuses[type])
        .orderBy("createdAt", "desc")
        .onSnapshot(snapshot => {
          setSnapShotArraySize(snapshot.size)
          if (snapshot.empty) {
            setDataLoading(false);
          } else {
            snapshot.docChanges().forEach(change => {
              change.doc
                .data()
              [idType].get()
                .then(res => {
                  if (change.type === "added") {
                    setData(prevStaffData =>
                      prevStaffData.concat({
                        ...change.doc.data(),
                        ...res.data(),
                        approvalCreatedAt: change.doc.data().createdAt,
                        id: change.doc.id,
                      }),
                    );
                    setDataLoading(false);
                  }
                  else if (change.type === "removed") {
                    setDataLoading(true)
                    setData([])
                    firebase
                      .firestore()
                      .collection(table[tableType])
                      .where("approvalStatus", "==", statuses[type])
                      .orderBy("createdAt", "desc")
                      .onSnapshot(snapshot => {
                        setSnapShotArraySize(snapshot.size)
                        if (snapshot.empty) {
                          setDataLoading(false);
                        } else {
                          snapshot.docChanges().forEach(change => {
                            change.doc
                              .data()
                            [idType].get()
                              .then(res => {
                                setData(prevStaffData =>
                                  prevStaffData.concat({
                                    ...change.doc.data(),
                                    ...res.data(),
                                    id: change.doc.id,
                                  }),
                                );
                                setDataLoading(false);
                              })
                          })
                        }
                      })
                  }
                })
                .catch(() => {
                  setDataLoading(false);
                  setMessage("Permission Denied.")
                })
            });
          }
        }, () => {
          setDataLoading(false);
          setMessage("Permission Denied.")
        }
        )
    }
  };

  data.forEach((x, index) => {
    if (change !== "") {
      if (x.id === change.doc.id) {
        data[index].approvalStatus = change.doc.data().approvalStatus
        data[index].approvedBy = change.doc.data().approvedBy
        data[index].approvalCreatedAt = change.doc.data().createdAt
      }
    }
  })

  const actionClick = value => {
    if (individualStaffData.approvedBy.employee1 === "") {
      if (type === table.StaffApprovals) {
        firebase
          .firestore()
          .collection(table.StaffApprovals)
          .doc(id)
          .set(
            {
              approvedBy: {
                employee1: {
                  employeeId: firebase
                    .firestore()
                    .doc("Staff/" + window.localStorage.getItem("userID")),
                  status: value + "ed",
                },
              },
            },
            { merge: true },
          )
          .then(() => handleClose());
      } else if (type === table.CustomerApprovals) {
        firebase
          .firestore()
          .collection(table.CustomerApprovals)
          .doc(id)
          .set(
            {
              approvedBy: {
                employee1: {
                  employeeId: firebase
                    .firestore()
                    .doc("Staff/" + window.localStorage.getItem("userID")),
                  status: value + "ed",
                },
              },
            },
            { merge: true },
          )
          .then(() => {
            handleClose();
            firebase
              .firestore()
              .collection(table.CustomerApprovals)
              .doc(id)
              .get()
              .then(res => {
                if (
                  res.data().approvedBy.employee1.status === "Accepted"
                ) {
                  firebase
                    .firestore()
                    .collection(table.CustomerApprovals)
                    .doc(id)
                    .set(
                      {
                        approvalStatus: statuses.accepted,
                      },
                      { merge: true },
                    );
                  individualStaffData.customerId.set({
                    status: individualStaffData.type === types.suspendAccount ? statuses.suspended : statuses.enabled
                  }, { merge: true })
                  firebase.firestore().collection(table.Businesses)
                    .doc(individualStaffData.uid)
                    .set({
                      status: individualStaffData.type === types.suspendAccount ? statuses.suspended : statuses.enabled
                    }, { merge: true })
                }
                if (
                  res.data().approvedBy.employee1.status === "Rejected"
                ) {
                  firebase
                    .firestore()
                    .collection(table.CustomerApprovals)
                    .doc(id)
                    .set(
                      {
                        approvalStatus: statuses.rejected,
                      },
                      { merge: true },
                    );
                }
              });
          });
      }
      else if (type === table.CharityApprovals) {
        firebase
          .firestore()
          .collection(table.CharityApprovals)
          .doc(id)
          .set(
            {
              approvedBy: {
                employee1: {
                  employeeId: firebase
                    .firestore()
                    .doc("Staff/" + window.localStorage.getItem("userID")),
                  status: value + "ed",
                },
              },
            },
            { merge: true },
          )
          .then(() => handleClose());
      }
      else {
        firebase
          .firestore()
          .collection(table.FeeApprovals)
          .doc(id)
          .set(
            {
              approvedBy: {
                employee1: {
                  employeeId: firebase
                    .firestore()
                    .doc("Staff/" + window.localStorage.getItem("userID")),
                  status: value + "ed",
                },
              },
            },
            { merge: true },
          )
          .then(() => handleClose());
      }
    } else {
      if (type === table.StaffApprovals) {
        firebase
          .firestore()
          .collection(table.StaffApprovals)
          .doc(id)
          .set(
            {
              approvedBy: {
                employee2: {
                  employeeId: firebase
                    .firestore()
                    .doc("Staff/" + window.localStorage.getItem("userID")),
                  status: value + "ed",
                },
              },
            },
            { merge: true },
          )
          .then(() => {
            handleClose();
            firebase
              .firestore()
              .collection(table.StaffApprovals)
              .doc(id)
              .get()
              .then(res => {
                if (
                  res.data().approvedBy.employee1.status === "Accepted" &&
                  res.data().approvedBy.employee2.status === "Accepted"
                ) {
                  firebase
                    .firestore()
                    .collection(table.StaffApprovals)
                    .doc(id)
                    .set(
                      {
                        approvalStatus: statuses.accepted,
                      },
                      { merge: true },
                    );
                  if (individualStaffData.type === types.setPermission) {
                    firebase.firestore().collection(table.StaffRoles).doc(individualStaffData.selectedRole)
                      .set(individualStaffData.data, { merge: true })
                  }
                  else {
                    individualStaffData.employeeId.set({
                      status: individualStaffData.type === types.suspendAccount ? statuses.suspended : statuses.enabled
                    }, { merge: true })
                  }
                }
                if (
                  res.data().approvedBy.employee1.status === "Rejected" &&
                  res.data().approvedBy.employee2.status === "Rejected"
                ) {
                  firebase
                    .firestore()
                    .collection(table.StaffApprovals)
                    .doc(id)
                    .set(
                      {
                        approvalStatus: statuses.rejected,
                      },
                      { merge: true },
                    );
                }
              });
          });
      }
      else if (type === table.CharityApprovals) {
        if (individualStaffData.approvedBy.employee2 === "") {
          firebase
            .firestore()
            .collection(table.CharityApprovals)
            .doc(id)
            .set(
              {
                approvedBy: {
                  employee2: {
                    employeeId: firebase
                      .firestore()
                      .doc("Staff/" + window.localStorage.getItem("userID")),
                    status: value + "ed",
                  },
                },
              },
              { merge: true },
            )
            .then(() => handleClose());
        }
        else {
          firebase
            .firestore()
            .collection(table.CharityApprovals)
            .doc(id)
            .set(
              {
                approvedBy: {
                  employee3: {
                    employeeId: firebase
                      .firestore()
                      .doc("Staff/" + window.localStorage.getItem("userID")),
                    status: value + "ed",
                  },
                },
              },
              { merge: true },
            )
            .then(() => {
              handleClose();
              firebase
                .firestore()
                .collection(table.CharityApprovals)
                .doc(id)
                .get()
                .then(res => {
                  if (
                    res.data().approvedBy.employee1.status === "Accepted" &&
                    res.data().approvedBy.employee2.status === "Accepted" &&
                    res.data().approvedBy.employee3.status === "Accepted"
                  ) {
                    firebase
                      .firestore()
                      .collection(table.CharityApprovals)
                      .doc(id)
                      .set(
                        {
                          approvalStatus: statuses.accepted,
                        },
                        { merge: true },
                      );
                    individualStaffData.customerId.set({
                      status: individualStaffData.type === types.charityApproval ? statuses.enabled : statuses.suspended
                    }, { merge: true })
                    firebase.firestore().collection(table.Businesses)
                      .doc(individualStaffData.uid)
                      .set({
                        status: individualStaffData.type === types.charityApproval ? statuses.enabled : statuses.suspended
                      }, { merge: true })
                  }
                  if (
                    res.data().approvedBy.employee1.status === "Rejected" &&
                    res.data().approvedBy.employee2.status === "Rejected" &&
                    res.data().approvedBy.employee3.status === "Rejected"
                  ) {
                    firebase
                      .firestore()
                      .collection(table.CharityApprovals)
                      .doc(id)
                      .set(
                        {
                          approvalStatus: statuses.rejected,
                        },
                        { merge: true },
                      );
                  }
                });
            });
        }
      }
      else {
        if (individualStaffData.approvedBy.employee2 === "") {
          firebase
            .firestore()
            .collection(table.FeeApprovals)
            .doc(id)
            .set(
              {
                approvedBy: {
                  employee2: {
                    employeeId: firebase
                      .firestore()
                      .doc("Staff/" + window.localStorage.getItem("userID")),
                    status: value + "ed",
                  },
                },
              },
              { merge: true },
            )
            .then(() => handleClose());
        }
        else {
          firebase
            .firestore()
            .collection(table.FeeApprovals)
            .doc(id)
            .set(
              {
                approvedBy: {
                  employee3: {
                    employeeId: firebase
                      .firestore()
                      .doc("Staff/" + window.localStorage.getItem("userID")),
                    status: value + "ed",
                  },
                },
              },
              { merge: true },
            )
            .then(() => {
              handleClose();
              firebase
                .firestore()
                .collection(table.FeeApprovals)
                .doc(id)
                .get()
                .then(res => {
                  if (
                    res.data().approvedBy.employee1.status === "Accepted" &&
                    res.data().approvedBy.employee2.status === "Accepted" &&
                    res.data().approvedBy.employee3.status === "Accepted"
                  ) {
                    firebase
                      .firestore()
                      .collection(table.FeeApprovals)
                      .doc(id)
                      .set(
                        {
                          approvalStatus: statuses.accepted,
                        },
                        { merge: true },
                      );
                    let obj = Object.values(individualStaffData.data)[0]
                    firebase.firestore().collection(table.Configs)
                      .doc(Object.keys(individualStaffData.data)[0])
                      .set(obj, { merge: true })
                  }
                  if (
                    res.data().approvedBy.employee1.status === "Rejected" &&
                    res.data().approvedBy.employee2.status === "Rejected" &&
                    res.data().approvedBy.employee3.status === "Rejected"
                  ) {
                    firebase
                      .firestore()
                      .collection(table.FeeApprovals)
                      .doc(id)
                      .set(
                        {
                          approvalStatus: statuses.rejected,
                        },
                        { merge: true },
                      );
                  }
                });
            });
        }
      }
    }
  };

  const handleOpen = e => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpen1 = e => {
    setInfoAnchorEl(e.currentTarget);
  };
  const handleClose1 = () => {
    setInfoAnchorEl(null);
  };

  const staffColumns = [
    {
      field: "firstName",
      filtering: false,
      title: "Employee Name",
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
      title: "Email",
      field: "email", filtering: false,
      render: rowData => <p className={classes.fields}>{rowData.email}</p>,
    },
    {
      title: "Department",
      field: "department",
      filterPlaceholder: "Select",
      lookup: { "customer experience": "Customer Experience", "finance": "Finance", "hr": "HR", "marketing": "Marketing", "technology": "Technology" },
      render: rowData => <p style={{ textTransform: "capitalize" }} className={classes.fields}>{rowData.department}</p>,
    },
    {
      title: "Role",
      field: "role",
      filterPlaceholder: "Select",
      lookup: { "chief executive officer": "Chief Executive Officer", "director": "Director", "manager": "Manager", "administration": "Administration", "team": "Team", "staff member": "Staff Member" },
      render: rowData => <p style={{ textTransform: "capitalize" }} className={classes.fields}>{rowData.role}</p>,
    },
    {
      title: "Change",
      field: "type",
      filterPlaceholder: "Select",
      lookup: { "Suspend Account": types.suspendAccount, "Enable Account": types.enableAccount },
      render: data => (
        <div>
          {data.type}
          <button
            data-testid="buttonapprovalmanagement:opendialog"
            className={classes.viewReasonButton}
            onClick={() => OpenDailog(data)}
          >
            View Reason
          </button>
        </div>
      ),
    },
    {
      title: "Time",
      field: "createdAt",
      defaultSort: 'desc',
      filtering: false,
      render: data => (
        <div>
          {moment(data && data.createdAt && data.createdAt.toDate())
            .local()
            .format("DD/MM/YYYY HH:mm:ss")}
        </div>
      ),
    },
    {
      title: "Status",
      searchable: false,
      field: "approvalStatus",
      filterPlaceholder: "Select",
      lookup: { "Accepted": statuses.accepted, "Rejected": statuses.rejected, "Pending": statuses.pending },
      cellStyle: {
        textAlign: "center",
      },
      render: rowData => (
        <>
          {rowData.approvedBy.employee1 && rowData.approvedBy.employee1.status === "Accepted" &&
            rowData.approvedBy.employee2 && rowData.approvedBy.employee2.status === "Accepted" ? (
            <div className={classes.userApprovedStatus}>
              <p className={classes.approved}>Approved</p>
            </div>
          ) : rowData.approvedBy.employee1 && rowData.approvedBy.employee1.status === "Rejected" &&
            rowData.approvedBy.employee2 && rowData.approvedBy.employee2.status === "Rejected" ? (
            <div className={classes.userStatus}>
              <p className={classes.rejected}>Rejected</p>
            </div>
          ) : (
            <div className={classes.userPendingStatus}>
              <p className={classes.pending}>Pending</p>
            </div>
          )}
        </>
      ),
    },
  ];

  const customerColumns = [
    {
      field: "firstName",
      filtering: false,
      title: "Customer Name",
      customFilterAndSearch: (term, rowData) => (rowData.firstName + ' ' + rowData.lastName).toLowerCase().indexOf(term.toLowerCase()) !== -1,
      render: rowData => (
        <div className={classes.userName}>
          <div className={classes.userImg}>
            {rowData.profile ? (
              <img
                src={rowData.profileImage}
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
      title: "Contact No.",
      field: "phone",
      filtering: false,
      render: rowData => <p className={classes.fields}>{rowData.phone}</p>,
    },
    { title: 'Business Name', filtering: false, field: 'businessName', render: rowData => <p className={classes.fields}>{rowData.businessName}</p>, },
    {
      title: "Change",
      field: "type",
      filterPlaceholder: "Select Change",
      lookup: { "Suspend Account": types.suspendAccount, "Enable Account": types.enableAccount },
      render: data => (
        <div>
          {data.type}
          <button
            className={classes.viewReasonButton}
            onClick={() => OpenDailog(data)}
            data-testid="buttonapprovalmanagement:opendialog2"
          >
            View Reason
          </button>
        </div>
      ),
    },
    {
      title: "Time",
      field: "approvalCreatedAt",
      defaultSort: 'desc',
      filtering: false,
      render: data => (
        <div>
          {moment(data && data.approvalCreatedAt && data.approvalCreatedAt.toDate())
            .local()
            .format("DD/MM/YYYY HH:mm:ss")}
        </div>
      ),
    },
    {
      title: "Status",
      searchable: false,
      field: "approvalStatus",
      filterPlaceholder: "Select Status",
      lookup: { "Accepted": statuses.accepted, "Rejected": statuses.rejected, "Pending": statuses.pending },
      cellStyle: {
        textAlign: "center",
      },
      render: rowData => (
        <>
          {rowData.approvedBy.employee1 && rowData.approvedBy.employee1.status === "Accepted"
            ? (
              <div className={classes.userApprovedStatus}>
                <p className={classes.approved}>Approved</p>
              </div>
            ) : rowData.approvedBy.employee1 && rowData.approvedBy.employee1.status === "Rejected"
              ? (
                <div className={classes.userStatus}>
                  <p className={classes.rejected}>Rejected</p>
                </div>
              ) : (
                <div className={classes.userPendingStatus}>
                  <p className={classes.pending}>Pending</p>
                </div>
              )}
        </>
      ),
    },
  ];
  const charityColumns = [
    {
      field: "firstName",
      filtering: false,
      title: "Customer Name",
      customFilterAndSearch: (term, rowData) => (rowData.firstName + ' ' + rowData.lastName).toLowerCase().indexOf(term.toLowerCase()) !== -1,
      render: rowData => (
        <div className={classes.userName}>
          <div className={classes.userImg}>
            {rowData.profile ? (
              <img
                src={rowData.profileImage}
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
      title: "Contact No.",
      field: "phone",
      filtering: false,
      render: rowData => <p className={classes.fields}>{rowData.phone}</p>,
    },
    { title: 'Charity Name', filtering: false, field: 'businessName', render: rowData => <p className={classes.fields}>{rowData.businessName}</p>, },
    {
      title: "Change",
      field: "type",
      filtering: false,
      render: data => (
        <div>
          {data.type}
          <button
            className={classes.viewReasonButton}
            onClick={() => OpenDailog(data)}
            data-testid="buttonapprovalmanagement:opendialog3"
          >
            View Reason
          </button>
        </div>
      ),
    },
    {
      title: "Time",
      field: "approvalCreatedAt",
      defaultSort: 'desc',
      filtering: false,
      render: data => (
        <div>
          {moment(data && data.approvalCreatedAt && data.approvalCreatedAt.toDate())
            .local()
            .format("DD/MM/YYYY HH:mm:ss")}
        </div>
      ),
    },
    {
      title: "Status",
      searchable: false,
      field: "approvalStatus",
      filterPlaceholder: "Select Status",
      lookup: { "Accepted": statuses.accepted, "Rejected": statuses.rejected, "Pending": statuses.pending },
      cellStyle: {
        textAlign: "center",
      },
      render: rowData => (
        <>
          {(rowData.approvedBy.employee3 || rowData.approvedBy.employee3 === "")
            ?
            <>
              {rowData.approvedBy.employee1 && rowData.approvedBy.employee1.status === "Accepted" &&
                rowData.approvedBy.employee2 && rowData.approvedBy.employee2.status === "Accepted" &&
                rowData.approvedBy.employee3 && rowData.approvedBy.employee3.status === "Accepted" ? (
                <div className={classes.userApprovedStatus}>
                  <p className={classes.approved}>Approved</p>
                </div>
              ) : rowData.approvedBy.employee1 && rowData.approvedBy.employee1.status === "Rejected" &&
                rowData.approvedBy.employee2 && rowData.approvedBy.employee2.status === "Rejected" &&
                rowData.approvedBy.employee3 && rowData.approvedBy.employee3.status === "Rejected" ? (
                <div className={classes.userStatus}>
                  <p className={classes.rejected}>Rejected</p>
                </div>
              ) : (
                <div className={classes.userPendingStatus}>
                  <p className={classes.pending}>Pending</p>
                </div>
              )}
            </>
            :
            rowData.approvedBy.employee1 && rowData.approvedBy.employee1.status === "Accepted" &&
              rowData.approvedBy.employee2 && rowData.approvedBy.employee2.status === "Accepted" ? (
              <div className={classes.userApprovedStatus}>
                <p className={classes.approved}>Approved</p>
              </div>
            ) : rowData.approvedBy.employee1 && rowData.approvedBy.employee1.status === "Rejected" &&
              rowData.approvedBy.employee2 && rowData.approvedBy.employee2.status === "Rejected" ? (
              <div className={classes.userStatus}>
                <p className={classes.rejected}>Rejected</p>
              </div>
            ) : (
              <div className={classes.userPendingStatus}>
                <p className={classes.pending}>Pending</p>
              </div>
            )}
        </>
      ),
    },
  ];
  const feeColumns = [
    {
      field: "firstName",
      filtering: false,
      title: "Employee Name",
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
      title: "Email",
      field: "email",
      filtering: false,
      render: rowData => <p className={classes.fields}>{rowData.email}</p>,
    },
    {
      title: "Department",
      field: "department",
      filterPlaceholder: "Select",
      lookup: { "customer experience": "Customer Experience", "finance": "Finance", "hr": "HR", "marketing": "Marketing", "technology": "Technology" },
      render: rowData => <p style={{ textTransform: "capitalize" }} className={classes.fields}>{rowData.department}</p>,
    },
    {
      title: "Role",
      field: "role",
      filterPlaceholder: "Select",
      lookup: { "chief executive officer": "Chief Executive Officer", "director": "Director", "manager": "Manager", "administration": "Administration", "team": "Team", "staff member": "Staff Member" },
      render: rowData => <p style={{ textTransform: "capitalize" }} className={classes.fields}>{rowData.role}</p>,
    },
    {
      title: "Change",
      field: "type",
      filtering: false,
      render: data => (
        <div>
          {data.type}
          <button
            className={classes.viewReasonButton}
            onClick={() => OpenDailog(data)}
            data-testid="buttonapprovalmanagement:opendialog4"
          >
            View Reason
          </button>
        </div>
      ),
    },
    {
      title: "Time",
      field: "createdAt",
      defaultSort: 'desc',
      filtering: false,
      render: data => (
        <div>
          {moment(data && data.createdAt && data.createdAt.toDate())
            .local()
            .format("DD/MM/YYYY HH:mm:ss")}
        </div>
      ),
    },
    {
      title: "Status",
      searchable: false,
      field: "approvalStatus",
      filterPlaceholder: "Select",
      lookup: { "Accepted": statuses.accepted, "Rejected": statuses.rejected, "Pending": statuses.pending },
      cellStyle: {
        textAlign: "center",
      },
      render: rowData => (
        <>
          {(rowData.approvedBy.employee3 || rowData.approvedBy.employee3 === "")
            ?
            <>
              {rowData.approvedBy.employee1 && rowData.approvedBy.employee1.status === "Accepted" &&
                rowData.approvedBy.employee2 && rowData.approvedBy.employee2.status === "Accepted" &&
                rowData.approvedBy.employee3 && rowData.approvedBy.employee3.status === "Accepted" ? (
                <div className={classes.userApprovedStatus}>
                  <p className={classes.approved}>Approved</p>
                </div>
              ) : rowData.approvedBy.employee1 && rowData.approvedBy.employee1.status === "Rejected" &&
                rowData.approvedBy.employee2 && rowData.approvedBy.employee2.status === "Rejected" &&
                rowData.approvedBy.employee3 && rowData.approvedBy.employee3.status === "Rejected" ? (
                <div className={classes.userStatus}>
                  <p className={classes.rejected}>Rejected</p>
                </div>
              ) : (
                <div className={classes.userPendingStatus}>
                  <p className={classes.pending}>Pending</p>
                </div>
              )}
            </>
            :
            rowData.approvedBy.employee1 && rowData.approvedBy.employee1.status === "Accepted" &&
              rowData.approvedBy.employee2 && rowData.approvedBy.employee2.status === "Accepted" ? (
              <div className={classes.userApprovedStatus}>
                <p className={classes.approved}>Approved</p>
              </div>
            ) : rowData.approvedBy.employee1 && rowData.approvedBy.employee1.status === "Rejected" &&
              rowData.approvedBy.employee2 && rowData.approvedBy.employee2.status === "Rejected" ? (
              <div className={classes.userStatus}>
                <p className={classes.rejected}>Rejected</p>
              </div>
            ) : (
              <div className={classes.userPendingStatus}>
                <p className={classes.pending}>Pending</p>
              </div>
            )}
        </>
      ),
    },
  ];

  const OpenDailog = data => {
    setRequestByFirstName("");
    setRequestByLastName("");
    setIsLoading(true);
    setOpenModal(true);
    setIndividualStaffData(data);
    data.submittedBy.get().then(res => {
      setRequestByFirstName(res.data() && res.data().firstName);
      setRequestByLastName(res.data() && res.data().lastName);
      setIsLoading(false);
    });
  };
  const handleCloseDailog = () => {
    setOpenModal(false);
  };

  return (
    <Widget disableWidgetMenu>
      <div className={classes.title}>Approval Management</div>
      <div className={classes.staffList}>
        <button
          onClick={() => {
            setActiveType(0);
            setDataLoading(true);
            setActiveTabId(0);
            setData([]);
          }}
          data-testid="buttonapprovalmanagement:settypes"
          className={
            activeType === 0
              ? classes.designationBoxSelected
              : classes.designationBox
          }
        >
          Staff Approval
        </button>
        <button
          onClick={() => {
            setActiveType(1);
            setDataLoading(true);
            setActiveTabId(0);
            setData([]);
          }}
          data-testid="buttonapprovalmanagement:settypes2"
          className={
            activeType === 1
              ? classes.designationBoxSelected
              : classes.designationBox
          }
        >
          Customer Approval
        </button>
        {/* <button
            onClick={() => {
              setActiveType(2);
              setDataLoading(true);
              setActiveTabId(0);
              setData([]);
            }}
            className={
              activeType === 2
                ? classes.designationBoxSelected
                : classes.designationBox
            }
          >
            Charity Approval
          </button> */}
        <button
          onClick={() => {
            setActiveType(3);
            setDataLoading(true);
            setActiveTabId(0);
            setData([]);
          }}
          className={
            activeType === 3
              ? classes.designationBoxSelected
              : classes.designationBox
          }
        >
          Fee Approval
        </button>
      </div>
      {dropDownOpen && (
        <MenuDropDown
          options={
            ((updateStatus === "Pending") && (individualStaffData.approvedBy.employee1 === "" || individualStaffData.approvedBy.employee2 === "" || individualStaffData.approvedBy.employee3 === "")
              && (localStorage.getItem("userID") !== ((individualStaffData.approvedBy.employee1 && individualStaffData.approvedBy.employee1.employeeId.id) || (individualStaffData.approvedBy.employee2 && individualStaffData.approvedBy.employee2.employeeId.id)) || (individualStaffData.approvedBy.employee3 && individualStaffData.approvedBy.employee3.employeeId.id))
              && (activeType === 0 ?
                (permissions && permissions.approvalManagement && permissions.approvalManagement.staffApproval)
                : activeType === 1 ?
                  (permissions && permissions.approvalManagement && permissions.approvalManagement.customerApproval)
                  : activeType === 2 ?
                    (permissions && permissions.approvalManagement && permissions.approvalManagement.charityApproval)
                    : (permissions && permissions.approvalManagement && permissions.approvalManagement.feeApproval)
              )
            )
              ? [
                { name: "Accept", dot: "#0667EB", disabled: false },
                { name: "Reject", dot: "#E6492D", disabled: false },
              ]
              : [
                { name: "Accept", dot: "#0667EB", disabled: true },
                { name: "Reject", dot: "#E6492D", disabled: true },
              ]
          }
          onClick={actionClick}
          anchorEl={anchorEl}
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
        />
      )}
      {infoDropDownOpen && (
        <MenuDropDown
          options={[]}
          info={true}
          data={individualStaffData}
          anchorEl={infoAnchorEl}
          open={infoOpen}
          handleOpen={handleOpen1}
          handleClose={handleClose1}
        />
      )}
      <Tabs
        indicatorColor="primary"
        textColor="secondary"
        value={activeTabId}
        onChange={(e, id) => {
          setActiveTabId(id);
          setDataLoading(true);
          getcustomData(id);
          setData([]);
        }}
        className={classes.iconsBar}
      >
        <Tab label="All" classes={{ root: classes.tab }} />
        <Tab label="Pending" classes={{ root: classes.tab }} />
        <Tab label="Approved" classes={{ root: classes.tab }} />
        <Tab label="Rejected" classes={{ root: classes.tab }} />
      </Tabs>
      {dataLoading ? (
        <div className={classes.loading}>
          <CircularProgress color="secondary" size={60} thickness={5} />
        </div>
      ) :
        data.length < snapShotArraySize ?
          <div className={classes.loading}>
            <CircularProgress color="secondary" size={60} thickness={5} />
          </div>
          :
          (
            <>
              {activeType === 0 && (
                <Table
                  data={data}
                  filtering={true}
                  message={message}
                  columns={staffColumns}
                  title="Staff Approval"
                  actions={[
                    {
                      icon: () => <MoreVertIcon />,
                      onClick: (e, rowData) => {
                        setAnchorEl(e.currentTarget);
                        setUpdateStatus(rowData.approvalStatus);
                        setIndividualStaffData(rowData);
                        setID(rowData.id);
                        setType(table.StaffApprovals);
                        setDropDownOpen(true);
                      },
                    },
                    {
                      icon: () => <InfoIcon />,
                      onClick: (e, rowData) => {
                        setInfoAnchorEl(e.currentTarget);
                        setIndividualStaffData(rowData);
                        setType(table.StaffApprovals);
                        setInfoDropDownOpen(true);
                      },
                    },
                  ]}
                />
              )}
              {activeType === 1 && (
                <Table
                  data={data}
                  filtering={true}
                  message={message}
                  columns={customerColumns}
                  title="Customer Approval"
                  actions={[
                    {
                      icon: () => <MoreVertIcon />,
                      onClick: (e, rowData) => {
                        setAnchorEl(e.currentTarget);
                        setIndividualStaffData(rowData);
                        setType(table.CustomerApprovals);
                        setUpdateStatus(rowData.approvalStatus);
                        setID(rowData.id);
                        setDropDownOpen(true);
                      },
                    },
                    {
                      icon: () => <InfoIcon />,
                      onClick: (e, rowData) => {
                        setIndividualStaffData({});
                        setType(table.CustomerApprovals);
                        setInfoAnchorEl(e.currentTarget);
                        setIndividualStaffData(rowData);
                        setInfoDropDownOpen(true);
                      },
                    },
                  ]}
                />
              )}
              {activeType === 2 && (
                <Table
                  data={data}
                  columns={charityColumns}
                  message={message}
                  title="Charity Approval"
                  actions={[
                    {
                      icon: () => <MoreVertIcon />,
                      onClick: (e, rowData) => {
                        setAnchorEl(e.currentTarget);
                        setIndividualStaffData(rowData);
                        setType(table.CharityApprovals);
                        setUpdateStatus(rowData.approvalStatus);
                        setID(rowData.id);
                        setDropDownOpen(true);
                      },
                    },
                    {
                      icon: () => <InfoIcon />,
                      onClick: (e, rowData) => {
                        setIndividualStaffData({});
                        setType(table.CharityApprovals);
                        setInfoAnchorEl(e.currentTarget);
                        setIndividualStaffData(rowData);
                        setInfoDropDownOpen(true);
                      },
                    },
                  ]}
                />
              )}
              {activeType === 3 && (
                <Table
                  data={data}
                  filtering={true}
                  columns={feeColumns}
                  message={message}
                  title="Fee Approval"
                  actions={[
                    {
                      icon: () => <MoreVertIcon />,
                      onClick: (e, rowData) => {
                        setAnchorEl(e.currentTarget);
                        setIndividualStaffData(rowData);
                        setType(table.FeeApprovals);
                        setUpdateStatus(rowData.approvalStatus);
                        setID(rowData.id);
                        setDropDownOpen(true);
                      },
                    },
                    {
                      icon: () => <InfoIcon />,
                      onClick: (e, rowData) => {
                        setIndividualStaffData({});
                        setType(table.FeeApprovals);
                        setInfoAnchorEl(e.currentTarget);
                        setIndividualStaffData(rowData);
                        setInfoDropDownOpen(true);
                      },
                    },
                  ]}
                />
              )}
            </>
          )}
      <Dailog
        open={OpenModal}
        handleClose={() => handleCloseDailog()}
        maxWidth={"md"}
        content={
          <div className={classes.reason}>
            <div className={classes.charTitle}>Reason</div>
            <div className={classes.reasonItem}>
              <div className={classes.label}>Subject</div>
              <div className={classes.res}>
                <p>
                  {individualStaffData.reason === "" ? (
                    <>No Reason</>
                  ) : (
                    individualStaffData.reason
                  )}
                </p>
              </div>
            </div>
            <div className={classes.request}>
              <p className={classes.resBy}>Requested By:</p>
              {isLoading ? (
                <CircularProgress size={26} className={classes.loginLoader} />
              ) : (
                <span className={classes.resName}>
                  {requestByFirstName} {requestByLastName}
                </span>
              )}
            </div>
          </div>
        }
      >
        <AddIcon className={classes.closeIcon} onClick={handleCloseDailog} />
      </Dailog>
    </Widget>
  );
}