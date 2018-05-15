import {takeEvery} from 'redux-saga'
import {take, call, put, select} from 'redux-saga/effects'
import {http, config} from '../../utils'
import basic from '../../base/basic'
import { actions as globalActions} from '../../reducers/campaign'
import { actions as processActions} from '../../reducers/campaign/campaignProcess'
import {actionTypes, actions} from '../../reducers/campaign/email'
import {actionTypes as contentActionTypes, actions as contentActions} from '../../reducers/campaign/emailContent'

const soupapiCampaign = config.SOUPAPI_CAMPAIGN
const soupapiMail = config.SOUPAPI_MAIL
const token = basic.token

export function* getAccountInfo() {
	try {
		const param = {token}
		return yield call(http.get, soupapiMail + `/profile/-1`, param)
	} catch (err) {
		yield put(globalActions.setMessage('网络请求错误'))
	} finally {

	}
}
export function* getAccountInfoFlow() {
	while(true) {
		const req = yield take(actionTypes.REQ_EMAIL_ACCOUNT_BASE_INFO)
		const res = yield call(getAccountInfo)
		if(res.success) {
			yield put(actions.resAccountInfo(res.data))
		} else {
			yield put(globalActions.setMessage(res.data.msg))
		}
	}
}

export function* getEmails(action) {
	try {
		const step_id = action.step_id
		const param = {token}
		const res = yield call(http.get, soupapiCampaign + `/campaign/step/mail/${step_id}`, param)
		if(res.success) {
			yield put(actions.resEmails(step_id, res.data))
		} else {
			yield put(globalActions.setMessage(res.data.msg))
		}
	} catch (err) {
		yield put(globalActions.setMessage('网络请求错误'))
	} finally {

	}
}
export function* getEmailsWatch() {
	yield takeEvery(actionTypes.REQ_CAMPAIGN_PROCESS_EMAILS, getEmails)
	yield takeEvery(actionTypes.REQ_CAMPAIGN_PROCESS_EMAIL_LINKS, getLinks)
}

export function* getLinks(action) {
	try {
		const task_id = action.task_id
		const param = {token}
		const res = yield call(http.get, soupapiMail + `/task/link/${task_id}`, param)
		if(res.success) {
			yield put(actions.resLinks(task_id, res.data))
		} else {
			yield put(globalActions.setMessage(res.data.msg))
		}
	} catch (err) {
		yield put(globalActions.setMessage('网络请求错误'))
	} finally {

	}
}

export function* removeEmail(task_id) {
	try {
		const param = {token, task_id}
		return yield call(http.post, soupapiMail + '/task/delete', param)
	} catch(err) {
		yield put(globalActions.setMessage('网络请求错误'))
	} finally {

	}
}
export function* removeEmailFlow() {
	while(true) {
		const req = yield take(actionTypes.REQ_REMOVE_CAMPAIGN_PROCESS_EMAIL)
		const res = yield call(removeEmail, req.task_id)
		if(res.success) {
			yield put(actions.resRemoveEmail(req.task_id))
		} else {
			yield put(globalActions.setMessage(res.data.msg || res.data))
		}
	}
}


export function* saveEmailContent(email) {
	try {
		const param = {token, ...email}
		return yield call(http.post, soupapiMail + '/task/set', param)
	} catch(err) {
		yield put(globalActions.setMessage('网络请求错误'))
	} finally {

	}
}
export function* saveEmailContentFlow() {
	while(true) {
		const req = yield take(contentActionTypes.REQ_SAVE_EMAIL_CONTENT)
		const res = yield call(saveEmailContent, req.email)
		if(res.success) {
			// let emailIds = req.relation.ref_id
			// if(emailIds.indexOf(res.data.task_id) === -1) {
			// 	emailIds.push(res.data.task_id)
			// }

			let email = {
				...res.data
			}

			if(req.relation) {
				// 给活动实体补充step_id
				email.step_id = req.relation.stepId

				let relation = {
					...req.relation,
					refId: res.data.task_id
				}
				yield put(processActions.saveProcessRelationContent(relation, email))
			}
			
			// yield put(actions.modifyEmail(email))
			// yield put(contentActions.resetEmailContent(email))
			// yield put(processActions.showProcessContentModal(true))
			// yield put(contentActions.showSendSettingModal(false))
		}else {
			yield put(globalActions.setMessage(res.data.msg))
		}
	}
}

/**
 * 发送测试邮件
 * @param {[type]} email         [description]
 * @yield {[type]} [description]
 */
export function* sendTestEmail(email) {
	try {
		const param = {token, ...email}
		return yield call(http.post, soupapiMail + '/task/emailtest/send', param)
	} catch(err) {
		yield put(globalActions.setMessage('网络请求错误'))
	} finally {

	}
}
export function* sendTestEmailFlow() {
	while(true) {
		const req = yield take(contentActionTypes.REQ_SEND_TEST_EMAIL)
		const res = yield call(sendTestEmail, req.email)
		if(res.success) {
			yield put(globalActions.setMessage('测试邮件发送成功'))
			// yield put(contentActions.showSendSettingModal(false))
		} else {
			yield put(globalActions.setMessage(res.data.msg || res.data))
		}
	}
}

export function* getEmailAccounts(page, size) {
	try {
		const param = {token, page, size}
		return yield call(http.get, soupapiMail + '/profile/accounts', param)
	} catch(err) {
		yield put(globalActions.setMessage('网络请求错误'))
	} finally {

	}
}
export function* getEmailAccountsFlow() {
	while(true) {
		const req = yield take(actionTypes.REQ_EMAIL_ACCOUNTS)
		const res = yield call(getEmailAccounts, req.page, req.size)
		if(res.success) {
			yield put(actions.resEmailAccounts(res.data))
		} else {
			yield put(globalActions.setMessage(res.data.msg || res.data))
		}
	}
}
