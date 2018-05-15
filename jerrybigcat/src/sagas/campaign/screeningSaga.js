import {take, call, put, select} from 'redux-saga/effects'
import {http, config} from '../../utils'
import basic from '../../base/basic'
import { actions as globalActions} from '../../reducers/campaign'
import {actionTypes, actions} from '../../reducers/campaign/screening'


const soupapiContact = config.SOUPAPI_CONTACT
const token = basic.token


export function* getQueryTerms() {
	yield put(globalActions.fetchStart())
	try {
		const param = {token}
		return yield call(http.get, soupapiContact + '/query-terms', param)
	} catch(err) {
		yield put(globalActions.setMessage('网络请求错误'))
	} finally {
		yield put(globalActions.fetchEnd())
	}
}
export function* getQueryTermsFlow() {
	while(true) {
		const req = yield take(actionTypes.REQ_QUERY_TERMS)
		const res = yield call(getQueryTerms)
		if(res.success) {
			yield put(actions.resQueryTerms(res.data))
		} else {
			yield put(globalActions.setMessage(res.data.msg))
		}
	}
}

export function* getQueryContacts(page, limit, conditionsStr) {
	try {
		const param ={token, page, limit, conditionsStr}
		return yield call(http.post, soupapiContact + '/list', param)
	} catch(err) {
		yield put(globalActions.setMessage('网络请求错误'))
	} finally {

	}
}
export function* getQueryContactsFlow() {
	while(true) {
		const req = yield take(actionTypes.REQ_QUERY_CONTACTS)
		const res = yield call(getQueryContacts, req.page, req.limit, req.conditionsStr)
		if(res.success) {
			yield put(actions.resQueryContacts(res.data))
		} else {
			yield put(globalActions.setMessage(res.data.msg))
		}
	}
}

export function* getQueryCondition(id) {
	try {
		const param ={token}
		return yield call(http.get, soupapiContact + `/condition/${id}`, param)
	} catch(err) {
		yield put(globalActions.setMessage('网络请求错误'))
	} finally {

	}
}
export function* getQueryConditionFlow() {
	while(true) {
		const req = yield take(actionTypes.REQ_QUERY_CONDITIONS)
		const res = yield call(getQueryCondition, req.id)
		if(res.success) {
			yield put(actions.resQueryConditions(res.data))
			if(req.isQueryContacts) {
				yield put(actions.reqQueryContacts(res.data.queryCondition))
			}
		} else {
			yield put(globalActions.setMessage(res.data.msg))
		}
	}
}

