import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    formGroup: {
        margin: '0 0 1rem'
    },
    inputLabel: {
        color: '#9ea0a5',
        display: 'block',
        padding: '0',
        fontSize: 14,
        width: '100%',
        margin: '0 0 0.5rem'
    },
    inputField: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: '#fff',
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 12px',
        width: '100%',
        '&:focus': {
            borderColor: '#80bdff',
            outline: 0,
            boxShadow: '0 0 0 0.2rem rgba(0, 123, 255, 0.25)',
        },
    },
    dropDownInputField: {
        borderRadius: 6,
        position: 'relative',
        backgroundColor: '#fff',
        border: '1px solid #ced4da',
        fontSize: 16,
        width: '100%',
        textTransform: "capitalize",
        '&:focus': {
            borderColor: '#80bdff',
            outline: 0,
            boxShadow: '0 0 0 0.2rem rgba(0, 123, 255, 0.25)',
        },
        "& option": {
            textTransform: "capitalize",
        }
    },
    customBtn: {
        backgroundColor: '#000',
        color: '#fff',
        textTransform: 'capitalize',
    }
}));
