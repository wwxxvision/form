import React from 'react';
import { Input } from '@material-ui/core';

export default (props) => (
  <React.Fragment>
    <p className="form_label">{props.label}</p>
    {props.isError && props.typeError && !props.value &&
      <span  className="error_message">Заполните поле Правильно</span>      
    }
    <Input
      onChange={props.changeValue}
      name={props.name} type="date"
      value={props.value}
      required={props.required ? true : false}
      className="full_width input_margin"
    />
  </React.Fragment>
)