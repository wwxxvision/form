import React from 'react';
import api from '../api';


class DeleteItem extends React.Component {
  constructor(props) {
    super(props);
  }
  removeElementAds = () => {
    let deleteStateToRedux = {...this.props.addStateToRedux};
    deleteStateToRedux.data.splice(this.props.newPath, 1);
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