import {take,call,put,select} from 'redux-saga/effects'
import { http, config } from '../../utils'
import basic from '../../base/basic'
import { actionTypes as globalActionTypes, actions as globalActions } from '../../reducers/setting'
import { actionTypes, actions } from '../../reducers/setting/field'
import { actionTypes as propertyActionTypes, actions as propertyActions } from '../../reducers/setting/fieldNewProperty'

const soupapiContact = config.SOUPAPI_CONTACT
const token = basic.token

export function* getFieldList(scope) {
	yield put(globalActions.fetchStart())
	try{
		const param = {token,scope}
		return yield call(http.get, soupapiContact + '/property/list', param)
	} catch(err) {
		console.log(err)
	} finally {
		yield put(globalActions.fetchEnd())
	}
}

export function* getFieldListFlow() {
	while(true) {
		let req = yield take(actionTypes.GET_FIELD_LIST)
		let res = yield call(getFieldList, req.scope)
		if(res) {
			yield put(actions.responseFieldList(res.data))
		}
	}
}

export function* postSaveProperty(property, scope) {
	try{
		const param = {token, scope, propertyStr: JSON.stringify(property)}
		return yield call(http.post, soupapiContact + '/property/do', param)
	} catch(err) {
		console.log(err)
	} finally {
		// console.log('set property finally')
	}
}

export function* postSavePropertyFlow() {
	while(true) {
		let req = yield take(propertyActionTypes.SAVE_PROPERTY)
		let res = yield call(postSaveProperty, req.property, req.scope)
		if(res.success) {
			yield put(actions.modifyProperty(res.data))
			yield put(propertyActions.setPropertyId(res.data.id))
			yield put(actions.setPropertyModal(false))
			yield put(globalActions.setMessage('字段保存成功'))
		} else {
			if(res.data.msg === '字段名字与系统字段重复') {
				yield put(propertyActions.setLabelError(res.data.msg))
			} else {
				yield put(globalActions.setMessage(res.data.msg))
			}
		}
	}
}

export function* deleteProperty(id) {
	try {
		const param = {token}
		return yield call(http.delete, soupapiContact + `/property/${id}`, param)
	} catch(e) {
		console.log(err)
	} finally {
		console.log('delete property finall')
	}
}

export function* deletePropertyFlow() {
	while(true) {
		const req = yield take(actionTypes.REQ_DELETE_PROPERTY)
		const res = yield call(deleteProperty, req.id)
		if(res.success) {
			yield put(actions.resDeleteProperty(req.id))
		}
	}
}
