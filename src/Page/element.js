import React from 'react';
import api from '../api';
import Components from '../components';
import Group from './group';

class Element extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpList: false,
      valueInput: ''
    }
  }
  addModel = (value) => {
    // props.setValue(value, props.keyGroup, props.indexEl, false, true);
    // setValueInput(props.changeValue)
    // setHelpList(false);
  }
  changeValue = (e) => {
    let formData = new FormData();
    let dataApi = this.props.data.data
    let toReduxValue = { ...this.props.apiPage };
    let current = '';
    const setValueToRedux = () => {
      this.setState({
        valueInput: e.target.value
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
          const getKeyByValue = (obj, value) =>
            Object.keys(obj).find(key => obj[key] === value);
          const id = getKeyByValue(dataValue.data.options, dataValue.data.value);
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
            this.props.apiPage.data[this.props.keyGroup].data.forEach((dataValue, index) => {
              if (dataValue.data.dependence) {
                let apiRes = res.fields.distributors[0].options;
                toReduxValue.data[this.props.keyGroup].data[index].data.options = apiRes
                this.props.setRedux({
                  toReduxValue
                })
              }
            })
          })
      }
    }
    console.log(dataApi.name)
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
                current = result[1];
              }
            })
          }
        }).then(() => {
          if (current) {
            let newReduxValues = { ...this.props.apiPage };
            newReduxValues.data[this.props.path[0]].data[this.props.path[1]].data[0].data.map((el) => {
              switch (el.data.name) {
                case 'cost':
                  el.data.value = current.cost;
                  return this.props.setRedux({
                    newReduxValues
                  });
                case 'name':
                  el.data.value = current.name;
                  return this.props.setRedux({
                    newReduxValues
                  });
                  default:
              }
            })
          }
        })
    }
    //     props.setValue(e.target.value, props.keyGroup, props.indexEl, false, false, props.position);
    //     setValueInput(e.target.value)
    //     if (!e.target.value || e.target.value.length < 2) {
    //       setIsError(true);
    //     }
    //     else {
    //       setIsError(false);
    //     }
    //     if (!e.target.value) {
    //       setIsError(true);
    //       setTypeError('empty_field');
    //       setHelpList(false);
    //     }
    //     else if (e.target.value.length < 3) {
    //       setIsError(true);
    //       setTypeError('small_length');
    //     }
    //     else {
    //       setIsError(false);
    //     }
    //     if (data.name === 'model') {
    //       formData.append('model', e.target.value)
    //       fetch(`${api.url}`, {
    //         method: 'POST',
    //         body: formData
    //       })
    //         .then(res => res.json())
    //         .then(res => {
    //           if (!res.error) {
    //             setHelpList(res.products);
    //             // if (valueInput.toLowerCase() === res.products[0].model.toLowerCase()) {
    //             //   console.log(true);
    //             //   props.setValue(res.products, props.keyGroup, props.indexEl, false, true);
    //             // }
    //             // res.products.filter((result) => {
    //             //   if (result.model === valueInput) {
    //             //     console.log(result)
    //             //   }
    //             // })
    //             // if (res.products) {
    //             //   Object.entries(res.products).forEach((result) => {
    //             //     if (result[1].model.toUpperCase() == valueInput.toUpperCase()) {
    //             //       props.setValue(result[1], props.keyGroup, props.indexEl, false, true);
    //             //       console.log(true)
    //             //     }
    //             //   })
    //             // }
    //           }
    //           else {
    //             setHelpList(false);
    //           }
    //         })
    //     }
  }
  render() {
    switch (this.props.data.type) {
      case 'text':
        return <Components.text value={this.props.data.data.value} valueInput={this.state.valueInput} label={this.props.data.data.label} changeValue={this.changeValue}
          name={this.props.data.data.name}
          required={this.props.data.data.required} helpList={this.state.helpList} />
      case 'select':
        return <Components.select changeValue={this.changeValue} name={this.props.data.data.name}
          valueInput={this.state.valueInput}
          required={this.props.data.data.required}
          options={this.props.data.data.options}
          label={this.props.data.data.label}
        />
      case 'date':
        return <Components.date label={this.props.data.data.label} changeValue={this.changeValue} name={this.props.data.data.name}
          required={this.props.data.data.required} />
      case 'date_list':
        return <Components.date_list label={this.props.data.data.label} changeValue={this.changeValue} name={this.props.data.data.name}
          required={this.props.data.data.required} />
      case 'textarea':
        return <Components.textarea label={this.props.data.data.label} changeValue={this.changeValue} required={this.props.data.data.required} />
      case 'hidden':
        return <Components.hidden label={this.props.data.data.label} />
      case 'group':
        let newKey = { ...this.props.keyGroup };
        newKey = this.props.indexEl;
        this.props.setRedux({
          newKey
        })
        return <Group keyGroup={this.props.indexEl} path={[...this.props.path]} data={this.props.data} />
      default:
        return <Components.default_c type={this.props.data.data.type} />
    }
  }
}

export default api.connect(Element);
