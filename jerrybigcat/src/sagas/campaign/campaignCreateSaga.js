import {take, call, put, select} from 'redux-saga/effects'
import {http, config} from '../../utils'
import basic from '../../base/basic'
import { actions as globalActions} from '../../reducers/campaign'
import { actions as listActions } from '../../reducers/campaign/campaignList'
import {actionTypes, actions} from '../../reducers/campaign/campaignCreate'
import {actions as processActions} from '../../reducers/campaign/campaignProcess'
import {actions as customerActions} from '../../reducers/campaign/customer'
import {actions as baseActions} from '../../reducers/campaign/baseSetting'


const soupapiCampaign = config.SOUPAPI_CAMPAIGN
const token = basic.token


export function* getCampaign(campaignId) {
	yield put(globalActions.fetchStart())
	try {
		const param = {token}
		return yield call(http.get, soupapiCampaign + `/${campaignId}`, param)
	} catch(err) {
		yield put(globalActions.setMessage('网络请求错误'))
	} finally {
		yield put(globalActions.fetchEnd())
	}
}
export function* getCampaignFlow() {
	while(true) {
		const req = yield take(actionTypes.REQ_SINGLE_CAMPAIGN)
		const res = yield call(getCampaign, req.campaignId)
		if(res.success) {
			yield put(actions.resCampaign(res.data.campaign))
			yield put(processActions.resCampaignProcesses(res.data.steps))
			yield put(baseActions.resetBaseSetting(res.data.campaign))
		} else {
			yield put(globalActions.setMessage(res.data.msg))
		}
	}
}

export function* saveCampaign(campaign) {
	try {
		const param = {token, ...campaign}
		return yield call(http.post, soupapiCampaign + '/', param)
	} catch(err) {
		yield put(globalActions.setMessage('网络请求错误'))
	} finally {

	}
}
export function* saveCampaignFlow() {
	while(true) {
		const req = yield take(actionTypes.REQ_SAVE_CAMPAIGN)
		const res = yield call(saveCampaign, req.campaign)
		if(res.success) {
			yield put(listActions.modifyCampaign(res.data))
			yield put(actions.setCampaignId(res.data.id || req.campaign.id))
			yield put(actions.setCreateCampaignFetch(true))
			yield put(actions.resetCampaign(res.data))

			if(req.option && req.option.showConditionModal === false) {
				yield put(customerActions.showConditionModal(false))
			}
			if(req.option && req.option.message) {
				yield put(globalActions.setMessage(req.option.message))
			}
		} else {
			yield put(globalActions.setMessage(res.data.msg))
		}
	}
}

export function* saveStartTime(campaignId, startTime) {
	try {
		const param = {token, startTime}
		return yield call(http.post, soupapiCampaign + `/${campaignId}/start`, param)
	} catch(err) {
		yield put(globalActions.setMessage('网络请求错误'))
	} finally {

	}
}
export function* saveStartTimeFlow() {
	while(true) {
		const req = yield take(actionTypes.REQ_SAVE_CAMPAIGN_START_TIME)
		const res = yield call(saveStartTime, req.campaignId, req.time)
		if(res.success) {
			yield put(actions.resSaveStartTime(req.time))
		} else {
			yield put(globalActions.setMessage(res.data.msg || res.data))
		}
	}
}

/**
 * 校验活动信息
 * @param {Number} campaignId    
 */
export function* checkCampaign(campaignId) {
	yield put(globalActions.fetchStart())
	try {
		const param = {token}
		return yield call(http.get, soupapiCampaign + `/${campaignId}/check`, param)
	} catch(err) {
		yield put(globalActions.setMessage('网络请求错误'))
	} finally {
		yield put(globalActions.fetchEnd())
	}
}
export function* checkCampaignFlow() {
	while(true) {
		const req = yield take(actionTypes.REQ_CHECK_CAMPAIGN)
		const res = yield call(checkCampaign, req.campaignId)
		if(res.success) {
			yield put(actions.setCreateStep(2))
		} else if(res.data.code === 'E100002') {
			yield put(globalActions.setMessage('检测不通过:' + res.data.msg))
		} else {
			yield put(globalActions.setMessage(res.data.msg))
		}
	}
}


