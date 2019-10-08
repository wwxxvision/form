
import {
  INITIAL_PAGE,
  GET_API_PAGE,
  SET_FIELD_CONFIG,
  INITIAL_DATA_OBJECT,
  DISPATCH_FIELD_VALUE,
  RENDER_BLOCKS,
  SIZE_GROUP,
  SET_FIELD_GROOP,
  SET_VALUE,
  IS_ERROR,
  SET_PAGE
} from './actionTypes';
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
    case SET_FIELD_GROOP:
      let countGroups = state.fieldGroup.push(action.group)
      return Object.assign({}, state, {
        countGroups
      })
    case SET_VALUE:
      let value, sendData
      if (!action.typePicker) {
        value = state.apiPage.data[action.indexGroup].data[action.indexElement].data.value = action.value;
        // if (action.typePicker && state.apiPage.data[action.indexGroup].data[action.indexElement].data.dependence.length > 0) {
        //   sendData = state.apiPage.data[action.indexGroup].data[action.indexElement].data.dependence[action.indexElement] = action.value;
        // }
        // state.apiPage.data[action.indexGroup].data[action.indexElement].data.value
      }
      else {
        sendData = state.apiPage.data[action.indexGroup].data[action.indexElement].data.options = action.value;
      }
      return Object.assign({}, state, {
        value,
        sendData
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
    default:
      return state
  }
}
