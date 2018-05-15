import { combineReducers } from 'redux'
import {emailAccountSettingReducer} from './emailAccountSetting'

const initialState = {
	emailAccountModal: false,
	emailAccountTotal: 0,
	pageIndex: 1,
	pageSize: 15,
	emailAccounts: []
}

export const actionTypes = {
	SHOW_EMAIL_ACCOUNT_MODAL: 'SHOW_EMAIL_ACCOUNT_MODAL',
	REQ_EMAIL_ACCOUNT_LIST: 'REQ_EMAIL_ACCOUNT_LIST',
	RES_EMAIL_ACCOUNT_LIST: 'RES_EMAIL_ACCOUNT_LIST',
	REMOVE_EMAIL_ACCOUNT: 'REMOVE_EMAIL_ACCOUNT',
	RES_REMOVE_EMAIL_ACCOUNT: 'RES_REMOVE_EMAIL_ACCOUNT',
	MODIFY_EMAIL_ACCOUNT: 'MODIFY_EMAIL_ACCOUNT',
}


export const actions = {
	showEmailAccountModal(status) {
		return {
			type: actionTypes.SHOW_EMAIL_ACCOUNT_MODAL,
			status
		}
	},

	reqEmailAccountList(page, size) {
		return {
			type: actionTypes.REQ_EMAIL_ACCOUNT_LIST,
			page,
			size
		}
	},

	resEmailAccountList(data, page) {
		return {
			type: actionTypes.RES_EMAIL_ACCOUNT_LIST,
			data,
			page
		}
	},

	removeEmailAccount(id) {
		return {
			type: actionTypes.REMOVE_EMAIL_ACCOUNT,
			id
		}
	},

	resRemoveEmailAccount(id) {
		return {
			type: actionTypes.RES_REMOVE_EMAIL_ACCOUNT,
			id
		}
	},

	modifyEmailAccount(emailAccount) {
		return {
			type: actionTypes.MODIFY_EMAIL_ACCOUNT,
			emailAccount
		}
	}
}

export function emailAccountReducder(state = initialState, action) {
	switch(action.type) {
		case actionTypes.SHOW_EMAIL_ACCOUNT_MODAL:
			return {
				...state,
				emailAccountModal: action.status
			}
		case actionTypes.RES_EMAIL_ACCOUNT_LIST:
			return {
				...state,
				emailAccounts: action.data.result,
				emailAccountTotal: action.data.count,
				pageIndex: action.page
			}
		case actionTypes.RES_REMOVE_EMAIL_ACCOUNT:
			return {
				...state,
				emailAccounts: state.emailAccounts.filter(item => item.email_account_id !== action.id)
			}
		case actionTypes.MODIFY_EMAIL_ACCOUNT:
			const emailAccounts = state.emailAccounts
			const emailAccount = action.emailAccount
			const index = state.emailAccounts.findIndex(item => item.email_account_id === action.emailAccount.email_account_id)
			return {
				...state,
				emailAccounts: index === -1 ? [emailAccount, ...emailAccounts] : [...emailAccounts.slice(0,index),emailAccount, ...emailAccounts.slice(index + 1)]
			}
		default:
			return state
	}
}

export default combineReducers({
	emailAccountGlobal: emailAccountReducder,
	emailAccountSetting: emailAccountSettingReducer
})