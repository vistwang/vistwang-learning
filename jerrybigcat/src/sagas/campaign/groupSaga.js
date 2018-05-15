import {take, call, put, select} from 'redux-saga/effects'
import {http, config} from '../../utils'
import basic from '../../base/basic'
import { actions as globalActions} from '../../reducers/campaign'
import {actionTypes, actions} from '../../reducers/campaign/group'

const soupapiContact = config.SOUPAPI_CONTACT
const token = basic.token


export function* getGroups(scope, type) {
	yield put(globalActions.fetchStart())
	try {
		const param = {token, scope, type}
		return yield call(http.get, soupapiContact + '/group/listAll', param)
	} catch(err) {
		yield put(globalActions.setMessage('网络请求错误'))
	} finally {
		yield put(globalActions.fetchEnd())
	}
}
export function* getGroupsFlow() {
	while(true) {
		const req = yield take(actionTypes.REQ_CONTACT_GROUPS)
		const res = yield call(getGroups, req.scope, req.groupType)
		if(res.success) {
			yield put(actions.resGroups(res.data, req.scope, req.groupType))
		} else {
			yield put(globalActions.setMessage(res.data.msg))
		}
	}
}

export function* groupPutContact(option) {
	yield put(globalActions.fetchStart())
	try {
		const param = {token, ...option}
		return yield call(http.post, soupapiContact + '/group/putContact', param)
	} catch(err) {

	} finally {
		yield put(globalActions.fetchEnd())
	}
}
export function* groupPutContactFlow() {
	while(true) {
		const req = yield take(actionTypes.REQ_GROUP_PUT_CONTACT)
		const res = yield call(groupPutContact, req.option)
		if(res.success) {
			yield put(actions.showGroupModal(false))
			yield put(globalActions.setMessage('添加到群组成功'))
		} else {
			yield put(globalActions.setMessage(res.data.msg))
		}
	}
}


export function* groupRemoveContact(option) {
	yield put(globalActions.fetchStart())
	try {
		const param = {token, ...option}
		return yield call(http.post, soupapiContact + '/group/removeContact', param)
	} catch(err) {

	} finally {
		yield put(globalActions.fetchEnd())
	}
}
export function* groupRemoveContactFlow() {
	while(true) {
		const req = yield take(actionTypes.REQ_GROUP_REMOVE_CONTACT)
		const res = yield call(groupRemoveContact, req.option)
		if(res.success) {
			yield put(actions.showGroupModal(false))
			yield put(globalActions.setMessage('移除群组成功'))
		} else {
			yield put(globalActions.setMessage(res.data.msg))
		}
	}
}