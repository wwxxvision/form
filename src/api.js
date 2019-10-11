import { connect } from 'react-redux';
import * as actions from './redux/actions';

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
  fetchData: (step = 0, before = () => { }) => {
    (typeof before === 'function') && before();
    return fetch(`${APIURL + step}`, {
      method: 'GET'
    })
      .then(res => res.json())
  },
  getRefElement: (apiPageData = {}, path = []) => {
    let elem = apiPageData.data, startPos;
    const recurs = () => {
      for (let i = 0; i < path.length; i++) {
        startPos = elem[i];
        for (let j = 0; j < startPos.data.length; j++) {
          if (startPos.data[j].type === 'group') {
            recurs(startPos, path)
            console.log(elem)
          }
        }
        return elem
      }
    }
    recurs();
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
};

export default api;