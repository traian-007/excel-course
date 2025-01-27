import {APPLY_STYLE, CHANGE_TEXT, TABLE_RESIZE} from './types'
import {CHANGE_STYLES, CHANGE_TITLE, UPDATE_DATE} from '@/redux/types';
// Action Creator
export function tableResize(data) {
    return {
        type: TABLE_RESIZE,
        data
    }
}
export function changeText(data) {
    return {
        type: CHANGE_TEXT,
        data
    }
}
export function updateDate() {
    return {
        type: UPDATE_DATE
    }
}
export function changeStyles(data) {
    return {
        type: CHANGE_STYLES,
        data
    }
}
export function applySyle(data) {
    return {
        type: APPLY_STYLE,
        data
    }
}
export function changeTitle(data) {
    return {
        type: CHANGE_TITLE,
        data
    }
}
