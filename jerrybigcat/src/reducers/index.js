import { combineReducers } from 'redux'

const initState = {
	isFetching: false,
	list: []
}

export const actionTypes = {
	FETCH_START: 'FETCH_START',
	FETCH_END: 'FETCH_END',

	GET_LIST: 'GET_LIST',
	RESPONSE_GET_LIST: 'RESPONSE_GET_LIST'
}

export const actions = {
	get_list(list){
		return{type: actionTypes.GET_LIST, list}
	},
	responseGetList(list) {
		return {type: actionTypes.RESPONSE_GET_LIST, list}
	}
}


export function reducer(state = initState, action) {	
	switch(action.type) {
		case actionTypes.FETCH_START:
			return {
				...state,
				isFetching: true
			}
		case actionTypes.FETCH_END:
			return {
				...state,
				isFetching: false
			}
		case actionTypes.RESPONSE_GET_LIST:
			return {
				...state,
				list: [...action.list]
			}
		default: 
			return state
	}
}

export default combineReducers({
	list: reducer
})