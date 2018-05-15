import { fork } from 'redux-saga/effects'

import {getCampaignListFlow, getCampaignStoreFlow, deleteCampaignFlow, batchSettingFlow, 
	getCampaignFolderListFlow, deleteCampaignFolderFlow, saveCampaignFolderFlow,
	betchAddToFolderFlow, betchRemoveFromFolderFlow,
} from './campaignListSaga'
import {saveCampaignFlow, saveStartTimeFlow, getCampaignFlow, checkCampaignFlow} from './campaignCreateSaga'
import {saveCampaignProcessFlow, getCampaignProcessesFlow, deleteCampaignProcessFlow, saveRelationFlow, betchRemoveContentFlow} from './campaignProcessSaga'
import {getQueryTermsFlow, getQueryContactsFlow, getQueryConditionFlow} from './screeningSaga'
import {getAutoResponseActionsFlow} from './autoResponseSaga'
import {getTimeZoneFlow, getSchedulesFlow, saveBaseSettingFlow} from './baseSettingSaga'
import {getEmailsWatch, removeEmailFlow, getAccountInfoFlow, saveEmailContentFlow, sendTestEmailFlow, getEmailAccountsFlow} from './emailSaga'
import {getCampaignStatFlow, getCampaignChartFlow} from './statSaga'
import {getRecipientsFlow, getReplyTypesFlow, saveReplyTypeFlow, deleteReplyTypeFlow, 
	betchAddToReplyTypeFlow, betchDeleteRecipientsFlow, betchAddToCampaignFlow, customerBetchAddToCampaignFlow, 
	getReplyFlow, sendReplyEmailFlow} from './inboxSaga'
import {getCustomersFlow, getSchemaFlow, getMarkStatusFlow, betchDeleteFromCampaignFlow, addBlacklistFlow} from './customerSaga'
import {getGroupsFlow, groupPutContactFlow, groupRemoveContactFlow} from './groupSaga'
import {getTagAllFlow, tagPutContactFlow, tagRemoveContactFlow} from './tagSaga'
import {getContactFlow} from './contactSaga'
import {getTemplatesFlow, getTemplatePreviewFlow, useTemplateFlow} from './templateSaga'


export default function* rootSaga(){
	// campaignList
	yield fork(getCampaignListFlow)
	yield fork(getCampaignStoreFlow)
	yield fork(deleteCampaignFlow)
	yield fork(batchSettingFlow)
	yield fork(getCampaignFolderListFlow)
	yield fork(deleteCampaignFolderFlow)
	yield fork(saveCampaignFolderFlow)
	yield fork(betchAddToFolderFlow)
	yield fork(betchRemoveFromFolderFlow)

	// campaignCreate
	yield fork(saveCampaignFlow)
	yield fork(saveStartTimeFlow)
	yield fork(getCampaignFlow)
	yield fork(checkCampaignFlow)

	// campaignProcess
	yield fork(saveCampaignProcessFlow)
	yield fork(getCampaignProcessesFlow)
	yield fork(deleteCampaignProcessFlow)
	yield fork(saveRelationFlow)
	yield fork(betchRemoveContentFlow)

	// screening
	yield fork(getQueryTermsFlow)
	yield fork(getQueryContactsFlow)
	yield fork(getQueryConditionFlow)

	// autoResponse
	yield fork(getAutoResponseActionsFlow)

	// baseSetting
	yield fork(getTimeZoneFlow)
	yield fork(getSchedulesFlow)

	// email
	yield fork(removeEmailFlow)
	yield fork(getAccountInfoFlow)
	yield fork(saveEmailContentFlow)
	yield fork(sendTestEmailFlow)
	yield fork(getEmailAccountsFlow)

	// statistic
	yield fork(getCampaignStatFlow)
	yield fork(getCampaignChartFlow)
	
	// inbox
	yield fork(getRecipientsFlow)
	yield fork(getReplyTypesFlow)
	yield fork(saveReplyTypeFlow)
	yield fork(deleteReplyTypeFlow)
	yield fork(betchAddToReplyTypeFlow)
	yield fork(betchDeleteRecipientsFlow)
	yield fork(betchAddToCampaignFlow)
	yield fork(customerBetchAddToCampaignFlow) // 这是针对用户部分做处理
	yield fork(getReplyFlow)
	yield fork(sendReplyEmailFlow)

	// customer
	yield fork(getCustomersFlow)
	yield fork(getSchemaFlow)
	yield fork(getMarkStatusFlow)
	yield fork(betchDeleteFromCampaignFlow)
	yield fork(addBlacklistFlow)

	// 群组
	yield fork(getGroupsFlow)
	yield fork(groupPutContactFlow)
	yield fork(groupRemoveContactFlow)

	//标签
	yield fork(getTagAllFlow)
	yield fork(tagPutContactFlow)
	yield fork(tagRemoveContactFlow)

	// 联系人
	yield fork(getContactFlow)

	// 模板
	yield fork(getTemplatesFlow)
	yield fork(getTemplatePreviewFlow)
	yield fork(useTemplateFlow)

	yield getEmailsWatch()
}