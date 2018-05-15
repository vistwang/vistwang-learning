const initialState = {
	pageIndex: 1,
	pageSize: 10,
	status: 0,
	step: 0,
	stepNum: 1,
	totalCount: 0,
	customers: [],
	statistics: {
		total: 0,
		touchedCount: 0,
		openedCount: 0,
		clickedCount: 0,
		repliedCount: 0,
		bulletCount: 0,
		unsubscribedCount: 0,
		untouchedCount: 0,
	},

	conditionModal: false,
	contactPreviewModal: false,

	markStatus: {
		"Opened":true,
		"HardBullet":false,
		"Clicked":false,
		"SoftBullet":true,
		"Completed":true,
		"Touches":true,
		"Replied":true,
		"Unsubscribe":false
	}
}


export const actionTypes = {
	REQ_RECIPIENT_CUSTONERS: 'REQ_RECIPIENT_CUSTONERS',
	RES_RECIPIENT_CUSTOMERS: 'RES_RECIPIENT_CUSTOMERS',

	REQ_RECIPIENT_SCHEMA: 'REQ_RECIPIENT_SCHEMA',
	RES_RECIPIENT_SCHEMA: 'RES_RECIPIENT_SCHEMA',

	UPDATE_RECIPIENT_CUSTOMER_STATUS: 'UPDATE_RECIPIENT_CUSTOMER_STATUS',
	UPDATE_RECIPIENT_CUSTOMER_STEP: 'UPDATE_RECIPIENT_CUSTOMER_STEP',
	UPDATE_RECIPIENT_CUSTOMER_PAGE_INDEX: 'UPDATE_RECIPIENT_CUSTOMER_PAGE_INDEX',
	UPDATE_RECIPIENT_CUSTOMER_PAGE_SIZE: 'UPDATE_RECIPIENT_CUSTOMER_PAGE_SIZE',

	UPDATE_CUSTOMER_CHECKED: 'UPDATE_CUSTOMER_CHECKED',
	UPDATE_CUSTOMERS_CHECKED_BETCH: 'UPDATE_CUSTOMERS_CHECKED_BETCH',

	SHOW_SCREENING_CONDITION_MODAL: 'SHOW_SCREENING_CONDITION_MODAL',
	SHOW_CONTACT_PREVIEW_LIST_MODAL: 'SHOW_CONTACT_PREVIEW_LIST_MODAL',

	REQ_CUSTOMER_BETCH_ADD_RECIPIENT_TO_CAMPAIGN: 'REQ_CUSTOMER_BETCH_ADD_RECIPIENT_TO_CAMPAIGN',
	RES_CUSTOMER_BETCH_ADD_RECIPIENT_TO_CAMPAIGN: 'RES_CUSTOMER_BETCH_ADD_RECIPIENT_TO_CAMPAIGN',

	REQ_RECIPIENT_MARK_STATUS: 'REQ_RECIPIENT_MARK_STATUS',
	RES_RECIPIENT_MARK_STATUS: 'RES_RECIPIENT_MARK_STATUS',
	REQ_BETCH_ADD_RECIPIENT_BLACKLIST: 'REQ_BETCH_ADD_RECIPIENT_BLACKLIST',
	RES_BETCH_ADD_RECIPIENT_BLACKLIST: 'RES_BETCH_ADD_RECIPIENT_BLACKLIST',
	REQ_BETCH_REMOVE_RECIPIENT_FROM_CAMPAIGN: 'REQ_BETCH_REMOVE_RECIPIENT_FROM_CAMPAIGN',
	RES_BETCH_REMOVE_RECIPIENT_FROM_CAMPAIGN: 'RES_BETCH_REMOVE_RECIPIENT_FROM_CAMPAIGN',
}

