import React, { useEffect, useState } from 'react';
import '../App.css';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
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
    isAdd: state.isAdd
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    initialApi,
    setFieldGroup,
    renderBlock
  }, dispatch)
}

function HelpList(props) {
  const adsItem = () => {
    props.addItem(props.value)
  }
  return (
    <>
      <div onClick={adsItem} className="model_name">
        {props.value.model}
      </div>
    </>
  )
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HelpList)

