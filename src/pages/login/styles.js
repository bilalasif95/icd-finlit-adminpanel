import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  container: {
    backgroundColor: "#fff",
    height: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
  },
  logotypeImage: {
    margin: "0 auto",
    display: "block",
    maxWidth: "10rem",
    width: "100%",
  },
  logotypeText: {
    color: "#9ea0a5",
    fontSize: 20,
    [theme.breakpoints.down("md")]: {
      fontSize: 48,
    },
  },
  formContainer: {
    width: "25%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      width: "70%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      padding: "0 1rem",
    },
  },
  tab: {
    fontWeight: 400,
    fontSize: 18,
  },
  greeting: {
    color: "#9ea0a5",
    display: "block",
    fontFamily: "Lato",
    fontSize: 20,
    textAlign: "center",
    margin: "2rem 0",
    width: "100%",
  },
  subGreeting: {
    fontWeight: 500,
    textAlign: "center",
    marginTop: theme.spacing(2),
  },
  errorMessage: {
    textAlign: "center",
    color: "red",
  },
  textFieldUnderline: {
    "&:before": {
      borderBottomColor: "#ddd",
    },
    "&:after": {
      borderBottomColor: "#ddd",
    },
    "&:hover:before": {
      borderBottomColor: "#ddd !important",
    },
  },
  textField: {
    margin: '0 !important',
    padding: "1rem",
    border: "1px solid #ddd",
    borderRadius: "3px",
  },
  formButtons: {
    width: "100%",
    marginTop: theme.spacing(4),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  submitBtn: {
    backgroundColor: "#0667EB",
    color: "#fff",
    width: "100%",
    '&:hover': {
      backgroundColor: "#0667EB",
      color: "#fff",
    }
  },
  passwordBoxes: {
    display: "flex",
    position: 'relative',
  },
  eyes: {
    marginLeft: "-2px",
    marginTop: "16px",
    marginBottom: "8px",
    width: "3rem",
    cursor: "pointer",
    padding: "10px",
    borderTop: "1px solid #ddd",
    borderBottom: "1px solid #ddd",
    borderRight: "1px solid #ddd",
    borderLeft: "none",
    borderTopRightRadius: "3px",
    borderBottomRightRadius: "3px",
    position: "absolute",
    right: "0",
    display: "flex",
    alignItems: "center",
    height: "3.3rem",
  },
  forgetButton: {
    textTransform: "none",
    fontWeight: 400,
    color: "#6ba4f3",
    float: "right",
    margin: "0 0 1rem",
  },
  loginLoader: {
    marginLeft: theme.spacing(4),
    color: "black"
  },
  copyright: {
    color: "#9ea0a5",
    marginTop: theme.spacing(4),
    whiteSpace: "nowrap",
    width: "100%",
    textAlign: "center",
    justifyContent: "center",
  },
}));