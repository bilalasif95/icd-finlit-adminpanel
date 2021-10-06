import { makeStyles } from "@material-ui/styles";

export default makeStyles(() => ({
  title: {
    fontSize: 30,
    fontWeight: 500,
    margin: "-24px 0 2rem",
    color: "#9EA0A5",
  },
  staffList: {
    display: "flex",
    justifyContent: "flex-start",
    padding: "0 0 2rem",
    width: "100%",
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
    }
  },
  userImg: {
    alignItems: "center",
    display: "flex",
    justifyContent: "flex-start",
  },
  imgIcon: {
    borderRadius: 25,
    height: "auto",
    margin: "0 10px 0 0",
    width: 50,
  }
}));