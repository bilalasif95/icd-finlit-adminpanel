import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  title: {
    fontSize: 30,
    fontWeight: 500,
    color: "#9EA0A5",
    margin: "-24px 0 2rem",
  },
  userList: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0 0 2rem",
    width: "100%",
  },
  addForm: {
    padding: '0 2rem',
  },
  field: {
    width: "100%",
    margin: "0 0 1rem",
  },
  btnCont: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    margin: "2rem 0",
  },
  closeIcon: {
    fontSize: "30px",
    fill: "#000",
    position: "absolute",
    top: "5px",
    right: "0",
    cursor: "pointer",
  },
  inviteBtn: {
    display: "block",
    margin: "1rem auto 0",
    width: "150px",
    backgroundColor: "#0667EB !important",
    color: "#fff",
    textTransform: "capitalize",
  },
  charTitle: {
    color: '#3e3f42',
    fontSize: 30,
    fontWeight: 400,
    margin: "0 0 1rem",
  },
  fieldContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    width: "100%",
    padding: "2rem 0",
  },
  userBox: {
    backgroundColor: "#fbfbfd",
    border: "1px solid #ddd",
    borderRadius: 3,
    display: "flex",
    justifyContent: "space-between",
    padding: "2rem 1rem",
    width: "49%",
  },
  userDesc: {
    width: "80%",
  },
  userInfo: {
    width: "100%",
    color: "#9ea0a5",
    marginTop: "10px",
  },
  userDes: {
    fontSize: 20,
    fontWeight: 500,
    width: "100%",
  },
  userAdd: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    width: "20%",
    "& .MuiButtonBase-root.Mui-disabled": {
      cursor: "not-allowed !important",
      pointerEvents: "auto !important",
    },
  },
  changePermissionButton: {
    "& .MuiButtonBase-root.Mui-disabled": {
      cursor: "not-allowed !important",
      pointerEvents: "auto !important",
      backgroundColor: "rgba(0, 0, 0, 0.12) !important",
    },
  },
  addBtn: {
    border: "1px solid #ddd",
    backgroundColor: '#fff',
    color: '#3e91ff',
    width: "140px",
  },
  userPermisions: {
    backgroundColor: "#fbfbfd",
    border: "1px solid #ddd",
    borderRadius: 3,
    padding: "1rem",
  },
  selectRole: {
    width: "30%",
    margin: "1rem 0",
    padding: "1rem 0",
  },
  permissionsList: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  loginLoader: {
    marginLeft: theme.spacing(4),
    color: "black"
  },
  permitCol: {
    margin: "1rem 0",
    width: "33.33%",
    "& ul": {
      paddingLeft: 20,
      margin: 0,
    },
    "& li": {
      listStyle: "none",
      padding: "5px 0",
    },
  },
  heading: {
    fontSize: 14,
    margin: "0 0 0.5rem"
  },
  giveawayHeading: {
    fontSize: 14,
    margin: "1rem 0 0.5rem"
  },
  customBox: {
    padding: "0px !important"
  },
  reqBtn: {
    display: 'block',
    margin: '2rem auto',
    width: '150px',
    backgroundColor: '#0667EB !important',
    color: '#fff',
    textTransform: 'capitalize',
  }
}));