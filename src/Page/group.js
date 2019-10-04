import React from 'react';
import '../App.css';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import Element from './element'
import {
  initialApi,
  setFieldGroup,
  renderBlock
} from '../redux/actions';
function mapStateToProps(state) {
  return {
    apiPage: state.apiPage,
    pageData: state.pageData,
    fieldGroup: state.fieldGroup,
    render: state.render,
    key: state.key,
    keyGroup: state.keyGroup,
    fieldHtml: state.fieldHtml
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    initialApi,
    setFieldGroup,
    renderBlock
  }, dispatch)
}
class Group extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.fieldGroup !== nextProps.fieldGroup) {
      this.props.setFieldGroup(nextProps.fieldGroup);
    }
}
render() {
  if (this.props.fieldGroup !== []) {
    return (
      <>
        <div className="form_groups wrapper full_width">
          {
            this.props.fieldGroup.map((group, index) => {
              return (
                <div key={'group' + index}   className="form_group">
                  <Element key={group[index].type + index}  indexGroup={index} />
                </div>
              )
            })
          }
        </div>
      </>
    )
  }
}
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Group)

