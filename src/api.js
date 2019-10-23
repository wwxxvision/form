import { connect } from 'react-redux';
import * as actions from './redux/actions';
import clone from 'clone';
import { cloneDeep } from 'lodash';
import { bigIntLiteral } from '@babel/types';
const whithoutType = (state) => {
  let newState = {};
  Object.keys(state).forEach((key) => {
    if (key !== 'type') {
      newState[key] = state[key];
    }
  })
  return newState;
}
const APIURL = 'http://192.168.0.251:8086/local/form/ajax_update_form.php?page=';
const APIURL_EMPTY = 'http://192.168.0.251:8086/local/form/ajax_update_form.php?method=get_empty&page=';
const paramsUrl = document.querySelector('.local_form_properties') ? document.querySelector('.local_form_properties') : undefined;
let dataUrl = paramsUrl ? paramsUrl.getAttribute('data-url') : undefined;
let dataProjectId = paramsUrl ? paramsUrl.getAttribute('data-project_id') : undefined;
console.log(dataUrl, dataProjectId, paramsUrl);
const api = {
  url: APIURL,
  connect: (component_) => {
    return connect(
      (state) => (whithoutType(state)),
      (dispatch) => ({
        setRedux: (state) => dispatch(actions.setRedux(state))
      }))(component_);
  },
  clearObject: {},
  getClearObject: ((step) => {
    return fetch(`${APIURL_EMPTY + step}`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(res => api.clearObject = clone(res))
  }),
  fetchData: (step = 0, before = () => { }) => {
    (typeof before === 'function') && before();
    return fetch(!paramsUrl ? `${APIURL + step}` : `${APIURL + step}&method=get&project_id=${dataProjectId}`, {
      method: 'GET'
    })
      .then(res => res.json())
  },
  saveData: (objectTosend) => {
    return fetch(`${APIURL}`, {
      method: 'POST',
      body: objectTosend
    })
      .then(res => res.json())
  },
  getRefElement: (apiPageData = {}, path = [], uiValue) => {
    const getValue = (value) => {
      for (let i = 0; i < path.length; i++) {
        value = value.data[path[i]];
      }
      return value.data.value = uiValue;
    }
    getValue(apiPageData);
  },
  getController: (apiPageData = {}, path = []) => {
    const getValue = (value) => {
      for (let i = 0; i < path.length; i++) {
        value = value.data[path[i]];
      }
      return value
    }
    return getValue(apiPageData);
  },
  setClasses: (defaultClasses = false, isActiveClasses = false) => {
    //defaultClasses = ['className']
    //isActiveClasses = { className: 'condition' }
    let classNames = [],
      className = '';
    //handling defaultClasses
    if (defaultClasses) {
      classNames = defaultClasses;
    }

    //handling active classes
    if (isActiveClasses) {
      classNames.push(...Object.keys(isActiveClasses)
        .map((className) => (isActiveClasses[className] && className))
        .filter((className) => (className)));
    }

    //joining classes
    className = classNames.join(' ');

    return className;
  },
  isError: false,
  validation: (outSideValue, isErr) => {
    if (isErr) {
      return outSideValue ? '' : 'error_empty';
    }
  },
  setBeforeResData: (whereChangeVal, path, current, isClean) => {
    const getValue = (value) => {
      for (let i = 0; i < path.length - 1; i++) {
        value = value.data[path[i]];
      }
      if (current) {
        current.cost = parseInt(current.cost)
      }
      value.data.map((extraDeep) => {
        if (current) {
          !isClean ? extraDeep.data.value = current[extraDeep.data.name] : extraDeep.data.value = '';
          if (extraDeep.data.name === 'count') {
            extraDeep.data.value = 1;
          }
          switch (extraDeep.data.name) {
            case 'count':
              extraDeep.data.value = 1;
            case  'product_id':
              extraDeep.data.value = current['id'];
              break;
            default:
          }
        }
        else {
          extraDeep.data.value = '';
        }
        return extraDeep
      })
      return value
    }
    return getValue(whereChangeVal);
  },
  getLocalCost: (whereChangeVal, path, current, totalSum) => {
    let cost = 0;
    const getValue = (value) => {
      for (let i = 0; i < path.length - 1; i++) {
        value = value.data[path[i]];
      }
      value.data.map((extraDeep) => {
        if (extraDeep.data.name === 'cost') {
          if (current) {
            extraDeep.data.defaultValue = current[extraDeep.data.name];
            cost = parseInt(current[extraDeep.data.name]);
          }
          else {
            extraDeep.data.defaultValue = '';
            cost = '';
          }
        }
        return extraDeep
      })
      return cost
    }
    return getValue(whereChangeVal);
  },
  factorSum: (whereChangeVal, path, staticValue) => {
    const getValue = (value) => {
      for (let i = 0; i < path.length - 1; i++) {
        value = value.data[path[i]];
      }
      value.data.map((extraDeep) => {
        if (extraDeep.data.name === 'cost') {
          if (extraDeep.data.value) {
            extraDeep.data.value = Number(staticValue) * Number(extraDeep.data.defaultValue);
          }
        }
        return extraDeep
      })
      return value;
    }
    return getValue(whereChangeVal);
  },
  getCostForDelete: (whereChangeVal, path) => {
    let cost = 0;
    const getValue = (value) => {
      for (let i = 0; i < path.length - 1; i++) {
        value = value.data[path[i]];
      }
      value.data.map((extraDeep) => {
        if (extraDeep.data.name === 'cost') {
          cost = extraDeep.data.value;
          console.log(cost)
        }
        return extraDeep
      })
      return cost;
    }
    return getValue(whereChangeVal);
  },
  redirectUrl: dataUrl,
  pureObject: (item, subGroup, path) => {
    let newObj = {};
    let copy = cloneDeep(item);
    for (let key in item) {
      newObj[key] = copy[key];
      if (key === 'duplicate') {
        newObj[key] = true;
      }
    }
    let sysPath = newObj.data.length;
    const getValue = (value) => {
      for (let i = 0; i < sysPath; i++) {
        if (value[i].type !== 'group' && value[i].type !== 'hidden') {
          value[i].data.value = '';
          value[i].data.uid = `${value[i].data.uid + i}`;
        }
      }
      return value
    }
    getValue(newObj.data);
    return newObj;
    // if (subGroup) {
    //   if (newObj.data) {
    //     newObj.data.map((item) => {
    //       if (!Array.isArray(item) && item) {
    //         item.data.value = '';
    //         count++;
    //         item.data.uid = `${item.data.uid + count}`;
    //         console.log(item)
    //       }
    //       else {
    //         return newObj;
    //       }
    //       return newObj;
    //     })
    //   }
    // }
    // else {
    //   if (newObj.data) {
    //     newObj.data.map((item) => {
    //       if (item) {
    //         if (item.type !== 'group') {
    //           item.data.value = '';
    //           count++;
    //           item.data.uid = `${item.data.uid + count}`;
    //           return newObj;
    //         }
    //         else {
    //           return newObj;
    //         }
    //       }
    //       else {
    //         return newObj;
    //       }
    //     })
    //   }
    // }
  },
  setTotal: (whereChangeVal, path, type, deleteItem) => {
    let whereTotal, allCost = [], dicriment = 0;
    const getGlobalgroup = (value) => {
      if (type !== 'delete' && type !== 'clear') {
        for (let i = 0; i < path.length - 2; i++) {
          value = value.data[path[i]];
        }
        value.data.map((extraDeep) => {
          switch (extraDeep.type) {
            case 'group':
              extraDeep.data.map((item) => {
                if (item.data.name === 'cost' && item.data.value) {
                  allCost.push(parseInt(item.data.value));
                  return extraDeep;
                }
              })
              break;
            case 'text':
              if (allCost.length > 0) {
                whereTotal = allCost.reduce((a, b) => a + b, 0);
              }
              break;
            default:
          }
          return extraDeep
        })
        value.data.map((extraDeep) => {
          if (whereTotal) {
            extraDeep.data.value = whereTotal;
          }
          return extraDeep;
        })
      }
      else if (type === 'clear') {
        for (let i = 0; i < path.length - 2; i++) {
          value = value.data[path[i]];
        }
        whereTotal = parseInt(deleteItem);
        console.log(whereTotal)
        value.data.map((extraDeep) => {
          extraDeep.data.value -= whereTotal;
          return extraDeep;
        })
      }
      else {
        if (deleteItem) {
          for (let i = 0; i < path.length - 1; i++) {
            value = value.data[path[i]];
          }
          deleteItem.data.map((item) => {
            if (item.data.name === 'cost') {
              allCost.push(item.data.value)
            }
          })
          value.data.map((item) => {
            if (item.type === 'text') {
              item.data.value -= allCost[0];
            }
          })
        }
      }
    }
    return getGlobalgroup(whereChangeVal)
  }
};

export default api;