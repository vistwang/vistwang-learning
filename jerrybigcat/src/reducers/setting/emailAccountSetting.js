const initialState = {
	settingStep: 1,
	toggleSetting: {
		server: false,
		safe: false,
		signature: false,
		unsubscribe: false
	},

	can_signature: false,

	email_account_id: '',
	send_type: 0,
	count_daily: 0,
	email_server: '',
	email_signature: '',
	email_unsubscribe: '',
	enable_use: false,

	diff_server: false,
	diff_email_username: false,
	is_reply_email: false,

	server_username: '',
	server_email: '',
	server_sender_name: '',

	imap_username: '',
	imap_host: '',
	imap_port: '',
	imap_password: '',
	imap_ssl: 0,

	smtp_diff_email_username: false,
	smtp_is_reply_email: false,
	smtp_username: '',
	smtp_email: '',
	smtp_reply_email: '',
	smtp_host: '',
	smtp_port: '',
	smtp_password: '',
	smtp_ssl: 0,

	unsubscribe_type: 0,
	unsubscribe_name: 'PS: 多有打扰，如果您不想再接受我的邮件，请点击{<a href="">$unsubscribe_url</a>}。',
	unsubscribe_content: '',
}


export const actionTypes = {
	TOGGLE_SETTING_ITEM: 'TOGGLE_SETTING_ITEM',
	UPDATE_SETTING_STEP: 'UPDATE_SETTING_STEP',

	UPDATE_CAN_SIGNATURE: 'UPDATE_CAN_SIGNATURE',

	UPDATE_SEND_TYPE: 'UPDATE_SEND_TYPE',
	UPDATE_COUNT_DAILY: 'UPDATE_COUNT_DAILY',
	UPDATE_EMAIL_SERVER: 'UPDATE_EMAIL_SERVER',
	UPDATE_EMAIL_SIGNATURE: 'UPDATE_EMAIL_SIGNATURE',
	UPDATE_EMAIL_UNSUBSCRIBE: 'UPDATE_EMAIL_UNSUBSCRIBE',
	UPDATE_ENABLE_USE: 'UPDATE_ENABLE_USE',

	UPDATE_DIFF_SERVER: 'UPDATE_DIFF_SERVER',
	UPDATE_DIFF_EMAIL_USERNAME: 'UPDATE_DIFF_EMAIL_USERNAME',
	UPDATE_IS_REPLY_EMAIL: 'UPDATE_IS_REPLY_EMAIL',

	UPDATE_SERVER_USERNAME: 'UPDATE_SERVER_USERNAME',
	UPDATE_SERVER_EMAIL: 'UPDATE_SERVER_EMAIL',
	UPDATE_SERVER_SENDER_NAME: 'UPDATE_SERVER_SENDER_NAME',

	UPDATE_IMAP_USERNAME: 'UPDATE_IMAP_USERNAME',
	UPDATE_IMAP_HOST: 'UPDATE_IMAP_HOST',
	UPDATE_IMAP_PORT: 'UPDATE_IMAP_PORT',
	UPDATE_IMAP_PASSWORD: 'UPDATE_IMAP_PASSWORD',
	UPDATE_IMAP_SSL: 'UPDATE_IMAP_SSL',
	IMAP_TEST: 'IMAP_TEST',

	UPDATE_SMTP_DIFF_EMAIL_USERNAME: 'UPDATE_SMTP_DIFF_EMAIL_USERNAME',
	UPDATE_SMTP_IS_REPLY_EMAIL: 'UPDATE_SMTP_IS_REPLY_EMAIL',
	UPDATE_SMTP_USERNAME: 'UPDATE_SMTP_USERNAME',
	UPDATE_SMTP_EMAIL: 'UPDATE_SMTP_EMAIL',
	UPDATE_SMTP_REPLY_EMAIL: 'UPDATE_SMTP_REPLY_EMAIL',
	UPDATE_SMTP_HOST: 'UPDATE_SMTP_HOST',
	UPDATE_SMTP_PORT: 'UPDATE_SMTP_PORT',
	UPDATE_SMTP_PASSWORD: 'UPDATE_SMTP_PASSWORD',
	UPDATE_SMTP_SSL: 'UPDATE_SMTP_SSL',
	SMTP_TEST: 'SMTP_TEST',

	TEST_EMAIL_ACCOUNT: 'TEST_EMAIL_ACCOUNT',

	UPDATE_UNSUBSCRIBE_TYPE: 'UPDATE_UNSUBSCRIBE_TYPE',
	UPDATE_UNSUBSCRIBE_NAME: 'UPDATE_UNSUBSCRIBE_NAME',
	UPDATE_UNSUBSCRIBE_CONTENT: 'UPDATE_UNSUBSCRIBE_CONTENT',

	SAVE_EMAIL_ACCOUNT: 'SAVE_EMAIL_ACCOUNT',
	RESET_EMAIL_ACCOUNT: 'RESET_EMAIL_ACCOUNT',
	SET_EMAIL_ACCOUNT_ID: 'SET_EMAIL_ACCOUNT_ID',
}


