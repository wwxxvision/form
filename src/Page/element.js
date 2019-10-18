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
      complete: false
    }
  }
  componentDidMount() {
    if (this.props.data.data.value) {
      this.setState({
        valueInput: this.props.data.data.value
      })
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
        case 'product_id':
          el.data.value = value.id;
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
                case 'product_id':
                  el.data.value = this.state.current.id;
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
      if ((e.target.value !== this.state.current.name && this.state.complete) || !e.target.value && this.props.newReduxValues) {
        let removeToRedux = this.props.newReduxValues ? { ...this.props.newReduxValues } : { ...this.props.toReduxValue };
        removeToRedux.data[this.props.path[0]].data[this.props.path[1]].data[0].data.map((el) => {
          switch (el.data.name) {
            case 'cost':
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
    else if (dataApi.name === 'count' && this.props.stateValue) {
      const callBackCost = (def) => {
        let countValueToRedux = this.props.newReduxValues ? { ...this.props.newReduxValues } : { ...this.props.addModelToRedux };
        countValueToRedux.data[this.props.path[0]].data[this.props.path[1]].data[0].data.map((el) => {
          if (el.data.name === 'cost') {
            if (el.data.value) {
              let old = this.props.stateValue;
              !def ? el.data.value = old * this.state.valueInput : el.data.value = old;
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
        e.target.value = 1;
      }
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
            {this.props.data.data.name !== 'delivery_list' && this.props.data.data.name !== 'total_delivery_list' &&
              <Controllers path={[...this.props.path]} subGroup={true} indexEl={this.props.indexEl} dataApi={this.props.apiPage} index={this.props.path[0]} />
            }
          </React.Fragment>
        )
      default:
        return <Components.default_c type={this.props.data.data.type} />
    }
  }
}

export default api.connect(Element);
