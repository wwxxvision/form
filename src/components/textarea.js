import React from 'react';
import TextField from '@material-ui/core/TextField';

export default (props) => (
  <React.Fragment>
    <p className="form_label">{props.label}</p>
    <TextField
      onChange={props.changeValue}
      required={props.required ? true : false}
      value={props.valueInput}
      className="full_width input_margin"
      multiline={true} />
  </React.Fragment>
);