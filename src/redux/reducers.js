
import {
  INITIAL_PAGE,
  GET_API_PAGE,
  SET_FIELD_GROOP,
  SET_VALUE,
  IS_ERROR,
  SET_PAGE,
  IS_GOOGLE_API
} from './actionTypes';
import { isArray } from 'util';
const initialState = {
  pageData: {
    step: 0,
    class: '',
    values: []
  },
  apiPage: {
    data: [],
    resposneServer: false
  },
  fieldConfig: [],
  fieldValues: [],
  sizeGroup: [],
  fieldGroup: [],
  countForms: [],
  sendData: ''
}
export function reducer(state = initialState, action) {
  switch (action.type) {
    case INITIAL_PAGE:
      return Object.assign({}, state, {
        pageData: action.pageDerictory
      })
    case GET_API_PAGE:
      let apiValue = state.apiPage.data = action.setApi;
      if (state.apiPage.data) {
        apiValue.resposneServer = true;
      }
      return Object.assign({}, state, {
        apiPage: apiValue
      })
    case SET_VALUE:
      let current;

      // !action.typePicker && !action.typeModel ? value = state.apiPage.data[action.indexGroup].data[action.indexElement].data.value = action.value :
      //   sendData = state.apiPage.data[action.indexGroup].data[action.indexElement].data.options = action.value;
      if (isArray(action.position) && !action.typeModel) {
        current = state.apiPage.data[action.indexGroup]        // let currentPos = state.apiPage.data
        action.position.forEach((item, index) => {
          if (item > 0) {
            current.data[item].data[action.indexElement].data.value = action.value
          }
        })
      }
      else if (action.typeModel) {
        console.log(action)
        state.apiPage.data[action.indexGroup].data.forEach((element) => {
          if (element.type === 'group') {
            element.data.forEach((subElement) => {
              console.log(subElement)
              switch (subElement.data.name) {
                case 'model':
                  subElement.data.value = action.value.model;
                  break;
                case 'name':
                  subElement.data.value = action.value.name;
                  console.log(subElement)
                  break;
                case 'cost':
                  subElement.data.value = action.value.cost;
                  break;
                default:
              }
            })
          }
        })
      }
      else  {
        state.apiPage.data[action.indexGroup].data[action.indexElement].data.value = action.value;
      }
      if (action.typePicker) {
        state.apiPage.data[action.indexGroup].data[action.indexElement].data.options = action.value;
      }
      return Object.assign({}, state, {
        ...state
      })
    case IS_ERROR:
      return Object.assign({}, state, {
        error: action.error
      })
    case SET_PAGE:
      let pageCurrent = state.pageData.step = action.page
      return Object.assign({}, state, {
        pageCurrent
      })
    case IS_GOOGLE_API:
      return Object.assign({}, state, {
        google: action.google
      })
    default:
      return state
  }
}
