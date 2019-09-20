import React from 'react';
import '../App.css';
import Firstscreen from '../components/firstscreen';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { addValue, getApi } from '../redux';
function mapStateToProps(state) {
  return { api: state.api, diveleryCountry: state.diveleryCountry, resolution: state.resolution}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addValue, getApi }, dispatch)
}
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayFields : [1]
    }
  }
  upCounter = () => {
    this.setState(
      state =>  {
        const arrayFields = state.arrayFields.push(this.state.arrayFields.length + 1);
        return arrayFields;
      }
    );
  }
  render() {
    console.log(this.state.arrayFields)
    return (
      <section className="form_page flex_center">
        <h1 className="form_title">Регистрация проектов</h1>
        <div className="form">
        {
          this.state.arrayFields.map((item, i) => {
            return <Firstscreen listItems={this.state.arrayFields[i]} key={i} />
          })
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

