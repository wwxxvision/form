import React from 'react';
import Select from '@material-ui/core/Select';
import api from '../api';
import MenuItem from '@material-ui/core/MenuItem';

export default (props) => (
  // className={api.setClasses(['full_width', 'select'], { hidden: props.options })}
  <div className={api.setClasses(['full_width', 'select'], { hidden: props.options == false })}>
    <p className="form_label"></p>
    {props.isError && props.typeError &&
      props.typeError.map((type, index) => {
        if (type.uid === `distributor_info_distributors_${props.indxGroup}` || !props.value) {
          return (
              <span key={index} className="error_message">{type.error}</span>         
          )
        }
        return false;
      })
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