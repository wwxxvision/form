
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
  SET_PAGE,
  IS_GOOGLE_API
} from './actionTypes';
import { bigIntLiteral } from '@babel/types';
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
      let value, sendData, groupValue
      state.apiPage.data[action.indexGroup].data.forEach((item, i) => {
        switch (item.type === 'group') {
          case true:
            console.log('true')
            groupValue = state.apiPage.data[action.indexGroup].data[i].data[action.indexElement].data.value = action.value
            break;
          case false:
              console.log('false')
            value = state.apiPage.data[action.indexGroup].data[action.indexElement].data.value = action.value
            break;
          default:
        }
      })
      // if (action.typeModel) {
      //   state.apiPage.data[action.indexGroup].data.forEach((element) => {
      //     if (element.type === 'group') {
      //       element.data.forEach((subElement) => {
      //         switch (subElement.data.name) {
      //           case 'model':
      //             subElement.data.value = action.value.model;
      //             break;
      //           case 'name':
      //             subElement.data.value = action.value.name;
      //             break;
      //           case 'cost':
      //             subElement.data.value = action.value.cost;
      //             break;
      //           default:
      //         }
      //       })
      //     }
      //   })
      // }
      return Object.assign({}, state, {
        value,
        groupValue,
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
    case IS_GOOGLE_API:
      return Object.assign({}, state, {
        google: action.google
      })
    default:
      return state
  }
}
