import React from 'react';
import { Input } from '@material-ui/core';
import api from '../api';

export default (props) => (
    <React.Fragment>
        <p className={`form_label ${api.validation(props.valueInput || props.value, props.isError)}`}>{props.label}</p>
        <Input
            onChange={props.changeValue}
            name={props.name} type="date"
            value={props.valueInput}
            required={props.required ? true : false}
            className={`full_width input_margin ${api.validation(props.valueInput || props.value, props.isError)}`}
        />
    </React.Fragment>
)