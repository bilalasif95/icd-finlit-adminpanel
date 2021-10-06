import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  title: {
    fontSize: 30,
    fontWeight: 500,
    color: "#9EA0A5",
    margin: "-24px 0 2rem",
  },
  feeMgt: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  mgtCol: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    width: "49%",
    minHeight: "100%",
  },
  mgtBox: {
    backgroundColor: '#fbfbfd',
    border: "1px solid #e1e1e1",
    borderRadius: 3,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    padding: "1rem",
    margin: "0 0 1.7rem",
    height: "47.7%",
  },
  mgtBoxL: {
    backgroundColor: '#fbfbfd',
    border: "1px solid #e1e1e1",
    borderRadius: 3,
    padding: "1rem",
    margin: "0 0 1.5rem",
    height: "100%",
  },
  heading: {
    color: "#3e3f42",
    fontSize: 24,
    width: "100%",
    fontWeight: 700,
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    width: "100%",
  },
  fieldCont: {
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: "1rem 0",
    width: "100%",
    "& .MuiButtonBase-root.Mui-disabled": {
      cursor: "not-allowed !important",
      pointerEvents: "auto !important",
    },
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
    width: "80%",
  },
  editBtn: {
    color: "#0667EB",
    border: "none",
    boxShadow: "none !important",
    width: "15%",
    textTransform: 'capitalize',
    fontWeight: 400,
    "&:hover": {
      backgroundColor: "transparent",
    },
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
  fieldContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: 'wrap',
    width: "100%",
    padding: '2rem 0',
  },
  field: {
    width: '100%',
    margin: '0 0 1rem',
  },
  reqBtn: {
    display: 'block',
    margin: '1rem auto 0',
    width: '150px',
    backgroundColor: '#0667EB !important',
    color: '#fff',
    textTransform: 'capitalize',
  },
  btnCont: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    margin: "2rem 0",
  },
  loginLoader: {
    marginLeft: theme.spacing(4),
    color: "black"
  },
  closeIcon: {
    fontSize: "30px",
    fill: "#000",
    position: 'absolute',
    top: '5px',
    right: '0',
    cursor: 'pointer',
  },
}));