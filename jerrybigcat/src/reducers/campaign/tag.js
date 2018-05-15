const initialState = {
	tagAll: [],

	tagModal: false,
	searchKey: '',
}

export const actionTypes = {
	REQ_TAG_ALL: 'REQ_TAG_ALL',
	RES_TAG_ALL: 'RES_TAG_ALL',
	REQ_TAG_PUT_CONTACT: 'REQ_TAG_PUT_CONTACT',
	RES_TAG_PUT_CONTACT: 'RES_TAG_PUT_CONTACT',
	REQ_TAG_REMOVE_CONTACT: 'REQ_TAG_REMOVE_CONTACT',
	RES_TAG_REMOVE_CONTACT: 'RES_TAG_REMOVE_CONTACT',

	SHOW_CONTACT_TAG_MODAL: 'SHOW_CONTACT_TAG_MODAL',
	UPDATE_CONTACT_TAG_SEARCH_KEY: 'UPDATE_CONTACT_TAG_SEARCH_KEY',
}

export const actions = {
	reqTagAll() {
		return {type: actionTypes.REQ_TAG_ALL}
	},
	resTagAll(tagAll) {
		return {type: actionTypes.RES_TAG_ALL, tagAll}
	},
	reqTagPutContact(option) {
		return {type: actionTypes.REQ_TAG_PUT_CONTACT, option}
	},
	resTagPutContact(tag) {
		return {type: actionTypes.RES_TAG_PUT_CONTACT, tag}
	},
	reqTagRemoveContact(option) {
		return {type: actionTypes.REQ_TAG_REMOVE_CONTACT, option}
	},
	resTagRemoveContact(option) {
		return {type: actionTypes.RES_TAG_REMOVE_CONTACT, option}
	},

	showGroupModal(status) {
		return {type: actionTypes.SHOW_CONTACT_TAG_MODAL, status}
	},
	updateGroupKey(searchKey) {
		return {type: actionTypes.UPDATE_CONTACT_TAG_SEARCH_KEY, searchKey}
	},

}


export function groupReducer(state = initialState, action) {
	switch(action.type) {
		case actionTypes.RES_TAG_ALL:
			return {
				...state,
				tagAll: action.tagAll.list
			}
		case actionTypes.RES_TAG_PUT_CONTACT: {

			return {
				...state,
			}
		}
		case actionTypes.RES_TAG_REMOVE_CONTACT: {
			return {
				...state,

			}
		}
		case actionTypes.SHOW_CONTACT_TAG_MODAL:
			return {
				...state,
				tagModal: action.status
			}
		case actionTypes.UPDATE_CONTACT_TAG_SEARCH_KEY:
			return {
				...state,
				searchKey: action.searchKey
			}
		default: 
			return state
	}
}