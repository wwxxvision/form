import React from 'react';
import Select from '@material-ui/core/Select';
import api from '../api';
import MenuItem from '@material-ui/core/MenuItem';

export default (props) => (
  // className={api.setClasses(['full_width', 'select'], { hidden: props.options })}
  <div className={api.setClasses(['full_width', 'select'], { hidden: props.options == false , error: props.validation && props.required })}>
    <p className={`form_label ${api.validation(props.valueInput || props.value, props.isError)}`}>{props.label}</p>
    <Select
      onChange={props.changeValue}
      className={`full_width ${api.validation(props.valueInput || props.value, props.isError)}`}
      value={props.valueInput || props.value}
      required={props.required ? true : false}
    >
      {Object.entries(props.options).map((item, index) => {
        return (
          <MenuItem
            key={index}
            value={item[0]}
          >{item[1]}</MenuItem>
      )})}
    </Select>
  </div >
)