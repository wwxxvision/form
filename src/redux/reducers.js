
import {
  INITIAL_PAGE,
  GET_API_PAGE,
  SET_FIELD_CONFIG,
  INITIAL_DATA_OBJECT,
  DISPATCH_FIELD_VALUE,
  RENDER_BLOCKS,
  SIZE_GROUP,
  SET_FIELD_GROOP
} from './actionTypes';
const initialState = {
  pageData: {
    step: 1,
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
  fieldGroup: []
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
    case DISPATCH_FIELD_VALUE:
      let fieldArray = state.fieldValues.push({
        name: action.fieldName,
        value: action.fieldValues
      })
      return Object.assign({}, state, {
        fieldValues: fieldArray
      })
    case SET_FIELD_CONFIG:
      let fieldArrayObject
      return Object.assign({}, state, {
        fieldArrayObject
      })
    case RENDER_BLOCKS:
      let tempary
      state.fieldGroup.push(action.render);
      return Object.assign({}, state, {
        tempary
      })
    case INITIAL_DATA_OBJECT:
      return Object.assign({}, state, {
        pageData: action.initial
      })
    case SIZE_GROUP:
      let emptySize = state.sizeGroup.push({
        id: action.idGroup,
        size: action.upSize
      })
      return Object.assign({}, state, {
        emptySize
      })
    case SET_FIELD_GROOP:
        let tempGroup = state.fieldGroup.push(action.group)
      return Object.assign({}, state, {
        tempGroup
      })
    default:
      return state
  }
}
