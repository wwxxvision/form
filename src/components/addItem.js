import React from 'react';
import api from '../api';

class AddItem extends React.Component {
  constructor(props) {
    super(props);
  }
  addingItem = () => {
    let addStateToRedux = { ...this.props.dataApi };
    addStateToRedux.data.splice(this.props.newPath, 0, addStateToRedux.data[this.props.newPath]);
    addStateToRedux.data[this.props.newPath + 1].duplicate = true;
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