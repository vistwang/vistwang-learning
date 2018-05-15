import {take, call, put, select} from 'redux-saga/effects'
import {http, config} from '../../utils'
import basic from '../../base/basic'

import { actions as globalActions } from '../../reducers/campaign'
import { actions, actionTypes } from '../../reducers/campaign/customer'

const soupapiRecipient = config.SOUPAPI_RECIPIENT
const token = basic.token

export function* getCustomers(option) {
	yield put(globalActions.fetchStart())
	try {
		const campaignId = option.campaignId
		delete option.campaign_id
		const param = {token, ...option}
		return yield call(http.get, soupapiRecipient + `/${campaignId}/recipients`, param)
	} catch (err) {
		yield put(globalActions.setMessage('网络请求错误 ',err))
	} finally {
		yield put(globalActions.fetchEnd())
	}
}
export function* getCustomersFlow() {
	while(true) {
		const req = yield take(actionTypes.REQ_RECIPIENT_CUSTONERS)
		const res = yield call(getCustomers, req.option)
		if(res.success) {
			yield put(actions.resCustomers(res.data, req.option))
		} else {
			yield put(globalActions.setMessage(res.data.msg || res.data))
		}
	}
}

export function* getSchema(campaign_id) {
	yield put(globalActions.fetchStart())
	try {
		const param = {token}
		return yield call(http.get, soupapiRecipient + `/recipient/schema/${campaign_id}`, param)
	} catch (err) {
		yield put(globalActions.setMessage('网络请求错误 ',err))
	} finally {
		yield put(globalActions.fetchEnd())
	}
}
export function* getSchemaFlow() {
	while(true) {
		const req = yield take(actionTypes.REQ_RECIPIENT_SCHEMA)
		const res = yield call(getSchema, req.campaign_id)
		if(res.success) {
			yield put(actions.resSchema(res.data))
		} else {
			yield put(globalActions.setMessage(res.data.msg || res.data))
		}
	}
}


export function* getMarkStatus(recipientsId) {
	yield put(globalActions.fetchStart())
	try {
		const param = {token}
		return yield call(http.get, soupapiRecipient + `/${recipientsId}/mark-status`, param)
	} catch (err) {
		yield put(globalActions.setMessage('网络请求错误 ',err))
	} finally {
		yield put(globalActions.fetchEnd())
	}
}
export function* getMarkStatusFlow() {
	while(true) {
		const req = yield take(actionTypes.REQ_RECIPIENT_MARK_STATUS)
		const res = yield call(getMarkStatus, req.recipientId)
		if(res.success) {
			yield put(actions.resMarkStatus(res.data))
		} else {
			yield put(globalActions.setMessage(res.data.msg || res.data))
		}
	}
}

export function* betchDeleteFromCampaign(recipientsIds, campaignId) {
	yield put(globalActions.fetchStart())
	try {
		const param = {token, recipientsIds}
		return yield call(http.post, soupapiRecipient + `/${campaignId}/remove`, param)
	} catch (err) {
		yield put(globalActions.setMessage('网络请求错误 ',err))
	} finally {
		yield put(globalActions.fetchEnd())
	}
}
export function* betchDeleteFromCampaignFlow() {
	while(true) {
		const req = yield take(actionTypes.REQ_BETCH_REMOVE_RECIPIENT_FROM_CAMPAIGN)
		const res = yield call(betchDeleteFromCampaign, req.recipientsIds, req.campaignId)
		if(res.success) {
			yield put(actions.resBetchRemoveFromCampaign(req.recipientsIds, req.campaignId))
			yield put(globalActions.setMessage('回复者成功从本活动移出'))
		} else {
			yield put(globalActions.setMessage(res.data.msg || res.data))
		}
	}
}


export function* addBlacklist(recipientsIds) {
	yield put(globalActions.fetchStart())
	try {
		const param = {token, recipientsIds}
		return yield call(http.post, soupapiRecipient + `/black-list`, param)
	} catch (err) {
		yield put(globalActions.setMessage('网络请求错误 ',err))
	} finally {
		yield put(globalActions.fetchEnd())
	}
}
export function* addBlacklistFlow() {
	while(true) {
		const req = yield take(actionTypes.REQ_BETCH_ADD_RECIPIENT_BLACKLIST)
		const res = yield call(addBlacklist, req.recipientIds)
		if(res.success) {
			yield put(actions.resBetchAddBlacklist(req.recipientIds))
			yield put(globalActions.setMessage('成功加入黑名单'))
		} else {
			yield put(globalActions.setMessage(res.data.msg || res.data))
		}
	}
}