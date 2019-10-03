
import {
  INITIAL_PAGE,
  GET_API_PAGE,
  SET_FIELD_CONFIG,
  INITIAL_DATA_OBJECT,
  DISPATCH_FIELD_VALUE
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
  fieldGroup: {},
  fieldValues: []
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
        const checkLayersData = (key, data, keyGroup) => {
          if (data.type === 'group') {
            state.fieldGroup[key] = {}; 
            state.fieldGroup[key] = data.fields;
            for (let keyField in data.fields) {
              checkLayersData(keyField, data.fields[keyField], key)
            }
          }
          else {
            state.fieldGroup[keyGroup][key] = data;
          }
        }
        checkLayersData(state.pageData.step, state.apiPage.data.fields,state.pageData.step)
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
      if (state.apiPage.data) {
        state.apiPage.data.fields.forEach((field) => {
          state.fieldConfig.push({
            group: '',
            name: state.data.fields,
            type: '',
            value: '',
            required: '',
            visible: ''
          })
        })
      }
      return Object.assign({}, state, {
        fieldArrayObject
      })
    case INITIAL_DATA_OBJECT:
      return Object.assign({}, state, {
        pageData: action.initial
      })
    default:
      return state
  }
}
