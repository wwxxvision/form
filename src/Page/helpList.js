import React, { useEffect, useState } from 'react';
import '../App.css';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import {
  initialApi
} from '../redux/actions';
function mapStateToProps(state) {
  return {
    apiPage: state.apiPage,
    pageData: state.pageData,
    isAdd: state.isAdd
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    initialApi
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

