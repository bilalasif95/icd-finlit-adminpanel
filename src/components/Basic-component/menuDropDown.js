import React, { useEffect, useState } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from '@material-ui/core/styles';
import { statuses } from "../../config";

export default function LongMenu(props) {
  const { options, onClick, anchorEl, open, info, handleClose, id, data } = props;
  const useStyles = makeStyles(() => ({
    root: {
      "&:focus": {
        outline: "none",
      },
    },
    ApprovalTypo: {
      color: "#9EA0A5",
    },
    approved: {
      color: "#38B249",
      width: "100px",
      height: "36px",
      display: " flex",
      padding: "2px 5px",
      textAlign: "center",
      alignItems: "center",
      borderRadius: "25px",
      justifyContent: "center",
      backgroundColor: "#EBF7EC",
    },
    rejected: {
      width: "100px",
      height: "36px",
      display: " flex",
      padding: "2px 5px",
      textAlign: "center",
      alignItems: "center",
      borderRadius: "25px",
      justifyContent: "center",
      backgroundColor: "#FEF5F4",
      color: "#E6492D",

    },
    pending: {
      color: "#F6AB2F",
      width: "100px",
      height: "36px",
      display: " flex",
      padding: "2px 5px",
      textAlign: "center",
      alignItems: "center",
      borderRadius: "25px",
      justifyContent: "center",
      backgroundColor: "#FEF6EA",
    },
    EmployeBox: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      textTransform: "capitalize",
      "& >p": {
        maxWidth: "150px",
        margin: "0px 0px",
        "&:nth-child(2)": {
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          maxWidth: "85px",
        },
        "&:nth-child(3)": {
          padding: "0px !important",
        },
        "&:first-child": {
          position: "relative",
          maxWidth: "80px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          paddingRight: "15px",
          "&:before": {
            content: "''",
            position: "absolute",
            borderBottom: "1px solid #EEEEEE",
            top: "9px",
            right: "-2px",
            width: "20px",
            transform: "rotate(90deg)",
          },
        },
      },
    },
    userstatus: {
      width: "100px",
      height: "36px",
      display: " flex",
      padding: "2px 5px",
      textAlign: "center",
      alignItems: "center",
      borderRadius: "25px",
      justifyContent: "center",
      backgroundColor: "#FEF5F4",
      color: "#E6492D",
    },
  }));
  const classes = useStyles();
  const [employee1Data, setEmployee1Data] = useState({});
  const [employee2Data, setEmployee2Data] = useState({});
  const [employee3Data, setEmployee3Data] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    setEmployee1Data({})
    setEmployee2Data({})
    setEmployee3Data({})
    if (data && data.approvedBy.employee1 !== "") {
      data.approvedBy.employee1.employeeId.get().then((res) => { setEmployee1Data(res.data()); setLoading(false) })
    }
    if (data && data.approvedBy.employee2 && data.approvedBy.employee2 !== "") {
      data.approvedBy.employee2.employeeId.get().then((res) => { setEmployee2Data(res.data()); setLoading(false) })
    }
    if (data && data.approvedBy.employee3 && data.approvedBy.employee3 !== "") {
      data.approvedBy.employee3.employeeId.get().then((res) => { setEmployee3Data(res.data()); setLoading(false) })
    }
    if (data && (data.approvedBy.employee1 === "" || data.approvedBy.employee2 === "" || data.approvedBy.employee3 === "")) {
      setLoading(false)
    }
  }, [data && data.approvedBy.employee1, data && data.approvedBy.employee2, data && data.approvedBy.employee3])

  return (
    <div>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        className="PaperBox"
        onClose={handleClose}
        PaperProps={{
          style: {
            width: info ? "41ch" : "20ch",
            padding: info ? "20px 20px" : "0",
            top: "322px !important",
            left: "1060px !important",
            boxShadow: "2px 10px 10px #00000029",
            maxHeight: (data && (data.approvedBy.employee3 || data.approvedBy.employee3 === "")) ? "390px" : "330px",
            overflow: "inherit",
          },
        }}
      >
        {info ?
          <div className={classes.root}>
            <div>
              <div className={classes.ApprovalTypo}>First Approval</div>
              <div className={classes.EmployeBox}><p>{loading ? <>Loading...</> : <>{employee1Data.firstName} {employee1Data.lastName}</>}</p><p>{loading ? <>Loading...</> : <>{employee1Data.role}</>}</p><p>{data.approvedBy.employee1 !== "" ? data.approvedBy.employee1.status === statuses.accepted ? <p className={classes.approved}>Approved</p> : data.approvedBy.employee1.status === statuses.rejected ? <p className={classes.rejected}>{statuses.rejected}</p> : <p className={classes.pending}>{statuses.pending}</p> : <p className={classes.pending}>{statuses.pending}</p>}</p></div>
            </div>
            <div className="GreyBorder"></div>
            {
              (data && (data.approvedBy.employee2 || data.approvedBy.employee2 === "")) && (
                <>
                  <div>
                    <div className={`${classes.ApprovalTypo} ${"SecApproval"}`}>2nd Approval</div>
                    <div className={classes.EmployeBox}><p>{loading ? <>Loading...</> : <>{employee2Data.firstName} {employee2Data.lastName}</>}</p><p>{loading ? <>Loading...</> : <>{employee2Data.role}</>}</p><p>{data.approvedBy.employee2 !== "" ? data.approvedBy.employee2.status === statuses.accepted ? <p className={classes.approved}>Approved</p> : data.approvedBy.employee2.status === statuses.rejected ? <p className={classes.rejected}>{statuses.rejected}</p> : <p className={classes.pending}>{statuses.pending}</p> : <p className={classes.pending}>{statuses.pending}</p>}</p></div>
                  </div>
                  <div className="GreyBorder"></div>
                </>
              )
            }
            {
              (data && (data.approvedBy.employee3 || data.approvedBy.employee3 === "")) && (
                <>
                  <div>
                    <div className={`${classes.ApprovalTypo} ${"SecApproval"}`}>3rd Approval</div>
                    <div className={classes.EmployeBox}><p>{loading ? <>Loading...</> : <>{employee3Data.firstName} {employee3Data.lastName}</>}</p><p>{loading ? <>Loading...</> : <>{employee3Data.role}</>}</p><p>{data.approvedBy.employee3 !== "" ? data.approvedBy.employee3.status === statuses.accepted ? <p className={classes.approved}>Approved</p> : data.approvedBy.employee3.status === statuses.rejected ? <p className={classes.rejected}>{statuses.rejected}</p> : <p className={classes.pending}>{statuses.pending}</p> : <p className={classes.pending}>{statuses.pending}</p>}</p></div>
                  </div>
                  <div className="GreyBorder"></div>
                </>
              )
            }
            <div className="NoteText"><p>(Note* Must be approved from {(data.approvedBy.employee3 || data.approvedBy.employee3 === "") ? "3" : (data.approvedBy.employee2 || data.approvedBy.employee2 === "") ? "2" : "1"} {(data.approvedBy.employee3 || data.approvedBy.employee3 === "") ? "Persons" : (data.approvedBy.employee2 || data.approvedBy.employee2 === "") ? "Persons" : "Person"})</p></div>
          </div>
          :
          options && options.map(option => (
            <MenuItem
              key={option.name}
              disabled={option.disabled}
              onClick={() => onClick(option.name, id)}
            >
              <span
                style={{
                  width: "3px",
                  borderRadius: "50px",
                  height: "3px",
                  padding: "3px",
                  backgroundColor: option.dot,
                }}
              />
            &nbsp;&nbsp;&nbsp;
              {option.name}
            </MenuItem>
          ))}
      </Menu>
    </div>
  );
}