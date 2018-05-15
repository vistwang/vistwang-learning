const initialState = {
	queryTerms: null,
	queryContacts: [],
	queryTotalCount: 0,
	queryConditions: [
		[{
        "condition": "name",
        "operation": 22,
        "type": 2,
        "origin": true,
        "scope": 1,
        "value": []
    }]
	],

	conditionNameModal: false,
	conditionName: '',

	conditionDeleteModal: false,
	conditionDeleteIndex: -1,
	conditionDeleteGroupIndex: -1,
}


export const actionTypes = {
	REQ_QUERY_TERMS: 'REQ_QUERY_TERMS',
	RES_QUERY_TERMS: 'RES_QUERY_TERMS',

	REQ_QUERY_CONTACTS: 'REQ_QUERY_CONTACTS',
	RES_QUERY_CONTACTS: 'RES_QUERY_CONTACTS',

	REQ_QUERY_CONDITIONS: 'REQ_QUERY_CONDITIONS',
	RES_QUERY_CONDITIONS: 'RES_QUERY_CONDITIONS',

	SHOW_QUERY_CONDITION_NAME_MODAL: 'SHOW_QUERY_CONDITION_NAME_MODAL',
	UPDATE_QUERY_CONDITION_NAME: 'UPDATE_QUERY_CONDITION_NAME',

	SHOW_QUERY_CONDTIION_DELETE_MODAL: 'SHOW_QUERY_CONDTIION_DELETE_MODAL',
	UPDATE_QUERY_CONDITION_DELETE_INDEX: 'UPDATE_QUERY_CONDITION_DELETE_INDEX',

	ADD_QUERY_CONDITION_GROUP: 'ADD_QUERY_CONDITION_GROUP',

	ADD_QUERY_CONDITION: 'ADD_QUERY_CONDITION',
	UPDATE_QUERY_CONDITION: 'UPDATE_QUERY_CONDITION',
	DELETE_QUERY_CONDITION: 'DELETE_QUERY_CONDITION',

	RESET_QUERY_CONDITIONS: 'RESET_QUERY_CONDITIONS',
}


export const actions = {
	reqQueryTerms() {
		return {type: actionTypes.REQ_QUERY_TERMS}
	},
	resQueryTerms(queryTerms) {
		return {type: actionTypes.RES_QUERY_TERMS, queryTerms}
	},

	reqQueryContacts(conditionsStr, page = 1, limit = 20) {
		return {type: actionTypes.REQ_QUERY_CONTACTS, page, limit, conditionsStr}
	},
	resQueryContacts(queryContacts) {
		return {type: actionTypes.RES_QUERY_CONTACTS, queryContacts}
	},

	reqQueryConditions(id, isQueryContacts) {
		return {type: actionTypes.REQ_QUERY_CONDITIONS, id, isQueryContacts}
	},

	resQueryConditions(conditions) {
		return {type: actionTypes.RES_QUERY_CONDITIONS, conditions}
	},

	showConditionNameModal(status) {
		return {type: actionTypes.SHOW_QUERY_CONDITION_NAME_MODAL, status}
	},	

	updateQueryConditionName(name) {
		return {type: actionTypes.UPDATE_QUERY_CONDITION_NAME, name}
	},

	showConditionDeleteModal(status) {
		return {type: actionTypes.SHOW_QUERY_CONDTIION_DELETE_MODAL, status}
	},

	updateConditionDeleteIndex(conditionIndex, conditionGroupIndex) {
		return {type: actionTypes.UPDATE_QUERY_CONDITION_DELETE_INDEX, conditionIndex, conditionGroupIndex}
	},

	addQueryConditionGroup(conditionGroup) {
		return {type: actionTypes.ADD_QUERY_CONDITION_GROUP, conditionGroup}
	},

	addQueryCondition(condition, groupIndex) {
		return {type: actionTypes.ADD_QUERY_CONDITION, condition, groupIndex}
	},

	updateQueryCondition(condition, index, groupIndex) {
		return {type: actionTypes.UPDATE_QUERY_CONDITION, condition, index, groupIndex}
	},

	deleteQueryCondition(index, groupIndex) {
		return {type: actionTypes.DELETE_QUERY_CONDITION, index, groupIndex}
	},

	resetQueryConditions(queryConditions) {
		return {type: actionTypes.RESET_QUERY_CONDITIONS, queryConditions}
	},
}

export function screeningReducer(state = initialState, action) {
	switch(action.type) {
		case actionTypes.RES_QUERY_TERMS:
			return {
				...state,
				queryTerms: action.queryTerms
			}
		case actionTypes.RES_QUERY_CONTACTS:
			return {
				...state,
				queryTotalCount: action.queryContacts.total,
				queryContacts: action.queryContacts.list,
			}
		case actionTypes.RES_QUERY_CONDITIONS: {
			let queryConditions = []
			if(action.conditions && action.conditions.queryCondition) {
				let targetCondition = JSON.parse(action.conditions.queryCondition) || []
				queryConditions = targetCondition.map(v => JSON.parse(v))
			}
			return {
				...state,
				queryConditions,
				conditionName: action.conditions.name
			}
		}
		case actionTypes.SHOW_QUERY_CONDITION_NAME_MODAL:
			return {
				...state,
				conditionNameModal: action.status
			}
		case actionTypes.UPDATE_QUERY_CONDITION_NAME:
			return {
				...state,
				conditionName: action.name
			}
		case actionTypes.SHOW_QUERY_CONDTIION_DELETE_MODAL:
			return {
				...state,
				conditionDeleteModal: action.status
			}
		case actionTypes.UPDATE_QUERY_CONDITION_DELETE_INDEX:
			return {
				...state,
				conditionDeleteIndex: action.conditionIndex,
				conditionDeleteGroupIndex: action.conditionGroupIndex,
			}
		case actionTypes.ADD_QUERY_CONDITION_GROUP:
			return {
				...state,
				queryConditions: [...state.queryConditions, action.conditionGroup]
			}

		case actionTypes.ADD_QUERY_CONDITION: 
			return {
				...state,
				queryConditions: [
					...state.queryConditions.slice(0, action.groupIndex),
					[...state.queryConditions[action.groupIndex], action.condition],
					...state.queryConditions.slice(action.groupIndex + 1)
				]
			}
		case actionTypes.UPDATE_QUERY_CONDITION:
			let conditionGroup = state.queryConditions[action.groupIndex]
			return {
				...state,
				queryConditions: [
					...state.queryConditions.slice(0, action.groupIndex),
					[...conditionGroup.slice(0, action.index), action.condition, ...conditionGroup.slice(action.index + 1)],
					...state.queryConditions.slice(action.groupIndex + 1)
				]
			}
		case actionTypes.DELETE_QUERY_CONDITION: {
			const filterConditions = state.queryConditions[action.groupIndex].filter((item, i) => i !== action.index)
			let queryConditions = []
			if(filterConditions.length === 0) {
				queryConditions = [
					...state.queryConditions.slice(0, action.groupIndex),
					...state.queryConditions.slice(action.groupIndex + 1)
				]
			} else {
				queryConditions = [
					...state.queryConditions.slice(0, action.groupIndex),
					filterConditions,
					...state.queryConditions.slice(action.groupIndex + 1)
				]
			}
			return {
				...state,
				queryConditions
			}
		}
		case actionTypes.RESET_QUERY_CONDITIONS:
			return {
				...state,
				queryConditions: action.queryConditions
			}
		default: 
			return state
	}
}