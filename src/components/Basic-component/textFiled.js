import React from "react";
import useStyles from "./styles";
import { FormGroup, Label, Input } from 'reactstrap';

const TextFiledComponent = props => {
  var classes = useStyles();
  const { type, name, value, readOnly, onChange, label, placeholder, multiline, rows, min, rowsMax, autoFocus } = props;
  return (
    <FormGroup fullWidth className={classes.formGroup} >
      <Label for="exampleEmail" className={classes.inputLabel}>{label}</Label>
      <Input autoFocus={autoFocus} readOnly={readOnly} value={value} min={min} multiline={multiline} type={type} onChange={onChange} name={name} id="exampleEmail" placeholder={placeholder} rows={rows} rowsMax={rowsMax} fullWidth className={classes.inputField} />
    </FormGroup>
  );
};

export default TextFiledComponent;
