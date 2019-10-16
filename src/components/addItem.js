import React from 'react';
import api from '../api';
import clone from 'clone';
class AddItem extends React.Component {
  constructor(props) {
    super(props);
  }
  addingItem = () => {
    let addStateToRedux = {...this.props.apiPage};
    let cloneObj = clone(api.clearObject);
    cloneObj.data[this.props.newPath].duplicate = true;
    addStateToRedux.data.splice(this.props.newPath, 0 ,cloneObj.data[this.props.newPath]);
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