export const actions = {
	updateSettingStep(step) {
		return {
			type: actionTypes.UPDATE_SETTING_STEP,
			step
		}
	},

	toggleSettingItem(toggleSetting) {
		return {
			type: actionTypes.TOGGLE_SETTING_ITEM,
			toggleSetting
		}
	},

	updateCanSignature(can) {
		return {
			type: actionTypes.UPDATE_CAN_SIGNATURE,
			can
		}
	},

	updateSendType(sendType) {
		return {
			type: actionTypes.UPDATE_SEND_TYPE,
			sendType
		}
	},

	updateCountDaily(countDaily) {
		return {
			type: actionTypes.UPDATE_COUNT_DAILY,
			countDaily
		}
	},

	updateEmailServer(server) {
		return {
			type: actionTypes.UPDATE_EMAIL_SERVER,
			server
		}
	},

	updateEmailSignature(signature) {
		return {
			type: actionTypes.UPDATE_EMAIL_SIGNATURE,
			signature
		}
	},

	updateEmailUnsubscribe(unsubscribe) {
		return {
			type: actionTypes.UPDATE_EMAIL_UNSUBSCRIBE,
			unsubscribe
		}
	},

	// 公共设置
	updateDiffServer(status) {
		return {
			type: actionTypes.UPDATE_DIFF_SERVER,
			status
		}
	},
	updateDiffEmailUsername(status) {
		return {
			type: actionTypes.UPDATE_DIFF_EMAIL_USERNAME,
			status
		}
	},
	updateIsReplyEmail(status) {
		return {
			type: actionTypes.UPDATE_IS_REPLY_EMAIL,
			status
		}
	},
	updateServerUsername(username) {
		return {
			type: actionTypes.UPDATE_SERVER_USERNAME,
			username
		}
	},
	updateServerEmail(email) {
		return {
			type: actionTypes.UPDATE_SERVER_EMAIL,
			email
		}
	},
	updateServerSenderName(senderName) {
		return {
			type: actionTypes.UPDATE_SERVER_SENDER_NAME,
			senderName
		}
	},

	// imap
	updateImapUsername(username) {
		return {
			type: actionTypes.UPDATE_IMAP_USERNAME,
			username
		}
	},
	updateImapHost(host) {
		return {
			type: actionTypes.UPDATE_IMAP_HOST,
			host
		}
	},
	updateImapPort(port) {
		return {
			type: actionTypes.UPDATE_IMAP_PORT,
			port
		}
	},
	updateImapPassword(password) {
		return {
			type: actionTypes.UPDATE_IMAP_PASSWORD,
			password
		}
	},
	updateImapSSL(ssl) {
		return {
			type: actionTypes.UPDATE_IMAP_SSL,
			ssl
		}
	},
	imapTest(option) {
		return {
			type: actionTypes.IMAP_TEST, 
			option
		}
	},

	// stmp
	updateStmpDiffEmailUsername(checked) {
		return {
			type: actionTypes.UPDATE_SMTP_DIFF_EMAIL_USERNAME,
			checked
		}
	},
	updateStmpIsReplyEmail(checked) {
		return {
			type: actionTypes.UPDATE_SMTP_IS_REPLY_EMAIL,
			checked
		}
	},
	updateStmpUsername(username) {
		return {
			type: actionTypes.UPDATE_SMTP_USERNAME,
			username
		}
	},
	updateStmpEmail(email) {
		return {
			type: actionTypes.UPDATE_SMTP_EMAIL,
			email
		}
	},
	updateStmpReplyEmail(email) {
		return {
			type: actionTypes.UPDATE_SMTP_REPLY_EMAIL,
			email
		}
	},
	updateStmpHost(host) {
		return {
			type: actionTypes.UPDATE_SMTP_HOST,
			host
		}
	},
	updateStmpPort(port) {
		return {
			type: actionTypes.UPDATE_SMTP_PORT,
			port
		}
	},
	updateStmpPassword(password) {
		return {
			type: actionTypes.UPDATE_SMTP_PASSWORD,
			password
		}
	},
	updateStmpSSL(ssl) {
		return {
			type: actionTypes.UPDATE_SMTP_SSL,
			ssl
		}
	},
	stmpTest() {
		return {
			type:  actionTyeps.SMTP_TEST
		}
	},

	testEmailAccount(option) {
		return {type: actionTypes.TEST_EMAIL_ACCOUNT, option}
	},

	// 退订
	updateUnsubscribeType(unType) {
		return {
			type: actionTypes.UPDATE_UNSUBSCRIBE_TYPE,
			unType
		}
	},
	updateUnsubscribeName(name) {
		return {
			type: actionTypes.UPDATE_UNSUBSCRIBE_NAME,
			name
		}
	},
	updateUnsubscribeContent(content) {
		return {
			type: actionTypes.UPDATE_UNSUBSCRIBE_CONTENT,
			content
		}
	},

	// 保存
	saveEmailAccount(emailAccount) {
		return {
			type: actionTypes.SAVE_EMAIL_ACCOUNT,
			emailAccount
		}
	},
	resetEmailAccount(emailAccount) {
		return {
			type: actionTypes.RESET_EMAIL_ACCOUNT,
			emailAccount
		}
	},
	setEmailAccountId(id) {
		return {
			type: actionTypes.SET_EMAIL_ACCOUNT_ID,
			id
		}
	}
}

