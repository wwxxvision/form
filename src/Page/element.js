import React, { useState, useEffect, useRef } from 'react';
import '../App.css';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Input } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import addIcons from '../images/addIcon.png';
import { apiUrl } from '../api';
import Group from './group';
import {
  initialApi,
  setFieldGroup,
  renderBlock,
  setValue
} from '../redux/actions';
function mapStateToProps(state) {
  return {
    apiPage: state.apiPage,
    pageData: state.pageData,
    value: state.value,
    indexGroup: state.indexGroup,
    indexElement: state.indexElement
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    initialApi,
    setFieldGroup,
    renderBlock,
    setValue
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
  const dependeceClass = useState('full_width select hidden');
  const getDependece = () => {
    let ruleArray = [], formData = new FormData();
    // formData.append(data.dependence[0], data.value)
    //  formData.append(data.dependence[1], data.value)
    // ruleArray.forEach((rule, index) => {
    //   if (props.indexEl === index) {
    //     formData.append(`${rule.toString()}[]`, data.value)
    //   }
    // })
    // formData.append(`${rule.toString()}[]`, data.value)
    // fetch(`${apiUrl}`, {
    //   method: 'POST',
    //   body: formData
    // })
    //   .then(res => res.json())
    //   .then(res => console.log(res))
    // return 1
  }
  const changeValue = (e) => {
    return new Promise((resolve) => {
      props.setValue(e.target.value, props.keyGroup, props.indexEl);
      resolve(data.value)
    });
  }
  useEffect(() => {
    props.apiPage.data.forEach(element => {
      element.data.filter((filterEl) => {
       if(filterEl.data.value) {
        console.log(dependeceElement)
           console.log('it work')
       }
      })
    });
  }, [data.value])
  switch (props.data.type) {
    case 'text': {
      return (
        <>
          <p className="form_label">{data.label}</p>
          <Input onChange={changeValue}
            readOnly={data.name === 'cost' ? true : false}
            name={data.name} type="text"
            required={data.required ? true : false}
            className="full_width input_margin" />
        </>
      )
    }
    case 'select': {
      return (
        <div className={!data.dependence ? 'full_width select' : 'full_width select hidden'}>
          <p className="form_label">{data.label}</p>
          <Select
            onChange={((e) => changeValue(e).then(() => getDependece()))}
            className="full_width"
            value={!data.dependence ? data.value : ''}
            required={data.required ? true : false}
          >
            {Object.entries(data.options).map((item, index) => {
              console.log(item)
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
          <p className="form_label">{data.label}</p>
          <Input
            onChange={changeValue}
            name={data.name} type="date"
            required={data.required ? true : false}
            className="full_width input_margin" />
        </>
      )
    }
    case 'date_list': {
      return (
        <>
          <p className="form_label">{data.label}</p>
          <Input
            onChange={changeValue}
            name={data.name}
            type="date"
            required={data.required ? true : false}
            className="full_width input_margin" />
        </>
      )
    }
    case 'textarea': {
      return (
        <>
          <p className="form_label">{data.label}</p>
          <TextField
            onChange={changeValue}
            required={data.required ? true : false}
            className="full_width"
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
          <Group indexGroup={props.indexGroup} data={props.data} />
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
