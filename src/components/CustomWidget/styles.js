import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    widgetWrapper: {
        display: "flex",
        position: "relative",
        marginTop: "10px",
    },
    widgetHeader: {
        padding: theme.spacing(3),
        paddingBottom: theme.spacing(0),
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        "& h6": {
            fontSize: "14px",
        },
    },
    widgetRoot: {
        boxShadow: theme.customShadows.widget,
    },
    widgetBody: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        paddingRight: theme.spacing(3),
        paddingLeft: theme.spacing(3),
        position: "unset !important",
    },
    noPadding: {
        padding: 0,
    },
    paper: {
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        overflow: "hidden",
    },
    moreButton: {
        margin: -theme.spacing(1),
        padding: 0,
        width: 40,
        height: 40,
        color: theme.palette.text.hint,
        "&:hover": {
            backgroundColor: theme.palette.primary.main,
            color: "rgba(255, 255, 255, 0.35)",
        },
    },
}));