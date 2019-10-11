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
    return new Promise((resolve) => {
      this.setState({
        valueInput: e.target.value
      });
      if (this.props.data.data.type === 'select' && !this.props.data.data.dependence) {
        let goSend = false;
        this.props.apiPage.data[this.props.keyGroup].data.forEach((dataValue) => {
          if (!dataValue.data.dependence) {
            const getKeyByValue = (obj, value) =>
              Object.keys(obj).find(key => obj[key] === value);
            const id = getKeyByValue(dataValue.data.options, dataValue.data.value);
            const name = dataValue.data.name;
            this.setState({
              [name]: id
            })
            dataValue.data.value ? goSend = true : goSend = false;
          }
        })
        if (goSend) {
          fetch(`${api.url}`, {
            method: 'POST',
            body: this.state.name
          })
            .then(res => res.json())
            .then(res => {
              this.props.apiPage.data[this.props.keyGroup].data.forEach((dataValue, index) => {
                if (dataValue.data.dependence) {
                  let apiRes = res.fields.distributors[0].options;
                  // props.setValue(apiRes, props.keyGroup, index, true);
                  this.props.setRedux({
                    valueInput: dataValue.data.option = apiRes
                  })
                  goSend = false;
                }
              })
            })
        }
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
      resolve(this.props.data.data.value)
    });
  }
  render() {
    switch (this.props.data.type) {
      case 'text':
        return <Components.text value={this.state.valueInput} label={this.props.data.data.label} changeValue={this.changeValue}
          name={this.props.data.data.name}
          required={this.props.data.data.required} helpList={this.state.helpList} />
      case 'select':
        return <Components.select changeValue={this.changeValue} name={this.props.data.data.name}
          valueInput={this.state.valueInput}
          required={this.props.data.data.required}
          options={this.props.data.data.options}
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
        return <Group indexGroup={this.props.data.data.keyGroup} data={this.props.data} />
      default:
        return <Components.default_c type={this.props.data.data.type} />
    }
  }
}

export default api.connect(Element);
