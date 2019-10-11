import React from 'react';
import Select from '@material-ui/core/Select';
import api from '../api';
import MenuItem from '@material-ui/core/MenuItem';

export default (props) => (
  // className={api.setClasses(['full_width', 'select'], { hidden: props.options })}
  <div className={api.setClasses(['full_width', 'select'], { hidden: !props.options })}>
    <p className="form_label">{props.label}</p>
    <Select
      onChange={props.changeValue}
      className="full_width"
      value={props.valueInput}
      required={props.required ? true : false}
    >
      {Object.entries(props.options).map((item, index) => {
        console.log(item)
        return (
          <MenuItem
            key={index}
            value={item[1]}
          >{item[1]}</MenuItem>
        )
      })}
    </Select>
  </div >
)