// import {storage} from '@core/utils';
import {defaultStyles, defaultTitle} from '@/constants';

const defaultState = {
    title: defaultTitle,
    rowState: {},
    colState: {},
    dataState: {}, // {'0:1': 'fdksfj'
    stylesState: {},
    currentText: '',
    currentStyles: defaultStyles,
    openedDate: new Date().toJSON()
}
const normalize = state => ({
    ...state,
    currentStyles: defaultStyles,
    currentText: ''
})
// export const initialState = storage('excel-state')
//     ? normalize(storage('excel-state'))
//     : defaultState
export function normalizeInitialState(state) {
    return state ? normalize(state) : defaultState
    // clone(defaultState) from utils
}
