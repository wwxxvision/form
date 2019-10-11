
import {
  INITIAL_PAGE,
  GET_API_PAGE,
  SET_FIELD_GROOP,
  SET_VALUE,
  IS_ERROR,
  SET_PAGE,
  IS_GOOGLE_API
} from './actionTypes';
export function reducer(state = {}, action) {
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
      return Object.assign({}, state, {
        changeValue: action.changeValue
      });
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
