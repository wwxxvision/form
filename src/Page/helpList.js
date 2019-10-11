import React from 'react';
import api from '../api';

function HelpList(props) {
  const adsItem = () => {
    props.addItem(props.value)
  }
  return (
    <div onClick={adsItem} className="model_name">
      {props.value.model}
    </div>
  )
}
export default api.connect(HelpList);
