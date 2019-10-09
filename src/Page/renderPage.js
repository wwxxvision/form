import React, { useEffect, useState } from 'react';
import '../App.css';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import preloaders from '../images/preloader.gif';
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
  const [isLoad, setLoad] = useState(false);
  const fetchData = () => {
    setLoad(true);
    fetch(`${apiUrl + props.pageData.step}`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(res => {
        props.initialApi(res);
        setLoad(false);
      })
  }
  const changePage = (e) => {
    switch (e.target.classList.contains('back_button')) {
      case true:
        props.setPage(props.pageData.step - 1);
        fetchData();
        break;
      case false:
        props.setPage(props.pageData.step + 1);
        fetchData();
        break;
      default:
    }
  }
  return (
    <>
      {!isLoad &&
        <div className="form_page flex_center">
          <h1 className="form__title">Регистрация проектов</h1>
          <div className="form_block">
            {props.apiPage.data.map((item, index) => {
              return (
                <Group key={index} indexGroup={index} data={item} />
              )
            })}
          </div>
          {props.pageData.step === 0 &&
            <div onClick={changePage} className="button next_button" variant="contained">
              Далее
          </div>
          }
          {props.pageData.step === 1 &&
            <div className="flex mg_top_btns">
              <div onClick={changePage} className="button next_button" variant="contained">
                Далее
              </div>
              <div onClick={changePage} className="button left_btn_margin back_button " variant="contained">
                Назад
              </div>
            </div>
          }
          {props.pageData.step === 2 &&
            <div onClick={changePage} className="button back_button" variant="contained">
              Назад
            </div>
          }
        </div>
      }
      {isLoad &&
        <div className="flex wrapper_loader">
          <img src={preloaders} alt="preloader" className="preloader" />
          {!props.apiPage.error &&
            <>
              <p className="preloader_text">Загрузка</p>
            </>}
          {props.apiPage.error &&
            <>
              <p className="preloader_text">Ошибка на сервере</p>
              <p className="preloader_text">{props.apiPage.error}</p>
            </>
          }
        </div>
      }
    </>
  )
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RenderPages)

