import { connect } from 'react-redux';
import * as actions from './redux/actions';
import clone from 'clone';
import { cloneDeep } from 'lodash';
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
const allCosts = [];
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
  getLocalCost: (whereChangeVal, path, current) => {
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
          extraDeep.data.value = Number(staticValue) * Number(extraDeep.data.defaultValue);
        }
        return extraDeep
      })
      return value;
    }
    return getValue(whereChangeVal);
  },
  redirectUrl: dataUrl,
  pureObject: (item, subGroup) => {
    let newObj = {};
    let copy = cloneDeep(item);
    for (let key in item) {
      newObj[key] = copy[key];
      if (key === 'duplicate') {
        newObj[key] = true;
      }
    }
    if (subGroup) {
      newObj.data.map((item) => {
        item.data.value = '';
        console.log(item)
        return newObj;
      })
    }
    else {
      newObj.data.map((item) => {
        if (item.type !== 'group') {
          item.data.value = ''
          return newObj;
        }
      })
    }
    return newObj
  },
  setTotal: (whereChangeVal, path, type, deleteItem) => {
    let whereTotal, allCost = [], dicriment = 0;
    const getGlobalgroup = (value) => {
      if (type !== 'delete') {
        for (let i = 0; i < path.length - 2; i++) {
          value = value.data[path[i]];
        }
        value.data.map((extraDeep) => {
          switch (extraDeep.type) {
            case 'group':
              extraDeep.data.map((item) => {
                if (item.data.name === 'cost') {
                  allCost.push(parseInt(item.data.value));
                  return extraDeep;
                }
              })
              break;
            case 'text':
                whereTotal = allCost.reduce((a, b) => a + b, 0);
              break;
            default:
          }
          return extraDeep
        })
        value.data.map((extraDeep) => {
          if (extraDeep.type === 'text') {
            console.log(extraDeep.data.value)
            console.log(extraDeep)
            extraDeep.data.value = whereTotal;
          }
          return extraDeep;
        })
      }
      else {
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
    return getGlobalgroup(whereChangeVal)
  }
};

export default api;