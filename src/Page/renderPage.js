import React, { useEffect, useState } from 'react';
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
function RenderPages(props) {
  // useEffect(() => {
  //   const _checkSubGroups = () => {
  //     const store = props.apiPage.data;
  //     store.forEach((object, i) => {
  //       if (object.type === 'group') {
  //         props.setFieldGroup(object.data)
  //         setTemplateData(oldValue => [...oldValue, {
  //           id: i,
  //           length: counterElements.length < 1 ? setLength(object.data.length) : counterElements
  //         }])
  //         setIsChange(true);
  //       }
  //     })
  //   }
  //   _checkSubGroups();
  //   return function cleanup() {
  //     _checkSubGroups();
  //   };
  // }, [])
  return (
    <>
      <div className="form_page flex_center">
        <h1 className="form__title">Регистрация проектов</h1>
        <div className="form_block">
          {props.apiPage.data.map((item, index) => {
            console.log(item)
            return (
              <Group key={index} indexGroup={index} data={item} />
            )
          })}
        </div>
      </div>
    </>
  )
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RenderPages)

