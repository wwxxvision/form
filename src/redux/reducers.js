
import {
  INITIAL_PAGE,
  GET_API_PAGE,
  SET_FIELD_CONFIG,
  INITIAL_DATA_OBJECT,
  DISPATCH_FIELD_VALUE,
  RENDER_BLOCKS,
  SIZE_GROUP,
  SET_FIELD_GROOP,
  SET_VALUE
} from './actionTypes';
const initialState = {
  pageData: {
    step: 2,
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
  countForms: []
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
      let value = state.apiPage.data.data[action.indexGroup].data[action.indexElement].value = action.value;
      return Object.assign({}, state, {
        value
      })
    default:
      return state
  }
}
