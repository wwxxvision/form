import React from 'react';
import api from '../api';
import Components from '../components';
import Group from './group';
import HelpList from '../Page/helpList';
class Element extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpList: false,
      valueInput: '',
      current: '',
      currentPrice: 0,
      isError: false,
      complete: false
    }
  }
  addModel = (value) => {
    let addModelToRedux = { ...this.props.toReduxValue };
    addModelToRedux.data[this.props.path[0]].data[this.props.path[1]].data[0].data.map((el) => {
      switch (el.data.name) {
        case 'cost':
          el.data.value = parseInt(value.cost);
          let stateValue = el.data.value;
          this.props.setRedux({
            stateValue
          })
          return this.props.setRedux({
            addModelToRedux
          });
        case 'name':
          el.data.value = value.name;
          return this.props.setRedux({
            addModelToRedux
          });
        case 'model':
          el.data.value = value.model;
          this.setState({
            valueInput: value.model
          })
          return this.props.setRedux({
            addModelToRedux
          });
        default:
      }
      this.setState({
        helpList: false
      })
      return this.props.newReduxValues;
    })
  }
  changeValue = (e) => {
    let formData = new FormData();
    let dataApi = this.props.data.data
    let toReduxValue = { ...this.props.apiPage };
    const setValueToRedux = () => {
      this.setState({
        valueInput: e.target.value,
      });
      !e.target.value ? (this.setState({
        isError: true
      })) : (this.setState({
        isError: false
      }));
      api.getRefElement(toReduxValue, this.props.path, e.target.value);
      this.props.setRedux({
        toReduxValue
      });
    }
    const setDependeces = () => {
      let goSend = false;
      toReduxValue.data[this.props.keyGroup].data.forEach((dataValue) => {
        if (!dataValue.data.dependence && dataValue.type !== 'hidden') {
          const getKeyByValue = (obj, value) => Object.keys(obj).find(key => obj[key] === value);
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
            let dependenceValues = { ...this.props.toReduxValue }
            dependenceValues.data[this.props.keyGroup].data.map((dataValue, index) => {
              if (dataValue.data.dependence) {
                let apiRes = res.fields.distributors[0].options;
                console.log(this.props.keyGroup)
                dependenceValues.data[this.props.keyGroup].data[index].data.options = apiRes
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
        }).then((res) => {
          if (this.state.current) {
            let newReduxValues = { ...this.props.toReduxValue };
            newReduxValues.data[this.props.path[0]].data[this.props.path[1]].data[0].data.map((el) => {
              switch (el.data.name) {
                case 'cost':
                  el.data.value = parseInt(this.state.current.cost);
                  let stateValue = el.data.value;
                  this.props.setRedux({
                    stateValue
                  })
                  return this.props.setRedux({
                    newReduxValues
                  });
                case 'name':
                  el.data.value = this.state.current.name;
                  return this.props.setRedux({
                    newReduxValues
                  });
                default:
              }
              return this.props.newReduxValues;
            })
          }
        })
      if ((e.target.value !== this.state.current.name && this.state.complete) || !e.target.value) {
        let removeToRedux = { ...this.props.newReduxValues };
        removeToRedux.data[this.props.path[0]].data[this.props.path[1]].data[0].data.map((el) => {
          switch (el.data.name) {
            case 'cost':
              console.log(true)
              el.data.value = '';
              let stateValue = el.data.value;
              this.props.setRedux({
                stateValue
              })
              return this.props.setRedux({
                removeToRedux
              });
            case 'name':
              el.data.value = '';
              return this.props.setRedux({
                removeToRedux
              });
            default:
          }
          this.setState({
            complete: false,
            current: ''
          })
          return this.props.removeToRedux;
        })
      }
    }
    else if (dataApi.name === 'count') {
      const callBackCost = (def) => {
        let countValueToRedux = { ...this.props.newReduxValues };
        countValueToRedux.data[this.props.path[0]].data[this.props.path[1]].data[0].data.map((el) => {
          if (el.data.name === 'cost') {
            if (el.data.value) {
              let old = this.props.stateValue;
              !def ? el.data.value = old * this.state.valueInput : el.data.value = old
            }
          }
          return this.props.setRedux({
            countValueToRedux
          });
        })
      }
      if (e.target.value > 0) {
        this.setState({
          valueInput: e.target.value.replace(/\D/, '')
        }, (() => {
          callBackCost();
        }));
      }
      else {
        this.setState({
          valueInput: 1
        }, (() => {
          callBackCost(true);
        }));
      }
    }
  }
  render() {
    switch (this.props.data.type) {
      case 'text':
        return (
          <React.Fragment>
            <Components.text value={this.props.data.data.value} valueInput={this.state.valueInput} label={this.props.data.data.label} changeValue={this.changeValue}
              name={this.props.data.data.name}
              validation={this.state.isError}
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
          validation={this.state.isError}
          label={this.props.data.data.label}
        />
      case 'date':
        return <Components.date label={this.props.data.data.label} changeValue={this.changeValue} name={this.props.data.data.name}
          validation={this.state.isError}
          valueInput={this.state.valueInput}
          required={this.props.data.data.required} />
      case 'date_list':
        return <Components.date_list label={this.props.data.data.label} changeValue={this.changeValue} name={this.props.data.data.name}
          validation={this.state.isError}
          valueInput={this.state.valueInput}
          required={this.props.data.data.required} />
      case 'textarea':
        return <Components.textarea label={this.props.data.data.label} changeValue={this.changeValue} required={this.props.data.data.required}
          valueInput={this.state.valueInput}
          validation={this.state.isError}
        />
      case 'hidden':
        return <Components.hidden label={this.props.data.data.label} />
      case 'group':
        return <Group keyGroup={this.props.indexEl} path={[...this.props.path]} data={this.props.data} />
      default:
        return <Components.default_c type={this.props.data.data.type} />
    }
  }
}

export default api.connect(Element);
