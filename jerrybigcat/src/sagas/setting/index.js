import { fork } from 'redux-saga/effects'

import { getFieldListFlow, postSavePropertyFlow, deletePropertyFlow } from './fieldSaga'
import {getAccountSetFlow, saveAccountSetFlow, getTimeZoneFlow} from './emailSaga'
import {saveEmailAccountFlow, deleteEmailAccountFlow, getEmailAccountListFlow, testEmailAccountFlow} from './emailAccountSaga'
import {getEventListFlow, saveEventFlow,removeEventFlow} from './eventSaga'
import {getScheduleListFlow, saveScheduleFlow, removeScheduleFlow, settingScheduleDefaultFlow} from './scheduleSaga'

export default function* rootSaga(){
	yield fork(getFieldListFlow)
	yield fork(postSavePropertyFlow)
	yield fork(deletePropertyFlow)
	yield fork(getAccountSetFlow)
	yield fork(saveAccountSetFlow)
	yield fork(getTimeZoneFlow)
	yield fork(saveEmailAccountFlow)
	yield fork(deleteEmailAccountFlow)
	yield fork(getEmailAccountListFlow)
	yield fork(testEmailAccountFlow)
	yield fork(saveEventFlow)
	yield fork(getEventListFlow)
	yield fork(removeEventFlow)
	yield fork(getScheduleListFlow)
	yield fork(saveScheduleFlow)
	yield fork(removeScheduleFlow)
	yield fork(settingScheduleDefaultFlow)
}