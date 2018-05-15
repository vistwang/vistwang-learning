import {take, call, put, select} from 'redux-saga/effects'
import {http, config} from '../../utils'
import basic from '../../base/basic'
import { actions as globalActions} from '../../reducers/campaign'
import {actionTypes, actions} from '../../reducers/campaign/campaignTmpl'
import {actions as createActions} from '../../reducers/campaign/campaignCreate'
import {actions as processActions} from '../../reducers/campaign/campaignProcess'

const soupapiCampaign = config.SOUPAPI_CAMPAIGN
const token = basic.token

/**
 * 获取模板列表
 * @param {Object} option        page, limit, classifiation
 */
export function* getTemplates(option) {
	yield put(globalActions.fetchStart())
	try {
		const param = {token, ...option}
		return yield call(http.get, soupapiCampaign + '/template', param)
	} catch(err) {
		yield put(globalActions.setMessage('网络请求错误'))
	} finally {
		yield put(globalActions.fetchEnd())
	}
}
export function* getTemplatesFlow() {
	while(true) {
		const req = yield take(actionTypes.REQ_CAMPAIGN_TEMPLATES)
		const res = yield call(getTemplates, req.option)
		if(res.success) {
			yield put(actions.resTemplates(res.data, req.option))
		} else {
			yield put(globalActions.setMessage(res.data.msg))
		}
	}
}

/**
 * 模板预览
 * @param {Number} templateId    
 */
export function* getTemplatePreview(templateId) {
	yield put(globalActions.fetchStart())
	try {
		const param = {token}
		return yield call(http.get, soupapiCampaign + `/template/${templateId}`, param)
	} catch(err) {
		yield put(globalActions.setMessage('网络请求错误'))
	} finally {
		yield put(globalActions.fetchEnd())
	}
}
export function* getTemplatePreviewFlow() {
	while(true) {
		const req = yield take(actionTypes.REQ_CAMPAIGN_TEMPLATE_PREVIEW)
		const res = yield call(getTemplatePreview, req.templateId)
		if(res.success) {
			yield put(actions.togglePreviewModal(true))
			yield put(actions.resPreview(res.data))
		} else {
			yield put(globalActions.setMessage(res.data.msg))
		}
	}
}

/**
 * 使用模板
 * @param {Number} templateId    
 */
export function* useTemplate(templateId) {
	yield put(globalActions.fetchStart())
	try {
		const param = {token}
		return yield call(http.post, soupapiCampaign + `/template/${templateId}`, param)
	} catch(err) {
		yield put(globalActions.setMessage('网络请求错误'))
	} finally {
		yield put(globalActions.fetchEnd())
	}
}
export function* useTemplateFlow() {
	while(true) {
		const req = yield take(actionTypes.REQ_USE_CAMPAIGN_TEMPLATE)
		const res = yield call(useTemplate, req.templateId)
		if(res.success) {
			yield put(createActions.setCreateCampaignFetch(true))
			yield put(createActions.resetCampaign(res.data.campaign))
			yield put(processActions.resCampaignProcesses(res.data.steps))
		} else {
			yield put(globalActions.setMessage(res.data.msg))
		}
	}
}

