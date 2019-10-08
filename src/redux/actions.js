import {
    GET_API_PAGE,
    INITIAL_PAGE,
    SET_FIELD_CONFIG,
    SET_FIELD_GROOP,
    DISPATCH_FIELD_VALUE,
    INITIAL_DATA_OBJECT,
    RENDER_BLOCKS,
    SET_VALUE,
    IS_ERROR,
    SET_PAGE
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
export function setFieldGroup(group, isAdd ,addIndex) {
    return {
        type: SET_FIELD_GROOP,
        group, isAdd, addIndex
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
        fieldValue, fieldName
    }
}
export function renderBlock(render, key, keyGroup) {
    return {
        type: RENDER_BLOCKS,
        render, key, keyGroup
    }
}
export function upSizeGroup(upSize, idGroup) {
    return {
        type: RENDER_BLOCKS,
        upSize, idGroup
    }
}
export function setValue(value, indexGroup, indexElement, typePicker) {
    return {
        type: SET_VALUE,
        value, indexGroup, indexElement, typePicker
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