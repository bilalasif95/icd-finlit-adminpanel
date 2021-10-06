import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import "./feeManagement.scss";
import { CircularProgress } from "@material-ui/core";
import Widget from "../../components/Widget";
import TextField from "../../components/Basic-component/textFiled";
import Button from "../../components/Basic-component/button";
import Dailog from "../../components/Basic-component/Dailog";
import { Close as AddIcon } from "@material-ui/icons";
import { firebase, table, statuses, types, timestamp } from "../../config";
import UseEnterKeyListener from "../Verification/useEnterKeyListener";

export default function FeeManagementPage() {
  UseEnterKeyListener({
    querySelectorToExecuteClick: "#submitButton"
  });
  var classes = useStyles();
  const [OpenModal, setOpenModal] = useState(false);
  const [mainData, setMainData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [requestLoading, setRequestLoading] = useState(false);
  const [value, setValue] = useState(0);
  const [label, setLabel] = useState("");
  const [reason, setReason] = useState("");
  const [success, setSuccess] = useState("");
  const [permissions, setPermissions] = useState({});
  const OpenDailog = (value, label) => {
    setReason("")
    setValue(value)
    setLabel(label)
    setOpenModal(true)
  }
  const handleCloseDailog = () => {
    setOpenModal(false)
  }
  useEffect(() => {
    setLoading(true)
    firebase
      .firestore()
      .collection(table.Configs)
      .onSnapshot((snapshot) => {
        const postData = [];
        snapshot.forEach(doc => {
          postData.push({
            ...doc.data(),
            id: doc.id,
          })
        })
        setMainData(postData);
        setLoading(false)
      }, () => {
        setLoading(false);
        setMessage("Permission Denied.")
      }
      );
    firebase.firestore().collection(table.StaffRoles).doc(localStorage.getItem("role"))
      .onSnapshot(res => {
        setPermissions(res.data())
      }, () => {
        setLoading(false);
        setMessage("Permission Denied.")
      }
      )
  }, [])
  const ReferralRewards = mainData.filter(res => res.id === "referralRewards");
  const CustomerFees = mainData.filter(res => res.id === "customerFees");
  const InterestRate = mainData.filter(res => res.id === "interestRate");
  const onRequest = (label, value) => {
    setRequestLoading(true);
    setSuccess("");
    if (label === "Referral Percentage" ||
      label === "Customer Interest" ||
      label === "Company Interest" ||
      label === "Charity Donation Fee" ||
      label === "Exchange Fee" ||
      label === "User Payment Fee" ||
      label === "Business Payment Fee"
    ) {
      if (!/(^100([.]0{1,2})?)$|(^\d{1,2}([.]\d{1,16})?)$/.test(value)) {
        setSuccess("Incorrect value.");
        setRequestLoading(false);
      }
      else {
        firebase
          .firestore()
          .collection(table.FeeApprovals)
          .doc()
          .set({
            submittedBy: firebase.firestore().doc("Staff/" + window.localStorage.getItem("userID")),
            employeeId: firebase.firestore().doc("Staff/" + window.localStorage.getItem("userID")),
            createdAt: timestamp(),
            updatedAt: timestamp(),
            approvalStatus: statuses.pending,
            type: types.feeUpdation,
            reason: reason,
            approvedBy: {
              employee1: "",
              employee2: "",
              employee3: "",
            },
            data: label === "Referral Limit" ? {
              referralRewards: {
                limit: parseFloat(value)
              }
            } : label === "Referral Percentage" ? {
              referralRewards: {
                percentage: parseFloat(value)
              }
            } : label === "Customer Interest" ? {
              interestRate: {
                customer: parseFloat(value)
              }
            } : label === "Company Interest" ? {
              interestRate: {
                company: parseFloat(value)
              }
            } : label === "Charity Donation Fee" ? {
              customerFees: {
                charity: parseFloat(value)
              }
            } : label === "Exchange Fee" ? {
              customerFees: {
                exchange: parseFloat(value)
              }
            } : label === "User Payment Fee" ? {
              customerFees: {
                userPayment: parseFloat(value)
              }
            } : {
              customerFees: {
                businessPayment: parseFloat(value)
              }
            }
          })
          .then(() => {
            setSuccess("Request submitted Successfully.");
            setTimeout(() => {
              setRequestLoading(false);
              setSuccess("");
              setOpenModal(false);
            }, 1500);
          })
          .catch(() => {
            setRequestLoading(false);
            setSuccess("Permission Denied.")
          })
      }
    }
    else {
      firebase
        .firestore()
        .collection(table.FeeApprovals)
        .doc()
        .set({
          submittedBy: firebase.firestore().doc("Staff/" + window.localStorage.getItem("userID")),
          employeeId: firebase.firestore().doc("Staff/" + window.localStorage.getItem("userID")),
          createdAt: timestamp(),
          updatedAt: timestamp(),
          approvalStatus: statuses.pending,
          type: types.feeUpdation,
          reason: reason,
          approvedBy: {
            employee1: "",
            employee2: "",
            employee3: "",
          },
          data: label === "Referral Limit" ? {
            referralRewards: {
              limit: parseFloat(value)
            }
          } : label === "Referral Percentage" ? {
            referralRewards: {
              percentage: parseFloat(value)
            }
          } : label === "Customer Interest" ? {
            interestRate: {
              customer: parseFloat(value)
            }
          } : label === "Company Interest" ? {
            interestRate: {
              company: parseFloat(value)
            }
          } : label === "Charity Donation Fee" ? {
            customerFees: {
              charity: parseFloat(value)
            }
          } : label === "Exchange Fee" ? {
            customerFees: {
              exchange: parseFloat(value)
            }
          } : label === "User Payment Fee" ? {
            customerFees: {
              userPayment: parseFloat(value)
            }
          } : {
            customerFees: {
              businessPayment: parseFloat(value)
            }
          }
        })
        .then(() => {
          setSuccess("Request submitted Successfully.");
          setTimeout(() => {
            setRequestLoading(false);
            setSuccess("");
            setOpenModal(false);
          }, 1500);
        })
        .catch(() => {
          setRequestLoading(false);
          setSuccess("Permission Denied.")
        })
    }
  }
  return (
    <Widget disableWidgetMenu>
      <div className={classes.title}>Fee Management</div>
      {message ? <div>{message}</div> :
        <div className={classes.feeMgt}>
          <div className={classes.mgtCol}>
            <div className={classes.mgtBox}>
              <div className={classes.heading}>Referral Rewards</div>
              <div className={classes.form}>
                <div className={classes.fieldCont}>
                  <div className={classes.label}>Referral Limit</div>
                  <div className={classes.showRes}>{loading ? <>Loading...</> : <>${ReferralRewards && ReferralRewards[0] && ReferralRewards[0].limit}</>}</div>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={!(permissions && permissions.feeManagement && permissions.feeManagement.referralRewards)}
                    className={classes.editBtn}
                    onClick={() => OpenDailog(ReferralRewards && ReferralRewards[0] && ReferralRewards[0].limit, "Referral Limit")}
                  >
                    Edit
                  </Button>
                </div>
                <div className={classes.fieldCont}>
                  <div className={classes.label}>Referral Percentage</div>
                  <div className={classes.showRes}>{loading ? <>Loading...</> : <>{ReferralRewards && ReferralRewards[0] && ReferralRewards[0].percentage}%</>}</div>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={!(permissions && permissions.feeManagement && permissions.feeManagement.referralRewards)}
                    className={classes.editBtn}
                    onClick={() => OpenDailog(ReferralRewards && ReferralRewards[0] && ReferralRewards[0].percentage, "Referral Percentage")}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            </div>
            <div className={classes.mgtBox}>
              <div className={classes.heading}>Interest Rate</div>
              <div className={classes.form}>
                <div className={classes.fieldCont}>
                  <div className={classes.label}>Customer Interest</div>
                  <div className={classes.showRes}>{loading ? <>Loading...</> : <>{InterestRate && InterestRate[0] && InterestRate[0].customer}%</>}</div>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={!(permissions && permissions.feeManagement && permissions.feeManagement.interestRate)}
                    className={classes.editBtn}
                    onClick={() => OpenDailog(InterestRate && InterestRate[0] && InterestRate[0].customer, "Customer Interest")}
                  >
                    Edit
                  </Button>
                </div>
                <div className={classes.fieldCont}>
                  <div className={classes.label}>Company Interest</div>
                  <div className={classes.showRes}>{loading ? <>Loading...</> : <>{InterestRate && InterestRate[0] && InterestRate[0].company}%</>}</div>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={!(permissions && permissions.feeManagement && permissions.feeManagement.interestRate)}
                    className={classes.editBtn}
                    onClick={() => OpenDailog(InterestRate && InterestRate[0] && InterestRate[0].company, "Company Interest")}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.mgtCol}>
            <div className={classes.mgtBoxL}>
              <div className={classes.heading}>Customer Fees</div>
              <div className={classes.form}>
                <div className={classes.fieldCont}>
                  <div className={classes.label}>Charity Donation Fee</div>
                  <div className={classes.showRes}>{loading ? <>Loading...</> : <>{CustomerFees && CustomerFees[0] && CustomerFees[0].charity}%</>}</div>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={!(permissions && permissions.feeManagement && permissions.feeManagement.customerFees)}
                    className={classes.editBtn}
                    onClick={() => OpenDailog(CustomerFees && CustomerFees[0] && CustomerFees[0].charity, "Charity Donation Fee")}
                  >
                    Edit
                  </Button>
                </div>
                <div className={classes.fieldCont}>
                  <div className={classes.label}>Exchange Fee</div>
                  <div className={classes.showRes}>{loading ? <>Loading...</> : <>{CustomerFees && CustomerFees[0] && CustomerFees[0].exchange}%</>}</div>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={!(permissions && permissions.feeManagement && permissions.feeManagement.customerFees)}
                    className={classes.editBtn}
                    onClick={() => OpenDailog(CustomerFees && CustomerFees[0] && CustomerFees[0].exchange, "Exchange Fee")}
                  >
                    Edit
                  </Button>
                </div>
                <div className={classes.fieldCont}>
                  <div className={classes.label}>User Payment Fee</div>
                  <div className={classes.showRes}>{loading ? <>Loading...</> : <>{CustomerFees && CustomerFees[0] && CustomerFees[0].userPayment}%</>}</div>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={!(permissions && permissions.feeManagement && permissions.feeManagement.customerFees)}
                    className={classes.editBtn}
                    onClick={() => OpenDailog(CustomerFees && CustomerFees[0] && CustomerFees[0].userPayment, "User Payment Fee")}
                  >
                    Edit
                  </Button>
                </div>
                <div className={classes.fieldCont}>
                  <div className={classes.label}>Business Payment Fee</div>
                  <div className={classes.showRes}>{loading ? <>Loading...</> : <>{CustomerFees && CustomerFees[0] && CustomerFees[0].businessPayment}%</>}</div>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={!(permissions && permissions.feeManagement && permissions.feeManagement.customerFees)}
                    className={classes.editBtn}
                    onClick={() => OpenDailog(CustomerFees && CustomerFees[0] && CustomerFees[0].businessPayment, "Business Payment Fee")}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>}
      <Dailog open={OpenModal} handleClose={() => handleCloseDailog()}
        maxWidth={'md'}
        content={
          <div className={classes.reason}>
            <div className={classes.charTitle}>Reason</div>
            <div>
              <div className={classes.fieldContainer}>
                <div className={classes.field}>
                  <TextField value={value} type="number" min="0" onChange={(e) => setValue(e.target.value)} label={label} placeholder="Enter value" autoFocus="true" />
                </div>
                <div className={classes.field}>
                  <TextField type="textarea" label="Mention Reason" placeholder="Enter reason"
                    multiline
                    rows={4}
                    rowsMax={8}
                    onChange={(e) => setReason(e.target.value)}
                  />
                </div>
              </div>
            </div>
            {success && <>{success.includes("Success") ?
              <div style={{ width: "100%" }}><p style={{ color: "green", textAlign: "center" }}>{success}</p></div>
              :
              <div style={{ width: "100%" }}><p style={{ color: "red", textAlign: "center" }}>{success}</p></div>
            }</>}
            <div className={classes.btnCont}>
              {requestLoading ? <CircularProgress size={26} className={classes.loginLoader} /> : <Button id="submitButton" disabled={!reason || !value} onClick={() => onRequest(label, value)} className={`${classes.reqBtn} ${"submitButton"}`}>Request</Button>}
            </div>
          </div>} >
        <AddIcon className={classes.closeIcon} onClick={handleCloseDailog} />
      </Dailog>
    </Widget>
  );
}