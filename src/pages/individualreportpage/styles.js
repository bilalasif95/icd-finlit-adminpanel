import { makeStyles } from "@material-ui/styles";

export default makeStyles(() => ({
  title: {
    fontSize: 30,
    fontWeight: 400,
    margin: "-24px 0 2rem",
    color: "#9EA0A5",
  },
  custInfo: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: 'wrap',
    width: "100%",
  },
  balanceList: {
    width: "100%",
  },
  balItem: {
    display: "flex",
    alignItems: "center",
    justiifyContent: "space-between",
    "& h4": {
      fontWeight: "500",
    },
  },
  baLabel: {
    color: "#000",
    margin: '0',
    padding: "0.5rem 0",
    width: "70%",
  },
  userName: {
    alignItems: "center",
    display: "flex",
    justifyContent: "flex-start",
    "& a": {
      textDecoration: "none",
    },
  },
  userImg: {
    alignItems: "center",
    display: "flex",
    height: 35,
    justifyContent: "flex-start",
    marginRight: "0.5rem",
    overflow: "hidden",
    width: 35,
    borderRadius: "50%",
  },
  bal: {
    fontSize: 14,
    fontWeight: 500,
    margin: '0',
    display: "flex",
    width: "30%",
  },
  inForm: {
    display: "flex",
    justifyContent: "flex-start",
    width: "100%",
  },
  fieldContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "60%",
  },
  heading: {
    color: "#000",
    fontSize: 24,
    fontWeight: 600,
    width: "100%",
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    width: "100%",
    padding: '0 0 2rem',
  },
  fieldCont: {
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: "1rem 0",
    width: "48%",
  },
  label: {
    color: "#a9abb0",
    padding: "0.5rem 0",
    width: "100%",
  },
  showRes: {
    backgroundColor: "#eaedf3",
    borderRadius: 3,
    color: "#000",
    padding: "0.7rem 1rem",
    width: '100%',
    height: "42px",
  },
  res: {
    border: "1px solid #eaedf3",
    borderRadius: 3,
    color: "#000",
    padding: "0.7rem 1rem",
    width: '100%',
    minHeight: "42px",
  },
  charTitle: {
    fontSize: 30,
    fontWeight: 400,
    margin: "0 0 1rem",
  },
  charity: {
    borderTop: '5px solid #dddddd2e',
    padding: '2rem 0'
  },
  charityInfo: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "60%",
  },
  charItem: {
    padding: "0",
    margin: '0 0 1rem',
    width: "48%",
  },
  profileItem: {
    width: "48%",
  },
  charSubItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0",
    margin: '0 0 1rem',
    width: "100%",
  },
  photo: {
    width: '100%',
  },
  imgIcon: {
    width: '100%',
  },
  userEnabledStatus: {
    alignItems: "center",
    borderRadius: "25px",
    display: "flex",
    height: 36,
    backgroundColor: "#F2F7FE",
    justifyContent: "center",
    padding: "2px 5px",
    textAlign: "center",
    width: 100,
  },
  userSuspendStatus: {
    alignItems: "center",
    borderRadius: "25px",
    display: "flex",
    height: 36,
    backgroundColor: "#FEF5F4",
    justifyContent: "center",
    padding: "2px 5px",
    textAlign: "center",
    width: 100,
  },
  enabled: {
    color: "#0667EB",
  },
  suspended: {
    color: "#E6492D",
  },
  imgCoverIcon: {
    width: '100%',
    height: '90px',
    maxWidth: 90,
  }
}));