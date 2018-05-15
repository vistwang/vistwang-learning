import {take, call, put, select} from 'redux-saga/effects'
import {http, config} from '../../utils'
import basic from '../../base/basic'
import { actions as globalActions} from '../../reducers/campaign'
import {actionTypes, actions} from '../../reducers/campaign/contact'

const soupapiContact = config.SOUPAPI_CONATCT
const token = basic.token


export function* getContact(contactId) {
	yield put(globalActions.fetchStart())
	try {
		const param = {token}
		return yield call(http.get, soupapiContact + `/${contactId}`, param)
	} catch(err) {
		yield put(globalActions.setMessage('网络请求错误'))
	} finally {
		yield put(globalActions.fetchEnd())
	}
}
export function* getContactFlow() {
	while(true) {
		const req = yield take(actionTypes.REQ_CONTACT)
		const res = yield call(getContact)
		if(res.success) {
			yield put(actions.resContact(res.data))
		} else {
			yield put(globalActions.setMessage(res.data.msg))
		}
	}
}

