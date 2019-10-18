import React from 'react';
import api from '../api';
import clone from 'clone';

class AddItem extends React.Component {
  addingItem = () => {
    let addStateToRedux = { ...this.props.apiPage };
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
    // let currentInd = 0;
    // const getValue = (value) => {
    //   for (let i = 0; i < this.props.path.length; i++) {
    //     console.log(value)
    //     if (value.data[this.props.path[i]].type !== 'hidden') {
    //       value = value.data[this.props.path[i]]
    //       currentInd = i;
    //     }
    //   }
    //   return value;
    // }
    // let willDuplicateEl = getValue(depthClone);
    // willDuplicateEl.duplicate = true;
    // const getLayer = (value) => {
    //   for (let i = 0; i < this.props.path.length; i++) {
    //     value = value.data[this.props.path[i]];
    //   }
    //   return value;
    // }
    // getLayer(addStateToRedux).data.push(willDuplicateEl);
    // this.props.setRedux({
    //   addStateToRedux
    // });
    let depthClone = clone(api.clearObject); 
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
        }
      }
      return value;
    }
    console.log(clone(api.pureObject(getLayer(addStateToRedux))))
    let clon = clone(api.pureObject(getLayer(addStateToRedux)));
    // !this.props.subGroup ? api.clearObject.data.splice(curInd + 1, 0, clon) : getLayersGroups(api.clearObject).data.splice(curInd + 1, 0, clon);
    // clon.duplicate = true;
    !this.props.subGroup ? clone(addStateToRedux.data.splice(curInd + 1, 0, clon)) : clone(getLayersGroups(addStateToRedux).data.push(clon));
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