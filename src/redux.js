const ADD_VALUE = 'ADD_VALUE';
const GET_API = 'GET_API';
const ADD_DELIVERY = 'ADD_DELIVERY';
const SET_AMOUNT_FORMS = 'SET_AMOUNT_FORMS';
const SET_COUNTER = 'SET_COUNTER';
const DELETE_AMOUNT_FORMS = 'DELETE_AMOUNT_FORMS';


export function addValue(resolution, diveleryCountry) {
  return {
    type: ADD_VALUE,
    resolution
  }
}
export function getApi(api) {
  return { type: GET_API, api }
}
export function addDelivery(country) {
  return { type: ADD_DELIVERY, country }
}
export function setAmountForms(amountForm, value) {
  return { type: SET_AMOUNT_FORMS, amountForm , value }
}
export function setCounter(counter) {
  return { type: SET_COUNTER, counter }
}
export function deleteAmountForm(index, tempValue) {
  return { type: DELETE_AMOUNT_FORMS, index, tempValue}
}
const initialState = {
  app: [],
  resolutionArr: [],
  deliveryArr: [],
  counter: 0,
  amountForm: [1]
}
export function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_VALUE:
      return Object.assign({}, state, {
        resolution: action.resolution
      })
    case GET_API:
      return Object.assign({}, state, {
        api: action.api
      })
    case ADD_DELIVERY:
      return Object.assign({}, state, {
        country: action.country
      })
    case SET_AMOUNT_FORMS:
      return Object.assign({}, state, {
        value: state.amountForm.push(action.value)
      })
    case DELETE_AMOUNT_FORMS:
      return Object.assign({}, state, {
        tempValue: state.amountForm.splice(action.index, 1)
      })
    default:
      return state
  }
}
