import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useStyles from "./styles";
import "../feemanagement/feeManagement.scss";
import Widget from "../../components/Widget";
import Table from "../../components/Basic-component/table";
import Button from "../../components/Basic-component/button";
import Dailog from "../../components/Basic-component/Dailog";
import TextField from "../../components/Basic-component/textFiled";
import MenuDropDown from "../../components/Basic-component/menuDropDown";
import { Tabs, Tab, CircularProgress } from "@material-ui/core";
import { firebase, statuses, types, table, timestamp } from "../../config";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Close as AddIcon } from "@material-ui/icons";
import { Person as PersonalIcon } from "@material-ui/icons";
import { People as BusinessIcon } from "@material-ui/icons";
import moment from "moment";
import UseEnterKeyListener from "../Verification/useEnterKeyListener";

export default function CustomerManagementPage() {
  UseEnterKeyListener({
    querySelectorToExecuteClick: "#submitButton"
  });
  var classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [OpenModal, setOpenModal] = useState(false);
  const [employeeId, setEmployeeId] = useState("");
  const [action, setAction] = useState("");
  const [staffStatus, setStaffStatus] = useState("");
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");
  const [personalData, setPersonalData] = useState([]);
  const [businessData, setBusinessData] = useState([]);
  const [mainData, setMainData] = useState([]);
  const [mainLoading, setMainLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [requestLoading, setRequestLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTabId, setActiveTabId] = useState(0);
  const [permissions, setPermissions] = useState({});
  const open = Boolean(anchorEl);
  const actionClick = (value, id) => {
    setAction(value);
    setOpenModal(true);
    handleClose();
  };
  const handleCloseDailog = () => {
    setError("");
    setRequestLoading(false);
    setOpenModal(false);
  };
  useEffect(() => {
    setLoading(true);
    if (activeTabId === 0) {
      firebase
        .firestore()
        .collection(table.Users)
        .orderBy("createdAt", "desc")
        .where("accountType", "==", "personal")
        .onSnapshot(snapshot => {
          const postData = [];
          snapshot.forEach(doc =>
            postData.push({
              ...doc.data(),
              id: doc.id,
              name: [
                doc.data().firstName + " " + doc.data().lastName,
                doc.data().profile,
              ],
            }),
          );
          setPersonalData(postData);
          setLoading(false);
        }, () => {
          setLoading(false);
          setMessage("Permission Denied.")
        }
        )
    } else {
      firebase
        .firestore()
        .collection(table.Users)
        .orderBy("createdAt", "desc")
        .where("accountType", "==", "business")
        .onSnapshot(snapshot => {
          const postData = [];
          snapshot.forEach(doc =>
            postData.push({
              ...doc.data(),
              id: doc.id,
              name: [
                doc.data().firstName + " " + doc.data().lastName,
                doc.data().profile,
              ],
            }),
          );
          setBusinessData(postData);
          setLoading(false);
        }, () => {
          setLoading(false);
          setMessage("Permission Denied.")
        }
        )
    }
  }, [activeTabId]);
  const handleOpen = e => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const onRequest = () => {
    setRequestLoading(true);
    firebase
      .firestore()
      .collection(table.CustomerApprovals)
      .doc()
      .set({
        submittedBy: firebase
          .firestore()
          .doc("Staff/" + window.localStorage.getItem("userID")),
        customerId: firebase.firestore().doc("Users/" + employeeId),
        createdAt: timestamp(),
        updatedAt: timestamp(),
        approvalStatus: statuses.pending,
        type: action === "Suspend" ? types.suspendAccount : types.enableAccount,
        reason: reason,
        approvedBy: {
          employee1: "",
        },
      })
      .then(() => {
        setError("Request submitted Successfully.");
        setTimeout(() => {
          setRequestLoading(false);
          setError("");
          setOpenModal(false);
        }, 1500);
      })
      .catch(() => {
        setRequestLoading(false);
        setError("Permission Denied.");
      })
  };
  const columns = [
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
          {rowData.accountType === "personal" ? (
            <Link
              to={{
                pathname: `/app/customer-information/`,
                query: { ...rowData },
              }}
            >
              <p className={classes.fields}>
                {rowData.firstName}&nbsp;{rowData.lastName}
              </p>
            </Link>
          ) : (
            <Link
              to={{
                pathname: `/app/business-information/`,
                query: { ...rowData },
              }}
            >
              <p className={classes.fields}>
                {rowData.firstName}&nbsp;{rowData.lastName}
              </p>
            </Link>
          )}
        </div>
      ),
    },
    { title: "Contact No.", field: "phone", filtering: false },
    {
      title: "Email", filtering: false, field: "email", render: rowData => <p className={classes.fields}>
        {rowData.email}
      </p>
    },
    {
      title: "Registered",
      field: "createdAt",
      filtering: false,
      defaultSort: 'desc',
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

  const businessColumns = [
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
          {rowData.accountType === "personal" ? (
            <Link
              to={{
                pathname: `/app/customer-information/`,
                query: { ...rowData },
              }}
            >
              <p className={classes.fields}>
                {rowData.firstName}&nbsp;{rowData.lastName}
              </p>
            </Link>
          ) : (
            <Link
              to={{
                pathname: `/app/business-information/`,
                query: { ...rowData },
              }}
            >
              <p className={classes.fields}>
                {rowData.firstName}&nbsp;{rowData.lastName}
              </p>
            </Link>
          )}
        </div>
      ),
    },
    { title: "Contact No.", field: "phone", filtering: false },
    {
      title: "Business Name", filtering: false, field: "businessName", render: rowData => <p className={classes.fields}>
        {rowData.businessName}
      </p>
    },
    {
      title: "Email", filtering: false, field: "email", render: rowData => <p className={classes.fields}>
        {rowData.email}
      </p>
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
  useEffect(() => {
    setMainLoading(true)
    firebase
      .firestore()
      .collection(table.UsersSummary)
      .onSnapshot((snapshot) => {
        const postData = [];
        snapshot.forEach(doc => {
          postData.push({
            ...doc.data(),
            id: doc.id,
          })
        })
        setMainData(postData);
        setMainLoading(false)
      });

    firebase.firestore().collection(table.StaffRoles).doc(localStorage.getItem("role"))
      .onSnapshot(res => {
        setPermissions(res.data())
      })
  }, [])
  const Personal = mainData.filter(res => res.id === "personal");
  const Business = mainData.filter(res => res.id === "business");
  return (
    <Widget disableWidgetMenu>
      <div className={classes.title}>Customer Management</div>
      <div className={classes.staffList}>
        <button className={classes.designationBox}>
          <div className={classes.desCount}>
            <div className={classes.designation}>Personal</div>
            {mainLoading ? <>Loading...</> : <div className={classes.nofDes}>{Personal && Personal[0] && Personal[0].count}</div>}
          </div>
          <div className={classes.personImg}>
            <PersonalIcon className={classes.iconColor} />
          </div>
        </button>
        <button className={classes.designationBox}>
          <div className={classes.desCount}>
            <div className={classes.designation}>Business</div>
            {mainLoading ? <>Loading...</> : <div className={classes.nofDes}>{Business && Business[0] && Business[0].count}</div>}
          </div>
          <div className={classes.personImg}>
            <BusinessIcon className={classes.iconColor} />
          </div>
        </button>
      </div>
      <Tabs
        indicatorColor="primary"
        textColor="secondary"
        value={activeTabId}
        onChange={(e, id) => setActiveTabId(id)}
        className={classes.iconsBar}
      >
        <Tab label="Personal" classes={{ root: classes.tab }} />
        <Tab label="Business" classes={{ root: classes.tab }} />
      </Tabs>
      {activeTabId === 0 &&
        (loading ? (
          <div className={classes.loading}>
            <CircularProgress color="secondary" size={60} thickness={5} />
          </div>
        ) : (
          <>
            <Table
              data={personalData}
              columns={columns}
              filtering={true}
              message={message}
              title="Personal List"
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
          </>
        ))}
      {activeTabId === 1 &&
        (loading ? (
          <div className={classes.loading}>
            <CircularProgress color="secondary" size={60} thickness={5} />
          </div>
        ) : (
          <Table
            data={businessData}
            columns={businessColumns}
            filtering={true}
            message={message}
            title="Business List"
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
        ))}
      {dropDownOpen && (
        <MenuDropDown
          options={
            (permissions && permissions.customerManagement && permissions.customerManagement.customerSuspension &&
              staffStatus === statuses.new)
              && (permissions && permissions.customerManagement && permissions.customerManagement.customerEnable && staffStatus === statuses.new)
              ?
              [
                { name: "Enable", dot: "#0667EB", disabled: false },
                { name: "Suspend", dot: "#E6492D", disabled: false },
              ]
              :
              permissions && permissions.customerManagement && permissions.customerManagement.customerSuspension &&
                (staffStatus === statuses.enabled || staffStatus === statuses.new)
                ? [
                  { name: "Enable", dot: "#0667EB", disabled: true },
                  { name: "Suspend", dot: "#E6492D", disabled: false },
                ] :
                permissions && permissions.customerManagement && permissions.customerManagement.customerEnable && (staffStatus === statuses.suspended || staffStatus === statuses.new) ?
                  [
                    { name: "Enable", dot: "#0667EB", disabled: false },
                    { name: "Suspend", dot: "#E6492D", disabled: true },
                  ] :
                  [
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
      {OpenModal && (
        <Dailog
          open={OpenModal}
          handleClose={() => {
            handleCloseDailog();
            setError("");
            setRequestLoading(false);
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
                      autoFocus="true"
                      label="Mention Reason"
                      placeholder="Add Text here"
                      multiline
                      rows={4}
                      rowsmax={8}
                    />
                  </div>
                </div>
              </form>
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
                {requestLoading ? <CircularProgress size={26} className={classes.loginLoader} /> :
                  <Button
                    id="submitButton"
                    onClick={onRequest}
                    disabled={!reason}
                    className={`${classes.reqBtn} ${"submitButton"}`}
                  >
                    Request
                  </Button>
                }
              </div>
            </div>
          }
        >
          <AddIcon
            className={classes.closeIcon}
            onClick={handleCloseDailog}
          />
        </Dailog>
      )}
    </Widget>
  );
}