import React from 'react';
import api from '../api';
class DeleteItem extends React.Component {
  removeElementAds = () => {
    let deleteStateToRedux = { ...this.props.addStateToRedux };
    let willRemoveInd;
    const getLayer = (value) => {
      for (let i = 0; i < this.props.path.length; i++) {
        if (value.data[this.props.path[i]].data.type !== 'hidden') {
          value = value.data[this.props.path[i]];
          willRemoveInd = this.props.path[i];
        }
      }
      return value;
    }
    const getLayersGroups = (value) => {
      for (let i = 0; i < this.props.path.length - 1; i++) {
        console.log(value)
        if (value.data[this.props.path[i]].data.type !== 'hidden') {
          value = value.data[this.props.path[i]];
        }
      }
      return value;
    }
    if (this.props.subGroup) {
      api.setTotal(deleteStateToRedux, this.props.path,'delete', getLayersGroups(deleteStateToRedux).data[willRemoveInd]);
    }
    getLayer(deleteStateToRedux);
    getLayersGroups(deleteStateToRedux).data.splice(willRemoveInd, 1);
    this.props.setRedux({
      deleteStateToRedux
    });
  }
  render() {
    return (
      <div onClick={this.removeElementAds} className="button next_button button_add button_delete_margin_left" variant="contained">
      </div>
    )
  }
}
export default api.connect(DeleteItem);