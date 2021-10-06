import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  title: {
    fontSize: 30,
    fontWeight: 500,
    color: "#9EA0A5",
    margin: "-24px 0 2rem",
  },
  staffList: {
    display: "flex",
    justifyContent: "flex-start",
    padding: "0 0 2rem",
    width: "100%",
  },
  userStatus: {
    alignItems: "center",
    backgroundColor: "#FEF5F4",
    borderRadius: "25px",
    display: "flex",
    height: 36,
    justifyContent: "center",
    padding: "2px 5px",
    textAlign: "center",
    width: 100,
  },
  loginLoader: {
    marginLeft: theme.spacing(4),
    color: "black",
  },
  userName: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-start',
    "& a": {
      textDecoration: "none",
    },
  },
  fields: {
    maxWidth: "150px",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  viewReasonButton: {
    border: "none",
    background: "white",
    cursor: "pointer",
    color: "#0667EB",
    padding: 0,
    "&:focus": {
      outline: "none",
    }
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    height: "60vh",
  },
  userPendingStatus: {
    alignItems: "center",
    backgroundColor: "#ffd4231a",
    borderRadius: "25px",
    display: "flex",
    height: 36,
    justifyContent: "center",
    padding: "2px 5px",
    textAlign: "center",
    width: 100,
  },
  userApprovedStatus: {
    alignItems: "center",
    backgroundColor: "#F2F7FE",
    borderRadius: "25px",
    display: "flex",
    height: 36,
    justifyContent: "center",
    padding: "2px 5px",
    textAlign: "center",
    width: 100,
  },
  approved: {
    color: "#0667EB",
  },
  rejected: {
    color: "#E6492D",
  },
  pending: {
    color: "#FFD423",
  },
  designationBox: {
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: 3,
    cursor: "pointer",
    padding: "0.7rem 1rem",
    width: "15%",
    margin: "0 1rem 0 0",
    "&:focus": {
      outline: "none",
    },
  },
  designationBoxSelected: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.primary.light,
    border: "1px solid #ddd",
    borderRadius: 3,
    cursor: "pointer",
    padding: "0.7rem 1rem",
    width: "15%",
    margin: "0 1rem 0 0",
    "&:focus": {
      outline: "none",
    },
  },
  imgIcon: {
    width: '100%',
  },
  userImg: {
    alignItems: "center",
    display: "flex",
    height: 35,
    justifyContent: "flex-start",
    marginRight: '0.5rem',
    overflow: 'hidden',
    width: 35,
    borderRadius: '50%',
  },
  res: {
    border: "1px solid #eaedf3",
    borderRadius: 3,
    color: "#000",
    padding: "0.7rem 1rem",
    width: "100%",
  },
  charTitle: {
    fontSize: 30,
    fontWeight: 400,
    margin: "0 0 1rem",
    color: "#3e3f42",
  },
  charity: {
    padding: "0 2rem 2rem",
  },
  charityInfo: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
  },
  charItem: {
    padding: "0",
    margin: "0 0 1rem",
    width: "48%",
  },
  profileItem: {
    width: "48%",
  },
  label: {
    color: "#a9abb0",
    padding: "0.5rem 0",
    width: "100%",
  },
  charSubItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0",
    margin: "0 0 1rem",
    width: "100%",
  },
  photo: {
    width: "100%",
  },
  imgPro: {
    width: "100%",
    height: "90px",
    maxWidth: 90,
    borderRadius: "50%",
  },
  imgCover: {
    width: "100%",
    height: "90px",
    maxWidth: 100,
    borderRadius: 2,
  },
  reason: {
    padding: "0 2rem 2rem",
  },
  reasonItem: {
    padding: "0",
    margin: "0 0 1rem",
    width: "100%",
  },
  request: {
    display: "flex",
    justifyContent: "flex-start",
    width: "100%",
  },
  resBy: {
    color: "#a9abb0",
    padding: "0.5rem 0",
    margin: "0 1rem 0 0",
  },
  resName: {
    backgroundColor: "#ebedf3",
    color: "#000",
    borderRadius: "25px",
    padding: "0.5rem 1.5rem",
  },
  closeIcon: {
    fontSize: "30px",
    fill: "#000",
    position: "absolute",
    top: "5px",
    right: "0",
    cursor: "pointer",
  },
}));