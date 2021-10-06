import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    customBox: {
        backgroundColor: "#fff",
        boxShadow: "0px 3px 11px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A",
        padding: 24,
        borederRadius: 3,
    },
    mt: {
        backgroundColor: "#fff",
        boxShadow: "0px 3px 11px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A",
        margin: "1.5rem 0 0",
        padding: 24,
        borederRadius: 3,
    },
    dashBox: {
        margin: "-1rem 0 0",
        padding: "0",
    },
    header: {
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
        position: "absolute",
        right: "24px",
        top: "23px",
        width: "100%",
        "@media (min-width: 1680px)": {
            top: "24px",
        },
    },
    profitLossHeader: {
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
        position: "relative",
        right: "7px",
        top: "7px",
        width: "100%",
    },
    dflex: {
        display: "flex",
    },
    chartLoaderDiv: {
        height: 350,
        textAlign: "center"
    },
    chartLoader: {
        color: "black !important",
    },
    title: {
        color: "#9ea0a5",
        fontSize: '16px',
        margin: 0,
    },
    apy: {
        color: "#38b249",
        fontSize: '14px',
        textAlign: "center",
        "@media (min-width: 1680px)": {
            fontSize: "18px",
        },
    },
    content: {
        display: "flex",
        flexWrap: "Wrap",
        justifyContent: "space-between",
        width: "100%",
    },
    mainVal: {
        color: "#3e3f42",
        fontSize: "24px",
        fontWeight: 500,
        margin: 0,
        "@media (min-width: 1680px)": {
            fontSize: "36px",
        },
    },
    footer: {
        display: "flex",
        justifyContent: "space-between",
        margin: "1rem 0 0",
        width: "100%",
    },
    leftSide: {
        display: "flex",
        justifyContent: "flex-start",
        flexWrap: "wrap",
        width: "45%",
    },
    vl: {
        backgroundColor: "#ddd",
        display: "block",
        height: "60px",
        margin: "0 7px",
        width: "1px",
    },
    rightSide: {
        display: "flex",
        justifyContent: "flex-start",
        flexWrap: "wrap",
        width: "45%",
    },
    property: {
        color: "#9ea0a5",
        fontSize: "12px",
        margin: 0,
        width: "100%",
        "@media (min-width: 1680px)": {
            fontSize: "18px",
        },
    },
    value: {
        color: "#3e3f42",
        fontSize: "14px",
        width: "100%",
        "@media (min-width: 1680px)": {
            fontSize: "18px",
        },
    },
    percentVal: {
        color: "#38b249",
        fontSize: "12px",
        width: "100%",
    },
    dateTime: {
        display: "flex",
        justifyContent: "flex-end",
        width: "50%"
    },
    dtItem: {
        color: "#b0b2b6",
        fontSize: "14px",
        border: "none",
        backgroundColor: "transparent",
        borderRadius: "2px !important",
        "&:focus": {
            backgroundColor: "#0667EB",
            outline: "none",
        },
    },
    activeDtItem: {
        backgroundColor: "#3683ef",
        color: "white",
        fontSize: "14px",
        border: "none",
        borderRadius: "2px !important",
        "&:focus": {
            outline: "none",
        },
    },
    proList: {
        display: "flex",
        justifyContent: "space-between",
        margin: "5px 0 0",
        width: "100%",
    },
    pro: {
        color: "#3e3f42",
        fontSize: "14px",
        width: "50%",
    },
    val: {
        color: "#3e3f42",
        fontSize: "14px",
        textAlign: "right",
        width: "50%",
    },
    btnClassess: {
        backgroundColor: "green",
        width: "60px",
        color: "white",
        marginTop: "40px",
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    card: {
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
    },
    visitsNumberContainer: {
        display: "flex",
        alignItems: "center",
        flexGrow: 1,
        paddingBottom: theme.spacing(1),
    },
    progressSection: {
        marginBottom: theme.spacing(1),
    },
    progressTitle: {
        marginBottom: theme.spacing(2),
    },
    progress: {
        marginBottom: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    pieChartLegendWrapper: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-end",
        marginRight: theme.spacing(1),
    },
    legendItemContainer: {
        display: "flex",
        alignItems: "center",
        marginBottom: theme.spacing(1),
    },
    fullHeightBody: {
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
        justifyContent: "space-between",
    },
    tableWidget: {
        overflowX: "auto",
    },
    progressBar: {
        backgroundColor: theme.palette.warning.main,
    },
    performanceLegendWrapper: {
        display: "flex",
        flexGrow: 1,
        alignItems: "center",
        marginBottom: theme.spacing(1),
    },
    legendElement: {
        display: "flex",
        alignItems: "center",
        marginRight: theme.spacing(2),
    },
    legendElementText: {
        marginLeft: theme.spacing(1),
    },
    serverOverviewElement: {
        display: "flex",
        alignItems: "center",
        maxWidth: "100%",
    },
    serverOverviewElementText: {
        minWidth: 145,
        paddingRight: theme.spacing(2),
    },
    serverOverviewElementChartWrapper: {
        width: "100%",
    },
    mainChartBody: {
        overflowX: "auto",
    },
    mainChartHeader: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        [theme.breakpoints.only("xs")]: {
            flexWrap: "wrap",
        },
    },
    mainChartHeaderLabels: {
        display: "flex",
        alignItems: "center",
        [theme.breakpoints.only("xs")]: {
            order: 3,
            width: "100%",
            justifyContent: "center",
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(2),
        },
    },
    mainChartHeaderLabel: {
        display: "flex",
        alignItems: "center",
        marginLeft: theme.spacing(3),
    },
    mainChartSelectRoot: {
        borderColor: theme.palette.text.hint + "80 !important",
    },
    mainChartSelect: {
        padding: 10,
        paddingRight: 25,
    },
    mainChartLegentElement: {
        fontSize: "18px !important",
        marginLeft: theme.spacing(1),
    },
}));