export const actions = {
	reqCustomers(option) {
		return {type: actionTypes.REQ_RECIPIENT_CUSTONERS, option}
	},
	resCustomers(customers, option) {
		return {type: actionTypes.RES_RECIPIENT_CUSTOMERS, customers, option}
	},
	reqSchema(campaign_id) {
		return {type: actionTypes.REQ_RECIPIENT_SCHEMA, campaign_id}
	},
	resSchema(schema) {
		return {type: actionTypes.RES_RECIPIENT_SCHEMA, schema}
	},

	updateStatus(status) {
		return {type: actionTypes.UPDATE_RECIPIENT_CUSTOMER_STATUS, status}
	},
	updateStep(step) {
		return {type: actionTypes.UPDATE_RECIPIENT_CUSTOMER_STEP, step}
	},

	updateCustomerChecked(customerId, status) {
		return {type: actionTypes.UPDATE_CUSTOMER_CHECKED, customerId, status}
	},
	updateCustomersCheckedBetch(status) {
		return {type: actionTypes.UPDATE_CUSTOMERS_CHECKED_BETCH, status}
	},

	showConditionModal(status) {
		return {type: actionTypes.SHOW_SCREENING_CONDITION_MODAL, status}
	},
	showPreviewModal(status) {
		return {type: actionTypes.SHOW_CONTACT_PREVIEW_LIST_MODAL, status}
	},

	reqBetchAddToCampaign(ids, campaign_id) {
		return {type: actionTypes.REQ_CUSTOMER_BETCH_ADD_RECIPIENT_TO_CAMPAIGN, ids, campaign_id}
	},
	resBetchAddToCampaign(ids, campaign_id) {
		return {type: actionTypes.RES_CUSTOMER_BETCH_ADD_RECIPIENT_TO_CAMPAIGN, ids, campaign_id}
	},

	reqMarkStatus(recipientId) {
		return {type: actionTypes.REQ_RECIPIENT_MARK_STATUS, recipientId}
	},
	resMarkStatus(markStatus) {
		return {type: actionTypes.RES_RECIPIENT_MARK_STATUS, markStatus}
	},

	reqBetchAddBlacklist(recipientIds) {
		return {type: actionTypes.REQ_BETCH_ADD_RECIPIENT_BLACKLIST, recipientIds}	
	},
	resBetchAddBlacklist(recipientIds) {
		return {type: actionTypes.RES_BETCH_ADD_RECIPIENT_BLACKLIST, recipientIds}
	},

	reqBetchRemoveFromCampaign(recipientsIds, campaignId) {
		return {type: actionTypes.REQ_BETCH_REMOVE_RECIPIENT_FROM_CAMPAIGN, recipientsIds, campaignId}
	},
	resBetchRemoveFromCampaign(recipientsIds, campaignId) {
		return {type: actionTypes.RES_BETCH_REMOVE_RECIPIENT_FROM_CAMPAIGN, recipientsIds, campaignId}
	},
}


export function customerReducer(state = initialState, action) {
	switch(action.type) {
		case actionTypes.RES_RECIPIENT_CUSTOMERS:
			return {
				...state,
				customers: action.customers.list,
				totalCount: action.customers.total,
				stepNum: action.customers.stepNum,
				statistics: action.customers.statistics,
				pageIndex: action.option.page || initialState.pageIndex,
				pageSize: action.option.limit || initialState.pageSize,
				status: action.option.status || initialState.status,
				step: action.option.step || initialState.step,
			}
		case actionTypes.RES_RECIPIENT_SCHEMA:
			return {
				...state,
				schemaData: action.schema
			}
		case actionTypes.UPDATE_RECIPIENT_CUSTOMER_STATUS:
			return {
				...state,
				status: action.status
			}
		case actionTypes.UPDATE_RECIPIENT_CUSTOMER_STEP:
			return {
				...state,
				step: action.step
			}
		case actionTypes.UPDATE_CUSTOMER_CHECKED:
			return {
				...state,
				customers: state.customers.map(item => {
					if(item.id === action.customerId) {
						item.checked = action.status
					}
					return item
				})
			}
		case actionTypes.UPDATE_CUSTOMERS_CHECKED_BETCH:
			return {
				...state,
				customers: state.customers.map(item => {
					item.checked = action.status
					return item
				})
			}

		case actionTypes.SHOW_SCREENING_CONDITION_MODAL:
			return {
				...state,
				conditionModal: action.status
			}
		case actionTypes.SHOW_CONTACT_PREVIEW_LIST_MODAL: 
			return {
				...state,
				contactPreviewModal: action.status
			}

		case actionTypes.RES_CUSTOMER_BETCH_ADD_RECIPIENT_TO_CAMPAIGN: {
			const idsArr = action.ids.split(',')
			const customers = state.customers.filter(item => idsArr.indexOf(String(item.id)) === -1)
			return {
				...state,
				customers,
			}
		}

		case actionTypes.RES_RECIPIENT_MARK_STATUS:
			return {
				...state,
				markStatus: action.markStatus
			}
		case actionTypes.RES_BETCH_ADD_RECIPIENT_BLACKLIST: {
			// const idsArr = action.recipientIds.split(',')
			// const customers = state.customers.filter(item => idsArr.indexOf(String(item.id)) === -1)
			// return {
			// 	...state,
			// 	customers,
			// }
			return state
		}
		case actionTypes.RES_BETCH_REMOVE_RECIPIENT_FROM_CAMPAIGN: {
			const idsArr = action.recipientsIds.split(',')
			const customers = state.customers.filter(item => idsArr.indexOf(String(item.id)) === -1)
			return {
				...state,
				customers,
			}
		}

		default:
			return state
	}
}