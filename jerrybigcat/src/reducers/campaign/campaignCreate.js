const initialState = {
	campaignCreateStep: 1,
	isCreateCampaignFetch: false,


	campaignId: '',
	name: '',
	type: 1,
	status: 0,
	target_condition: '',
	response_condition: '',

	start_time: 0,
}

export const actionTypes = {
	SET_CAMPAIGN_CREATE_STEP: 'SET_CAMPAIGN_CREATE_STEP',
	SET_CREATE_CAMPAIGN_FETCH: 'SET_CREATE_CAMPAIGN_FETCH',

	SET_CAMPAIGN_ID: 'SET_CAMPAIGN_ID',
	UPDATE_CAMPAIGN_TARGET_CONDITION: 'UPDATE_CAMPAIGN_TARGET_CONDITION',
	UPDATE_CAMPAIGN_NAME: 'UPDATE_CAMPAIGN_NAME',

	REQ_SINGLE_CAMPAIGN: 'REQ_SINGLE_CAMPAIGN',
	RES_SINGLE_CAMPAIGN: 'RES_SINGLE_CAMPAIGN',

	REQ_SAVE_CAMPAIGN_START_TIME: 'REQ_SAVE_CAMPAIGN_START_TIME',
	RES_SAVE_CAMPAIGN_START_TIME: 'RES_SAVE_CAMPAIGN_START_TIME',

	REQ_CHECK_CAMPAIGN: 'REQ_CHECK_CAMPAIGN',

	REQ_SAVE_CAMPAIGN: 'REQ_SAVE_CAMPAIGN',
	RESET_CAMPAIGN: 'RESET_CAMPAIGN',

}

export const actions = {
	setCreateStep(step) {
		return {type: actionTypes.SET_CAMPAIGN_CREATE_STEP, step}
	},
	setCreateCampaignFetch(status) {
		return {type: actionTypes.SET_CREATE_CAMPAIGN_FETCH, status}
	},

	setCampaignId(id) {
		return {type: actionTypes.SET_CAMPAIGN_ID, id}
	},

	updateCampaignName(name) {
		return {type: actionTypes.UPDATE_CAMPAIGN_NAME, name}
	},

	updateCampaignTargetCondition(condition) {
		return {type: actionTypes.UPDATE_CAMPAIGN_TARGET_CONDITION, condition}
	},

	reqCampaign(campaignId) {
		return {type: actionTypes.REQ_SINGLE_CAMPAIGN, campaignId}
	},
	resCampaign(campaign) {
		return {type: actionTypes.RES_SINGLE_CAMPAIGN, campaign}
	},

	reqSaveStartTime(campaignId, time) {
		return {type: actionTypes.REQ_SAVE_CAMPAIGN_START_TIME, campaignId, time}
	},

	resSaveStartTime(time) {
		return {type: actionTypes.RES_SAVE_CAMPAIGN_START_TIME, time}
	},

	reqSaveCampaign(campaign, option) {
		return {type: actionTypes.REQ_SAVE_CAMPAIGN, campaign, option}
	},

	resetCampaign(campaign) {
		return {type: actionTypes.RESET_CAMPAIGN, campaign}
	},

	reqCheckCampaign(campaignId) {
		return {type: actionTypes.REQ_CHECK_CAMPAIGN, campaignId}
	},
}

/**
 * 重新设置活动字段
 * @param  {[type]} campaign [description]
 * @return {[type]}          [description]
 */
const resetCampaign = (campaign) => {
	if(!campaign) {
		return {}
	}
	return {
		campaignId: campaign.id,
		name: campaign.name,
		type: campaign.type,
		status: campaign.status,
		target_condition: campaign.target_condition,
		response_condition: campaign.response_condition,
	}
}


export function reducer(state = initialState, action) {
	switch(action.type) {
		case actionTypes.SET_CAMPAIGN_CREATE_STEP:
			return {
				...state,
				campaignCreateStep: action.step
			}
		case actionTypes.SET_CREATE_CAMPAIGN_FETCH:
			return {
				...state,
				isCreateCampaignFetch: action.status
			}
		case actionTypes.SET_CAMPAIGN_ID:
			return {
				...state,
				campaignId: action.id
			}
		case actionTypes.UPDATE_CAMPAIGN_NAME:
			return {
				...state,
				name: action.name
			}
		case actionTypes.UPDATE_CAMPAIGN_TARGET_CONDITION:
			return {
				...state,
				target_condition: actionTypes.condition
			}
		case actionTypes.REQ_SINGLE_CAMPAIGN: {
			const campaign = resetCampaign(action.campaign)
			return {
				...state,
				...campaign,
			}
		}
		case actionTypes.RES_SAVE_CAMPAIGN_START_TIME:
			return {
				...state,
				start_time: action.time
			}
		case actionTypes.RESET_CAMPAIGN: {
			let campaignState
			if(!action.campaign) {
				campaignState = initialState
			} else {
				const campaign = resetCampaign(action.campaign)
				campaignState = {
					...state,
					...campaign,
				}
			}
			return campaignState
		}
		default: 
			return state
	}
}