import React from 'react';
import '../App.css';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Input } from '@material-ui/core';
import addIcons from '../images/addIcon.png';
import {
  initialApi,
  setFieldGroup,
  renderBlock
} from '../redux/actions';
import { tsThisType } from '@babel/types';
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
  addGroup = () => {
    this.props.setFieldGroup(this.props.fieldGroup[this.props.indexGroup]);
  }
  render() {
    return (
      <>
        {/* <p className="form_label">{}</p>
          {
            <Select
              value='0'
              className="full_width"
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
              {this.props.apiPage.data[0].data[this.props.indexGroup].data.value.map((option) => {
                return (
                  <option key={option} value={!this.props.apiPage.data[0].data[this.props.indexGroup].data.dependece ? option : ''}>{option}</option>
                )
              })
          }
          </Select>
        } */}
        {this.props.fieldGroup[this.props.indexGroup].map((item, index) => {
          console.log(item)
          return (
            <>
              {item.data.type !== 'hidden' &&
                <p key={item.data.type + index} className="form_label">{item.data.label}</p>
              }
              {item.data.type !== 'select' && item.data.type !== 'hidden' &&
                <Input key={item.data.name + index} type={item.data.type} className="full_width input_margin" />
              }
            </>
          )
        })}
        <div className="add_group flex" onClick={this.addGroup}>
          <p className="add_intro">Добавить еще</p>
          <img src={addIcons} alt="add form" className="addIcon" />
        </div>
      </>
    )
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Element)

