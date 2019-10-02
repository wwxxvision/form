import React from 'react';
import '../App.css';
import Firstscreen from '../components/firstscreen';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import {
  addValue,
  getApi,
  setAmountForms,
  setCounter,
  setSliceIndex,
  deleteAmountForm,
  setCurrentPage,
  initialObject,
  isValidation
} from '../redux';
function mapStateToProps(state) {
  return {
    api: state.api,
    diveleryCountry: state.diveleryCountry,
    resolution: state.resolution,
    amountForm: state.amountForm,
    counter: state.counter,
    value: state.value,
    sliceIndex: state.sliceIndex,
    amountForm: state.amountForm,
    currentPage: state.currentPage,
    isValid: state.isValid,
    firstList: state.allTypesData
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addValue,
    getApi,
    setAmountForms,
    setCounter,
    setSliceIndex,
    deleteAmountForm,
    setCurrentPage,
    initialObject,
    isValidation
  }, dispatch)
}
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDelete: false
    }
  }
  upCounter = (e) => {
    e.preventDefault();
    this.props.setAmountForms();
    this.setState({
      isDelete: false
    })
    this.props.initialObject();
  }
  deleteEl = (index) => {
    this.props.deleteAmountForm(index)
    this.setState({
      isDelete: true
    });
  }
  componentDidMount() {
    this.props.initialObject();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.amountForm !== this.props.amountForm && !this.state.isDelete) {
      this.props.setAmountForms(this.props.amountForm)
    }
  }
  renderForm = () => {
    return (
      this.props.amountForm.map((item, i) => {
        return <Firstscreen indexes={i} listItems={item} key={item} deleteEl={this.deleteEl} />
      }));
  }
  nextPage = () => {
    console.log(this.props.currentPage)
    switch(this.props.currentPage) {
      case 'TYPE_A': 
      this.props.firstList.forEach((element) => {
        console.log(element)
        for (let object in element) {
          console.log(object)
          !element[object] ? this.props.isValidation(true) : this.props.isValidation(false);
        }
      })
      break;
      default:
    }
  }
  render() {
    console.log(1)
    return (
      <section className="form_page flex_center">
        <h1 className="form_title">Регистрация проектов</h1>
        <div className="form">
          {
            this.renderForm()
          }
          <div onClick={this.upCounter} className="form_add">
            <AddIcon />
            <p className="form_add_text">Еще информация о дистрибуторе</p>
          </div>
          <Button onClick={this.nextPage} className="full_width button_next" color="secondary">Далее</Button>
          {this.props.isValid &&
            <span className="error__message">Не все поля заполнены</span>
          }
        </div>
      </section>
    )
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form)

