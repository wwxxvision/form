import React from 'react';
import api from '../api';
import Components from '../components';
import Group from './group';
import HelpList from '../Page/helpList';
import Controllers from '../components/contollers';
import { debounce } from 'lodash';
class Element extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpList: false,
      valueInput: '',
      current: '',
      currentPrice: 0,
      isError: false,
      complete: false,
      localCost: ''
    }
    this.getTotal = debounce(this.getTotal, 500);
  }
  componentDidMount() {
    if (this.props.data.data.value) {
      this.setState({
        valueInput: this.props.data.data.value
      })
      if (this.props.data.data.name === 'cost') {
        this.setState({
          localCost: this.props.data.data.value
        })
      }
    }
  }
  focusCount = (e) => {
    if (this.props.data.data.name === 'count' && !this.state.valueInput) {
      this.setState({
        valueInput: 1
      })
    }
  }
  addModel = (value) => {
    let toReduxValue = { ...this.props.toReduxValue }
    api.setBeforeResData(toReduxValue, this.props.path, value);
    api.getLocalCost(toReduxValue, this.props.path, value);
    this.getTotal('counter');
    this.props.setRedux({
      toReduxValue
    })
    this.setState({
      helpList: false
    })
    return this.props.toReduxValue;
  }
  changeValue = (e) => {
    let formData = new FormData();
    let dataApi = this.props.data.data
    let toReduxValue = { ...this.props.apiPage };
    const setValueToRedux = () => {
      this.setState({
        valueInput: e.target.value,
      });
      api.getRefElement(toReduxValue, this.props.path, e.target.value);
      this.props.setRedux({
        toReduxValue
      });
    }
    const setDependeces = () => {
      let goSend = false;
      toReduxValue.data[this.props.keyGroup].data.forEach((dataValue) => {
        if (!dataValue.data.dependence && dataValue.type !== 'hidden') {
          const id = dataValue.data.value;
          formData.append(`${dataValue.data.name}[]`, id)
          dataValue.data.value ? goSend = true : goSend = false;
        }
      })
      if (goSend) {
        fetch(`${api.url}`, {
          method: 'POST',
          body: formData
        })
          .then(res => res.json())
          .then(res => {
            let dependenceValues = { ...this.props.toReduxValue }
            dependenceValues.data[this.props.keyGroup].data.map((dataValue, index) => {
              if (dataValue.data.dependence) {
                let apiRes = res.fields.distributors[0].options;
                dependenceValues.data[this.props.keyGroup].data[index].data.options = apiRes;
                this.props.setRedux({
                  dependenceValues
                });
              }
              return this.props.dependenceValues;
            })
          })
      }
    }
    setValueToRedux();
    if (dataApi.type === 'select' && !dataApi.dependence && dataApi.value) {
      setDependeces();
    }
    else if (dataApi.name === 'model') {
      this.goingToGetModels(toReduxValue, e.target.value, formData);
      this.getTotal('render');
    }
    else if (dataApi.name === 'count') {
      const callBackCounter = () => {
        api.factorSum(toReduxValue, this.props.path, this.state.valueInput);
        this.getTotal('counter', dataApi.value);
        this.props.setRedux({
          toReduxValue
        })
      }
      if (e.target.value === 0 || e.target.value < 0 || !e.target.value) {
        this.setState({
          valueInput: 1
        }, (() => {
          callBackCounter();
        }))
        e.target.value = 1;
      }
      else {
        this.setState({
          valueInput: e.target.value.replace(/\D/, '')
        }, (() => {
          callBackCounter();
        }))
      }
    }
  }
  getTotal = (type, counter) => {
    let toReduxValue = { ...this.props.toReduxValue }
    api.setTotal(toReduxValue, this.props.path, type, counter);
    this.props.setRedux({
      toReduxValue
    });
  }
  goingToGetModels = (toReduxValue, value, formData) => {
    formData.append('model', value)
    fetch(`${api.url}`, {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(res => {
        !res.error ? this.setState({
          helpList: res.products
        }) : this.setState({
          helpList: false
        })
        if (res.products) {
          Object.entries(res.products).map((result) => {
            if (result[1].model.toUpperCase() === this.state.valueInput.toUpperCase()) {
              this.setState({
                current: result[1],
                complete: true,
                helpList: false
              })
            }
            return this.state;
          })
        }
      }).then(() => {
        if (this.state.current && this.state.complete) {
          api.setBeforeResData(toReduxValue, this.props.path, this.state.current);
          api.getLocalCost(toReduxValue, this.props.path, this.state.current);
          this.props.setRedux({
            toReduxValue
          });
        }
      })
    if ((value !== this.state.current.name && this.state.complete) || (!value && this.props.toReduxValue)) {
      api.setTotal(toReduxValue, this.props.path, true);
      api.setBeforeResData(toReduxValue, this.props.path, this.state.current, true);
      this.props.setRedux({
        toReduxValue
      })
      this.setState({
        complete: false,
        current: ''
      })
      return this.props.toReduxValue;
    }
  }
  render() {
    switch (this.props.data.type) {
      case 'text':
        return (
          <React.Fragment>
            <Components.text
              valueInput={this.state.valueInput}
              label={this.props.data.data.label}
              changeValue={this.changeValue}
              name={this.props.data.data.name}
              value={this.props.data.data.value}
              uid={this.props.data.data.uid}
              isError={this.props.isError}
              typeError={this.props.typeError}
              focusCount={this.focusCount}
              required={this.props.data.data.required} helpList={this.state.helpList} />
            {this.props.data.data.name === 'model' && this.state.helpList &&
              <div className="help_list">
                {this.state.helpList.map((item, index) => {
                  return (<HelpList addItem={this.addModel} value={item} key={index} indexEl={index} />)
                })}
              </div>
            }
          </React.Fragment>
        )
      case 'select':
        return <Components.select changeValue={this.changeValue} name={this.props.data.data.name}
          valueInput={this.state.valueInput}
          value={this.props.data.data.value}
          dependence={this.props.data.data.dependence}
          required={this.props.data.data.required}
          options={this.props.data.data.options}
          uid={this.props.data.data.uid}
          typeError={this.props.typeError}
          indxGroup={this.props.keyGroup}
          label={this.props.data.data.label}
          isError={this.props.isError}
        />
      case 'date':
        return <Components.date label={this.props.data.data.label} changeValue={this.changeValue} name={this.props.data.data.name}
          validation={this.state.isError}
          valueInput={this.state.valueInput}
          isError={this.props.isError}
          value={this.props.data.data.value}
          uid={this.props.data.data.uid}
          typeError={this.props.typeError}
          required={this.props.data.data.required} />
      case 'date_list':
        return <Components.date_list label={this.props.data.data.label} changeValue={this.changeValue} name={this.props.data.data.name}
          validation={this.state.isError}
          isError={this.props.isError}
          valueInput={this.state.valueInput}
          value={this.props.data.data.value}
          uid={this.props.data.data.uid}
          typeError={this.props.typeError}
          required={this.props.data.data.required} />
      case 'textarea':
        return <Components.textarea label={this.props.data.data.label} changeValue={this.changeValue} required={this.props.data.data.required}
          valueInput={this.state.valueInput}
          isError={this.props.isError}
          validation={this.state.isError}
          uid={this.props.data.data.uid}
          typeError={this.props.typeError}
          value={this.props.data.data.value}
        />
      case 'hidden':
        return <Components.hidden label={this.props.data.data.label} />
      case 'group':
        return (
          <React.Fragment>
            <Group keyGroup={this.props.indexEl} path={[...this.props.path]} data={this.props.data} />
            <Controllers subGroup={true} path={[...this.props.path]} dataApi={this.props.apiPage} index={this.props.path[0]} />
          </React.Fragment>
        )
      default:
        return <Components.default_c type={this.props.data.data.type} />
    }
  }
}

export default api.connect(Element);
