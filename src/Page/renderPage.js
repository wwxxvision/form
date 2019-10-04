import React from 'react';
import '../App.css';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import Group from './group';
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
    fieldHtml: state.fieldHtml,
    group: state.group,
    mainGroup: state.mainGroup
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    initialApi,
    setFieldGroup,
    renderBlock
  }, dispatch)
}
class RenderPages extends React.Component {
  constructor(props) {
    super(props);
  }
  _checkSubGroups = () => {
    if (this.props.apiPage.data[0].type === 'group') {
      for (let depth in this.props.apiPage.data[0].data) {
        if (this.props.apiPage.data[0].data[depth].type === 'group') {
          this.props.setFieldGroup(this.props.apiPage.data[0].data[depth].data)
        }
      }
    }
  }
  render() {
    return (
      <>
        <div className="form_page flex_center">
          <h1 className="form__title">Регистрация проектов</h1>
          <div className="form_block">
            {this._checkSubGroups()}
            <Group />
          </div>
        </div>
      </>
    )
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RenderPages)

