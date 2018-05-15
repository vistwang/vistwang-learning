import {take, call, put, select} from 'redux-saga/effects'
import {http, config} from '../../utils'
import basic from '../../base/basic'
import {actions as globalActions} from '../../reducers/setting'
import {actionTypes, actions} from '../../reducers/setting/emailAccount'
import {actionTypes as setActionTypes, actions as setActions} from '../../reducers/setting/emailAccountSetting'

const soupapiMail = config.SOUPAPI_MAIL
const token = basic.token


export function* getEmailAccountList(page, size) {
	yield put(globalActions.fetchStart())
	try {
		const param = {token, page, size}
		return yield call(http.get, soupapiMail + '/profile/accounts', param)
	} catch(err) {
		yield put(globalActions.fetchEnd())
	} finally {
		yield put(globalActions.fetchEnd())
	}
}

export function* getEmailAccountListFlow() {
	while(true) {
		const req = yield take(actionTypes.REQ_EMAIL_ACCOUNT_LIST)
		const res = yield call(getEmailAccountList, req.page, req.size)
		if(res.success) {
			yield put(actions.resEmailAccountList(res.data, req.page))
		} else {
			yield put(globalActions.setMessage(res.data.msg))
		}
	}
}

export function* saveEmailAccount(emailAccount) {
	try {
		const param = {token, ...emailAccount}
		return yield call(http.post, soupapiMail + '/profile/account/set', param)
	} catch(err) {
		yield put(globalActions.setMessage('网络请求错误'))
	} finally {
	}
}

export function* saveEmailAccountFlow() {
	while(true) {
		const req = yield take(setActionTypes.SAVE_EMAIL_ACCOUNT)
		const res = yield call(saveEmailAccount, req.emailAccount)
		if(res.success) {
			yield put(actions.modifyEmailAccount(req.emailAccount))
			yield put(globalActions.setMessage('保存成功'))
			yield put(actions.showEmailAccountModal(false))
		} else {
			yield put(globalActions.setMessage(res.data.msg))
		}
	}
}

export function* deleteEmailAccount(email_account_id) {
	try {
		const param = {token, email_account_id}
		return yield call(http.post, soupapiMail + '/profile/emailaccount/delete', param)
	} catch (err) {
		yield put(globalActions.setMessage('网络请求错误'))
	} finally {

	}
}

export function* deleteEmailAccountFlow() {
	while(true) {
		const req = yield take(actionTypes.REMOVE_EMAIL_ACCOUNT)
		const res = yield call(deleteEmailAccount, req.id)
		if(res.success) {
			yield put(actions.resRemoveEmailAccount(req.id))
			yield put(globalActions.setMessage('删除成功'))
		} else {
			yield put(globalActions.setMessage(res.data.msg))
		}
	}
}

export function* testEmailAccount(option) {
	try {
		const param = {token, ...option}
		return yield call(http.post, soupapiMail + '/profile/email/test', param)
	} catch (err) {
		yield put(globalActions.setMessage('网络请求错误'))
	} finally {

	}
}	
export function* testEmailAccountFlow() {
	const typeNames = ['SMTP', 'IMAP']
	while(true) {
		const req = yield take(setActionTypes.TEST_EMAIL_ACCOUNT)
		const res = yield call(testEmailAccount, req.option)
		if(res.success) {
			yield put(globalActions.setMessage(typeNames[req.option.type] + '测试通过'))
		} else {
			yield put(globalActions.setMessage(typeNames[req.option.type] + '测试未通过,原因:' + (res.data.msg || res.data)))
		}
	}
}