import {take, call, put, select} from 'redux-saga/effects'
import {http, config} from '../../utils'
import basic from '../../base/basic'
import { actions as globalActions} from '../../reducers/campaign'
import {actionTypes, actions} from '../../reducers/campaign/autoResponse'


const soupapiCampaign = config.SOUPAPI_CAMPAIGN
const token = basic.token

export function* getAutoResponseActions() {
	yield put(globalActions.fetchStart())
	try {
		const param = {token}
		return yield call(http.get, soupapiCampaign + '/automatic-response', param)
	} catch(err) {
		yield put(globalActions.setMessage('网络请求错误'))
	} finally {
		yield put(globalActions.fetchEnd())
	}
}
export function* getAutoResponseActionsFlow() {
	while(true) {
		const req = yield take(actionTypes.REQ_CAMPAIGN_AUTO_RESPONSE_ACTIONS)
		const res = yield call(getAutoResponseActions)
		if(res.success) {
			yield put(actions.resAutoResponseActions(res.data))
		} else {
			yield put(globalActions.setMessage(res.data.msg))
		}
	}
}

