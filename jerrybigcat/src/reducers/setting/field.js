import { combineReducers } from 'redux'
import {newPropertyReducer} from './fieldNewProperty'

import { PropertyScopes } from '../../base/enums'
import { SysContact } from '../../base/system'

const initialState = {
	contactFieldList: [],
	companyFieldList: [],
	searchKey: '',
	currentScope: PropertyScopes.CONTACT,
	showPropertyModal: false
}

export const actionTypes = {
	SET_TAB: 'SET_TAB',
	SHOW_PROPERTY_MODAL: 'SHOW_PROPERTY_MODAL',
	GET_FIELD_LIST: 'GET_FIELD_LIST',
	RESPONSE_FIELD_LIST: 'RESPONSE_FIELD_LIST',
	REQ_DELETE_PROPERTY: 'REQ_DELETE_PROPERTY',
	RES_DELETE_PROPERTY: 'RES_DELETE_PROPERTY',
	MODIFY_PROPERTY: 'MODIFY_PROPERTY',
	UPDATE_SEARCH_KEY: 'UPDATE_SEARCH_KEY'
}

export const actions = {
	setTab(scope){
		return {
			type: actionTypes.SET_TAB,
			scope
		}
	},
	setPropertyModal(status) {
		return {
			type: actionTypes.SHOW_PROPERTY_MODAL,
			status
		}
	},

	getFieldList:(scope) => ({
			type: actionTypes.GET_FIELD_LIST,
			scope
	}),

	responseFieldList: (data) => ({
		type: actionTypes.RESPONSE_FIELD_LIST,
		list: data
	}),

	reqDeleteProperty(id) {
		return {
			type: actionTypes.REQ_DELETE_PROPERTY,
			id
		}
	},

	resDeleteProperty(id) {
		return {
			type: actionTypes.RES_DELETE_PROPERTY,
			id
		}
	},

	modifyProperty(property) {
		return {
			type: actionTypes.MODIFY_PROPERTY,
			property
		}
	},

	updateSearchKey(key) {
		return {
			type: actionTypes.UPDATE_SEARCH_KEY,
			key
		}
	}
}

const getCurrentListName = (state) => {
	const scopeKey = SysContact.filter.propertyScopeKeys[state.currentScope]
	return `${scopeKey}FieldList`
}

export function reducer(state = initialState, action) {
	let fieldListName, fieldList
	switch(action.type) {
		case actionTypes.RESPONSE_FIELD_LIST:
			fieldListName = getCurrentListName(state)
			return {
				...state,
				[fieldListName]: [...action.list]
			}
		case actionTypes.RES_DELETE_PROPERTY:
			fieldListName = getCurrentListName(state)
			return {
				...state,
				[fieldListName]: state[fieldListName].filter(item => item.id !== action.id)
			}
		case actionTypes.SET_TAB:
			return {
				...state,
				currentScope: action.scope
			}
		case actionTypes.SHOW_PROPERTY_MODAL:
			return {
				...state,
				showPropertyModal: action.status
			}
		case actionTypes.MODIFY_PROPERTY:
			fieldListName = getCurrentListName(state)
			fieldList = state[fieldListName]
			const property = action.property
			const index = fieldList.findIndex(item => item.id === property.id)
			return {
				...state,
				[fieldListName]: index === -1 ? [property, ...fieldList] : [...fieldList.slice(0, index), property, ...fieldList.slice(index + 1)]
			}
		case actionTypes.UPDATE_SEARCH_KEY:
			return {
				...state,
				searchKey: action.key
			}
		default: 
			return state
	}
}

export default combineReducers({
	fieldGlobal: reducer,
	newProperty: newPropertyReducer
})
