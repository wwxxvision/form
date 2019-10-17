import React from 'react';
import { Input } from '@material-ui/core';
import api from '../api';
export default (props) => (
    <React.Fragment>
        <p className={`form_label ${api.validation(props.valueInput || props.value, props.isError)}`}>{props.label}</p>
        <Input onChange={props.changeValue}
            readOnly={props.name === 'cost' || props.name === 'name' ? true : false}
            name={props.name} type={"text"}
            value={props.name !== 'cost' && props.name !== 'name' ? props.valueInput : props.value}
            required={props.required ? true : false}
            onFocus={props.focusCount}
            className={`full_width input_margin ${api.validation(props.valueInput || props.value, props.isError)}`}
        />
        {props.validation && props.required &&
            <span className="error_message">Это поле обязательно для заполения</span>
        }
    </React.Fragment>
)