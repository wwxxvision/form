import React from 'react';
import TextField from '@material-ui/core/TextField';
export default (props) => (
  <React.Fragment>
    <p className="form_label"></p>
    {props.isError && props.typeError  && 
      props.typeError.map((type, index) => {
        if (type.uid === props.uid) {
          return (
            <span key={index} className="error_message">{type.error}</span>
          )
        }
        return false;
      })
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