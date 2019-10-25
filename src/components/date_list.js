import React from 'react';
import { Input } from '@material-ui/core';
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
    <Input
      onChange={props.changeValue}
      name={props.name}
      type="date"
      value={props.value}
      required={props.required ? true : false}
      className="full_width input_margin"
    />
  </React.Fragment>
)