import React, { useState, useEffect, useRef } from 'react';
import '../App.css';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import MenuItem from '@material-ui/core/MenuItem';
// import '../yandexApi/yandex'
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { ReactDadata } from 'react-dadata';
import Autocomplete from 'react-google-autocomplete';
import HelpList from './helpList';
import Select from '@material-ui/core/Select';
import { Input } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { apiUrl } from '../api';
import Group from './group';
import {
  initialApi,
  setValue,
  setError
} from '../redux/actions';
function mapStateToProps(state) {
  return {
    apiPage: state.apiPage,
    pageData: state.pageData,
    value: state.value,
    sendData: state.sendData,
    typePicker: state.typePicker,
    error: state.error,
    google: state.google,
    typeModel: state.typeModel
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    initialApi,
    setValue,
    setError
  }, dispatch)
}
// class Element extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     console.log(this.props.fieldGroup)
//     return (
//       <>
//         <div className="form_group">
//           {/* <p className="form_label">{}</p>
//           {
//             <Select
//               value='0'
//               className="full_width"
//             >
//               <MenuItem value={10}>Ten</MenuItem>
//               <MenuItem value={20}>Twenty</MenuItem>
//               <MenuItem value={30}>Thirty</MenuItem>
//               {this.props.apiPage.data[0].data[this.props.indexGroup].data.value.map((option) => {
//                 return (
//                   <option key={option} value={!this.props.apiPage.data[0].data[this.props.indexGroup].data.dependece ? option : ''}>{option}</option>
//                 )
//               })
//           }
//           </Select>
//         } */}
//           {this.props.fieldGroup[this.props.indexGroup].map((item, index) => {
//           return (
//             <div key={item.data.name + index + 'element'} className="form_element">
//               {item.data.type !== 'hidden' &&
//                 <p key={item.data.type + index + 'label'} className="form_label">{item.data.label}</p>
//               }
//               {item.data.type !== 'select' && item.data.type !== 'hidden' &&
//                 <Input key={item.data.name + index + 'text'} type={item.data.type} className="full_width input_margin" />
//               }
//             </div>
//           )
//         })}
//         </div>
//       </>
//     )
//   }
// }
function Element(props) {
  const [data] = useState(props.data.data);
  const [isError, setIsError] = useState(false);
  let [valueInput, setValueInput] = useState(data.value);
  const [typeError, setTypeError] = useState('');
  const [helpList, setHelpList] = useState(false);
  const formData = new FormData();
  // const className = data.options.length < 1 ? 'full_width select hidden' : 'full_width select';
  const getDependece = () => {
    if (!data.dependence) {
      let goSend = false;
      props.apiPage.data[props.keyGroup].data.forEach((dataValue) => {
        if (!dataValue.data.dependence) {
          const getKeyByValue = (obj, value) =>
            Object.keys(obj).find(key => obj[key] === value);
          const id = getKeyByValue(dataValue.data.options, dataValue.data.value);
          formData.append(`${dataValue.data.name}[]`, id)
          dataValue.data.value ? goSend = true : goSend = false;
        }
      })
      if (goSend) {
        fetch(`${apiUrl}`, {
          method: 'POST',
          body: formData
        })
          .then(res => res.json())
          .then(res => {
            props.apiPage.data[props.keyGroup].data.forEach((dataValue, index) => {
              if (dataValue.data.dependence) {
                let apiRes = res.fields.distributors[0].options;
                props.setValue(apiRes, props.keyGroup, index, true);
                goSend = false;
              }
            })
          })
      }
    }
  }
  const changeValue = (e) => {
    return new Promise((resolve) => {
      props.setValue(e.target.value, props.keyGroup, props.indexEl, false, false, props.position);
      setValueInput(e.target.value)
      if (!e.target.value || e.target.value.length < 2) {
        setIsError(true);
      }
      else {
        setIsError(false);
      }
      if (!e.target.value) {
        setIsError(true);
        setTypeError('empty_field');
        setHelpList(false);
      }
      else if (e.target.value.length < 3) {
        setIsError(true);
        setTypeError('small_length');
      }
      else {
        setIsError(false);
      }
      if (data.name === 'model') {
        formData.append('model', e.target.value)
        fetch(`${apiUrl}`, {
          method: 'POST',
          body: formData
        })
          .then(res => res.json())
          .then(res => {
            if (!res.error) {
              setHelpList(res.products);
              // if (valueInput.toLowerCase() === res.products[0].model.toLowerCase()) {
              //   console.log(true);
              //   props.setValue(res.products, props.keyGroup, props.indexEl, false, true);
              // }
              // res.products.filter((result) => {
              //   if (result.model === valueInput) {
              //     console.log(result)
              //   }
              // })
              if (res.products) {
                Object.entries(res.products).forEach((result) => {
                  if (result[1].model.toUpperCase() == valueInput.toUpperCase()) {
                    props.setValue(result[1], props.keyGroup, props.indexEl, false, true);
                    console.log(true)
                  }
                })
              }
            }
            else {
              setHelpList(false);
            }
          })
      }
      resolve(data.value)
    });
  }
  useEffect(() => {
    setValueInput(data.value)
  },[data.value])
  console.log(props.apiPage)
  const addModel = (value) => {
    props.setValue(value, props.keyGroup, props.indexEl, false, true);
    setHelpList(false);
  }
  switch (props.data.type) {
    case 'text': {
      return (
        <>
          {isError && typeError === 'small_length' &&
            <p className="errorMessage">Миниум 3 символа</p>
          }
          {isError && typeError === 'empty_field' &&
            <p className="errorMessage">Поле не заполнено</p>
          }
          <p className="form_label">{data.label}</p>
          <Input onChange={changeValue}
            readOnly={data.name === 'cost' || data.name === 'name' ? true : false}
            name={data.name} type='text'
            value={valueInput}
            required={data.required ? true : false}
            className={!isError ? "full_width input_margin" : "full_width error input_margin"} />
          {data.name === 'model' && helpList &&
            <div className="help_list">
              {helpList.map((item, index) => {
                return (<HelpList addItem={addModel} value={item} key={index} indexEl={index} />)
              })}
            </div>
          }
        </>
      )
    }
    case 'select': {
      return (
        <div className={data.options == false ? 'full_width select hidden' : 'full_width select '}>
          {isError && typeError === 'small_length' &&
            <p className="errorMessage">Миниум 3 символа</p>
          }
          {isError && typeError === 'empty_field' &&
            <p className="errorMessage">Поле не заполнено</p>
          }
          <p className="form_label">{data.label}</p>
          <Select
            onChange={((e) => changeValue(e).then(() => getDependece()))}
            className={!isError ? "full_width" : "full_width error"}
            value={valueInput}
            required={data.required ? true : false}
          >
            {Object.entries(data.options).map((item, index) => {
              return (
                <MenuItem
                  key={index}
                  value={item[1]}
                >{item[1]}</MenuItem>
              )
            })}
          </Select>
        </div>
      )

    }
    case 'date': {
      return (
        <>
          {isError && typeError === 'small_length' &&
            <p className="errorMessage">Миниум 3 символа</p>
          }
          {isError && typeError === 'empty_field' &&
            <p className="errorMessage">Поле не заполнено</p>
          }
          <p className="form_label">{data.label}</p>
          <Input
            onChange={changeValue}
            name={data.name} type="date"
            required={data.required ? true : false}
            className={!isError ? "full_width input_margin" : "full_width error input_margin"} />
        </>
      )
    }
    case 'date_list': {
      return (
        <>
          {isError && typeError === 'small_length' &&
            <p className="errorMessage">Миниум 3 символа</p>
          }
          {isError && typeError === 'empty_field' &&
            <p className="errorMessage">Поле не заполнено</p>
          }
          <p className="form_label">{data.label}</p>
          <Input
            onChange={changeValue}
            name={data.name}
            type="date"
            required={data.required ? true : false}
            className={!isError ? "full_width input_margin" : "full_width input_margin error"} />
        </>
      )
    }
    case 'textarea': {
      return (
        <>
          {isError && typeError === 'small_length' &&
            <p className="errorMessage">Миниум 3 символа</p>
          }
          {isError && typeError === 'empty_field' &&
            <p className="errorMessage">Поле не заполнено</p>
          }
          <p className="form_label">{data.label}</p>
          <TextField
            onChange={changeValue}
            required={data.required ? true : false}
            className={!isError ? "full_width input_margin" : "full_width input_margin error "}
            multiline={true} />
        </>
      )
    }
    case 'hidden': {
      return (
        <div className="hidden dispaly_none">
          <p className="form_label">{data.label}</p>
        </div>
      )
    }
    case 'group': {
      return (
        <>
          <Group position={[props.position, props.indexEl]} indexGroup={props.keyGroup} data={props.data} />
        </>
      )
    }
    default:
      return (
        <>
          <p>
            {`${props.data.type} is not supporting`}
          </p>
        </>
      )
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Element)

