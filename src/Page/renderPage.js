import React, { useEffect, useState } from 'react';
import '../App.css';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { apiUrl } from '../api';
import Group from './group';
import {
  initialApi,
  setFieldGroup,
  renderBlock,
  setError,
  setPage
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
    mainGroup: state.mainGroup,
    error: state.error,
    page: state.page
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    initialApi,
    setFieldGroup,
    renderBlock,
    setError,
    setPage
  }, dispatch)
}
function RenderPages(props) {
return (
  <>
    <div className="form_page flex_center">
      <h1 className="form__title">Регистрация проектов</h1>
      <div className="form_block">
        {props.apiPage.data.map((item, index) => {
          console.log(item)
          return (
            <>
              <Group key={index} indexGroup={index} data={item} />
            </>
          )
        })}
        <>
        </>
      </div>
    </div>
  </>
)
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RenderPages)

