import { combineReducers } from 'redux'

import { reducer as campaignTmpl } from './campaignTmpl'
import { reducer as campaignCreate } from './campaignCreate'
import { campaignListReducer } from './campaignList'
import { processReducer } from './campaignProcess'
import { screeningReducer } from './screening'
import { autoResponseReducer } from './autoResponse'
import { baseSettingReducer } from './baseSetting'
import { emailReducer } from './email'
import { emailContentReducer } from './emailContent'
import { statReducer } from './stat'
import { inboxReducer } from './inbox'
import { customerReducer } from './customer'
import { groupReducer } from './group'
import { contactReducer } from './contact'
import { replyReducer } from './reply'

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
	campaignList: campaignListReducer,
	campaignProcess: processReducer,
	screening: screeningReducer,
	autoResponse: autoResponseReducer,
	baseSetting: baseSettingReducer,
	email: emailReducer,
	emailContent: emailContentReducer,
	stat: statReducer,
	inbox: inboxReducer,
	customer: customerReducer,
	group: groupReducer,
	contact: contactReducer,
	reply: replyReducer,
	campaignTmpl,
	campaignCreate,
})