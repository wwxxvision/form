import React from 'react';
import '../App.css';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Delete from '@material-ui/icons/Delete';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { addValue, getApi, addDelivery, setAmountForms, setCounter, deleteAmountForm } from '../redux';
function mapStateToProps(state) {
  return {
    api: state.api,
    diveleryCountry: state.diveleryCountry,
    resolution: state.resolution,
    country: state.country,
    amountForm: state.amountForm,
    counter: state.counter,
    index: state.index,
    tempValue: state.tempValue
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addValue,
    getApi,
    addDelivery,
    setAmountForms,
    setCounter,
    deleteAmountForm
  }, dispatch)
}
export class Firstscreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collectionTypes: [],
      valueTypes: '',
      collectionCountries: [],
      valueCountries: '',
      valueDistrbt: '',
      deliveryTypeValue: '',
      collectiondeliveryType: []
    }
  }
  componentDidMount() {
    fetch('http://192.168.0.251:8086/local/form/ajax_update_form.php', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => this.props.getApi(res))
  }
  getKeyByValue = (object, value) => {
    return Object.keys(object).find(key => object[key] === value);
  }
  changeSelect = e => {
    const getDistribList = () => {
      if (this.state.valueCountries && this.state.valueTypes) {
        const formData = new FormData();
        let countryId, typeId;
        countryId = this.getKeyByValue(this.props.api.fields.country_id.options, this.state.valueCountries);
        typeId = this.getKeyByValue(this.props.api.fields.decision_type.options, this.state.valueTypes)
        formData.append('country_id[]', countryId);
        formData.append('decision_type[]', typeId);
        fetch('http://192.168.0.251:8086/local/form/ajax_update_form.php', {
          method: 'POST',
          body: formData
        })
          .then(res => res.json())
          .then(res => {
            this.setState({
              valueDistrbt: Object.keys(res.fields.distributors[0].options).map(key => res.fields.distributors[0].options[key])
            })
          })

      }
    }
    switch (e.target.name) {
      case 'resolution_named':
        this.setState(
          state => {
            const collectionTypes = state.collectionTypes.push(e.target.value);
            state.valueTypes = e.target.value;
            return collectionTypes;
          }, () => {
            getDistribList();
          }
        );
        break;
      case 'deliveryСountry_named':
        this.setState(
          state => {
            const collectionCountries = state.collectionCountries.push(e.target.value);
            state.valueCountries = e.target.value;
            return collectionCountries;
          }, () => {
            getDistribList();
          }
        );
        getDistribList();
        break;
      case 'deliveryType_named':
        this.setState(
          state => {
            const collectiondeliveryType = state.collectiondeliveryType.push(e.target.value);
            state.deliveryTypeValue = e.target.value;
            return collectiondeliveryType;
          }
        );
        break;
      default:
    }
  }
  deleteForm = () => {
    console.log(this.props.listItems)
    this.props.deleteAmountForm(this.props.listItems);
  }
  render() {
    return (
      <>
        <div className="form_wrapper">
          <FormControl className="form_control">
            <InputLabel htmlFor="resolution">Выберите тип решения</InputLabel>
            <Select
              value={this.state.valueTypes ? this.state.valueTypes : ''}
              onChange={this.changeSelect}
              inputProps={{
                id: 'resolution',
                name: 'resolution_named'
              }}
            >
              {this.props.api &&
                Object.values(this.props.api.fields.decision_type.options).map((item, i) => {
                  return <MenuItem value={item} key={i}>{item}</MenuItem>
                })
              }
            </Select>
          </FormControl>
          <FormControl className="form_control">
            <InputLabel htmlFor="age-simple">Выберите страну поставки</InputLabel>
            <Select
              onClose={this.getDistribList}
              value={this.state.valueCountries ? this.state.valueCountries : ''}
              onChange={this.changeSelect}
              inputProps={{
                id: 'deliveryСountry',
                name: 'deliveryСountry_named'
              }}
            >
              {this.props.api &&
                Object.values(this.props.api.fields.country_id.options).map((item, i) => {
                  return <MenuItem value={item} key={i}>{item}</MenuItem>
                })}
            </Select>
          </FormControl>
          {this.state.valueCountries && this.state.valueTypes &&
            <FormControl className="form_control">
              <InputLabel htmlFor="age-simple">Выберите дистрибутора</InputLabel>
              <Select
                value={this.state.deliveryTypeValue ? this.state.deliveryTypeValue : ''}
                onChange={this.changeSelect}
                inputProps={{
                  id: 'deliveryType',
                  name: 'deliveryType_named'
                }}
              >
                {this.props.api &&
                  Object.values(this.state.valueDistrbt).map((item, i) => {
                    return <MenuItem value={item} key={i}>{item}</MenuItem>
                  })}
              </Select>
            </FormControl>
          }
        </div>
        <div>
        {this.props.listItems &&
            <div onClick={this.deleteForm} className="form_delete flex full_width flex_end">
              <Delete />
            </div>
          }
        </div>
      </>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Firstscreen)
