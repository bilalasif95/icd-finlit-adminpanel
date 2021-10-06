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
    display: "flex",
    justifyContent: "flex-start",
    width: "100%",
    padding: '0 0 2rem',
    borderBottom: '1px solid #ddd',
  },
  balItem: {
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    width: "20%",
    "& h4": {
      fontWeight: "500",
    },
  },
  baLabel: {
    color: "#a9abb0",
    margin: '0',
    padding: "0.5rem 0",
    width: "100%",
  },
  bal: {
    fontSize: 20,
    fontWeight: 500,
    margin: '0',
    width: "100%",
    display: "flex",
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
  toggle: {
    display: "flex",
    width: "48%",
    alignItems: "center",
    "& >div": {
      "&:first-child": {
        marginRight: "50px"
      }
    }
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
    minHeight: "42px",
    height: "auto",
  },
  res: {
    border: "1px solid #eaedf3",
    borderRadius: 3,
    color: "#000",
    padding: "0.7rem 1rem",
    width: '100%',
    minHeight: "42px",
    height: "auto",
  },
  descriptionRes: {
    border: "1px solid #eaedf3",
    borderRadius: 3,
    color: "#000",
    padding: "0.7rem 1rem",
    width: '100%',
    minHeight: "170px",
    height: "auto",
  },
  reason: {
    padding: "0 2rem 2rem",
  },
  reasonItem: {
    padding: "0",
    margin: "0 0 1rem",
    width: "100%",
  },
  closeIcon: {
    fontSize: "30px",
    fill: "#000",
    position: "absolute",
    top: "5px",
    right: "0",
    cursor: "pointer",
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
    width: '70%',
    cursor: "pointer"
  },
  imgIcon: {
    width: '100%',
    height: '90px',
    maxWidth: 90,
    borderRadius: "50%"
  },
  imgCoverIcon: {
    width: '100%',
    height: '90px',
    maxWidth: 90,
  }
}));