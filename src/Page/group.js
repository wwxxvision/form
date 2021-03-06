import React from 'react';
import Element from './element'
import api from '../api';

function Group(props) {
  return (
    <div className="form_groups wrapper full_width animate_group">
      <h2 className="title_group full_width">{props.data.title}</h2>
      {props.data.type !== 'hidden' &&
        props.data.data.map((item, index) => 
        <Element path={[...props.path, index]} key={index} indexEl={index}  keyGroup={props.indexGroup} data={item} />)
      }
    </div>
  )
}
export default api.connect(Group);
