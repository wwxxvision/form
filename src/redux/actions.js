import {
    GET_API_PAGE,
    INITIAL_PAGE,
    SET_FIELD_CONFIG,
    SET_FIELD_GROOP,
    DISPATCH_FIELD_VALUE,
    INITIAL_DATA_OBJECT
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
export function setFieldConfig(field) {
    return {
        type: SET_FIELD_CONFIG,
        field
    }
}
export function setFieldGroup(group) {
    return {
        type: SET_FIELD_CONFIG,
        group
    }
}
export function initalDataObject(initial) {
    return {
        type: INITIAL_DATA_OBJECT,
        initial
    }
}
export function dispatchFieldValue(fieldValue, fieldName) {
    return {
        type: DISPATCH_FIELD_VALUE,
        fieldValue,fieldName
    }
}