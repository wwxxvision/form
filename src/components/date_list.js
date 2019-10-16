import React from 'react';
import { Input } from '@material-ui/core';

export default (props) => (
    <React.Fragment>
        <p className="form_label">{props.label}</p>
        <Input
            onChange={props.changeValue}
            name={props.name}
            type="date"
            value={props.valueInput}
            required={props.required ? true : false}
            className='full_width input_margin'
        />
    </React.Fragment>
)