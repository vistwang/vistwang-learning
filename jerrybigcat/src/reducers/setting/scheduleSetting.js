const initialState = {
	schedule_id: '',
	title: '',
	time_zone: 252,  // 默认北京时间 252
	schedule_week: {
		'sunday':[],
		'monday':[],
		'tuesday':[],
		'wednesday':[],
		'thursday':[],
		'friday':[],
		'saturday':[],
	},
	schedule_festival: [],
	isFestival:false,
}

export const actionTypes = {

	UPDATE_SCHEDULE_TITLE: 'UPDATE_SCHEDULE_TITLE',
	UPDATE_SCHEDULE_TIME_ZONE: 'UPDATE_SCHEDULE_TIME_ZONE',
	UPDATE_SCHEDULE_WEEK: 'UPDATE_SCHEDULE_WEEK',
	ADD_SCHEDULE_FESTIVAL: 'ADD_SCHEDULE_FESTIVAL',
	REMOVE_SCHEDULE_FESTIVAL: 'REMOVE_SCHEDULE_FESTIVAL',
	UPDATE_IS_FESTIVAL: 'UPDATE_IS_FESTIVAL',

	SAVE_SCHEDULE: 'SAVE_SCHEDULE',
	RESET_SCHEDULE: 'RESET_SCHEDULE',
	SET_SCHEDULE_ID: 'SET_SCHEDULE_ID',

	SAVE_INTERVAL: 'SAVE_INTERVAL',
	REMOVE_INTERVAL: 'REMOVE_INTERVAL',

}


export const actions = {

	updateTitle(title){
		return {
			type: actionTypes.UPDATE_SCHEDULE_TITLE,
			title
		}
	},

	updateTimeZone(timeZone) {
		return {
			type: actionTypes.UPDATE_SCHEDULE_TIME_ZONE,
			timeZone
		}
	},

	updateWeek(week) {
		return {
			type: actionTypes.UPDATE_SCHEDULE_WEEK,
			week
		}
	},

	addFestival(festival) {
		return {
			type: actionTypes.ADD_SCHEDULE_FESTIVAL,
			festival
		}
	},

	removeFestival(festival) {
		return {
			type: actionTypes.REMOVE_SCHEDULE_FESTIVAL,
			festival
		}
	},

	updateIsFestival(status) {
		return {
			type: actionTypes.UPDATE_IS_FESTIVAL,
			status
		}
	},

	saveSchedule(schedule){
		return {
			type: actionTypes.SAVE_SCHEDULE,
			schedule
		}
	},

	resetSchedule(schedule) {
		return {
			type: actionTypes.RESET_SCHEDULE,
			schedule
		}
	},

	setScheduleId(id) {
		return {
			type: actionTypes.SET_SCHEDULE_ID,
			id
		}
	},

	saveInterval(interval, weekDay) {
		return {
			type: actionTypes.SAVE_INTERVAL,
			interval,
			weekDay
		}
	},

	removeInterval(weekDay,index) {
		return {
			type: actionTypes.REMOVE_INTERVAL,
			weekDay,
			index
		}
	},

}


export function scheduleSettingReducer(state = initialState, action) {
	switch(action.type) {
		case actionTypes.UPDATE_SCHEDULE_TITLE:
			return {
				...state,
				title: action.title
			}
		case actionTypes.UPDATE_SCHEDULE_TIME_ZONE:
			return {
				...state,
				time_zone: action.timeZone
			}
		case actionTypes.UPDATE_SCHEDULE_WEEK:
			return {
				...state,
				schedule_week: action.week
			}
		case actionTypes.ADD_SCHEDULE_FESTIVAL:
			return {
				...state,
				schedule_festival: [...state.schedule_festival, action.festival]
			}
		case actionTypes.REMOVE_SCHEDULE_FESTIVAL:
			return {
				...state,
				schedule_festival: state.schedule_festival.filter(v => v !== action.festival)
			}
		case actionTypes.UPDATE_IS_FESTIVAL:
			return {
				...state,
				isFestival: action.status
			}
		case actionTypes.RESET_SCHEDULE:
			let scheduleState 
			if(!action.schedule) {
				scheduleState = initialState
			} else {
				scheduleState = {
					...initialState,
					schedule_id: action.schedule.schedule_id,
					title: action.schedule.title,
					time_zone: action.schedule.time_zone,
					schedule_week: action.schedule.schedule_week,
					schedule_festival: action.schedule.schedule_festival,
				}
			}
			return scheduleState

		case actionTypes.SAVE_INTERVAL:
			return {
				...state,
				schedule_week: {
					...state.schedule_week,
					[action.weekDay]: [...state.schedule_week[action.weekDay], action.interval]
				}
			}
		case actionTypes.REMOVE_INTERVAL:
			let currWeekDay = state.schedule_week[action.weekDay]
			return {
				...state,
				schedule_week: {
					...state.schedule_week,
					[action.weekDay]: currWeekDay.filter((item,i) => i !== action.index)
				}
			}
		default:
			return state
	}
}