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
    return fetch(!paramsUrl ?`${APIURL + step}` : `${APIURL + step}&method=get&project_id=${dataProjectId}`, {
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
  redirectUrl: dataUrl,
  pureObject: (item) => {
    // let willFilter = item.data.filter((filterEl) => filterEl.type !== 'hidden');
    let willClone = clone(item);
    // willClone.data.map((willMap) => {
    //   willMap.data.value = '';
    //   if (Array.isArray(willMap.data)) {
    //     willMap.data.map((wrapperWillMap) => {
    //        wrapperWillMap.data.value = ''
    //        return willClone.data
    //     })
    //   }
    //   return willClone.data
    // })
    return {
      data: willClone.data,
      duplicate: willClone.duplicate,
      name: willClone.name,
      title: willClone.title,
      type: willClone.type,
      uid: willClone.uid
    }
  } 
};

export default api;