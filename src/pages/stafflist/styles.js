import { makeStyles } from "@material-ui/styles";

export default makeStyles(() => ({
  title: {
    fontSize: 30,
    fontWeight: 500,
    color: "#9EA0A5",
    margin: "-24px 0 2rem",
  },
  staffList: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: '1rem',
    padding: "0 0 2rem",
    width: "100%",
  },
  designationBox: {
    border: "1px solid #ddd",
    display: "flex",
    justifyContent: "space-between",
    padding: "1rem",
    width: "32%",
  },
  desCount: {
    width: "80%",
  },
  designation: {
    width: "100%",
    color: "#9ea0a5",
  },
  nofDes: {
    fontSize: 30,
    fontWeight: 500,
    width: "100%",
  },
  personImg: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    width: "20%",
  },
  iconColor: {
    border: "3px solid #ddd",
    borderRadius: 50,
    color: "#136deb",
    fontSize: "3.5rem !important",
    padding: 5,
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
  imgIcon: {
    width: '100%',
  },
  addForm: {
    padding: '0 2rem',
  },
  addUser: {
    alignItems: 'center',
    backgroundColor: "#1661CD !important",
    color: "#fff !important",
    display: 'flex',
    float: "right",
    marginTop: '0.7rem',
    padding: '0.6rem 1rem !important',
    textTransform: 'capitalize !important',
    width: '150px',
    zIndex: 1,
  },
  addUserButton: {
    "& .MuiButtonBase-root.Mui-disabled": {
      cursor: "not-allowed !important",
      pointerEvents: "auto !important",
      backgroundColor: "rgba(0, 0, 0, 0.12) !important",
    },
  },
  addIcon: {
    transform: "rotate(135deg)",
    fontSize: "20px",
    margin: "0 5px 0 0",
  },
  closeIcon: {
    fontSize: "30px",
    fill: "#000",
    position: "absolute",
    top: "5px",
    right: "0",
    cursor: "pointer",
  },
  fieldContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    width: "100%",
    padding: "2rem 0",
  },
  userName: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-start',
    "& a": {
      textDecoration: "none",
    },
  },
  field: {
    width: "48%",
    margin: "0 0 1rem",
  },
  userEnabledStatus: {
    alignItems: 'center',
    borderRadius: '25px',
    display: 'flex',
    height: 36,
    backgroundColor: '#F2F7FE',
    justifyContent: 'center',
    padding: '2px 5px',
    textAlign: 'center',
    width: 100,
  },
  userSuspendStatus: {
    alignItems: 'center',
    borderRadius: '25px',
    display: 'flex',
    height: 36,
    backgroundColor: '#FEF5F4',
    justifyContent: 'center',
    padding: '2px 5px',
    textAlign: 'center',
    width: 100,
  },
  fields: {
    maxWidth: "161px",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    height: "60vh",
  },
  loginLoader: {
    color: "black !important"
  },
  enabled: {
    color: '#0667EB',
  },
  suspended: {
    color: '#E6492D',
  },
  btnCont: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    margin: "2rem 0",
  },
  inviteBtn: {
    display: "block",
    margin: "1rem auto 0",
    width: "150px",
    backgroundColor: "#0667EB !important",
    color: "#fff !important",
    textTransform: "capitalize !important",
  },
  reason: {
    padding: '0 2rem 2rem'
  },
  charTitle: {
    color: '#3e3f42',
    fontSize: 30,
    fontWeight: 400,
    margin: "0 0 1rem",
  },
  fieldContainerL: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: 'wrap',
    width: "100%",
    padding: '2rem 0',
  },
  fieldL: {
    width: '100%',
    margin: '0 0 1rem',
  },
  reqBtn: {
    display: 'block',
    margin: '1rem auto 0',
    width: '150px',
    backgroundColor: '#0667EB !important',
    color: '#fff !important',
    textTransform: 'capitalize !important',
  },
}));