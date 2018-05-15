import {take, call, put, select} from 'redux-saga/effects'
import {http, config} from '../../utils'
import basic from '../../base/basic'
import { actions as globalActions} from '../../reducers/campaign'
import {actionTypes, actions} from '../../reducers/campaign/tag'

const soupapiContact = config.SOUPAPI_CONATCT
const token = basic.token

/**
 * 获取所有标签
 * @yield {[type]} [description]
 */
export function* getTagAll() {
	yield put(globalActions.fetchStart())
	try {
		const param = {token}
		return yield call(http.get, soupapiContact + '/tag/listAll', param)
	} catch(err) {
		yield put(globalActions.setMessage('网络请求错误'))
	} finally {
		yield put(globalActions.fetchEnd())
	}
}
export function* getTagAllFlow() {
	while(true) {
		const req = yield take(actionTypes.REQ_TAG_ALL)
		const res = yield call(getTagAll)
		if(res.success) {
			yield put(actions.resTagAll(res.data))
		} else {
			yield put(globalActions.setMessage(res.data.msg))
		}
	}
}

/**
 * 切入标签
 * @param {[type]} option        [description]
 * @yield {[type]} [description]
 */
export function* tagPutContact(option) {
	// yield put(globalActions.fetchStart())
	try {
		const param = {token, ...option}
		return yield call(http.post, soupapiContact + '/tag/putContact', param)
	} catch(err) {
		yield put(globalActions.setMessage('网络请求错误'))
	} finally {
		// yield put(globalActions.fetchEnd())
	}
}
export function* tagPutContactFlow() {
	while(true) {
		const req = yield take(actionTypes.REQ_TAG_PUT_CONTACT)
		const res = yield call(tagPutContact, req.option)
		if(res.success) {
			yield put(actions.resTagPutContact(res.data))
		} else {
			yield put(globalActions.setMessage(res.data.msg))
		}
	}
}

/**
 * 删除标签
 * @param {[type]} option        [description]
 * @yield {[type]} [description]
 */
export function* tagRemoveContact(option) {
	// yield put(globalActions.fetchStart())
	try {
		const param = {token, ...option}
		return yield call(http.post, soupapiContact + '/tag/removeContact', param)
	} catch(err) {
		yield put(globalActions.setMessage('网络请求错误'))
	} finally {
		// yield put(globalActions.fetchEnd())
	}
}
export function* tagRemoveContactFlow() {
	while(true) {
		const req = yield take(actionTypes.REQ_TAG_REMOVE_CONTACT)
		const res = yield call(tagRemoveContact, req.option)
		if(res.success) {
			yield put(actions.resTagRemoveContact(res.data))
		} else {
			yield put(globalActions.setMessage(res.data.msg))
		}
	}
}
