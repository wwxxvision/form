import React from 'react';
import api from '../api';
import clone from 'clone';
class AddItem extends React.Component {
  addingItem = () => {
    let addStateToRedux = { ...this.props.apiPage };
    let newItem = clone(this.props.newPath);
    let depthClone = clone(api.clearObject);
    console.log(this.props.path)
    // let veryDepthClone = depthClone.data.filter((item) => item.type !== 'hidden');
    // if (!this.props.subGroup) {
    //   veryDepthClone.map((object) => {
    //     if (addStateToRedux.data[newItem].data.length === object.data.length) {
    //       if (addStateToRedux.data[newItem].title === object.title) {
    //         addStateToRedux.data.splice(newItem + 1, 0, object);
    //         object.duplicate = true;
    //         return this.props.setRedux({
    //           addStateToRedux
    //         });
    //       }
    //     }
    //     else {
    //       return false;
    //     }
    //   })
    // }
    // else {
      let currentInd = 0;
      const getValue = (value) => {
        for (let i = 0; i < this.props.path.length; i++) {
          value = value.data[this.props.path[i]]
          currentInd = i;
        }
        return value;
      }
      let willDuplicateEl = getValue(depthClone);
      willDuplicateEl.duplicate = true;
      const getLayer = (value) => {
        for (let i = 0; i < this.props.path.length; i++) {
          value = value.data[this.props.path[i]];
        }
        return value;
      }
      let whereWillDuplicate = getLayer(addStateToRedux);
      whereWillDuplicate.data.splice(currentInd - 1, 0, willDuplicateEl);
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