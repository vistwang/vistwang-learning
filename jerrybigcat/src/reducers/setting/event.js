import {combineReducers} from 'redux'
import {eventSettingReducer} from './eventSetting'
import {eventInstallReducer} from './eventInstall'

const initialState = {
	eventSettingModal: false,
	eventInstallModal: false,

	eventList: [],
	searchKey: '',

}


export const actionTypes = {
	SHOW_EVENT_SETTING_MODAL: 'SHOW_EVENT_SETTING_MODAL',
	SHOW_EVENT_INSTALL_MODAL: 'SHOW_EVENT_INSTALL_MODAL',
	UPDATE_SEARCH_KEY: 'UPDATE_SEARCH_KEY',

	REQ_EVENT_LIST: 'REQ_EVENT_LIST',
	RES_EVENT_LIST: 'RES_EVENT_LIST',
	REQ_REMOVE_EVENT: 'REQ_REMOVE_EVENT',
	RES_REMOVE_EVENT: 'RES_REMOVE_EVENT',
	MODIFY_EVENT: 'MODIFY_EVENT',
}


export const actions = {
	showEventSettingModal(status) {
		return {
			type: actionTypes.SHOW_EVENT_SETTING_MODAL,
			status
		}
	},

	showEventInstallModal(status) {
		return {
			type: actionTypes.SHOW_EVENT_INSTALL_MODAL,
			status
		}
	},

	updateSearchKey(key) {
		return {
			type: actionTypes.UPDATE_SEARCH_KEY,
			key
		}
	},

	reqEventList() {
		return {
			type: actionTypes.REQ_EVENT_LIST
		}
	},

	resEventList(list) {
		return {
			type: actionTypes.RES_EVENT_LIST,
			list
		}
	},

	reqRemoveEvent(id) {
		return {
			type: actionTypes.REQ_REMOVE_EVENT,
			id
		}
	},

	resRemoveEvent(id) {
		return {
			type: actionTypes.RES_REMOVE_EVENT,
			id
		}
	},

	modifyEvent(event) {
		return {
			type: actionTypes.MODIFY_EVENT,
			event
		}
	},
}


export function eventReducer(state = initialState, action) {
	switch(action.type) {
		case actionTypes.SHOW_EVENT_SETTING_MODAL:
			return {
				...state,
				eventSettingModal: action.status
			}
		case actionTypes.SHOW_EVENT_INSTALL_MODAL:
			return {
				...state,
				eventInstallModal: action.status
			}
		case actionTypes.UPDATE_SEARCH_KEY:
			return {
				...state,
				searchKey: action.key
			}
		case actionTypes.RES_EVENT_LIST:
			return {
				...state,
				eventList: action.list
			}
		case actionTypes.RES_REMOVE_EVENT:
			return {
				...state,
				eventList: state.eventList.filter(item => item.id !== action.id)
			}
		case actionTypes.MODIFY_EVENT:
			const eventList = state.eventList
			let index = eventList.findIndex(item => item.id === action.event.id)
			return {
				...state,
				eventList: index === -1 ? [...eventList, action.event] : [...eventList.slice(0,index), action.event, ...eventList.slice(index + 1)]
			}
		default: 
			return state
	}
}

export default combineReducers({
	eventGlobal: eventReducer,
	eventSetting: eventSettingReducer,
	eventInstall: eventInstallReducer,
})