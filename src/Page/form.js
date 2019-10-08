import React, { useEffect } from 'react';
import '../App.css';
import RenderPage from './renderPage';
import { connect } from 'react-redux'
import preloaders from '../images/preloader.gif';
import Button from '@material-ui/core/Button';
import { apiUrl } from '../api';
import { bindActionCreators } from 'redux';
import {
  initialApi, renderBlock,setPage
} from '../redux/actions';
function mapStateToProps(state) {
  return {
    pageData: state.pageData,
    apiPage: state.apiPage,
    page: state.page
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    initialApi, setPage
  }, dispatch)
}
// class Form extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   componentDidMount() {
//     this.getData();
//   }
//   getData = () => {
//     fetch(`${apiUrl + this.props.pageData.step}`, {
//       method: 'GET'
//     })
//       .then(res => res.json())
//       .then(res => this.props.initialApi(res))
//   }
//   render() {
//     if (!this.props.apiPage.status) {
//       return (
//         <>
//           <div className="flex wrapper_loader">
//             <img src={preloaders} alt="preloader" className="preloader" />
//             {!this.props.apiPage.error &&
//               <>
//                 <p className="preloader_text">Загрузка</p>
//               </>
//             }
//             {this.props.apiPage.error &&
//               <>
//                 <p className="preloader_text">Ошибка на сервере</p>
//                 <p className="preloader_text">{this.props.apiPage.error}</p>
//               </>
//             }
//           </div>
//         </>
//       )
//     }
//     else {
//       return (
//         <section className="form_page full_screen flex_center">
//           <RenderPage />
//         </section>
//       )
//     }
//   }
// }
function Form(props) {
  const fetchData = () => {
    fetch(`${apiUrl + props.pageData.step}`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(res => props.initialApi(res))
  }
  useEffect(() => {
    fetchData()
    return function cleanup() {
      fetchData();
    };
  }, [props.pageData.step]);
  const nextStep = () => {
    if (!props.error) {
      props.setPage(props.pageData.step + 1);
      fetchData();
    }
    else {
      console.log('error')
    }
  }
  const backStep = () => {
    props.setPage(props.pageData.step - 1);
    fetchData();
  }
  if (!props.apiPage.status) {
    return (
      <div>
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
      </div>
    )
  }
  else {
    return (
      <section className="form_page full_screen flex_center">
        <RenderPage />
        {props.pageData.step === 0 &&
          <Button  onClick={nextStep} className="next_button" variant="contained">
            Далее
            </Button>
        }
        {props.pageData.step === 1 &&
          <div className="flex mg_top_btns">
            <Button onClick={nextStep} className="next_button" variant="contained">
              Далее
              </Button>
            <div className="btn__wrapper left_btn_margin">
              <Button onClick={backStep} className="next_button left_btn_margin" variant="contained">
                Назад
              </Button>
            </div>
          </div>
        }
        {props.pageData.step === 2 &&
          <Button onClick={backStep} className="next_button" variant="contained">
            Назад
            </Button>
        }
      </section>
    )
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form)

