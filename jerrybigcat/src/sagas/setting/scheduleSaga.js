import {take, call, put, select} from 'redux-saga/effects'
import {http, config} from '../../utils'
import basic from '../../base/basic'
import {actions as globalActions} from '../../reducers/setting'
import {actionTypes, actions} from '../../reducers/setting/schedule'
import {actionTypes as setActionTypes, actions as setActions} from '../../reducers/setting/scheduleSetting'

const soupapiMail = config.SOUPAPI_MAIL
const token = basic.token

export function* getScheduleList() {
	yield put(globalActions.fetchStart())
	try {
		const param = {token}
		return yield call(http.get, soupapiMail + '/profile/schedules', param)
	} catch(err) {
		yield put(globalActions.setMessage('网络请求错误'))
	} finally {
		yield put(globalActions.fetchEnd())
	}
}
export function* getScheduleListFlow() {
	while(true) {
		const req = yield take(actionTypes.REQ_SCHEDULE_LIST)
		const res = yield call(getScheduleList)
		if(res.success) {
			yield put(actions.resScheduleList(res.data))
		} else {
			yield put(globalActions.setMessage(res.data.msg))
		}
	}
}

export function* saveSchedule(schedule) {
	try {
		const param = {token, ...schedule}
		return yield call(http.post, soupapiMail + '/profile/schedule', param)
	} catch(err) {

	} finally {

	}
}
export function* saveScheduleFlow() {
	while(true) {
		const req = yield take(setActionTypes.SAVE_SCHEDULE)
		const res = yield call(saveSchedule, req.schedule)
		if(res.success) {
			yield put(actions.modifySchedule(res.data))
			yield put(setActions.setScheduleId(res.data.schedule_id))
			yield put(actions.showSettingModal(false))
			yield put(globalActions.setMessage('保存成功'))
		} else {
			yield put(globalActions.setMessage(res.data.msg))
		}
	}
}

export function* removeSchedule(schedule_id) {
	try {
		const param = {token, schedule_id}
		return yield call(http.post, soupapiMail + '/profile/schedule/delete', param)
	} catch(err) {

	} finally {

	}
}
export function* removeScheduleFlow() {
	while(true) {
		const req = yield take(actionTypes.REQ_REMOVE_SCHEDULE)
		const res = yield call(removeSchedule, req.id)
		if(res.success) {
			yield put(actions.resRemoveSchedule(req.id))
		} else {
			yield put(globalActions.setMessage(res.data.msg || res.data))
		}
	}
}

export function* settingScheduleDefault(schedule_id, isDefault) {
	try {
		const param = {token, schedule_id, isDefault}
		return yield call(http.post, soupapiMail + '/profile/schedule/default', param)
	} catch(err) {
		yield put(globalActions.setMessage('网络请求错误'))
	} finally {

	}
}
export function* settingScheduleDefaultFlow() {
	while(true) {
		const req = yield take(actionTypes.REQ_SETTING_SCHEDULE_DEFAULT)
		const res = yield call(settingScheduleDefault, req.id, req.isDefault)
		if(res.success) {
			yield put(actions.resSettingDefault(req.id))
		} else {
			yield put(globalActions.setMessage(res.data.msg || res.data))
		}
	}
}
