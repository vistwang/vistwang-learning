import {take, call, put, select} from 'redux-saga/effects'
import {http, config} from '../../utils'
import basic from '../../base/basic'
import { actions as globalActions} from '../../reducers/campaign'
import {actionTypes, actions} from '../../reducers/campaign/inbox'
import {actionTypes as replyActionTypes, actions as replyActions} from '../../reducers/campaign/reply'
import {actionTypes as customerActionTypes, actions as customerActions} from '../../reducers/campaign/customer'


const soupapiRecipient = config.SOUPAPI_RECIPIENT
const token = basic.token

export function* getRecipients(option) {
	yield put(globalActions.fetchStart())
	try {
		const campaignId = option.campaignId
		delete option.campaignId
		const param = {token, ...option}
		return yield call(http.get, soupapiRecipient + `/reply/${campaignId}/list`, param)
	} catch(err) {
		yield put(globalActions.setMessage('网络请求错误'))
	} finally {
		yield put(globalActions.fetchEnd())
	}
}
export function* getRecipientsFlow() {
	while(true) {
		const req = yield take(actionTypes.REQ_CAMPAIGN_RECIPIENTS)
		const res = yield call(getRecipients, req.option)
		if(res.success) {
			yield put(actions.resRecipients(res.data, req.option))
		} else {
			yield put(globalActions.setMessage(res.data.msg))
		}
	}
}


export function* getReplyTypes(campaignId) {
	yield put(globalActions.fetchStart())
	try {
		const param = {token, campaignId}
		return yield call(http.get, soupapiRecipient + '/reply/classification/list', param)
	} catch(err) {
		yield put(globalActions.setMessage('网络请求错误'))
	} finally {
		yield put(globalActions.fetchEnd())
	}
}
export function* getReplyTypesFlow() {
	while(true) {
		const req = yield take(actionTypes.REQ_RECIPIENT_REPLY_TYPES)
		const res = yield call(getReplyTypes, req.campaignId)
		if(res.success) {
			yield put(actions.resReplyTypes(res.data))
		} else {
			yield put(globalActions.setMessage(res.data.msg || res.data))
		}
	}
}

export function* saveReplyType(replyType) {
	yield put(globalActions.fetchStart())
	try {
		const param = {token, ...replyType}
		return yield call(http.post, soupapiRecipient + '/reply/classification', param)
	} catch(err) {
		yield put(globalActions.setMessage('网络请求错误'))
	} finally {
		yield put(globalActions.fetchEnd())
	}
}
export function* saveReplyTypeFlow() {
	while(true) {
		const req = yield take(actionTypes.SAVE_RECIPIENT_REPLY_TYPE)
		const res = yield call(saveReplyType, req.replyType)
		if(res.success) {
			yield put(actions.modifyReplyType(res.data))
			yield put(actions.resetReplyType(res.data))
			yield put(actions.showSettingReplyTypeModal(false))
		} else {
			yield put(globalActions.setMessage(res.data.msg || res.data))
		}
	}
}

export function* deleteReplyType(id) {
	yield put(globalActions.fetchStart())
	try {
		const param = {token}
		return yield call(http.delete, soupapiRecipient + `/reply/classification/${id}`, param)
	} catch(err) {
		yield put(globalActions.setMessage('网络请求错误'))
	} finally {
		yield put(globalActions.fetchEnd())
	}
}
export function* deleteReplyTypeFlow() {
	while(true) {
		const req = yield take(actionTypes.REQ_REMOVE_RECIPIENT_REPLY_TYPE)
		const res = yield call(deleteReplyType, req.replyTypeId)
		if(res.success) {
			yield put(actions.resRemoveReplyType(req.replyTypeId))
		} else {
			yield put(globalActions.setMessage(res.data.msg || res.data))
		}
	}
}

export function* betchAddToReplyType(replyIds,classificationId) {
	yield put(globalActions.fetchStart())
	try {
		const param = {token, replyIds}
		return yield call(http.post, soupapiRecipient + `/reply/classification/${classificationId}/put`, param)
	} catch(err) {
		yield put(globalActions.setMessage('网络请求错误'))
	} finally {
		yield put(globalActions.fetchEnd())
	}
}
export function* betchAddToReplyTypeFlow() {
	while(true) {
		const req = yield take(actionTypes.REQ_BETCH_ADD_RECIPIENT_TO_REPLY_TYPE)
		const res = yield call(betchAddToReplyType, req.ids, req.replyTypeId)
		if(res.success) {
			yield put(actions.resBetchAddToReplyType(req.ids, req.replyTypeId))
		} else {
			yield put(globalActions.setMessage(res.data.msg || res.data))
		}
	}
}

