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
  balanceSummary: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    padding: '2rem 0',
    borderTop: '5px solid #dddddd2e',
    borderBottom: '5px solid #dddddd2e',
  },
  boxItem: {
    border: '1px solid #e1e1e1',
    borderRadius: 3,
    padding: '2rem',
    width: "49%",
  },
  head: {
    fontSize: 20,
    color: "#a9abb0",
    margin: '0 0 1rem',
  },
  balItem: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    "& h4": {
      fontWeight: "500",
    },
  },
  left: {
    margin: '0',
    padding: "0.5rem 0",
    width: "50%",
  },
  right: {
    margin: '0',
    padding: "0.5rem 0",
    width: "50%",
    textAlign: 'right',
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
  },
  transactionHistory: {
    padding: '2rem 0',
    width: '100%',
  },
  status: {
    background: '#f3f8fe',
    padding: '2px 10px',
    borderRadius: '30px',
  },
  success: {
    color: '#0000FF',
  },
  pending: {
    color: '#FFFF00',
  },
  reject: {
    color: '#FF0000',
  },
}));