import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  link: {
    textDecoration: "none",
    "&:hover, &:focus": {
      backgroundColor: "#255f2b",
      textDecoration: "none",
    },
  },
  linkActive: {
    backgroundColor: "#255f2b",
  },
  linkNested: {
    paddingLeft: 0,
    "&:hover, &:focus": {
      backgroundColor: "#255f2b",
    },
  },
  linkIcon: {
    marginRight: theme.spacing(1),
    color: "#fff",
    transition: theme.transitions.create("color"),
    width: 24,
    minWidth: "38px !important",
    display: "flex",
    justifyContent: "center",
  },
  linkIconActive: {
    color: "#fff",
  },
  linkText: {
    padding: 0,
    color: "#fff",
    transition: theme.transitions.create(["opacity", "color"]),
    fontFamily:"Lato",
    fontSize: 14,
    "@media (min-width: 1680px)": {
      fontSize: "18px",
    },
  },
  linkTextActive: {
    color: "#fff",
  },
  linkTextHidden: {
    opacity: 0,
  },
  nestedList: {
    paddingLeft: theme.spacing(1) + 15,
  },
  sectionTitle: {
    fontSize: 12,
    marginLeft: theme.spacing(2.7),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    height: 1,
    backgroundColor: "#D8D8D880",
  },
}));