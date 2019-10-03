import React from 'react';
import '../App.css';
import RenderPage from './renderPage';
import { connect } from 'react-redux'
import preloaders from '../images/preloader.gif';
import { apiUrl } from '../api';
import { bindActionCreators } from 'redux';
import {
  initialApi
} from '../redux/actions';
function mapStateToProps(state) {
  return {
    pageData: state.pageData,
    apiPage: state.apiPage
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    initialApi
  }, dispatch)
}
class Form extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.getData();
  }
  getData = () => {
    fetch(`${apiUrl + this.props.pageData.step}`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(res => this.props.initialApi(res))
  }
  render() {
    if (!this.props.apiPage.fields) {
      return (
        <>
          <img src={preloaders} alt="preloader" className="preloader" />
        </>
      )
    }
    else {
      return (
        <section className="form_page full_screen flex_center">
          <RenderPage />
        </section>
      )
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form)

