import React from 'react';
import '../App.css';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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
class Element extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        {this.props.apiPage.data[0].data[this.props.indexGroup].type !== 'group'}
        <div className="form_element">
          <p className="form_label">{this.props.apiPage.data[0].data[this.props.indexGroup].data.label}</p>
          {this.props.apiPage.data[0].data[this.props.indexGroup].data.type === 'select' &&
            <Select
              value='0'
              className="full_width"
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
              {/* {this.props.apiPage.data[0].data[this.props.indexGroup].data.value.map((option) => {
                return (
                  <option key={option} value={!this.props.apiPage.data[0].data[this.props.indexGroup].data.dependece ? option : ''}>{option}</option>
                )
              }) */}
          }
          </Select>
        }
        </div>
      </>
    )
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Element)

