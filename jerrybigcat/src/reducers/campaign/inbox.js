const initialState = {
	limit: 10,
	recipients: [],
	replyTypes: [],

	typeId: 0,
	typeName: '',

	addToCampaignModal: false,
	settingReplyTypeModal: false,
}

export const actionTypes = {
	REQ_CAMPAIGN_RECIPIENTS: 'REQ_CAMPAIGN_RECIPIENTS',
	RES_CAMPAIGN_RECIPIENTS: 'RES_CAMPAIGN_RECIPIENTS',

	REQ_RECIPIENT_REPLY_TYPES: 'REQ_RECIPIENT_REPLY_TYPES',
	RES_RECIPIENT_REPLY_TYPES: 'RES_RECIPIENT_REPLY_TYPES',
	REQ_REMOVE_RECIPIENT_REPLY_TYPE: 'REQ_REMOVE_RECIPIENT_REPLY_TYPE',
	RES_REMOVE_RECIPIENT_REPLY_TYPE: 'RES_REMOVE_RECIPIENT_REPLY_TYPE',

	UPDATE_RECIPIENT_REPLY_TYEP_ID: 'UPDATE_RECIPIENT_REPLY_TYEP_ID',
	UPDATE_RECIPIENT_REPLY_TYEP_NAME: 'UPDATE_RECIPIENT_REPLY_TYEP_NAME',
	UPDATE_RECIPIENT_CHECKED: 'UPDATE_RECIPIENT_CHECKED',
	UPDATE_RECIPIENT_CHECKED_BETCH: 'UPDATE_RECIPIENT_CHECKED_BETCH',

	SAVE_RECIPIENT_REPLY_TYPE: 'SAVE_RECIPIENT_REPLY_TYPE',
	RESET_RECIPIENT_REPLY_TYPE: 'RESET_RECIPIENT_REPLY_TYPE',
	MODIFY_RECIPIENT_REPLY_TYPE: 'MODIFY_RECIPIENT_REPLY_TYPE',

	REQ_BETCH_ADD_RECIPIENT_TO_REPLY_TYPE: 'REQ_BETCH_ADD_RECIPIENT_TO_REPLY_TYPE',
	RES_BETCH_ADD_RECIPIENT_TO_REPLY_TYPE: 'RES_BETCH_ADD_RECIPIENT_TO_REPLY_TYPE',
	REQ_BETCH_DELETE_RECIPIENTS: 'REQ_BETCH_DELETE_RECIPIENTS',
	RES_BETCH_DELETE_RECIPIENTS: 'RES_BETCH_DELETE_RECIPIENTS',
	REQ_BETCH_ADD_RECIPIENT_TO_CAMPAIGN: 'REQ_BETCH_ADD_RECIPIENT_TO_CAMPAIGN',
	RES_BETCH_ADD_RECIPIENT_TO_CAMPAIGN: 'RES_BETCH_ADD_RECIPIENT_TO_CAMPAIGN',

	UPDATE_ADD_RECIPIENT_TO_CAMPAIGN_MODAL: 'UPDATE_ADD_RECIPIENT_TO_CAMPAIGN_MODAL',
	UDPATE_SETTING_RECIPIENT_REPLY_TYPE_MODAL: 'UDPATE_SETTING_RECIPIENT_REPLY_TYPE_MODAL',
}


