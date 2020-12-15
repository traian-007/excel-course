import {CHANGE_TEXT, CHANGE_STYLES, TABLE_RESIZE, APPLY_STYLE} from './types'
import {CHANGE_TITLE, UPDATE_DATE} from '@/redux/types';

export function rootReducer(state, action) {
    let field
    let val
    // console.log('Action.data:', action.data.type)
    switch (action.type) {
        case TABLE_RESIZE:
            field = action.data.type === 'col' ? 'colState' :'rowState'
            // console.log('field:', action.data.value)
            return {...state, [field]: value(state, field, action)}
            // colstate,rowstate = [field]
            // id,value, type(in data.type)
        case CHANGE_TEXT:
            field = 'dataState'
            // console.log({...state})
            return {...state, currentText:
                action.data.value, dataState: value(state, field, action)}
        case CHANGE_STYLES:
            return {...state, currentStyles: action.data}
        case APPLY_STYLE:
            field = 'stylesState'
            val = state[field] || {}
            action.data.ids.forEach(id => {
                val[id] = {...val[id], ...action.data.value}
            })
            // console.log('stylesState : ', state.stylesState)
            // console.log('currentStyles : ', state.currentStyles)
            return {
            ...state,
                [field]: val,
                currentStyles: {...state.currentStyles, ...action.data.value}
            }
        case CHANGE_TITLE:
            return {...state, title: action.data}
        case UPDATE_DATE:
            return {...state, openedDate: new Date().toJSON()}
        default: return state
    }
}
function value(state, field, action) {
    const val = {...state[field]} || {}
    val[action.data.id] = action.data.value
    return val
}