const getEmailAccountState = (emailAccount) => {
	const emailServer = JSON.parse(emailAccount.email_server || '[]')
	const emailImap = emailServer.find(item => item.type === 'IMAP') || {}
	const emailSmtp = emailServer.find(item => item.type === 'SMTP') || {}
	const emailUnsubscribe = JSON.parse(emailAccount.email_unsubscribe || '{}')

	return {
		settingStep: 1,
		toggleSetting: {
			server: false,
			safe: false,
			signature: false,
			unsubscribe: false
		},

		can_signature: emailAccount.email_signature.trim() !== '',

		email_account_id: emailAccount.email_account_id,
		send_type: emailAccount.send_type,
		count_daily: emailAccount.count_daily,
		email_server: '',
		email_signature: emailAccount.email_signature,
		email_unsubscribe: '',
		enable_use: emailAccount.enable_use,

		diff_server: emailImap.username !== emailSmtp.username ,
		diff_email_username: (emailImap.username === emailSmtp.username) && (emailSmtp.username !== emailSmtp.email),
		is_reply_email: !!emailSmtp.replyemail,

		server_username: emailSmtp.username || '',
		server_email: emailSmtp.email || '',
		server_sender_name: emailSmtp.sender || '',

		imap_username: emailImap.username || '',
		imap_host: emailImap.host || '',
		imap_port: emailImap.port || '',
		imap_password: emailImap.password || '',
		imap_ssl: emailImap.useSSL || 0,

		smtp_diff_email_username: emailSmtp.username !== emailSmtp.email,
		smtp_is_reply_email: !!emailSmtp.replyemail,
		smtp_username: emailSmtp.username || '',
		smtp_email: emailSmtp.email || '',
		smtp_reply_email: emailSmtp.replyemail || '',
		smtp_host: emailSmtp.host || '',
		smtp_port: emailSmtp.port || '',
		smtp_password: emailSmtp.password || '',
		smtp_ssl: emailSmtp.useSSL || 0,

		unsubscribe_type: emailUnsubscribe.type || 0,
		unsubscribe_name: emailUnsubscribe.clickname || '',
		unsubscribe_content: emailUnsubscribe.replyContent || '',
	}
}