export function* betchDeleteRecipients(replyIds) {
	yield put(globalActions.fetchStart())
	try {
		const param = {token, replyIds}
		return yield call(http.post, soupapiRecipient + '/reply', param)
	} catch(err) {
		yield put(globalActions.setMessage('网络请求错误'))
	} finally {
		yield put(globalActions.fetchEnd())
	}
}
export function* betchDeleteRecipientsFlow() {
	while(true) {
		const req = yield take(actionTypes.REQ_BETCH_DELETE_RECIPIENTS)
		const res = yield call(betchDeleteRecipients, req.ids)
		if(res.success) {
			yield put(actions.resBetchAddToReplyType(req.ids))
			yield put(actions.showReplyModal(false))
		} else {
			yield put(globalActions.setMessage(res.data.msg || res.data))
		}
	}
}


export function* betchAddToCampaign(recipientsIds, campaignId) {
	yield put(globalActions.fetchStart())
	try {
		const param = {token, recipientsIds}
		return yield call(http.post, soupapiRecipient + `/${campaignId}/put`, param)
	} catch(err) {
		yield put(globalActions.setMessage('网络请求错误'))
	} finally {
		yield put(globalActions.fetchEnd())
	}
}
export function* betchAddToCampaignFlow() {
	while(true) {
		const req = yield take(actionTypes.REQ_BETCH_ADD_RECIPIENT_TO_CAMPAIGN)
		const res = yield call(betchAddToCampaign, req.ids, req.campaignId)
		if(res.success) {
			// yield put(actions.resBetchAddToCampaign(req.ids))
			yield put(actions.showAddToCampaignModal(false))
			yield put(globalActions.setMessage('添加到活动成功'))
		} else {
			yield put(globalActions.setMessage(res.data.msg || res.data))
		}
	}
}
// 针对用户部分移动到活动做处理
export function* customerBetchAddToCampaignFlow() {
	while(true) {
		const req = yield take(customerActionTypes.REQ_CUSTOMER_BETCH_ADD_RECIPIENT_TO_CAMPAIGN)
		const res = yield call(betchAddToCampaign, req.ids, req.campaignId)
		if(res.success) {
			yield put(customerActions.resBetchAddToCampaign(req.ids))
			yield put(actions.showAddToCampaignModal(false))
			yield put(globalActions.setMessage('添加到活动成功'))
		} else {
			yield put(globalActions.setMessage(res.data.msg || res.data))
		}
	}
}

/**
 * 获得回复详情
 * @param {Number} option        回复ID
 * @yield {[type]} [description]
 */
export function* getReply(replyId) {
	yield put(globalActions.fetchStart())
	try {
		const param = {token}
		return yield call(http.get, soupapiRecipient + `/reply/${replyId}`, param)
	} catch(err) {
		yield put(globalActions.setMessage('网络请求错误'))
	} finally {
		yield put(globalActions.fetchEnd())
	}
}
export function* getReplyFlow() {
	while(true) {
		const req = yield take(replyActionTypes.REQ_REPLY)
		const res = yield call(getReply, req.replyId)
		if(res.success) {
			yield put(replyActions.updateReplyId(req.replyId))
			yield put(replyActions.resReply(res.data))
			yield put(replyActions.showReplyModal(true))
		} else {
			yield put(globalActions.setMessage(res.data.msg))
		}
	}
}


export function* sendReplyEmail(option) {
	yield put(globalActions.fetchStart())
	try {
		const replyId = option.replyId
		delete option.replyId
		const param = {token, ...option}
		return yield call(http.post, soupapiRecipient + `/reply/${replyId}`, param)
	} catch(err) {
		yield put(globalActions.setMessage('网络请求错误'))
	} finally {
		yield put(globalActions.fetchEnd())
	}
}
export function* sendReplyEmailFlow() {
	while(true) {
		const req = yield take(replyActionTypes.REQ_SEND_REPLY_EMAIL)
		const res = yield call(sendReplyEmail, req.option)
		if(res.success) {
			// yield put(replyActions.updateReplyId(req.option))
			// yield put(replyActions.resSendReplyEmail(res.data))
			yield put(replyActions.showReplyEmailModal(false))
			// yield put(replyActions.showReplyModal(true))
			yield put(globalActions.setMessage('发送成功'))
		} else {
			yield put(globalActions.setMessage(res.data.msg))
		}
	}
}