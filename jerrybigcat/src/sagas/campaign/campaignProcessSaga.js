import {take, call, put, select} from 'redux-saga/effects'
import {http, config} from '../../utils'
import basic from '../../base/basic'
import { actions as globalActions} from '../../reducers/campaign'
import {actionTypes, actions} from '../../reducers/campaign/campaignProcess'
import {actions as contentActions} from '../../reducers/campaign/emailContent'
import {actionTypes as createActionTypes, actions as createActions} from '../../reducers/campaign/campaignCreate'


const soupapiCampaign = config.SOUPAPI_CAMPAIGN
const token = basic.token

export function* getCampaignProcesses(campaign_id) {
	yield put(globalActions.fetchStart())
	try {
		const param = {token}
		return yield call(http.get, soupapiCampaign + `/campaign/step/${campaign_id}`, param)
	} catch(err) {
		yield put(globalActions.setMessage('网络请求错误'))
	} finally {
		yield put(globalActions.fetchEnd())
	}
}
export function* getCampaignProcessesFlow() {
	while(true) {
		const req = yield take(actionTypes.REQ_CAMPAIGN_PROCESSES)
		const res = yield call(getCampaignProcesses, req.campaign_id)
		if(res.success) {
			yield put(actions.resCampaignProcesses(res.data))
		} else {
			yield put(globalActions.setMessage(res.data.msg))
		}
	}
}


export function* saveCampaignProcess(campaignProcess) {
	try {
		const campaignId = campaignProcess.campaignId
		delete campaignProcess.campaignId
		const param = {token, ...campaignProcess}
		return yield call(http.post, soupapiCampaign + `/${campaignId}/step`, param)
	} catch(err) {
		yield put(globalActions.setMessage('网络请求错误'))
	} finally {

	}
}
export function* saveCampaignProcessFlow() {
	while(true) {
		const req = yield take(actionTypes.SAVE_CAMPAIGN_PROCESS)
		const res = yield call(saveCampaignProcess, req.campaignProcess)
		if(res.success) {
			const data = res.data
			yield put(actions.modifyCampaignProcess(data))
			yield put(actions.setCampaignStepId(data.id))
			yield put(actions.setCampaignId(data.campaign_id))
		} else {
			yield put(globalActions.setMessage(res.data.msg))
		}
	}
}

export function* deleteCampaignProcess(stepId, campaignId) {
	try {
		const param = {token}
		return yield call(http.delete, soupapiCampaign + `/${campaignId}/step/${stepId}`, param)
	} catch(err) {
		yield put(globalActions.setMessage('网络请求错误'))
	} finally {

	}
}
export function* deleteCampaignProcessFlow() {
	while(true) {
		const req = yield take(actionTypes.REQ_REMOVE_CAMPAIGN_PROCESS)
		const res = yield call(deleteCampaignProcess, req.stepId, req.campaignId)
		if(res.success) {
			yield put(actions.resRemoveCampaignProcess(req.stepId))
		} else {
			yield put(globalActions.setMessage(res.data.msg))
		}
	}
}

export function* saveRelation(relation) {
	try {
		const stepId = relation.stepId
		delete relation.stepId
		const param = {token, ...relation}
		return yield call(http.post, soupapiCampaign + `/step/${stepId}/mail`, param)
	} catch(err) {
		yield put(globalActions.setMessage('网络请求错误'))
	} finally {

	}
}
export function* saveRelationFlow() {
	while(true) {
		const req = yield take(actionTypes.SAVE_PROCESS_RELATION_CONTENT)
		const res = yield call(saveRelation, req.relation)
		if(res.success) {
			let content = {
				...res.data,
				task: req.email,
			}
			yield put(actions.modifyRelationContent(content))
			yield put(contentActions.resetEmailContent(content))
			yield put(actions.showProcessContentModal(true))
			yield put(contentActions.showSendSettingModal(false))
		} else {
			yield put(globalActions.setMessage(res.data.msg))
		}
	}
}

export function* betchRemoveContent(stepId, refIds) {
	try {
		const param = {token, refIds}
		return yield call(http.delete, soupapiCampaign + `/step/${stepId}/mail`, param)
	} catch(err) {
		yield put(globalActions.setMessage('网络请求错误'))
	} finally {

	}
}
export function* betchRemoveContentFlow() {
	while(true) {
		const req = yield take(actionTypes.REQ_BETCH_REMOVE_PROCESS_CONTENT)
		const res = yield call(betchRemoveContent, req.stepId, req.refIds)
		if(res.success) {
			yield put(actions.resBetchRemoveContent(req.stepId, req.refIds))
		} else {
			yield put(globalActions.setMessage(res.data.msg))
		}
	}
}
