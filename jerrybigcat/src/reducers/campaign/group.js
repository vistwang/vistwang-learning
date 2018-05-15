const initialState = {
	groups: [],

	groupModal: false,
	searchKey: '',
}

export const actionTypes = {
	REQ_CONTACT_GROUPS: 'REQ_CONTACT_GROUPS',
	RES_CONTACT_GROUPS: 'RES_CONTACT_GROUPS',

	REQ_GROUP_PUT_CONTACT: 'REQ_GROUP_PUT_CONTACT',
	RES_GROUP_PUT_CONTACT: 'RES_GROUP_PUT_CONTACT',
	REQ_GROUP_REMOVE_CONTACT: 'REQ_GROUP_REMOVE_CONTACT',
	RES_GROUP_REMOVE_CONTACT: 'RES_GROUP_REMOVE_CONTACT',

	SHOW_CONTACT_GROUP_MODAL: 'SHOW_CONTACT_GROUP_MODAL',
	UPDATE_CONTACT_GROUP_SEARCH_KEY: 'UPDATE_CONTACT_GROUP_SEARCH_KEY',
}

export const actions = {
	reqGroups(scope, groupType) {
		return {type: actionTypes.REQ_CONTACT_GROUPS, scope, groupType}
	},
	resGroups(groups, scope, groupType) {
		return {type: actionTypes.RES_CONTACT_GROUPS, groups, scope, groupType}
	},

	reqGroupPutContact(option) {
		return {type: actionTypes.REQ_GROUP_PUT_CONTACT, option}
	},
	resGroupPutContact(group) {
		return {type: actionTypes.RES_GROUP_PUT_CONTACT, group}
	},
	reqGroupRemoveContact(option) {
		return {type: actionTypes.REQ_GROUP_REMOVE_CONTACT, option}
	},
	resGroupRemoveContact(option) {
		return {type: actionTypes.RES_GROUP_REMOVE_CONTACT, option}
	},


	showGroupModal(status) {
		return {type: actionTypes.SHOW_CONTACT_GROUP_MODAL, status}
	},
	updateGroupKey(searchKey) {
		return {type: actionTypes.UPDATE_CONTACT_GROUP_SEARCH_KEY, searchKey}
	},

}


export function groupReducer(state = initialState, action) {
	switch(action.type) {
		case actionTypes.RES_CONTACT_GROUPS:
			return {
				...state,
				groups: action.groups.list
			}
		case actionTypes.RES_GROUP_PUT_CONTACT: {

			return {
				...state,
			}
		}
		case actionTypes.RES_GROUP_REMOVE_CONTACT: {
			return {
				...state,
			}
		}
		case actionTypes.SHOW_CONTACT_GROUP_MODAL:
			return {
				...state,
				groupModal: action.status
			}
		case actionTypes.UPDATE_CONTACT_GROUP_SEARCH_KEY:
			return {
				...state,
				searchKey: action.searchKey
			}
		default: 
			return state
	}
}