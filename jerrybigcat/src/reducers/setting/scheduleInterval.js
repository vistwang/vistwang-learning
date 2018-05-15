const initialState = {
	weekDay:'sunday',
	sDayClassify: 'am',
	sHour: '8',
	sMinute: '00',
	eDayClassify: 'am',
	eHour: '8',
	eMinute: '00',


}


export const actionTypes = {
	UPDATE_START_DAY_CLASSIFY: 'UPDATE_START_DAY_CLASSIFY',
	UPDATE_START_HOUR: 'UPDATE_START_HOUR',
	UPDATE_START_MINUTE: 'UPDATE_START_MINUTE',
	UPDATE_END_DAY_CLASSIFY: 'UPDATE_END_DAY_CLASSIFY',
	UPDATE_END_HOUR: 'UPDATE_END_HOUR',
	UPDATE_END_MINUTE: 'UPDATE_END_MINUTE',

	SET_WEEK_DAY: 'SET_WEEK_DAY',
	RESET_INTERVAL: 'RESET_INTERVAL',
}


export const actions = {
	updateSDayClassify(classify) {
		return {
			type: actionTypes.UPDATE_START_DAY_CLASSIFY,
			classify
		}
	},
	updateSHour(hour) {
		return {
			type: actionTypes.UPDATE_START_HOUR,
			hour
		}
	},
	updateSMinute(minute) {
		return {
			type: actionTypes.UPDATE_START_MINUTE,
			minute
		}
	},
	updateEDayClassify(classify) {
		return {
			type: actionTypes.UPDATE_END_DAY_CLASSIFY,
			classify
		}
	},
	updateEHour(hour) {
		return {
			type: actionTypes.UPDATE_END_HOUR,
			hour
		}
	},
	updateEMinute(minute) {
		return {
			type: actionTypes.UPDATE_END_MINUTE,
			minute
		}
	},

	setWeekDay(weekDay) {
		return {
			type: actionTypes.SET_WEEK_DAY,
			weekDay
		}
	},

	resetInterval(interval) {
		return {
			type: actionTypes.RESET_INTERVAL,
			interval,
		}
	}
}


export function scheduleIntervalReducer(state = initialState, action) {
	switch(action.type) {
		case actionTypes.UPDATE_START_DAY_CLASSIFY:
			return {
				...state,
				sDayClassify: action.classify
			}
		case actionTypes.UPDATE_START_HOUR:
			return {
				...state,
				sHour: action.hour
			}
		case actionTypes.UPDATE_START_MINUTE:
			return {
				...state,
				sMinute: action.minute
			}
		case actionTypes.UPDATE_END_DAY_CLASSIFY:
			return {
				...state,
				eDayClassify: action.classify
			}
		case actionTypes.UPDATE_END_HOUR:
			return {
				...state,
				eHour: action.hour
			}
		case actionTypes.UPDATE_END_MINUTE:
			return {
				...state,
				eMinute: action.minute
			}
		case actionTypes.SET_WEEK_DAY:
			return {
				...state,
				weekDay: actionTypes.weekDay
			}
		case actionTypes.RESET_INTERVAL:
			return {
				...initialState,
				...action.interval
			}
		default:
			return state
	}
}