import { makeStyles } from "@material-ui/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";

export default makeStyles(theme => ({
  logotype: {
    width: "190px",
    marginLeft: theme.spacing(2.5),
    marginRight: theme.spacing(2.5),

    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  logoIcon: {
    width: "6rem",
  },
  appBar: {
    width: "100vw",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  toolbar: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  grow: {
    flexGrow: 1,
  },
  search: {
    position: "relative",
    borderRadius: 25,
    paddingLeft: theme.spacing(2.5),
    width: 36,
    backgroundColor: fade(theme.palette.common.black, 0),
    transition: theme.transitions.create(["background-color", "width"]),
    "&:hover": {
      cursor: "pointer",
      backgroundColor: fade(theme.palette.common.black, 0.08),
    },
  },
  searchFocused: {
    backgroundColor: fade(theme.palette.common.black, 0.08),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 250,
    },
  },
  searchIcon: {
    width: 36,
    right: 0,
    height: "100%",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: theme.transitions.create("right"),
    "&:hover": {
      cursor: "pointer",
    },
  },
  searchIconOpened: {
    right: theme.spacing(1.25),
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    height: 36,
    padding: 0,
    paddingRight: 36 + theme.spacing(1.25),
    width: "100%",
  },
  messageContent: {
    display: "flex",
    flexDirection: "column",
  },
  headerMenu: {
    marginTop: theme.spacing(7),
    "& .MuiMenu-list": {
      background: "transparent !important",
      "& li": {
        height: "72px",
        "&:not(:last-child)": {
          marginBottom: "10px !important",
        },
      },
    },
    "& .MuiPaper-root": {
      background: "transparent !important",
    },
    "& .MuiListItem-root": {
      background: "#fff",
      boxShadow: "0px 3px 11px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A",
    },
    "& .MuiList-root": {
      padding: "0px !important",
    },
    "&  .MuiTypography-root": {
      "& p": {
        fontSize: "12px",
      },
    },
  },
  headerMenuList: {
    display: "flex",
    flexDirection: "column",
  },
  headerMenuItem: {
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.main,
      color: "white",
    },
  },
  headerMenuButton: {
    marginLeft: theme.spacing(2),
    padding: theme.spacing(0.5),
  },
  headerMenuFlagButton: {
    marginLeft: theme.spacing(2),
    padding: theme.spacing(0.5),
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  headerMenuButtonCollapse: {
    marginRight: theme.spacing(2),
  },
  headerIcon: {
    fontSize: 28,
    color: "#9ea0a5",
  },
  headerFlagIcon: {
    fontSize: 20,
    color: "#9ea0a5",
    marginRight: "0.5rem",
  },
  headerIconCollapse: {
    color: "#9ea0a5",
  },
  profileMenu: {
    maxWidth: 222,
    top: "0px !important",
    position: "relative",
    overflowX: "inherit !important",
    overflowY: "inherit !important",
    "& .MuiMenu-list": {
      background: "#fff !important",
    },
    "& .MuiList-padding": {
      padding: "0px 0px !important",
      border: "1px solid rgb(206 206 206 / 38%) !important",
      borderRadius: "5px",
    },
    "& img": {
      position: "absolute",
      width: "16px",
      height: "8px",
      left: "50%",
      marginLeft: "-27px",
      top: "-8px",
      zIndex: "99999999",
    },
  },
  AccountBtn: {
    color: "#9EA0A5",
    textDecoration: "none !important",
    "&:hover": {
      color: "#9EA0A5",
    },
  },
  hrBorder: {
    borderBottom: "1px solid #E4E4E4",
    display: "block",
    width: "100%",
  },
  Logout: {
    padding: "16px 16px",
    color: "#E6492D",
  },
  profile: {
    height: "30px",
    width: "30px",
    borderRadius: "50px",
  },
  profileMenuUser: {
    display: "flex",
    flexDirection: "column",
    padding: "16px 16px",
    "&:focus": {
      outline: "none",
    },
  },
  profileMenuItem: {
    color: theme.palette.text.hint,
  },
  profileMenuIcon: {
    marginRight: theme.spacing(2),
    color: theme.palette.text.hint,
  },
  profileMenuLink: {
    fontSize: 16,
    textDecoration: "none",
    "&:hover": {
      cursor: "pointer",
    },
  },
  messageNotification: {
    height: "auto",
    display: "flex",
    alignItems: "center",
    "&:hover, &:focus": {
      backgroundColor: theme.palette.background.light,
    },
  },
  messageNotificationSide: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginRight: theme.spacing(2),
  },
  messageNotificationBodySide: {
    alignItems: "flex-start",
    marginRight: 0,
  },
  sendMessageButton: {
    margin: theme.spacing(4),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    textTransform: "none",
  },
  sendButtonIcon: {
    marginLeft: theme.spacing(2),
  },
}));