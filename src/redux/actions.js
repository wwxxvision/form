import {
    GET_API_PAGE,
    INITIAL_PAGE,
    SET_VALUE,
    IS_ERROR,
    SET_PAGE,
    IS_GOOGLE_API
} from './actionTypes';
export function initialApi(setApi) {
    return {
        type: GET_API_PAGE,
        setApi
    }
}
export function initialPage(pageDerictory) {
    return {
        type: INITIAL_PAGE,
        pageDerictory
    }
}
export function setValue(value, indexGroup, indexElement, typePicker ,typeModel, position) {
    return {
        type: SET_VALUE,
        value, indexGroup, indexElement, typePicker, typeModel, position
    }
}
export function setError(error) {
    return {
        type: IS_ERROR,
        error
    }
}
export function setPage(page) {
    return {
        type: SET_PAGE,
        page
    }
}
export function setGoogleApi(google) {
    return {
        type: IS_GOOGLE_API,
        google
    }
}