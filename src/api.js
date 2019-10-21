import { connect } from 'react-redux';
import * as actions from './redux/actions';
import clone from 'clone'
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
    return new Promise((resolve) => {
      const getValue = (value) => {
        for (let i = 0; i < path.length - 1; i++) {
          value = value.data[path[i]];
        }
        value.data.map((extraDeep) => {

          !isClean ? extraDeep.data.value = current[extraDeep.data.name] : extraDeep.data.value = '';
          return extraDeep
        })
        return value
      }
      return resolve(getValue(whereChangeVal));
    })
  },
  getLocalCost: (whereChangeVal, path, current) => {
    let cost = 0;
    const getValue = (value) => {
      for (let i = 0; i < path.length - 1; i++) {
        value = value.data[path[i]];
      }
      value.data.map((extraDeep) => {
        if (extraDeep.data.name === 'cost') {
          cost = current[extraDeep.data.name];
        }
        return extraDeep
      })
      return cost
    }
    return getValue(whereChangeVal);
  },
  factorSum: (whereChangeVal, path, staticValue, countFactor) => {
    const getValue = (value) => {
      for (let i = 0; i < path.length - 1; i++) {
        value = value.data[path[i]];
      }
      value.data.map((extraDeep) => {
        if (extraDeep.data.name === 'cost') {
          extraDeep.data.value = staticValue * countFactor;
          console.log(extraDeep)
        }
        return extraDeep
      })
      return value;
    }
    return getValue(whereChangeVal);
  },
  redirectUrl: dataUrl,
  pureObject: (item) => {
    // console.log(path)
    // const getLayer = (value) => {
    //   for (let i = 0; i < path.length; i++) {
    //     if (value.data[path[i]].data.type !== 'hidden') {
    //       value = value.data[path[i]];
    //     }
    //     value.data.value = '';
    //   }
    //   return value;
    // }
    // let copy = clone(item);
    // copy.data.map((element) => {
    //   element.data.value = '';
    //   return element
    // })
    // console.log(item)
    // return copy;
    let newObj = {};
    for (let key in item) {
      newObj[key] = clone(item[key]);
      if (key === 'data') {
        newObj[key].map((deepItem) => {
          deepItem.data.value = '';
          return newObj;
        })
      }
    }
    return newObj
  }
};

export default api;