import React from 'react';
import '../App.css';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import {
  initialApi,
  setFieldGroup
} from '../redux/actions';
function mapStateToProps(state) {
  return {
    apiPage: state.apiPage,
    pageData: state.pageData
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    initialApi,
    setFieldGroup
  }, dispatch)
}
class RenderPages extends React.Component {
  constructor(props) {
    super(props);
  }
  renderForms = () => {
    return (
      Object.entries(this.props.apiPage.fields.fields).map(field => {
        if (this.props.apiPage.fields.type === 'group') {
          return (
            <div key={field} className="form_group">
              {field[1].type !== 'hidden' &&
                <p className="form_text">{field[1].name}</p>
              }
              <input type={field[1].type} required={field[1].required} className="field" />
            </div>
          )
        }
      })
    )
  }
  render() {
    return (
      <>
        <div className="form_page flex_center">
          <div className="form_block">
            {this.renderForms()}
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

