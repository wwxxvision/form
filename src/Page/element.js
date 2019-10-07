import React, { useState } from 'react';
import '../App.css';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Input } from '@material-ui/core';
import addIcons from '../images/addIcon.png';
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
  const [data] = useState(props.data.data)
  // return (
  //   <>
  //     <div className="form_group">
  //       {/* {props.fieldGroup[props.indexGroup].map((item, index) => {
  //         return (
  //           <div key={index + 'element'} className="form_element">
  //             {item.data.type !== 'hidden' &&
  //               <p key={index + 'label'} className="form_label">{item.data.label}</p>
  //             }
  //             {item.data.type !== 'select' && item.data.type !== 'hidden' &&
  //               <Input key={index + 'text'} type={item.data.type} className="full_width input_margin" />
  //             }
  //           </div>
  //         )
  //       })} */}
  //        {props.data.type !== 'hidden' &&
  //             <p key={index + 'label'} className="form_label">{props.data.label}</p>
  //         }
  //     </div>
  //   </>
  // )
  const changeValue = (e) => {
    props.setValue(e.target.value, props.keyGroupm, props.key)
  }
  switch (props.data.type) {
    case 'text': {
      return (
        <>
          <p className="form_label">{data.label}</p>
          <Input onChange={changeValue} name={data.name} type="text" className="full_width input_margin"  />
        </>
      )
    }
    case 'select': {
      return (
        <>
          <p className="form_label">{data}</p>
          <select>
            {data.options.map((item, index) => {
              return (
                <option key={index} value={index}>{item}</option>
              )
            })}
          </select>
        </>
      )
    }
    case 'date': {
      return (
        <>
          <p className="form_label">{data.label}</p>
          <Input onChange={changeValue} name={data.name} type="date" className="full_width input_margin"  />
        </>
      )
    }
    case 'date_list': {
      return (
        <>
          <p className="form_label">{data.label}</p>
          <Input onChange={changeValue} name={data.name} type="date" className="full_width input_margin"  />
        </>
      )
    }
    default:
      return (
        <>
        <p>
          Unknown element
        </p>
        </>
      )     
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Element)

