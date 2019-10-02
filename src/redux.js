const ADD_VALUE = 'ADD_VALUE';
const GET_API = 'GET_API';
const ADD_DELIVERY = 'ADD_DELIVERY';
const SET_AMOUNT_FORMS = 'SET_AMOUNT_FORMS';
const SET_COUNTER = 'SET_COUNTER';
const DELETE_AMOUNT_FORMS = 'DELETE_AMOUNT_FORMS';
const SET_SLICE_INDEX = 'SET_SLICE_INDEX';
const SET_ALL_TYPES = 'SET_ALL_TYPES';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const UPDATE_OBJECT = 'UPDATE_OBJECT';
const INITAL_OBJECT = 'INITIAL_OBJECT';
const IS_VALIDATION = 'IS_VALIDATION';
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
  return { type: SET_AMOUNT_FORMS, amountForm, value }
}
export function setCounter(counter) {
  return { type: SET_COUNTER, counter }
}
export function deleteAmountForm(element) {
  return { type: DELETE_AMOUNT_FORMS, element }
}
export function setSliceIndex(sliceIndex) {
  return { type: SET_SLICE_INDEX, sliceIndex }
}
export function setAllTypes(allTypes, idType, allCountry, allDelivery) {
  return { type: SET_ALL_TYPES, allTypes, idType, allCountry, allDelivery }
}
export function setCurrentPage(currentPage) {
  return { type: SET_CURRENT_PAGE, currentPage }
}
export function updateObject(object, indexObject) {
  return { type: UPDATE_OBJECT, object, indexObject }
}
export function initialObject() {
  return { type: INITAL_OBJECT }
}
export function isValidation(isValid) {
  return { type: IS_VALIDATION, isValid }
}
const initialState = {
  amountForm: [1],
  sliceIndex: 0,
  allTypesData: [],
  allCountriesData: [],
  currentPage: 'TYPE_A',
  isValid: false
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
      let value = state.amountForm.push(state.amountForm[state.amountForm.length - 1] + 1);
      return Object.assign({}, state, {
        value
      })
    case SET_SLICE_INDEX:
      console.log(action)
      return Object.assign({}, state, {
        sliceIndex: action.sliceIndex
      })
    case SET_ALL_TYPES:
      return Object.assign({}, state, {
        stateIs: state.allTypesData[action.idType].type = action.allTypes,
        countryIs: state.allTypesData[action.idType].country = action.allCountry,
        deliveryIs: state.allTypesData[action.idType].deliveryCountry = action.allDelivery
      })
    case INITAL_OBJECT:
      state.allTypesData.push({
        id: state.amountForm.length - 1,
        type: '',
        country: '',
        deliveryCountry: ''
      })
    case SET_CURRENT_PAGE:
      return Object.assign({}, state, {
        currentPage: action.currentPage
      })
    case DELETE_AMOUNT_FORMS:
      let newArray = state.amountForm.filter((item, index) => {
        if (item !== action.element) {
          return item;
        }
        state.allTypesData.splice(index, 1)
      })
      return Object.assign({}, state, {
        amountForm: newArray
      })
    case IS_VALIDATION:
      return Object.assign({}, state, {
        isValid: action.isValid
      })
    default:
      return state
  }
}
