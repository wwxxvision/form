import React from 'react';
import Select from '@material-ui/core/Select';
import api from '../api';
import MenuItem from '@material-ui/core/MenuItem';

export default (props) => (
  // className={api.setClasses(['full_width', 'select'], { hidden: props.options })}
  <div className={api.setClasses(['full_width', 'select'], { hidden: props.options == false })}>
    <p className="form_label">{props.label}</p>
    {props.isError && props.typeError && !props.value &&
     <span  className="error_message">Заполните поле Правильно</span>      
    }
    <Select
      onChange={props.changeValue}
      className="full_width"
      value={!props.valueInput ? props.value : props.valueInput}
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