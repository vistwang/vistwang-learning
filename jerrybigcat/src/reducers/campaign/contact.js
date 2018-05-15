const initialState = {
	contact: null,
}

export const actionTypes = {
	REQ_CONTACT: 'REQ_CONTACT',
	RES_CONTACT: 'RES_CONTACT',
	UPDATE_CONTACT: 'UPDATE_CONTACT',

}

export const actions = {
	reqContact(contactId) {
		return {type: actionTypes.REQ_CONTACT, contactId}
	},
	resContact(contact) {
		return {type: actionTypes.RES_CONTACT, contact}
	},

	updateContact(contact) {
		return {type: actionTypes.UPDATE_CONTACT, contact}
	},
}


const resetContact = (contact) => {

	return {
		...contact,
		email: JSON.parse(contact.email),
		phone: JSON.parse(contact.phone),
	}
}

export function contactReducer(state = initialState, action) {
	switch(action.type) {
		case actionTypes.RES_CONTACT:
			return {
				...state,
				contact: resetContact(action.contact)
			}
		case actionTypes.UPDATE_CONTACT:
			return {
				...state,
				contact: action.contact
			}
		case actionTypes.RES_TAG_ALL:
			return {
				...state,
				tagAll: action.tagAll
			}
		default:
			return state
	}
}