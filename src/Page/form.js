import React from 'react';
import '../App.css';
import Firstscreen from '../components/firstscreen';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { addValue, getApi, setAmountForms, setCounter } from '../redux';
function mapStateToProps(state) {
  return { 
    api: state.api, 
    diveleryCountry: state.diveleryCountry, 
    resolution: state.resolution, 
    amountForm: state.amountForm,
    counter: state.counter,
    value: state.value
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ 
    addValue, 
    getApi, 
    setAmountForms,
    setCounter 
  }, dispatch)
}
class Form extends React.Component {
  constructor(props) {
    super(props);
  }
  upCounter = (e) => {
    this.props.setAmountForms(1);
    console.log(this.props)
  }
  componentDidUpdate(prevProps) {
    if (prevProps.amountForm !== this.props.amountForm) {
        this.props.setAmountForms(this.props.amountForm);
    }
  }
  renderForm = () => {
    return(
    this.props.amountForm.map((item, i) => {
     return <Firstscreen listItems={i} key={i} />
    }));
  }
  render() {
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
        </div>
      </section>
    )
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form)