export function emailAccountSettingReducer(state = initialState, action) {
	switch(action.type) {
		case actionTypes.SHOW_SETTING_MODAL:
			return {
				...state,
				settingModal: action.status
			}
		case actionTypes.UPDATE_SETTING_STEP:
			return {
				...state,
				settingStep: action.step
			}
		case actionTypes.UPDATE_CAN_SIGNATURE:
			return {
				...state,
				can_signature: action.can
			}
		case actionTypes.TOGGLE_SETTING_ITEM:
			return {
				...state,
				toggleSetting: action.toggleSetting
			}
		case actionTypes.UPDATE_SEND_TYPE:
			return {
				...state,
				send_type: action.sendType
			}
		case actionTypes.UPDATE_COUNT_DAILY: 
			return {
				...state,
				count_daily: action.countDaily
			}
		case actionTypes.UPDATE_EMAIL_SERVER:
			return {
				...state,
				email_server: action.server
			}
		case actionTypes.UPDATE_EMAIL_SIGNATURE:
			return {
				...state,
				email_signature: action.signature
			}
		case actionTypes.UPDATE_EMAIL_UNSUBSCRIBE:
			return {
				...state,
				email_unsubscribe: action.unsubscribe
			}

		// 公共部分设置
		case actionTypes.UPDATE_DIFF_SERVER:
			return {
				...state,
				diff_server: action.status
			}
		case actionTypes.UPDATE_DIFF_EMAIL_USERNAME:
			return {
				...state,
				diff_email_username: action.status
			}
		case actionTypes.UPDATE_IS_REPLY_EMAIL:
			return {
				...state,
				is_reply_email: action.status
			}
		case actionTypes.UPDATE_SERVER_USERNAME:
			return {
				...state,
				server_username: action.username
			}
		case actionTypes.UPDATE_SERVER_EMAIL:
			return {
				...state,
				server_email: action.email
			}
		case actionTypes.UPDATE_SERVER_SENDER_NAME:
			return {
				...state,
				server_sender_name: action.senderName
			}

		// IMAP设置
		case actionTypes.UPDATE_IMAP_USERNAME:
			return {
				...state,
				imap_username: action.username
			}
		case actionTypes.UPDATE_IMAP_HOST:
			return {
				...state,
				imap_host: action.host
			}
		case actionTypes.UPDATE_IMAP_PORT:
			return {
				...state,
				imap_port: action.port
			}
		case actionTypes.UPDATE_IMAP_PASSWORD:
			return {
				...state,
				imap_password: action.password
			}
		case actionTypes.UPDATE_IMAP_SSL:
			return {
				...state,
				imap_ssl: action.ssl
			}

		// SMTP设置
		case actionTypes.UPDATE_SMTP_DIFF_EMAIL_USERNAME:
			return {
				...state,
				smtp_diff_email_username: action.checked
			}
		case actionTypes.UPDATE_SMTP_IS_REPLY_EMAIL:
			return {
				...state,
				smtp_is_reply_email: action.checked
			}
		case actionTypes.UPDATE_SMTP_USERNAME:
			return {
				...state,
				smtp_username: action.username
			}
		case actionTypes.UPDATE_SMTP_EMAIL:
			return {
				...state,
				smtp_email: action.email
			}
		case actionTypes.UPDATE_SMTP_REPLY_EMAIL:
			return {
				...state,
				smtp_reply_email: action.email
			}
		case actionTypes.UPDATE_SMTP_HOST:
			return {
				...state,
				smtp_host: action.host
			}
		case actionTypes.UPDATE_SMTP_PORT:
			return {
				...state,
				smtp_port: action.port
			}
		case actionTypes.UPDATE_SMTP_PASSWORD:
			return {
				...state,
				smtp_password: action.password
			}
		case actionTypes.UPDATE_SMTP_SSL:
			return {
				...state,
				smtp_ssl: action.ssl
			}

		// 退订
		case actionTypes.UPDATE_UNSUBSCRIBE_TYPE:
			return {
				...state,
				unsubscribe_type: action.unType
			}
		case actionTypes.UPDATE_UNSUBSCRIBE_NAME:
			return {
				...state,
				unsubscribe_name: action.name
			}
		case actionTypes.UPDATE_UNSUBSCRIBE_CONTENT:
			return {
				...state,
				unsubscribe_content: action.content
			}
		case actionTypes.RESET_EMAIL_ACCOUNT:
			let emailAccount 
			if(!action.emailAccount) {
				emailAccount = initialState
			} else {
				emailAccount = getEmailAccountState(action.emailAccount)
			}
			return {
				...state,
				...emailAccount
			}
		case actionTypes.SET_EMAIL_ACCOUNT_ID:
			return {
				...state,
				email_account_id: action.id
			}
		default:
			return state
	}
}