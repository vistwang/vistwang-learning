const initialState = {
	timeZone: 0,
	overview: null,
	stepOverview: [],
	charts: [],

	startDate: 1516032000000,
	endDate: 1516723702753,
}

export const actionTypes = {
	REQ_CAMPAIGN_STAT: 'REQ_CAMPAIGN_STAT',
	RES_CAMPAIGN_STAT: 'RES_CAMPAIGN_STAT',

	REQ_CAMPAIGN_CHART: 'REQ_CAMPAIGN_CHART',
	RES_CAMPAIGN_CHART: 'RES_CAMPAIGN_CHART',

	UPDATE_STAT_START_TIME: 'UPDATE_STAT_START_TIME',
	UPDATE_STAT_END_TIME: 'UPDATE_STAT_END_TIME',
	UPDATE_STAT_TIME_SLOT: 'UPDATE_STAT_TIME_SLOT',
}


export const actions = {
	reqStatistics(option) {
		return {type: actionTypes.REQ_CAMPAIGN_STAT, option}
	},
	resStatistics(stat) {
		return {type: actionTypes.RES_CAMPAIGN_STAT, stat}
	},

	reqChart(option) {
		return {type: actionTypes.REQ_CAMPAIGN_CHART, option}
	},
	resChart(charts) {
		return {type: actionTypes.RES_CAMPAIGN_CHART, charts}
	},

	updateStartTime(startDate) {
		return {type: actionTypes.UPDATE_STAT_START_TIME, startDate}
	},
	updateEndTime(endDate) {
		return {type: actionTypes.UPDATE_STAT_END_TIME, endDate}
	},
	updateTimeSlot(startDate, endDate) {
		return {type: actionTypes.UPDATE_STAT_TIME_SLOT, startDate, endDate}
	},
}


export function statReducer(state = initialState, action) {
	switch(action.type) {
		case actionTypes.RES_CAMPAIGN_STAT:
			return {
				...state,
				timeZone: action.stat.timeZone,
				overview: action.stat.overview,
				stepOverview: action.stat['step-overview'],
			}
		case actionTypes.RES_CAMPAIGN_CHART:
			return {
				...state,
				charts: action.charts
			}	
		case actionTypes.UPDATE_STAT_TIME_SLOT: 
			return {
				...state,
				startDate: action.startDate,
				endDate: action.endDate,
			}
		default: 
			return state	
	}
}