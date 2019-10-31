import React from 'react';
import api from '../api';
import { cloneDeep } from 'lodash';
class AddItem extends React.Component {
  addingItem = () => {
    let addStateToRedux = { ...this.props.dataApi };
    let curInd = 0;
    const getLayer = (value) => {
      for (let i = 0; i < this.props.path.length; i++) {
        if (value.data[this.props.path[i]].data.type !== 'hidden') {
          value = value.data[this.props.path[i]];
          curInd = i;
        }
      }
      return value;
    }
    const getLayersGroups = (value) => {
      for (let i = 0; i < this.props.path.length - 1; i++) {
        if (value.data[this.props.path[i]].data.type !== 'hidden') {
          value = value.data[this.props.path[i]];
          curInd = i;
        }
      }
      return value;
    }
    let clonObj = cloneDeep(api.pureObject(getLayer(addStateToRedux), this.props.subGroup, this.props.path));
      !this.props.subGroup ? cloneDeep(addStateToRedux.data.splice(this.props.index + 1, 0, clonObj)) : getLayersGroups(addStateToRedux).data.splice(curInd - 2, 0, clonObj);
    this.props.setRedux({
      addStateToRedux
    });
  }
  render() {
    return (
      <div onClick={this.addingItem} className="button next_button button_add" variant="contained">
      </div>
    )
  }
}
export default api.connect(AddItem);