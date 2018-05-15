import {take, call, put, select} from 'redux-saga/effects'
import {http, config} from '../../utils'
import basic from '../../base/basic'
import { actions as globalActions} from '../../reducers/campaign'
import {actionTypes, actions} from '../../reducers/campaign/campaignList'


const soupapiCampaign = config.SOUPAPI_CAMPAIGN
const token = basic.token

// 活动部分
/**
 * 分页获取活动列表
 * @param {[type]} option        [description]
 * @yield {[type]} [description]
 */
export function* getCampaignList(option) {
	yield put(globalActions.fetchStart())
	try {
		const param = {token, ...option}
		return yield call(http.get, soupapiCampaign + '/list', param)
	} catch(err) {
		yield put(globalActions.setMessage('网络请求错误'))
	} finally {
		yield put(globalActions.fetchEnd())
	}
}
export function* getCampaignListFlow() {
	while(true) {
		const req = yield take(actionTypes.REQ_CAMPAIGN_LIST)
		const res = yield call(getCampaignList, req.option)
		if(res.success) {
			yield put(actions.resCampaignList(res.data))
		} else {
			yield put(globalActions.setMessage(res.data.msg))
		}
	}
}

/**
 * 获取所有活动
 * @yield {[type]} [description]
 */
 export function* getCampaignStore() {
 	yield put(globalActions.fetchStart())
 	try {
 		const param = {token}
 		return yield call(http.get, soupapiCampaign + '/listAll', param)
 	} catch(err) {
 		yield put(globalActions.setMessage('网络请求错误'))
 	} finally {
 		yield put(globalActions.fetchEnd())
 	}
 }
export function* getCampaignStoreFlow() {
	while(true) {
		const req = yield take(actionTypes.REQ_CAMPAIGN_STORE)
		const res = yield call(getCampaignStore)
		if(res.success) {
			yield put(actions.resCampaignStore(res.data))
		} else {
			yield put(globalActions.setMessage(res.data.msg))
		}
	}
}

export function* deleteCampaign(id) {
	try {
		const param = {token}
		return yield call(http.delete, soupapiCampaign + `/${id}/delete`, param)
	} catch(err) {
		yield put(globalActions.setMessage('网络请求错误'))
	} finally {

	}
}
export function* deleteCampaignFlow() {
	while(true) {
		const req = yield take(actionTypes.REQ_REMOVE_CAMPAIGN)
		const res = yield call(deleteCampaign,req.id)
		if(res.success) {
			yield put(actions.resRemoveCampaign(req.id))
		} else {
			yield put(globalActions.setMessage(res.data.msg))
		}
	}
}

export function* betchSetting(ids,handle) {
	try {
		const param = {token, ids, handle}
		return yield call(http.post, soupapiCampaign + '/batch', param)
	} catch(err) {
		yield put(globalActions.setMessage('网络请求错误'))
	} finally {

	}
}
export function* batchSettingFlow() {
	while(true) {
		const req = yield take(actionTypes.REQ_BETCH_SET_CAMPAIGN)
		const res = yield call(betchSetting,req.ids, req.setType)
		if(res.success) {
			yield put(actions.resBetchSetting(req.ids, req.setType))
		} else {
			yield put(globalActions.setMessage(res.data.msg))
		}
	}
}


// 文件夹部分
export function* getCampaignFolderList() {
	try {
		let param = {token}
		return yield call(http.get, soupapiCampaign + '/folder/list', param)
	} catch(err) {
		yield put(globalActions.setMessage('网络请求错误'))
	} finally {

	}
}
export function* getCampaignFolderListFlow() {
	while(true) {
		const req = yield take(actionTypes.REQ_CAMPAIGN_FOLDER_LIST)
		const res = yield call(getCampaignFolderList)
		if(res.success) {
			yield put(actions.resFolderList(res.data))
		} else {
			yield put(globalActions.setMessage(res.data.msg))
		}
	}
}

export function* deleteCampaignFolder(id) {
	try {
		let param = {token}
		return yield call(http.delete, soupapiCampaign + `/folder/${id}`, param)
	} catch(err) {
		yield put(globalActions.setMessage('网络请求错误'))
	} finally {

	}
}
export function* 	deleteCampaignFolderFlow() {
	while(true) {
		const req = yield take(actionTypes.REQ_REMOVE_CAMPAIGN_FOLDER)
		const res = yield call(deleteCampaignFolder, req.id)
		if(res.success) {
			yield put(actions.resRemoveFolder(req.id))
		} else {
			yield put(globalActions.setMessage(res.data.msg))
		}
	}
}

export function* saveCampaignFolder(folder) {
	try {
		let param = {token, ...folder}
		return yield call(http.post, soupapiCampaign + '/folder', param)
	} catch(err) {
		yield put(globalActions.setMessage('网络请求错误'))
	} finally {

	}
}
export function* saveCampaignFolderFlow() {
	while(true) {
		const req = yield take(actionTypes.SAVE_CAMPAIGN_FOLDER)
		const res = yield call(saveCampaignFolder, req.folder)
		if(res.success) {
			yield put(actions.modifyFolder(res.data))
			yield put(actions.campaignFolderSetModal(false))
		} else {
			yield put(globalActions.setMessage(res.data.msg))
		}
	}
}

/**
 * 批量添加到文件夹
 * @param {Number} folderId      
 * @param {String} campaignIds   活动id,多个都好隔开
 */
export function* betchAddToFolder(folderId, campaignIds) {
	try {
		let param = {token, campaignIds}
		return yield call(http.put, soupapiCampaign + `/folder/${folderId}/put`, param)
	} catch(err) {
		yield put(globalActions.setMessage('网络请求错误'))
	} finally {

	}
}
export function* betchAddToFolderFlow() {
	while(true) {
		const req = yield take(actionTypes.REQ_BETCH_ADD_CAMPAIGN_TO_FOLDER)
		const res = yield call(betchAddToFolder, req.folderId, req.campaignIds)
		if(res.success) {
			yield put(globalActions.setMessage('已成功批量添加到文件夹'))
			yield put(actions.showFolderSelectModal(false))
		} else {
			yield put(globalActions.setMessage(res.data.msg))
		}
	}
}

/**
 * 批量从文件夹移除
 * @param {Mumber} folderId      
 * @param {String} campaignIds   
 */
export function* betchRemoveFromFolder(folderId, campaignIds) {
	try {
		let param = {token, campaignIds}
		return yield call(http.delete, soupapiCampaign + `/folder/${folderId}/remove`, param)
	} catch(err) {
		yield put(globalActions.setMessage('网络请求错误'))
	} finally {

	}
}
export function* betchRemoveFromFolderFlow() {
	while(true) {
		const req = yield take(actionTypes.REQ_BETCH_REMOVE_CAMPAIGN_FROM_FOLDER)
		const res = yield call(betchRemoveFromFolder, req.folderId, req.campaignIds)
		if(res.success) {
			yield put(globalActions.setMessage('已成功从文件夹批量移除'))
			
		} else {
			yield put(globalActions.setMessage(res.data.msg))
		}
	}
}


