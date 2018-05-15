const initialState = {
	settingStep: 1,
	customEventTab: 1,
	addEvents: [{
		id: '',
		uniqueId: '',
    name: '',
    type: 2,
    description: '',
    website: ''
	}],
	sampleEvents: []
}

export const actionTypes = {
	UPDATE_EVENT_SETTING_STEP: 'UPDATE_EVENT_SETTING_STEP',
	UPDATE_EVENT_TAB: 'UPDATE_EVENT_TAB',
	ADD_EVENT: 'ADD_EVENT',
	UPDATE_EVENT: 'UPDATE_EVENT',

	SAVE_EVENT: 'SAVE_EVENT',
	RESET_EVENT: 'RESET_EVENT',
	SET_EVENT_ID: 'SET_EVENT_ID',
}

export const actions = {
	updateSettingStep(step) {
		return {
			type: actionTypes.UPDATE_EVENT_SETTING_STEP,
			step
		}
	},

	updateEventTab(tab) {
		return {
			type: actionTypes.UPDATE_EVENT_TAB,
			tab
		}
	},

	addEvent(event) {
		return {
			type: actionTypes.ADD_EVENT,
			event
		}
	},

	updateEvent(event, index) {
		return {
			type: actionTypes.UPDATE_EVENT,
			event,
			index
		}
	},

	saveEvent(event,id, index) {
		return {
			type: actionTypes.SAVE_EVENT,
			event,
			id,
			index
		}
	},

	resetEvent(event) {
		return {
			type: actionTypes.RESET_EVENT,
			event
		}
	},

	setEventId(id, index){
		return {
			type: actionTypes.SET_EVENT_ID,
			id,
			index
		}
	},
}


export function eventSettingReducer(state = initialState, action) {
	switch(action.type) {
		case actionTypes.UPDATE_EVENT_SETTING_STEP:
			return {
				...state,
				settingStep: action.step
			}
		case actionTypes.UPDATE_EVENT_TAB:
			return {
				...state,
				customEventTab: action.tab
			}
		case actionTypes.ADD_EVENT:
			return {
				...state,
				addEvents: [...state.addEvents, action.event]
			}
		case actionTypes.UPDATE_EVENT:
			return {
				...state,
				addEvents: [
					...state.addEvents.slice(0, action.index),
					action.event,
					...state.addEvents.slice(action.index + 1)
				]
			}
		case actionTypes.RESET_EVENT:
			let eventState
			if(!action.event) {
				eventState = initialState
			} else {
				eventState = {
					...state,
					settingStep: 2,
					addEvents: [{
						id: action.event.id,
						uniqueId: action.event.uniqueId,
				    name: action.event.name,
				    type: action.event.type,
				    description: action.event.description,
				    website: '',
					}]
				}
			}
			return eventState
		case actionTypes.SET_EVENT_ID:
			let getEvents = state.addEvents.slice(action.index,action.index + 1)
			let currEvent = getEvents[0]
			currEvent.id = action.id
			return {
				...state,
				addEvents: [...state.addEvents.slice(0, action.index), currEvent, ...state.addEvents.slice(action.index + 1)]
			}
		default: 
			return state
	}
}