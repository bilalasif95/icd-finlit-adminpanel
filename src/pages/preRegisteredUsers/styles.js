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
    justifyContent: "space-between",
    padding: "0 0 2rem",
    width: "100%",
  },
  root: {
    borderRadius: "23px",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 175,
    position: "relative",
    marginRight: "20px",
    "& .ArrowImg": {
      position: "absolute",
      top: "25%",
      right: "20px",
      zIndex: "1",
    },
    "& .MuiSvgIcon-root": {
      display: "none",
    },
    "& .MuiInputBase-root": {
      fontSize: "18px",
      color: "#3E3F42",
      "& .MuiSelect-root": {
        padding: "12px 20px !important",
      },
      "&:focus": {
        outline: "none",
        background: "#0667EB",
        color: "#fff",
      },
      "& .MuiSelect-nativeInput": {
        opacity: "inherit",
        top: "0",
        borderRadius: "23px",
        height: "45px",
        background: "#EAEDF3",
        border: "inherit",
        fontSize: "14px",
        padding: "0px 12px",
        color: "#3E3F42",
        "&::placeholder": {
          color: "#3E3F42",
        },
      },
    },
    "&:focus": {
      outline: "none",
    },
    "& .MuiSelect-select.MuiSelect-select": {
      padding: "0px !important",
      background: "transparent",
    },
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
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
  userName: {
    alignItems: "center",
    display: "flex",
    justifyContent: "flex-start",
    "& a": {
      textDecoration: "none",
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
  fields: {
    maxWidth: "161px",
    overflow: "hidden",
    textOverflow: "ellipsis",
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
  enabled: {
    color: "#0667EB",
  },
  suspended: {
    color: "#E6492D",
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
  imgIcon: {
    width: "100%",
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    height: "60vh",
  },
}));