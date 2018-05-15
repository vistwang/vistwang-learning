const initialState = {
	profile_id: 0,
	account_id: '',
	schedule_id: 0,
	schedule_name: '',


	deliveryInterval: 0,
	sendMax: 0,
	blacklist: [],
	timeZone: 0,
	pushType: {
		day: false,
		week: false,
		month: false
	},
	pushEmail: [],

}


export const actionTypes = {
	UPDATE_DELIVERY_INTERVAL: 'UPDATE_DELIVERY_INTERVAL',
	UPDATE_SEND_MAX: 'UPDATE_SEND_MAX',
	UPDATE_BACKLIST: 'UPDATE_BACKLIST',
	UPDATE_TIME_ZONE: 'UPDATE_TIME_ZONE',
	UPDATE_PUSH_TYPE: 'UPDATE_PUSH_TYPE',
	UPDATE_PUSH_EMAIL: 'UPDATE_PUSH_EMAIL',

	REQ_ACCOUNT_SET: 'REQ_ACCOUNT_SET',
	RES_ACCOUNT_SET: 'RES_ACCOUNT_SET',
	SAVE_ACCOUNT_SET: 'SAVE_ACCOUNT_SET',
}

export const actions = {
	updateDeliveryInterval(interval) {
		return {
			type: actionTypes.UPDATE_DELIVERY_INTERVAL,
			interval
		}
	},

	updateSendMax(max){
		return {
			type: actionTypes.UPDATE_SEND_MAX,
			max
		}
	},

	updateBacklist(blacklist) {
		return {
			type: actionTypes.UPDATE_BACKLIST,
			blacklist
		}
	},

	updateTimeZone(timeZone) {
		return {
			type: actionTypes.UPDATE_TIME_ZONE,
			timeZone
		}
	},

	updatePushType(pushType) {
		return {
			type: actionTypes.UPDATE_PUSH_TYPE,
			pushType
		}
	},

	updatePushEmail(pushEmail) {
		return {
			type: actionTypes.UPDATE_PUSH_EMAIL,
			pushEmail
		}
	},

	reqAccountSet() {
		return {type: actionTypes.REQ_ACCOUNT_SET}
	},

	resAccountSet(accountSet) {
		return {type: actionTypes.RES_ACCOUNT_SET, accountSet}
	},

	saveAccountSet(set) {
		return {
			type: actionTypes.SAVE_ACCOUNT_SET,
			set
		}
	}
}

export function emailReducer(state = initialState, action) {
	switch(action.type) {
		case actionTypes.UPDATE_DELIVERY_INTERVAL:
			return {
				...state,
				deliveryInterval: action.interval
			}
		case actionTypes.UPDATE_SEND_MAX:
			return {
				...state,
				sendMax: action.max
			}
		case actionTypes.UPDATE_BACKLIST:
			return {
				...state,
				blacklist: [...action.blacklist]
			}
		case actionTypes.UPDATE_TIME_ZONE:
			return {
				...state,
				timeZone: action.timeZone
			}
		case actionTypes.UPDATE_PUSH_TYPE:
			return {
				...state,
				pushType: action.pushType
			}
		case actionTypes.UPDATE_PUSH_EMAIL:
			return {
				...state,
				pushEmail: action.pushEmail
			}
		case actionTypes.RES_ACCOUNT_SET:
			const blacklist = action.accountSet.blacklist ? action.accountSet.blacklist.split(',') : []
			const pushEmail = action.accountSet.report_push_email ? action.accountSet.report_push_email.split(',') : []
			const pushType = action.accountSet.report_push_type ? action.accountSet.report_push_type.split(',') : []
			return {
				...state,
				profile_id: action.accountSet.profile_id,
				account_id: action.accountSet.account_id,
				schedule_id: action.accountSet.schedule_id,
				schedule_name: action.accountSet.schedule_name,

				deliveryInterval: action.accountSet.delivery_interval || 0,
				sendMax: action.accountSet.send_max || 0,
				blacklist: blacklist,
				timeZone: action.accountSet.time_zone || 0,
				pushType: {
					day: pushType.indexOf('day') !== -1,
					week: pushType.indexOf('week') !== -1,
					month: pushType.indexOf('month') !== -1
				},
				pushEmail: pushEmail,
			}
		default:
			return state
	}
} 

export default emailReducer