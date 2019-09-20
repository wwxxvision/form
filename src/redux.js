const ADD_VALUE = 'ADD_VALUE';
const GET_API = 'GET_API';
const ADD_DELIVERY = 'ADD_DELIVERY';

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
const initialState = {
  app: [],
  resolutionArr: [],
  deliveryArr: []
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
    default:
      return state
  }
}
