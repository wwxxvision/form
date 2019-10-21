import React from 'react';
import { Input } from '@material-ui/core';
export default (props) => (
  <React.Fragment>
    <p className="form_label">{props.label}</p>
    {props.isError && props.typeError && 
      props.typeError.map((type, index) => {
        if (type.uid === props.uid) {
          return (
              <span key={index} className="error_message">{type.error}</span>         
          )
        }
        return false;
      })
    }
    <Input onChange={props.changeValue}
      readOnly={props.name === 'cost' || props.name === 'name' ? true : false}
      name={props.name} type={"text"}
      value={props.name !== 'cost' && props.name !== 'name' && props.name !== 'model' ? props.valueInput : props.value}
      required={props.required ? true : false}
      onFocus={props.focusCount}
      className="full_width input_margin"
    />
    {props.validation && props.required &&
      <span className="error_message">Это поле обязательно для заполения</span>
    }
  </React.Fragment>
)