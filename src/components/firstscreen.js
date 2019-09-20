import React from 'react';
import '../App.css';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { addValue, getApi, addDelivery } from '../redux';
function mapStateToProps(state) {
  return {
    api: state.api,
    diveleryCountry: state.diveleryCountry,
    resolution: state.resolution,
    country: state.country
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addValue, getApi, addDelivery }, dispatch)
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
  changeSelect = (e) => {
    switch (e.target.name) {
      case 'resolution_named':
        this.setState(
          state => {
            const collectionTypes = state.collectionTypes.push(e.target.value);
            state.valueTypes = e.target.value;
            return collectionTypes;
          },
        );
        break;
      case 'deliveryСountry_named':
        this.setState(
          state => {
            const collectionCountries = state.collectionCountries.push(e.target.value);
            state.valueCountries = e.target.value;
            return collectionCountries;
          },
        );
        break;
      default:
    }
  }
  componentDidUpdate() {
    if (this.state.valueCountries && this.state.valueTypes) {
      const formData = new FormData();
      formData.append('country_id[]', this.state.valueCountries);
      formData.append('decision_type[]', this.state.valueTypes);
      fetch('http://192.168.0.251:8086/local/form/ajax_update_form.php', {
        method: 'POST',
        body: formData
      })
        .then(res => res.json())
        .then(res => this.setState({ valueDistrbt: res }))
        .then(res => console.log(res))
    }
  }
  render() {
    console.log(this.state.valueTypes)
    return (
      <>
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
            <InputLabel htmlFor="age-simple">Выберите страну поставки</InputLabel>
            <Select
              value={this.props.diveleryCountry ? this.props.diveleryCountry : ''}
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
        }
      </>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Firstscreen)
