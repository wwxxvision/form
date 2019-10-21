import React from 'react';
import api from '../api';
import DeleteItem from './deleteItem';
import AddItem from './addItem';
class Controllers extends React.Component {
  render() {
    return (
      <div className="flex">
        <AddItem  subGroup={this.props.subGroup} indexEl={this.props.indexEl} path={this.props.path}  dataApi={this.props.dataApi} />
        {api.getController(this.props.dataApi, this.props.path).duplicate &&
          <React.Fragment  >
            <DeleteItem subGroup={this.props.subGroup} indexEl={this.props.indexEl} path={this.props.path}   dataApi={this.props.dataApi}  />
          </React.Fragment>
        }
      </div>
    )
  }
}
export default api.connect(Controllers);