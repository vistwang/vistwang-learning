const initialState = {
	emails: [{
		task_id: 1,
		campaign_id: 1,
		step_id:1,
		account_id: null,
		u_id: null,
		email_account_id: null,
		subject: "邮件一",
		mailbody: null,
		thumnail: "http://7xl909.com2.z0.glb.qiniucdn.com/Fo-moz4MA_5o1FWS6QxxfhZEkn7T",
		status: null,
		total_count: null,
		supplier_campaign_id: null,
		mail_id: null,
		mail_name: null,
		sender_name: null,
		sender_email: null,
		reply_email: null,
		delivery_interval: null,
		send_max: null,
		createtime: null,
		updatetime: null,
		extra_fields: null,
		sendtime: null
	}], 
	emailLinks: [],

	emailAccountTotal: 0,
	emailAccounts: [],
	accountInfo: null,
}


export const actionTypes = {
	REQ_CAMPAIGN_PROCESS_EMAILS: 'REQ_CAMPAIGN_PROCESS_EMAILS',
	RES_CAMPAIGN_PROCESS_EMAILS: 'RES_CAMPAIGN_PROCESS_EMAILS',
	MODIFY_CAMPAIGN_PROCESS_EMAIL: 'MODIFY_CAMPAIGN_PROCESS_EMAIL',
	REQ_REMOVE_CAMPAIGN_PROCESS_EMAIL: 'REQ_REMOVE_CAMPAIGN_PROCESS_EMAIL',
	RES_REMOVE_CAMPAIGN_PROCESS_EMAIL: 'RES_REMOVE_CAMPAIGN_PROCESS_EMAIL',

	REQ_CAMPAIGN_PROCESS_EMAIL_LINKS: 'REQ_CAMPAIGN_PROCESS_EMAIL_LINKS',
	RES_CAMPAIGN_PROCESS_EMAIL_LINKS: 'RES_CAMPAIGN_PROCESS_EMAIL_LINKS',

	REQ_EMAIL_ACCOUNTS: 'REQ_EMAIL_ACCOUNTS',
	RES_EMAIL_ACCOUNTS: 'RES_EMAIL_ACCOUNTS',

	UPDATE_SELECT_EMAIL_ACCOUNT: 'UPDATE_SELECT_EMAIL_ACCOUNT',

	REQ_EMAIL_ACCOUNT_BASE_INFO: 'REQ_EMAIL_ACCOUNT_BASE_INFO',
	RES_EMAIL_ACCOUNT_BASE_INFO: 'RES_EMAIL_ACCOUNT_BASE_INFO',
}


export const actions = {
	reqEmails(step_id) {
		return {type: actionTypes.REQ_CAMPAIGN_PROCESS_EMAILS, step_id}
	},

	resEmails(step_id, emails) {
		return {type: actionTypes.RES_CAMPAIGN_PROCESS_EMAILS, step_id, emails}
	},

	modifyEmail(email) {
		return {type: actionTypes.MODIFY_CAMPAIGN_PROCESS_EMAIL, email}
	},

	reqRemoveEmail(task_id) {
		return {type: actionTypes.REQ_REMOVE_CAMPAIGN_PROCESS_EMAIL, task_id}
	},

	resRemoveEmail(task_id) {
		return {type: actionTypes.RES_REMOVE_CAMPAIGN_PROCESS_EMAIL, task_id}
	},

	reqLinks(task_id) {
		return {type: actionTypes.REQ_CAMPAIGN_PROCESS_EMAIL_LINKS, task_id}
	},
	resLinks(task_id, links) {
		return {type: actionTypes.RES_CAMPAIGN_PROCESS_EMAIL_LINKS, task_id, links}
	},

	reqEmailAccounts(page, size) {
		return {type: actionTypes.REQ_EMAIL_ACCOUNTS, page, size}
	},
	resEmailAccounts(data, page) {
		return {type: actionTypes.RES_EMAIL_ACCOUNTS, data, page}
	},

	updateSelectEmailAccount(email_account_id) {
		return {type: actionTypes.UPDATE_SELECT_EMAIL_ACCOUNT, email_account_id}
	},

	reqAccountInfo() {
		return {type: actionTypes.REQ_EMAIL_ACCOUNT_BASE_INFO}
	},
	resAccountInfo(accountInfo) {
		return {type: actionTypes.RES_EMAIL_ACCOUNT_BASE_INFO,accountInfo}
	},
}


export function emailReducer(state = initialState, action) {
	switch(action.type) {
		case actionTypes.RES_CAMPAIGN_PROCESS_EMAILS:
			let emails = state.emails.filter(item => item.step_id !== action.step_id)
			return {
				...state,
				emails: [
					...emails,
					...action.emails
				]
			}
		case actionTypes.MODIFY_CAMPAIGN_PROCESS_EMAIL:
			let currentIndex = state.emails.findIndex(item => item.task_id === action.email.task_id)
			return {
				...state,
				emails: currentIndex === -1 ? [...state.emails, action.email] : [...state.emails.slice(0, currentIndex), action.email, ...state.emails.slice(currentIndex + 1)]
			}
		case actionTypes.RES_REMOVE_CAMPAIGN_PROCESS_EMAIL:
			return {
				...state,
				emails: state.emails.filter(item => item.task_id === action.task_id)
			}
		case actionTypes.RES_CAMPAIGN_PROCESS_EMAIL_LINKS:
			let links = state.emailLinks.filter(item => item.task_id !== action.task_id)
			return {
				...state,
				emailLinks: [
					...links,
					...action.links
				]
			}
		case actionTypes.RES_EMAIL_ACCOUNTS:
			return {
				...state,
				emailAccounts: action.data.result,
				emailAccountTotal: action.data.count,
			}
		case actionTypes.UPDATE_SELECT_EMAIL_ACCOUNT:{
			let emailAccounts = state.emailAccounts.map(item => {
				if(item.email_account_id === action.email_account_id) {
					item.checked = true
				} else {
					item.checked = false
				}
				return item
			})
			return {
				...state,
				emailAccounts
			}
		}
		case actionTypes.RES_EMAIL_ACCOUNT_BASE_INFO:
			return {
				...state,
				accountInfo: action.accountInfo
			}
		default: 
			return state
	}
}