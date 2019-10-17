import React from 'react';
import api from '../api';
import clone from 'clone';
import { file } from '@babel/types';
class AddItem extends React.Component {
  addingItem = () => {
    let addStateToRedux = { ...this.props.apiPage };
    let newItem = clone(this.props.newPath);
    let depthClone = clone(api.clearObject);
    depthClone[newItem].duplicate = true;
    api.clearObject.splice(this.props.newPath + 1, 0, depthClone[newItem])
    addStateToRedux.data.splice(this.props.newPath + 1, 0, depthClone[newItem]);
    this.props.setRedux({
      addStateToRedux
    });
  }
  render() {
    return (
      <div onClick={this.addingItem} className="button next_button button_add" variant="contained">
        Добавить
    </div>
    )
  }
}
export default api.connect(AddItem);