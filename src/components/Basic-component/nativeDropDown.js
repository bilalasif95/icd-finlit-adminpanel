import * as React from 'react';
import useStyles from "./styles";
import { FormGroup, Label, Input } from 'reactstrap';

export default function NativeSelectDemo(props) {
    var classes = useStyles();
    const { data, label, onChange } = props;
    return (
        <FormGroup fullWidth>
            <Label for="exampleSelect" className={classes.inputLabel}>{label}</Label>
            <Input onChange={onChange} type="select" name="select" id="exampleSelect" className={classes.dropDownInputField}>
                {data.map((info, index) => (
                    <option value={info.value} key={index}>
                        {info.name}
                    </option>
                ))}
            </Input>
        </FormGroup>
    );
}
