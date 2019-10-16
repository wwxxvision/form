import React from 'react';
import api from '../api';
import clone from 'clone';
class DeleteItem extends React.Component {
  removeElementAds = () => {
    let deleteStateToRedux = {...this.props.addStateToRedux};
    // let filterArray = deleteStateToRedux.data.filter((item, ind) => ind !== this.props.newPath);
    // this.props.setRedux({
    //   filterArray
    // });
    // ONLY FOR TEST 
    delete deleteStateToRedux.data[this.props.newPath];
    this.props.setRedux({
      deleteStateToRedux
    });
  }
  render() {
    return (
      <div onClick={this.removeElementAds} className="button next_button button_add button_delete_margin_left" variant="contained">
        Удалить
    </div>
    )
  }
}
export default api.connect(DeleteItem);