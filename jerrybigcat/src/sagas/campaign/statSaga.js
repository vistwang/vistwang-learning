import {take, call, put, select} from 'redux-saga/effects'
import {http, config} from '../../utils'
import basic from '../../base/basic'
import { actions as globalActions} from '../../reducers/campaign'
import {actionTypes, actions} from '../../reducers/campaign/stat'


const soupapiCampaign = config.SOUPAPI_RECIPIENT
const token = basic.token

export function* getCampaignStat(option) {
	yield put(globalActions.fetchStart())
	try {
		const campaignId = option.campaignId
		delete option.campaignId
		const param = {token, ...option}
		return yield call(http.get, soupapiCampaign + `/${campaignId}/statistics`, param)
	} catch(err) {
		yield put(globalActions.setMessage('网络请求错误'))
	} finally {
		yield put(globalActions.fetchEnd())
	}
}
export function* getCampaignStatFlow() {
	while(true) {
		const req = yield take(actionTypes.REQ_CAMPAIGN_STAT)
		const res = yield call(getCampaignStat, req.option)
		if(res.success) {
			yield put(actions.resStatistics(res.data))
		} else {
			yield put(globalActions.setMessage(res.data.msg))
		}
	}
}

export function* getCampaignChart(option) {
	yield put(globalActions.fetchStart())
	try {
		const campaignId = option.campaignId
		delete option.campaignId
		const param = {token, ...option}
		return yield call(http.get, soupapiCampaign + `/${campaignId}/chart`, param)
	} catch(err) {
		yield put(globalActions.setMessage('网络请求错误'))
	} finally {
		yield put(globalActions.fetchEnd())
	}
}
export function* getCampaignChartFlow() {
	while(true) {
		const req = yield take(actionTypes.REQ_CAMPAIGN_CHART)
		const res = yield call(getCampaignChart, req.option)
		if(res.success) {
			yield put(actions.resChart(res.data))
		} else {
			yield put(globalActions.setMessage(res.data.msg))
		}
	}
}