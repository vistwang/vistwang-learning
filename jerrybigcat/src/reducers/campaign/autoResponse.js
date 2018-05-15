const initialState = {
	autoResponseSettingModal: false,
	autoResponseActions: [],
	screeningConditions: [],
	autoResponses: [
		// {"type":"open","step":1,"mail_id":1,"action_id":1,"data":1},
  //   {"type":"click","step":2,"mail_id":2,"url":1,"action_id":2,"data":1},
  //   {"type":"reply","step":3,"mail_id":1,"action_id":3,"data":"reply"},
  //   {"type":"unsubscribe","action_id":4,"data":"unsubscribe"},
  //   {"type":"bounce","action_id":5,"data":"707887197@qq.com"},
	],

	editAutoResponseIndex: -1,
	editAutoResponse: {
		type: 'open',
		step: 1,
		mail_id: 1,
		action_id: 1,
		data: 1
	},
}


export const actionTypes = {
	SHOW_AUTO_RESPONSE_SETTING_MODAL: 'SHOW_AUTO_RESPONSE_SETTING_MODAL',
	REQ_CAMPAIGN_AUTO_RESPONSE_ACTIONS: 'REQ_CAMPAIGN_AUTO_RESPONSE_ACTIONS',
	RES_CAMPAIGN_AUTO_RESPONSE_ACTIONS: 'RES_CAMPAIGN_AUTO_RESPONSE_ACTIONS',

	ADD_CAMPAIGN_AUTO_RESPONSE: 'ADD_CAMPAIGN_AUTO_RESPONSE',
	DELETE_CAMPAIGN_AUTO_RESPONSE: 'DELETE_CAMPAIGN_AUTO_RESPONSE',
	UPDATE_CAMPAIGN_AUTO_RESPONSE: 'UPDATE_CAMPAIGN_AUTO_RESPONSE',
	RESET_CAMPAIGN_AUTO_RESPONSES: 'RESET_CAMPAIGN_AUTO_RESPONSES',

	SET_EDIT_AUTO_RESPONSE_INDEX: 'SET_EDIT_AUTO_RESPONSE_INDEX',
	RESET_EDIT_AUTO_RESPONSE: 'RESET_EDIT_AUTO_RESPONSE',
	UPDATE_EDIT_AUTO_RESPONSE: 'UPDATE_EDIT_AUTO_RESPONSE',
}


export const actions = {
	showSettingModal(status) {
		return {type: actionTypes.SHOW_AUTO_RESPONSE_SETTING_MODAL, status}
	},
	reqAutoResponseActions() {
		return {type: actionTypes.REQ_CAMPAIGN_AUTO_RESPONSE_ACTIONS}
	},
	resAutoResponseActions(actions) {
		return {type: actionTypes.RES_CAMPAIGN_AUTO_RESPONSE_ACTIONS, actions}
	},

	addAutoResponse(autoResponse) {
		return {type: actionTypes.ADD_CAMPAIGN_AUTO_RESPONSE, autoResponse}
	},
	deleteAutoResponse(index) {
		return {type: actionTypes.DELETE_CAMPAIGN_AUTO_RESPONSE, index}
	},
	updateAutoResponse(autoResponse, index) {
		return {type: actionTypes.UPDATE_CAMPAIGN_AUTO_RESPONSE, autoResponse, index}
	},
	resetAutoResponses(autoResponses) {
		return {type: actionTypes.RESET_CAMPAIGN_AUTO_RESPONSES, autoResponses}
	},

	setEditAutoResponseIndex(index) {
		return {type: actionTypes.SET_EDIT_AUTO_RESPONSE_INDEX, index}
	},
	resetEditAutoResponse(autoResponse, index) {
		return {type: actionTypes.RESET_EDIT_AUTO_RESPONSE, autoResponse, index}
	},
	updateEditAutoResponse(autoResponse) {
		return {type: actionTypes.UPDATE_EDIT_AUTO_RESPONSE, autoResponse}
	}
}


export function autoResponseReducer(state = initialState, action) {
	switch(action.type) {
		case actionTypes.SHOW_AUTO_RESPONSE_SETTING_MODAL:
			return {
				...state,
				autoResponseSettingModal: action.status
			}
		case actionTypes.RES_CAMPAIGN_AUTO_RESPONSE_ACTIONS:
			return {
				...state,
				autoResponseActions: action.actions
			}
		case actionTypes.ADD_CAMPAIGN_AUTO_RESPONSE:
			return {
				...state,
				autoResponses: [...state.autoResponses, action.autoResponse]
			}		
		case actionTypes.DELETE_CAMPAIGN_AUTO_RESPONSE:
			return {
				...state,
				autoResponses: state.autoResponses.filter((item, i) => i !== action.index)
			}
		case actionTypes.UPDATE_CAMPAIGN_AUTO_RESPONSE:
			let autoResponse = state.autoResponses[action.index]
			return {
				...state,
				autoResponses: !autoResponse ? [...state.autoResponses, action.autoResponse] : [...state.autoResponses.slice(0, action.index), action.autoResponse, ...state.autoResponses.slice(action.index + 1)]
			}
		case actionTypes.RESET_CAMPAIGN_AUTO_RESPONSES:
			return {
				...state,
				autoResponses: action.autoResponses
			}
		case actionTypes.SET_EDIT_AUTO_RESPONSE_INDEX:
			return {
				...state,
				editAutoResponseIndex: action.index
			}
		case actionTypes.RESET_EDIT_AUTO_RESPONSE:
			return {
				...state,
				editAutoResponseIndex: action.index !== undefined ? action.index : -1,
				editAutoResponse: action.autoResponse ? action.autoResponse : initialState.editAutoResponse
			}
		case actionTypes.UPDATE_EDIT_AUTO_RESPONSE:
			return {
				...state,
				editAutoResponse: action.autoResponse
			}
		default:
			return state
	}
}
