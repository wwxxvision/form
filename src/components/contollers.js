import React from 'react';
import api from '../api';
import DeleteItem from './deleteItem';
import AddItem from './addItem';
class Controllers extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="flex">
        <AddItem  fields={this.props.fields} type={this.props.type} dataApi={this.props.dataApi} newPath={this.props.index} />
        {this.props.dataApi.data[this.props.index].duplicate &&
          <React.Fragment  >
            <DeleteItem dataApi={this.props.dataApi} newPath={this.props.index} />
          </React.Fragment>
        }
      </div>
    )
  }
}
export default api.connect(Controllers);