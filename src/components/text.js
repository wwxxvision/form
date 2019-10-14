import React from 'react';
import HelpList from '../Page/helpList';
import { Input } from '@material-ui/core';

export default (props) => (
    <React.Fragment>
        <p className="form_label">{props.label}</p>
        <Input onChange={props.changeValue}
            readOnly={props.name === 'cost' || props.name === 'name' ? true : false}
            name={props.name} type={"text"}
            value={props.name !== 'cost' && props.name !== 'name' ? props.valueInput : props.value}
            required={props.required ? true : false}
            className="full_width input_margin"
        />
        {props.name === 'model' && props.helpList &&
            <div className="help_list">
                {props.helpList.map((item, index) => {
                    return (<HelpList addItem={props.addModel} value={item} key={index} indexEl={index} />)
                })}
            </div>
        }
    </React.Fragment>
)