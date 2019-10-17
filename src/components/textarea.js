import React from 'react';
import TextField from '@material-ui/core/TextField';

export default (props) => (
  <React.Fragment>
    <p className={`form_label ${api.validation(props.valueInput || props.value, props.isError)}`}>{props.label}</p>
    <TextField
      onChange={props.changeValue}
      required={props.required ? true : false}
      value={props.valueInput}
      rows={5}
      variant="filled"
      className={`full_width input_margin ${api.validation(props.valueInput || props.value, props.isError)}`}
      multiline={true} />
  </React.Fragment>
);