import { connect } from 'react-redux';
import * as actions from './redux/actions';
import clone from 'clone';
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
    console.log(step)
    return fetch(`${APIURL + step}`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(res => api.clearObject = clone(res.data.filter((item) => item.type !== 'hidden')))
  }),
  fetchData: (step = 0, before = () => { }) => {
    (typeof before === 'function') && before();
    return fetch(`${APIURL + step}`, {
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
  } 
};

export default api;