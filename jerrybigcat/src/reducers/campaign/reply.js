const initialState = {
	replyDetailModal: false,
	reply: [],
	replyId: 0,

	replyEmailModal: false,
	content: '',
	subject: '',
	summary: '',
	address: '',
	emailAccountId: 0,
	emailAccountsModal: false,
}


export const actionTypes = {
	REQ_REPLY: 'REQ_REPLY',
	RES_REPLY: 'RES_REPLY',

	SHOW_REPLY_DETAIL_MODAL: 'SHOW_REPLY_DETAIL_MODAL',
	UPDATE_REPLY_ID: 'UPDATE_REPLY_ID',

	REQ_SEND_REPLY_EMAIL: 'REQ_SEND_REPLY_EMAIL',

	SHOW_REPLY_EMAIL_MODAL: 'SHOW_REPLY_EMAIL_MODAL',
	UPDATE_REPLY_CONTENT: 'UPDATE_REPLY_CONTENT',
	UPDATE_REPLY_EMAIL_ACCOUNT_ID: 'UPDATE_REPLY_EMAIL_ACCOUNT_ID',
	SHOW_REPLY_EMAIL_ACCOUNTS_MODAL: 'SHOW_REPLY_EMAIL_ACCOUNTS_MODAL',
}

export const actions = {
	reqReply(replyId) {
		return {type: actionTypes.REQ_REPLY, replyId}
	},
	resReply(reply) {
		return {type: actionTypes.RES_REPLY, reply}
	},

	showReplyModal(status) {
		return {type: actionTypes.SHOW_REPLY_DETAIL_MODAL, status}
	},
	updateReplyId(replyId) {
		return {type: actionTypes.UPDATE_REPLY_ID, replyId}
	},

	reqSendRplyEmail(option) {
		return {type: actionTypes.REQ_SEND_REPLY_EMAIL, option}
	},


	showReplyEmailModal(status) {
		return {type: actionTypes.SHOW_REPLY_EMAIL_MODAL, status}
	},
	updateContent(content) {
		return {type: actionTypes.UPDATE_REPLY_CONTENT, content}
	},
	updateEmailAccountId(emailAccountId){
		return {type: actionTypes.UPDATE_REPLY_EMAIL_ACCOUNT_ID, emailAccountId}
	},
	showEmailAccountsModal(status) {
		return {type: actionTypes.SHOW_REPLY_EMAIL_ACCOUNTS_MODAL, status}
	},
}


export function replyReducer(state = initialState, action) {
	switch(action.type) {
		case actionTypes.RES_REPLY:
			return {
				...state,
				reply: action.reply
			}	
		case actionTypes.SHOW_REPLY_DETAIL_MODAL:
		  return {
		  	...state,
		  	replyDetailModal: action.status
		  }
		case actionTypes.UPDATE_REPLY_CONTENT: 
			return {
				...state,
				content: action.content
			}
		case actionTypes.UPDATE_REPLY_ID:
			return {
				...state,
				replyId: action.replyId
			}	
		case actionTypes.SHOW_REPLY_EMAIL_MODAL: 
			return {
				...state,
				replyEmailModal: action.status
			}
		case actionTypes.UPDATE_REPLY_EMAIL_ACCOUNT_ID:
			return {
				...state,
				emailAccountId: action.emailAccountId,
			}
		case actionTypes.SHOW_REPLY_EMAIL_ACCOUNTS_MODAL: 
			return {
				...state,
				emailAccountsModal: action.status
			}
		default:
			return state
	}
}