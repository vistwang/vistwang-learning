import {combineReducers} from 'redux'
import { scheduleSettingReducer } from './scheduleSetting'
import { scheduleIntervalReducer } from './scheduleInterval'

const initialState = {
	scheduleSettingModal: false,
	intervalSettingModal: false,
	scheduleList: [],

}

export const actionTypes = {
	SHOW_SCHEDULE_SETTING_MODAL: 'SHOW_SCHEDULE_SETTING_MODAL',
	SHOW_INTERVAL_SETTING_MODAL: 'SHOW_INTERVAL_SETTING_MODAL',
	REQ_SCHEDULE_LIST: 'REQ_SCHEDULE_LIST',
	RES_SCHEDULE_LIST: 'RES_SCHEDULE_LIST',

	REQ_REMOVE_SCHEDULE: 'REQ_REMOVE_SCHEDULE',
	RES_REMOVE_SCHEDULE: 'RES_REMOVE_SCHEDULE',

	REQ_SETTING_SCHEDULE_DEFAULT: 'REQ_SETTING_SCHEDULE_DEFAULT',
	RES_SETTING_SCHEDULE_DEFAULT: 'RES_SETTING_SCHEDULE_DEFAULT',

	MODIFY_SCHEDULE: 'MODIFY_SCHEDULE',
}


export const actions = {
	showSettingModal(status){
		return {
			type: actionTypes.SHOW_SCHEDULE_SETTING_MODAL,
			status
		}
	},

	showIntervalModal(status){
		return {
			type: actionTypes.SHOW_INTERVAL_SETTING_MODAL,
			status
		}
	},

	reqScheduleList() {
		return {
			type: actionTypes.REQ_SCHEDULE_LIST
		}
	},

	resScheduleList(list) {
		return {
			type: actionTypes.RES_SCHEDULE_LIST,
			list
		}
	},

	reqRemoveSchedule(id) {
		return {
			type: actionTypes.REQ_REMOVE_SCHEDULE,
			id
		}
	},

	resRemoveSchedule(id) {
		return {
			type: actionTypes.RES_REMOVE_SCHEDULE,
			id
		}
	},

	reqSettingDefault(id, isDefault = true) {
		return {type: actionTypes.REQ_SETTING_SCHEDULE_DEFAULT, id, isDefault}
	},

	resSettingDefault(id, isDefault = true) {
		return {type: actionTypes.RES_SETTING_SCHEDULE_DEFAULT, id, isDefault}
	},

	modifySchedule(schedule){
		return {
			type: actionTypes.MODIFY_SCHEDULE,
			schedule
		}
	}

}


export function scheduleReducer(state = initialState, action) {
	switch(action.type) {
		case actionTypes.SHOW_SCHEDULE_SETTING_MODAL:
			return {
				...state,
				scheduleSettingModal: action.status
			}
		case actionTypes.SHOW_INTERVAL_SETTING_MODAL:
			return {
				...state,
				intervalSettingModal: action.status
			}
		case actionTypes.RES_SCHEDULE_LIST:
			return {
				...state,
				scheduleList: action.list
			}
		case actionTypes.RES_REMOVE_SCHEDULE:
			return {
				...state,
				scheduleList: state.scheduleList.filter(item => item.schedule_id !== action.id)
			}
		case actionTypes.RES_SETTING_SCHEDULE_DEFAULT:
			return {
				...state,
				scheduleList: state.scheduleList.map(item => {
					if(item.schedule_id === action.id) {
						item.default = true
					} else {
						item.default = false
					}
					return item
				})
			}
		case actionTypes.MODIFY_SCHEDULE:
			const scheduleList = state.scheduleList
			const index = scheduleList.findIndex(item => item.schedule_id === action.schedule.schedule_id)
			return {
				...state,
				scheduleList: index === -1 ? [...scheduleList, action.schedule] : [...scheduleList.slice(0, index), action.schedule, ...scheduleList.slice(index + 1)]
			}
		default:
			return state
	}
}

export default combineReducers({
	scheduleGlobal: scheduleReducer,
	scheduleSetting: scheduleSettingReducer,
	scheduleInterval: scheduleIntervalReducer,
})