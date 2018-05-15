import { combineReducers } from 'redux'

import field from './field'
import email from './email'
import emailAccount from './emailAccount'
import event from './event'
import schedule from './schedule'

const initState = {
	isFetching: false,
	message: {
		type: 1,
		content: ''
	},
	timeZones: []
}

export const actionTypes = {
	FETCH_START: 'FETCH_START',
	FETCH_END: 'FETCH_END',
	SET_MESSAGE: 'SET_MESSAGE',
	CLEAR_MESSAGE: 'CLEAR_MESSAGE',

	REQ_TIME_ZONE: 'REQ_TIME_ZONE',
	RES_TIME_ZONE: 'RES_TIME_ZONE',
}

export const actions = {
	fetchStart() {
		return {
			type: actionTypes.FETCH_START
		}
	},
	fetchEnd() {
		return {
			type: actionTypes.FETCH_END
		}
	},
	setMessage(msgContent, msgType = 1) {
		return {
			type: actionTypes.SET_MESSAGE,
			msgType,
			msgContent
		}
	},
	clearMessage() {
		return {
			type: actionTypes.CLEAR_MESSAGE
		}
	},

	reqTimeZone() {
		return {
			type: actionTypes.REQ_TIME_ZONE
		}
	},
	resTimeZone(timeZones) {
		return {
			type: actionTypes.RES_TIME_ZONE,
			timeZones
		}
	}
}


export function reducer(state = initState, action) {	
	switch(action.type) {
		case actionTypes.FETCH_START:
			return {
				...state,
				isFetching: true
			}
		case actionTypes.FETCH_END:
			return {
				...state,
				isFetching: false
			}
		case actionTypes.SET_MESSAGE:
			return {
				...state,
				isFetching:false,
				message: {
					type: action.msgType,
					content: action.msgContent
				}
			}
		case actionTypes.CLEAR_MESSAGE:
			return {
				...state,
				message: {
					type: 1,
					content: ''
				}
			}
		case actionTypes.RES_TIME_ZONE:
			return {
				...state,
				timeZones: action.timeZones
			}
		default: 
			return state
	}
}

export default combineReducers({
	globalState: reducer,
	email,
	emailAccount,
	field,
	event,
	schedule,
})