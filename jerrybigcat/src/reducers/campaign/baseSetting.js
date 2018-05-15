const initialState = {
	campaignId: '',
	sendInterval: 0,
	sendMax: 0,
	timeZoneId: 0,
	scheduleId: 0,

	schedules: [],
}


export const actionTypes = {
	UPDATE_BASE_SETTING_CAMPAIGN_ID:'UPDATE_BASE_SETTING_CAMPAIGN_ID',
	UPDATE_BASE_SETTING_INTERVAL: 'UPDATE_BASE_SETTING_INTERVAL',
	UPDATE_BASE_SETTING_SEND_MAX: 'UPDATE_BASE_SETTING_SEND_MAX',
	UPDATE_BASE_SETTING_TIME_ZONE: 'UPDATE_BASE_SETTING_TIME_ZONE',
	UPDATE_BASE_SETTING_SCHEDULE_ID: 'UPDATE_BASE_SETTING_SCHEDULE_ID',

	SAVE_EMAIL_BASE_SETTING: 'SAVE_EMAIL_BASE_SETTING',
	RESET_EMAIL_BASE_SETTING: 'RESET_EMAIL_BASE_SETTING',

	REQ_SCHEDULE_LIST: 'REQ_SCHEDULE_LIST',
	RES_SCHEDULE_LIST: 'RES_SCHEDULE_LIST',
}

export const actions = {
	updateCampaignId(campaignId) {
		return {type: actionTypes.UPDATE_BASE_SETTING_CAMPAIGN_ID, campaignId}
	},
	updateInterval(sendInterval) {
		return {type: actionTypes.UPDATE_BASE_SETTING_INTERVAL, sendInterval}
	},
	updateSendMax(sendMax) {
		return {type: actionTypes.UPDATE_BASE_SETTING_SEND_MAX, sendMax}
	},
	updateTimeZone(timeZoneId) {
		return {type: actionTypes.UPDATE_BASE_SETTING_TIME_ZONE, timeZoneId}
	},
	updateScheduleId(scheduleId) {
		return {type: actionTypes.UPDATE_BASE_SETTING_SCHEDULE_ID, scheduleId}
	},

	saveBaseSetting(baseSetting) {
		return {type: actionTypes.SAVE_EMAIL_BASE_SETTING, baseSetting}
	},

	resetBaseSetting(baseSetting) {
		return {type: actionTypes.RESET_EMAIL_BASE_SETTING, baseSetting}
	},

	reqSchedules() {
		return {type: actionTypes.REQ_SCHEDULE_LIST}
	},
	resSchedules(schedules) {
		return {type: actionTypes.RES_SCHEDULE_LIST, schedules}
	},
}

export function baseSettingReducer(state = initialState, action) {
	switch(action.type) {
		case actionTypes.UPDATE_BASE_SETTING_CAMPAIGN_ID:
			return {
				...state,
				campaignId: action.campaignId
			}
		case actionTypes.UPDATE_BASE_SETTING_INTERVAL:
			return {
				...state,
				sendInterval: action.sendInterval
			}
		case actionTypes.UPDATE_BASE_SETTING_SEND_MAX:
			return {
				...state,
				sendMax: action.sendMax
			}
		case actionTypes.UPDATE_BASE_SETTING_TIME_ZONE:
			return {
				...state,
				timeZoneId: action.timeZoneId
			}
		case actionTypes.UPDATE_BASE_SETTING_SCHEDULE_ID:
			return {
				...state,
				scheduleId: action.scheduleId
			}
		case actionTypes.RESET_EMAIL_BASE_SETTING:
			return {
				...state,
				campaignId: action.baseSetting.campaignId,
				sendInterval: action.baseSetting.sendInterval,
				sendMax: action.baseSetting.sendMax,
				timeZoneId: action.baseSetting.timeZoneId,
				scheduleId: action.baseSetting.scheduleId || action.baseSetting.timeQuantumId,
			}

		case actionTypes.RES_SCHEDULE_LIST:
			return {
				...state,
				schedules: action.schedules
			}
		default:
			return state		
	}
}
