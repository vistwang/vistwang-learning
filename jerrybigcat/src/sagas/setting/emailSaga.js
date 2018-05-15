import {take, call, put, select} from 'redux-saga/effects'
import {http, config} from '../../utils'
import basic from '../../base/basic'
import {actionTypes as globalActionTypes, actions as globalActions} from '../../reducers/setting'
import {actionTypes, actions} from '../../reducers/setting/email'


const soupapiMail = config.SOUPAPI_MAIL
const token = basic.token

export function* getAccountSet() {
	try {
		const param = {token}
		return yield call(http.get, soupapiMail + '/profile/-1', param)
	} catch(err) {
		yield put(globalActions.setMessage('网络请求错误'))
	} finally {

	}
}
export function* getAccountSetFlow() {
	while(true) {
		const req = yield take(actionTypes.REQ_ACCOUNT_SET)
		const res = yield call(getAccountSet)
		if(res.success) {
			yield put(actions.resAccountSet(res.data))
		} else {
			yield put(globalActions.setMessage(res.data.msg))
		}
	}
}

export function* saveAccountSet(option) {
	try {
		const param = {token, ...option}
		return yield call(http.post, soupapiMail + '/profile', param)
	} catch(err) {
		yield put(globalActions.setMessage('网络请求错误'))
	} finally {
	}
}

export function* saveAccountSetFlow() {
	while(true) {
		const req = yield take(actionTypes.SAVE_ACCOUNT_SET)
		const res = yield call(saveAccountSet, req.set)
		if(res.success) {
			yield put(globalActions.setMessage('保存成功'))
		} else {
			yield put(globalActions.setMessage(res.data.msg))
		}
	}
}

export function* getTimeZone() {
	try {
		const param = {token}
		return yield call(http.get, soupapiMail + '/profile/timezone/get', param)
	} catch(err) {

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