import React from 'react';
import api from '../api';
import clone from 'clone';
class AddItem extends React.Component {
  addingItem = () => {
    let addStateToRedux = { ...this.props.apiPage };
    let newItem = clone(this.props.newPath);
    let depthClone = clone(api.clearObject);
    // console.log(api.clearObject)
    // depthClone[newItem].duplicate = true;
    // api.clearObject.splice(newItem + 1, 0, depthClone[newItem])
    // addStateToRedux.data.splice(newItem + 1, 0, depthClone[newItem]);
    // this.props.setRedux({
    //   addStateToRedux
    // });
    depthClone.map((object) => {
      if (addStateToRedux.data[newItem].data.length === object.data.length) {
        if (addStateToRedux.data[newItem].title === object.title) {
          addStateToRedux.data.splice(newItem + 1 , 0, object);
          object.duplicate = true;
          return this.props.setRedux({
            addStateToRedux
          });
        }
      }
      else {
        return false;
      }
    })
  }
  render() {
    return (
      <div onClick={this.addingItem} className="button next_button button_add" variant="contained">
      </div>
    )
  }
}
export default api.connect(AddItem);