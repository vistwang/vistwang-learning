const initialState = {
	id: '',
	label: '',
	anotherName: '',
	type: 2,
	description: '',
	items: [{value: ''}, {value: ''}],

	labelError: ''
}

export const actionTypes = {
	UPDATE_LABEL: 'UPDATE_LABEL',
	UPDATE_ANOTHER_NAME: 'UPDATE_ANOTHER_NAME',
	UPDATE_TYPE: 'UPDATE_TYPE',
	UPDATE_DESCRIPTION: 'UPDATE_DESCRIPTION',
	ADD_ITEM: 'ADD_ITEM',
	UPDATE_ITEM: 'UPDATE_ITEM',
	REMOVE_ITEM: 'REMOVE_ITEM',
	SET_PROPERTY_ID: 'SET_PROPERTY_ID',
	SAVE_PROPERTY: 'SAVE_PROPERTY',
	RESET_PROPERTY: 'RESET_PROPERTY',

	SET_LABEL_ERROR: 'SET_LABEL_ERROR',
}

export const actions = {
	updateLabel(label) {
		return {
			type: actionTypes.UPDATE_LABEL,
			label
		}
	},

	updateAnotherName(anotherName) {
		return {
			type: actionTypes.UPDATE_ANOTHER_NAME,
			anotherName
		}
	},

	updateType(type) {
		return {
			type: actionTypes.UPDATE_TYPE,
			propertyType: type
		}
	},

	updateDescription(description) {
		return {
			type: actionTypes.UPDATE_DESCRIPTION,
			description
		}
	},

	addItem(item) {
		return {
			type: actionTypes.ADD_ITEM,
			item
		}
	},

	updateItem(index, item) {
		return {
			type: actionTypes.UPDATE_ITEM,
			index,
			item
		}
	},

	removeItem(index) {
		return {
			type: actionTypes.REMOVE_ITEM,
			index
		}
	},

	setPropertyId(id) {
		return {
			type: actionTypes.SET_PROPERTY_ID,
			id
		}
	},

	saveProperty(property, scope) {
		return {
			type: actionTypes.SAVE_PROPERTY,
			property,
			scope
		}
	},

	resetProperty(property) {
		return {
			type: actionTypes.RESET_PROPERTY,
			property
		}
	},

	setLabelError(error) {
		return {
			type: actionTypes.SET_LABEL_ERROR,
			error
		}
	}

}

export function newPropertyReducer(state = initialState, action) {
	switch(action.type) {
		case actionTypes.UPDATE_LABEL:
			return {
				...state,
				label: action.label
			}
		case actionTypes.UPDATE_ANOTHER_NAME:
			return {
				...state,
				anotherName: action.anotherName
			}
		case actionTypes.UPDATE_TYPE:
			return {
				...state,
				type: action.propertyType
			}
		case actionTypes.UPDATE_DESCRIPTION:
			return {
				...state,
				description: action.description
			}
		case actionTypes.ADD_ITEM:
			return {
				...state,
				items: [...state.items, action.item]
			}
		case actionTypes.UPDATE_ITEM:
			return {
				...state,
				items: [
					...state.items.slice(0,action.index),
					action.item,
					...state.items.slice(action.index + 1)
				]
			}
		case actionTypes.REMOVE_ITEM:
			return {
				...state,
				items:[
					...state.items.slice(0,action.index),
					...state.items.slice(action.index + 1)
				]
			}
		case actionTypes.SET_PROPERTY_ID:
			return {
				...state,
				id: action.id
			}
		case actionTypes.RESET_PROPERTY:
			let propertyState 
			if(!action.property) {
				propertyState = initialState
			} else {
				const {id,label,anotherName,type, description, items} = action.property
				propertyState = {
					id,
					label,
					anotherName,
					type,
					description,
					items: items || [{value: ''}, {value: ''}]
				}
			}
			return propertyState
		case actionTypes.SET_LABEL_ERROR: 
			return {
				...state,
				labelError: action.error
			}
		default:
			return state
	}
}