export const actions = {
	reqRecipients(option) {
		return {type: actionTypes.REQ_CAMPAIGN_RECIPIENTS, option}
	},
	resRecipients(recipients, option) {
		return {type: actionTypes.RES_CAMPAIGN_RECIPIENTS, recipients, option}
	},

	reqReplyTypes(campaignId) {
		return {type: actionTypes.REQ_RECIPIENT_REPLY_TYPES, campaignId}
	},
	resReplyTypes(replyTypes) {
		return {type: actionTypes.RES_RECIPIENT_REPLY_TYPES, replyTypes}
	},
	reqRemoveReplyType(replyTypeId) {
		return {type: actionTypes.REQ_REMOVE_RECIPIENT_REPLY_TYPE, replyTypeId}
	},
	resRemoveReplyType(replyTypeId) {
		return {type: actionTypes.RES_REMOVE_RECIPIENT_REPLY_TYPE, replyTypeId}
	},

	updateTypeId(typeId) {
		return {type: actionTypes.UPDATE_RECIPIENT_REPLY_TYEP_ID, typeId}
	},
	updateTypeName(typeName) {
		return {type: actionTypes.UPDATE_RECIPIENT_REPLY_TYEP_NAME, typeName}
	},
	updateRecipientChecked(recipientId, status) {
		return {type: actionTypes.UPDATE_RECIPIENT_CHECKED, recipientId, status}
	},
	updateRecipientCheckedBetch(status, replyType) {
		return {type: actionTypes.UPDATE_RECIPIENT_CHECKED_BETCH, status, replyType}
	},
	saveReplyType(replyType) {
		return {type: actionTypes.SAVE_RECIPIENT_REPLY_TYPE, replyType}
	},
	resetReplyType(replyType) {
		return  {type: actionTypes.RESET_RECIPIENT_REPLY_TYPE, replyType}
	},
	modifyReplyType(replyType) {
		return {type: actionTypes.MODIFY_RECIPIENT_REPLY_TYPE, replyType}
	},

	reqBetchAddToReplyType(ids,replyTypeId) {
		return {type: actionTypes.REQ_BETCH_ADD_RECIPIENT_TO_REPLY_TYPE, ids, replyTypeId}
	},
	resBetchAddToReplyType(ids, replyTypeId) {
		return {type: actionTypes.RES_BETCH_ADD_RECIPIENT_TO_REPLY_TYPE, ids, replyTypeId}
	},

	reqBetchDeleteRecipients(ids) {
		return {type: actionTypes.REQ_BETCH_DELETE_RECIPIENTS, ids}
	},
	resBetchDeleteRecipients(ids) {
		return {type: actionTypes.RES_BETCH_DELETE_RECIPIENTS, ids}
	},
	reqBetchAddToCampaign(ids, campaignId) {
		return {type: actionTypes.REQ_BETCH_ADD_RECIPIENT_TO_CAMPAIGN, ids, campaignId}
	},
	resBetchAddToCampaign(ids, campaignId) {
		return {type: actionTypes.RES_BETCH_ADD_RECIPIENT_TO_CAMPAIGN, ids, campaignId}
	},

	showAddToCampaignModal(status) {
		return {type: actionTypes.UPDATE_ADD_RECIPIENT_TO_CAMPAIGN_MODAL, status}
	},
	showSettingReplyTypeModal(status) {
		return {type: actionTypes.UDPATE_SETTING_RECIPIENT_REPLY_TYPE_MODAL, status}
	},

}


