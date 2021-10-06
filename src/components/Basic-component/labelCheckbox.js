import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function CheckboxLabels(props) {
    const useStyles = makeStyles((theme) => ({
        root: {
            padding: "0 9px"
        },
    }));
    const { name, checked, onChange, label } = props;
    const classes = useStyles();
    return (
        <FormGroup row>
            <FormControlLabel
                control={<Checkbox checked={checked} onChange={onChange} name={name} classes={{
                    root: classes.root,
                }} />}
                label={label}
            />
        </FormGroup>
    );
}
