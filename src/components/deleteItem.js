import React from 'react';
import api from '../api';
class DeleteItem extends React.Component {
  removeElementAds = () => {
    let deleteStateToRedux = {...this.props.addStateToRedux};
    delete deleteStateToRedux.data[this.props.newPath];
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