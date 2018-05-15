import {take, call, put, select} from 'redux-saga/effects'
import {http, config} from '../../utils'
import basic from '../../base/basic'
import {actions as globalActions} from '../../reducers/setting'
import {actionTypes, actions} from '../../reducers/setting/event'
import {actionTypes as setActionTypes, actions as setActions} from '../../reducers/setting/eventSetting'

const soupapiContact = config.SOUPAPI_CONTACT
const token = basic.token

export function* getEventList() {
	yield put(globalActions.fetchStart())
	try {
		const param = {token}
		return yield call(http.get, soupapiContact + '/event/list', param)
	} catch(err) {

	} finally {
		yield put(globalActions.fetchEnd())
	}
}
export function* getEventListFlow() {
	while(true) {
		const req = yield take(actionTypes.REQ_EVENT_LIST)
		const res = yield call(getEventList)
		if(res.success) {
			yield put(actions.resEventList(res.data)) 
		}
	}
}


export function* saveEvent(event, id) {
	try {
		let param = {token, eventStr: JSON.stringify(event)}
		if(id) {
			param.id = id
		}
		return yield call(http.post, soupapiContact + '/event/do', param)
	} catch(err) {
		console.log(err)
	} finally {

	}
}
export function* saveEventFlow() {
	while(true) {
		const req = yield take(setActionTypes.SAVE_EVENT)
		const res = yield call(saveEvent, req.event, req.id)
		if(res.success) {
			yield put(actions.modifyEvent(res.data))
			yield put(setActions.setEventId(res.data.id, req.index))
			// yield put(globalActions.setMessage('保存成功'))
		} else {
			yield put(globalActions.setMessage(res.data.msg))
		}
	}
}


export function* removeEvent(id) {
	try {
		const param = {token}
		return yield call(http.delete, soupapiContact + `/event/${id}`, param)
	} catch(err) {
	} finally {

	}
}
export function* removeEventFlow() {
	while(true) {
		const req = yield take(actionTypes.REQ_REMOVE_EVENT)
		const res = yield call(removeEvent, req.id)
		if(res.success) {
			yield put(actions.resRemoveEvent(req.id))
			yield put(globalActions.setMessage('删除成功'))
		} else {
			yield put(globalActions.setMessage(res.data.msg))
		}
	}
}