export function inboxReducer(state = initialState, action) {
	switch(action.type) {
		case actionTypes.RES_CAMPAIGN_RECIPIENTS: {
			let recipients = []
			if(action.option.page > 1 && action.option.classificationId) {
				let currRecipient = action.recipients.find(item => item.id === action.option.classificationId) || {}
				let oldRecipient = state.recipients.find(item => item.id === action.option.classificationId) || {}
				let currentIndex = state.recipients.findIndex(item => item.id === action.option.classificationId)
				let newRecipient = {
					...currRecipient,
					replies: {
						...currRecipient.replies,
						page: action.option.page,
						list: [...oldRecipient.replies.list, ...currRecipient.replies.list]
					}
				}
				recipients = currentIndex === -1 
				? [...state.recipients, newRecipient] 
				: [...state.recipients.slice(0, currentIndex), newRecipient, ...state.recipients.slice(currentIndex + 1)]
			} else {
				recipients = action.recipients
			}
			return {
				...state,
				recipients
			}	
		}
		case actionTypes.RES_RECIPIENT_REPLY_TYPES:
			return {
				...state,
				replyTypes: action.replyTypes
			}
		case actionTypes.RES_REMOVE_RECIPIENT_REPLY_TYPE:
			return {
				...state,
				replyTypes: state.replyTypes.filter(item => item.id !== action.replyTypeId)
			}
		case actionTypes.UPDATE_RECIPIENT_REPLY_TYEP_ID:
			return {
				...state,
				typeId: action.typeId
			}
		case actionTypes.UPDATE_RECIPIENT_REPLY_TYEP_NAME:
			return {
				...state,
				typeName: action.typeName
			}
		case actionTypes.UPDATE_RECIPIENT_CHECKED:
			return {
				...state,
				recipients: state.recipients.map(item => {
					item.replies.list = item.replies.list.map(reply => {
						if(reply.id === action.recipientId) {
							reply.checked = action.status
						}
						return reply
					})
					return item
				})
			}
		case actionTypes.UPDATE_RECIPIENT_CHECKED_BETCH: {
			let recipients
			if(!action.replyType) {
				recipients = state.recipients.map(item => {
					item.replies.list = item.replies.list.map(reply => {
						reply.checked = action.status
						return reply
					})
					return item
					return item
				})
			} else {
				recipients = state.recipients.map(item => {
					item.replies.list = item.replies.list.map(reply => {
						if(reply.replyType === action.replyType) {
							reply.checked = action.status
						}
						return reply
					})
					return item
				})
			}
			return {
				...state,
				recipients
			}
		}
		case actionTypes.RESET_RECIPIENT_REPLY_TYPE: {
			const replyType = action.replyType || {id: 0, name: ''}
			return {
				...state,
				typeId: replyType.id,
				typeName: replyType.name,
			}
		}
		case actionTypes.MODIFY_RECIPIENT_REPLY_TYPE: {
			const replyTypes = state.replyTypes
			const index = replyTypes.findIndex(item => item.id === action.replyType.id)
			return {
				...state,
				replyTypes: index === -1 ? [...replyTypes, action.replyType] : [...replyTypes.slice(0, index), action.replyType, ...replyTypes.slice(index + 1)]
			}
		}

		case actionTypes.RES_BETCH_ADD_RECIPIENT_TO_REPLY_TYPE: {
			const idsArr = action.ids.split(',')
			const mobileArray = []
			let recipients = state.recipients.map(recipient => {
				let subCount = 0
				recipient.replies.list = recipient.replies.list.filter(item => {
					if(idsArr.indexOf(String(item.id)) >= 0) {
						subCount++
						mobileArray.push(item)
					}
					return idsArr.indexOf(String(item.id)) === -1
				})
				recipient.replies.total -= subCount
				return recipient
			})

			const recipientIndex = recipients.findIndex(item => item.id === action.replyTypeId)
			if(recipientIndex >= 0) {
				const recipient = recipients.find(item => item.id === action.replyTypeId)
				const subTotal = recipient.replies.total + mobileArray.length
				const newRecipient = {
					...recipient,
					replies: {
						...recipient.replies,
						total: subTotal,
						list: [...recipient.replies.list, ...mobileArray]
					}
				}
				recipients = [...recipients.slice(0, recipientIndex), newRecipient, ...recipients.slice(recipientIndex + 1)]
			}

			return {
				...state,
				recipients,
			}
		}

		case actionTypes.RES_BETCH_ADD_RECIPIENT_TO_CAMPAIGN: {
			const idsArr = action.ids.split(',')
			// const recipients = state.recipients.filter(item => idsArr.indexOf(String(item.id)) !== -1)
			const recipients = state.recipients.map(recipient => {
				recipient.replies.list = recipient.replies.list.filter(item => {
					return idsArr.indexOf(String(item.id)) === -1
				})
				return recipient
			})
			return {
				...state,
				recipients,
			}
		}

		case actionTypes.RES_BETCH_DELETE_RECIPIENTS: {
			const idsArr = action.ids.split(',')
			// const recipients = state.recipients.filter(item => idsArr.indexOf(String(item.id)) !== -1)
			const recipients = state.recipients.map(recipient => {
				recipient.replies.list = recipient.replies.list.filter(item => {
					return idsArr.indexOf(String(item.id)) === -1
				})
				return recipient
			})
			return {
				...state,
				recipients
			}
		}

		case actionTypes.UPDATE_ADD_RECIPIENT_TO_CAMPAIGN_MODAL:
			return {
				...state,
				addToCampaignModal: action.status
			}
		case actionTypes.UDPATE_SETTING_RECIPIENT_REPLY_TYPE_MODAL:
			return {
				...state,
				settingReplyTypeModal: action.status
			}
		default: 
			return state	
	}
}