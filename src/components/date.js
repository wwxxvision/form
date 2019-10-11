import React from 'react';
import { Input } from '@material-ui/core';
import api from '../api';

export default (props) => (
    <React.Fragment>
        <p className="form_label">{props.label}</p>
        <Input
            onChange={props.changeValue}
            name={props.name} type="date"
            required={props.required ? true : false}
            className={api.setClasses(['full_width', 'input_margin'])}
        />
    </React.Fragment>
)