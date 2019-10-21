import React from 'react';
import api from '../api';
import Components from '../components';
import Group from './group';
import HelpList from '../Page/helpList';
import Controllers from '../components/contollers';
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
    let getModel = api.setBeforeResData(toReduxValue, this.props.path, value);
    this.props.setRedux({
      toReduxValue
    })
    this.setState({
      helpList: false
    })
    return this.props.toReduxValue;
  }
  changeValue = (e) => {
    console.log(this.props)
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
      formData.append('model', e.target.value)
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
          if (this.state.current) {
            api.setBeforeResData(toReduxValue, this.props.path, this.state.current)
            this.setState({
              localCost: api.getLocalCost(toReduxValue, this.props.path, this.state.current)
            });
            this.props.setRedux({
              toReduxValue
            })
          }
        })
      if ((e.target.value !== this.state.current.name && this.state.complete) || (!e.target.value && this.props.toReduxValue)) {
        let getModel = api.setBeforeResData(toReduxValue, this.props.path, this.state.current, true);
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
    else if (dataApi.name === 'count') {
      // const callBackCost = (def) => {
        // api.factorSum(toReduxValue, this.props.path, this.state.localCost, this.state.valueInput);
        this.props.setRedux({
          toReduxValue
        })
        console.log(this.state.localCost)
      // }
    //   if (e.target.value > 0) {
    //     this.setState({
    //       valueInput: e.target.value.replace(/\D/, '')
    //     }, (() => {
    //       callBackCost();
    //     }));
    //   }
    //   else {
    //     this.setState({
    //       valueInput: 1
    //     }, (() => {
    //       callBackCost(true);
    //     }));
    //     e.target.value = 1;
    //   }
    // }
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
            <Controllers subGroup={true} path={[...this.props.path]}  dataApi={this.props.apiPage} index={this.props.path[0]} />
          </React.Fragment>
        )
      default:
        return <Components.default_c type={this.props.data.data.type} />
    }
  }
}

export default api.connect(Element);
