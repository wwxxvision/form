import React, { useEffect, useState } from 'react';
import '../App.css';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import addIcons from '../images/addIcon.png';
import Element from './element'
import {
  
} from '../redux/actions';
function mapStateToProps(state) {
  return {
    
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    
  }, dispatch)
}

// class Group extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       fields: this.props.fieldParent
//     }
//   }
//   componentDidUpdate(prevProps) {
//     if (prevProps.fieldParent !== this.props.fieldParent) {
//       this.setState({
//         fields: this.props.fieldParent
//       })
//     }
//   }
//   addGroup = (i) => {
//     this.props.addElement(i);
//   }
//   render() {
//     console.log(this.state.fields)
//     return (
//       <>
//         <div className="form_groups wrapper full_width">
//           {
//             this.state.fields.map((group, index) => {
//               return (
//                 <div key={group[index].data.text + 'group' + index} className="group__block full_width">
//                   <Element key={group[index].data.label} indexGroup={index} />
//                   <div className="add_group flex" onClick={(() => this.addGroup(index))}>
//                     <p className="add_intro">Добавить еще</p>
//                     <img src={addIcons} alt="add form" className="addIcon" />
//                   </div>
//                 </div>
//               )
//             })
//           }
//         </div>
//       </>
//     )
//   }
// }
function Group(props) {
  // const [isChange, setIsChange] = useState(false);
  // const [templateData, setTemplateData] = useState([]);
  // const [counterElements, setCounterElements] = useState([]);
  // const setLength = (argument) => {
  //   for (let i = 0; i <= argument; i++) {
  //     return setCounterElements(oldValue => [...oldValue, 'element'])
  //   }
  // }
  // useEffect(() => {
  //   const _checkSubGroups = () => {
  //     const store = props.apiPage.data;
  //     store.forEach((object, i) => {
  //       if (object.type === 'group') {
  //         props.setFieldGroup(object.data)
  //         setTemplateData(oldValue => [...oldValue, {
  //           id: i,
  //           length: counterElements.length < 1 ? setLength(object.data.length) : counterElements
  //         }])
  //         setIsChange(true);
  //       }
  //     })
  //   }
  //   _checkSubGroups();
  //   return function cleanup() {
  //     _checkSubGroups();
  //   };
  // }, [])
  return (
    <>
      <div className="form_groups wrapper full_width">
        <h2 className="title_group full_width">{props.data.title}</h2>
        {props.data.data.map((item, index) => {
          return (
              <Element position={props.position}   key={index} indexEl={index} keyGroup={props.indexGroup} data={item} />
          )
        })}
      </div>
    </>
  )
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Group)

