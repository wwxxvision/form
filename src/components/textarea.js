import React from 'react';
import TextField from '@material-ui/core/TextField';
export default (props) => (
  <React.Fragment>
    <p className="form_label"></p>
    {props.isError && props.typeError && !props.value &&
      <span  className="error_message">Заполните поле Правильно</span>      
    }
    <TextField
      onChange={props.changeValue}
      required={props.required ? true : false}
      value={props.value}
      rows={5}
      variant="filled"
      className="full_width input_margin"
      multiline={true} />
  </React.Fragment>
);