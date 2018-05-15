import {take, call, put, select} from 'redux-saga/effects'
import {http, config} from '../../utils'
import basic from '../../base/basic'
import {actionTypes as globalActionTypes, actions as globalActions} from '../../reducers/campaign'
import {actionTypes, actions} from '../../reducers/campaign/baseSetting'


const soupapiMail = config.SOUPAPI_MAIL
const token = basic.token

export function* getTimeZone() {
	try {
		const param = {token}
		return yield call(http.get, soupapiMail + '/profile/timezone/get', param)
	} catch(err) {
		yield put(globalActions.setMessage('网络请求错误'))
	} finally {

	}
}
export function* getTimeZoneFlow() {
	while(true) {
		const req = yield take(globalActionTypes.REQ_TIME_ZONE)
		const res = yield call(getTimeZone)
		if(res.success) {
			yield put(globalActions.resTimeZone(res.data))
		} else {
			yield put(globalActions.setMessage(res.data.msg))
		}
	} 
}

export function* getSchedules() {
	try {
		const param = {token}
		return yield call(http.get, soupapiMail + '/profile/schedules', param)
	} catch(err) {
		yield put(globalActions.setMessage('网络请求错误'))
	} finally {

	}
}
export function* getSchedulesFlow() {
	while(true) {
		const req = yield take(actionTypes.REQ_SCHEDULE_LIST)
		const res = yield call(getSchedules)
		if(res.success) {
			yield put(actions.resSchedules(res.data))
		} else {
			yield put(globalActions.setMessage(res.data.msg))
		}
	} 
}




