const initialState = {
	task_id: 0,
	step_id: 0,
	relationId: 0,
	subject: '',
	mailbody: '',
	sender_name: '',
	sender_email: '',
	reply_email: '',

	summary: '',
	email_account_id: 0,
	tos: '',
	

	sendSettingModalType: 0, // 处理发送对话框类型 0 发件设置, 1 发送测试
	sendTestEmailModal: false,
	emailAccountsModal: false,
}


export const actionTypes = {
	UPDATE_EMAIL_SUBJECT: 'UPDATE_EMAIL_SUBJECT',
	UPDATE_EMAIL_MAILBODY: 'UPDATE_EMAIL_MAILBODY',
	UPDATE_EMAIL_SENDER_NAME: 'UPDATE_EMAIL_SENDER_NAME',
	UPDATE_EMAIL_SENDER_EMAIL: 'UPDATE_EMAIL_SENDER_EMAIL',
	UPDATE_EMAIL_REPLY_EMAIL: 'UPDATE_EMAIL_REPLY_EMAIL',
	UPDATE_EMAIL_SUMMARY: 'UPDATE_EMAIL_SUMMARY',
	UPDATE_EMAIL_ACCOUNT_ID: 'UPDATE_EMAIL_ACCOUNT_ID',
	UPDATE_EMAIL_TOS: 'UPDATE_EMAIL_TOS',

	SEND_SETTING_MODAL_TYPE: 'SEND_SETTING_MODAL_TYPE',
	SHOW_SEND_SETTING_EMAIL_MODAL: 'SHOW_SEND_SETTING_EMAIL_MODAL',
	SHOW_EMAIL_ACCOUNTS_MODAL: 'SHOW_EMAIL_ACCOUNTS_MODAL',

	REQ_SEND_TEST_EMAIL: 'REQ_SEND_TEST_EMAIL',

	REQ_SAVE_EMAIL_CONTENT: 'REQ_SAVE_EMAIL_CONTENT',
	RESET_EMAIL_CONTENT: 'RESET_EMAIL_CONTENT',
}


export const actions = {
	updateSubject(subject) {
		return {type: actionTypes.UPDATE_EMAIL_SUBJECT, subject}
	},
	updateMailbody(mailbody) {
		return {type: actionTypes.UPDATE_EMAIL_MAILBODY, mailbody}
	},
	updateEmailAccountId(emailAccountId) {
		return {type: actionTypes.UPDATE_EMAIL_ACCOUNT_ID, emailAccountId}
	},
	updateSummary(summary) {
		return {type: actionTypes.UPDATE_EMAIL_SUMMARY, summary}
	},
	updateTos(tos) {
		return {type: actionTypes.UPDATE_EMAIL_TOS, tos}
	},

	updateSendSettingModalType(mType) {
		return {type: actionTypes.SEND_SETTING_MODAL_TYPE, mType}
	},

	showSendSettingModal(status) {
		return {type: actionTypes.SHOW_SEND_SETTING_EMAIL_MODAL, status}
	},
	showEmailAccountsModal(status) {
		return {type: actionTypes.SHOW_EMAIL_ACCOUNTS_MODAL, status}
	},

	reqSendTestEmail(email) {
		return {type: actionTypes.REQ_SEND_TEST_EMAIL, email}
	},

	reqSaveEmailContent(email, relation) {
		return {type: actionTypes.REQ_SAVE_EMAIL_CONTENT, email, relation}
	},

	resetEmailContent(content) {
		return {type: actionTypes.RESET_EMAIL_CONTENT, content}
	}
}

export function emailContentReducer(state = initialState, action) {
	switch(action.type) {
		case actionTypes.UPDATE_EMAIL_SUBJECT:
			return {
				...state,
				subject: action.subject
			}
		case actionTypes.UPDATE_EMAIL_MAILBODY:
			return {
				...state,
				mailbody: action.mailbody
			}
		case actionTypes.UPDATE_EMAIL_ACCOUNT_ID:
			return {
				...state,
				email_account_id: action.emailAccountId
			}
		case actionTypes.UPDATE_EMAIL_SUMMARY:
			return {
				...state,
				summary: action.summary
			}
		case actionTypes.UPDATE_EMAIL_TOS:
			return {
				...state,
				tos: action.tos
			}

		case actionTypes.SEND_SETTING_MODAL_TYPE:
			return {
				...state,
				sendSettingModalType: action.mType
			}
		case actionTypes.SHOW_SEND_SETTING_EMAIL_MODAL:
			return {
				...state,
				sendTestEmailModal: action.status
			}
		case actionTypes.SHOW_EMAIL_ACCOUNTS_MODAL:
			return {
				...state,
				emailAccountsModal: action.status
			}

		case actionTypes.RES_SAVE_EMAIL_CONTENT:
			return {
				...state,
				task_id: action.emailContent.task_id,
				step_id: action.emailContent.step_id,
				subject: action.emailContent.subject || '',
				mailbody: action.emailContent.mailbody || '',
			}
		case actionTypes.RESET_EMAIL_CONTENT:
			return {
				...state,
				...action.content.task,
				relationId: action.content.id,
			}
		default:
			return state
	}
}