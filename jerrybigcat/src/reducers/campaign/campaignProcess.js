const initialState = {
	processes:[],

	stepId: '',
	campaignId: '',
	targetCondition: [{
	   "delaytime":"0:0:0",  //-----（天时分）
	   "type": 4,      //----(0:未做任何操作,1:未打开上一封邮件,2:未点击上一封连接,3:点击了上一封连接,4:未回复上一封邮件)
	   "task_id":"",   //-----（上一封邮件任务ID）
	   "click_url":"" //----点击taskid#链接ID
   }],

	processContentModal: false,

}


export const actionTypes = {
	SET_PROCESS_STEP_ID: 'SET_PROCESS_STEP_ID',
	SET_PROCESS_CAMPAIGN_ID: 'SET_PROCESS_CAMPAIGN_ID',
	UPDATE_PROCESS_GMT_ACTION: 'UPDATE_PROCESS_GMT_ACTION',
	UPDATE_PROCESS_TARGET_CONDITION: 'UPDATE_PROCESS_TARGET_CONDITION',

	REQ_CAMPAIGN_PROCESSES: 'REQ_CAMPAIGN_PROCESSES',
	RES_CAMPAIGN_PROCESSES: 'RES_CAMPAIGN_PROCESSES',
	SAVE_CAMPAIGN_PROCESS: 'SAVE_CAMPAIGN_PROCESS',
	MODIFY_CAMPAIGN_PROCESS: 'MODIFY_CAMPAIGN_PROCESS',
	REQ_REMOVE_CAMPAIGN_PROCESS: 'REQ_REMOVE_CAMPAIGN_PROCESS',
	RES_REMOVE_CAMPAIGN_PROCESS: 'RES_REMOVE_CAMPAIGN_PROCESS',

	CAMPAIGN_PROCESS_CONTENT_MODAL: 'CAMPAIGN_PROCESS_CONTENT_MODAL',

	SAVE_CAMPAIGN_PROCESS_CONTENT_SET: 'SAVE_CAMPAIGN_PROCESS_CONTENT_SET',
	REQ_REMOVE_CAMPAIGN_PROCESS_CONTENT_SET: 'REQ_REMOVE_CAMPAIGN_PROCESS_CONTENT_SET',
	RES_REMOVE_CAMPAIGN_PROCESS_CONTENT_SET: 'RES_REMOVE_CAMPAIGN_PROCESS_CONTENT_SET',

	SAVE_PROCESS_RELATION_CONTENT: 'SAVE_PROCESS_RELATION_CONTENT',
	REMOVE_PROCESS_RELATION_CONTENT: 'REMOVE_PROCESS_RELATION_CONTENT',

	MODIFY_CAMPAIGN_RELATION_CONTENT: 'MODIFY_CAMPAIGN_RELATION_CONTENT',
	REQ_BETCH_REMOVE_PROCESS_CONTENT: 'REQ_BETCH_REMOVE_PROCESS_CONTENT',
	RES_BETCH_REMOVE_PROCESS_CONTENT: 'RES_BETCH_REMOVE_PROCESS_CONTENT',
}


export const actions = {
	setCampaignStepId(id) {
		return {
			type: actionTypes.SET_PROCESS_STEP_ID,
			id
		}
	},

	setCampaignId(id) {
		return {
			type: actionTypes.SET_PROCESS_CAMPAIGN_ID,
			id
		}
	},

	updateGmtAction(gmt) {
		return {
			type: actionTypes.UPDATE_PROCESS_GMT_ACTION,
			gmt
		}
	},

	updateTargetCondition(condition) {
		return {
			type: actionTypes.UPDATE_PROCESS_TARGET_CONDITION,
			condition
		}
	},

	reqCampaignProcesses(campaignId) {
		return {type: actionTypes.REQ_CAMPAIGN_PROCESSES, campaignId}
	},

	resCampaignProcesses(processes) {
		return {type: actionTypes.RES_CAMPAIGN_PROCESSES, processes}
	},

	saveCampaignProcess(campaignProcess, entity) {
		return {type: actionTypes.SAVE_CAMPAIGN_PROCESS, campaignProcess, entity}
	},

	modifyCampaignProcess(campaignProcess) {
		return {type: actionTypes.MODIFY_CAMPAIGN_PROCESS, campaignProcess}
	},
	
	reqRemoveCampaignProcess(stepId, campaignId) {
		return {type: actionTypes.REQ_REMOVE_CAMPAIGN_PROCESS, stepId, campaignId}
	},

	resRemoveCampaignProcess(stepId) {
		return {type: actionTypes.RES_REMOVE_CAMPAIGN_PROCESS, stepId}
	},

	showProcessContentModal(status) {
		return {type: actionTypes.CAMPAIGN_PROCESS_CONTENT_MODAL, status}
	},

	
	saveProcessContentSet(set, step_id) {
		return {type: actionTypes.SAVE_CAMPAIGN_PROCESS_CONTENT_SET, set, step_id}
	},
	reqRemoveProcessContentSet(id) {
		return {type: actionTypes.REQ_REMOVE_CAMPAIGN_PROCESS_CONTENT_SET, id}
	},
	resRemoveProcessContentSet(id) {
		return {type: actionTypes.RES_REMOVE_CAMPAIGN_PROCESS_CONTENT_SET, id}
	},

	saveProcessRelationContent(relation, email) {
		return {type: actionTypes.SAVE_PROCESS_RELATION_CONTENT, relation, email}
	},
	removeProcessRelationContent(id) {
		return {type: actionTypes.REMOVE_PROCESS_RELATION_CONTENT, id}
	},

	modifyRelationContent(relation) {
		return {type: actionTypes.MODIFY_CAMPAIGN_RELATION_CONTENT, relation}
	},
	reqBetchRemoveContent(stepId, refIds) {
		return {type: actionTypes.REQ_BETCH_REMOVE_PROCESS_CONTENT, stepId, refIds}
	},
	resBetchRemoveContent(stepId, refIds) {
		return {type: actionTypes.RES_BETCH_REMOVE_PROCESS_CONTENT, stepId, refIds}
	},
}



export function processReducer(state = initialState, action) {
	switch(action.type) {
		case actionTypes.SET_PROCESS_STEP_ID:
			return {
				...state,
				stepId: action.id
			}
		case actionTypes.SET_PROCESS_CAMPAIGN_ID:
			return {
				...state,
				campaignId: action.id
			}
		case actionTypes.UPDATE_PROCESS_GMT_ACTION:
			return {
				...state,
				gmt_action: action.gmt
			}
		case actionTypes.UPDATE_PROCESS_TARGET_CONDITION:
			return {
				...state,
				targetCondition: action.condition
			}
		case actionTypes.RES_CAMPAIGN_PROCESSES:
			return {
				...state,
				processes: action.processes
			}
		case actionTypes.MODIFY_CAMPAIGN_PROCESS:
			const index = state.processes.findIndex(item => item.id === action.campaignProcess.id)
			return {
				...state,
				processes: index === -1 ? [...state.processes, action.campaignProcess] : [...state.processes.slice(0, index), action.campaignProcess, ...state.processes.slice(index + 1)]
			}
		case actionTypes.RES_REMOVE_CAMPAIGN_PROCESS:
			return {
				...state,
				processes: state.processes.filter(item => item.id !== action.stepId)
			}

		case actionTypes.CAMPAIGN_PROCESS_CONTENT_MODAL:
			return {
				...state,
				processContentModal: action.status
			}
		
		case actionTypes.MODIFY_CAMPAIGN_RELATION_CONTENT: {
			let stepIndex = state.processes.findIndex(item => item.id === action.relation.step_id)
			let step = state.processes[stepIndex]
			let contents = step.contents || []
			let relationIndex = contents.findIndex(item => item.id === action.relation.id)
			let newContents = relationIndex === -1 ? [...contents, action.relation] : [...contents.slice(0, relationIndex), action.relation, ...contents.slice(relationIndex + 1)]
			let newStep = {
				...step,
				contents: newContents,
			}
			return {
				...state,
				processes: [...state.processes.slice(0,stepIndex), newStep, ...state.processes.slice(stepIndex + 1)],
			}
		}

		case actionTypes.RES_BETCH_REMOVE_PROCESS_CONTENT: {
			let stepIndex = state.processes.findIndex(item => item.id === action.stepId)
			let step = state.processes[stepIndex]
			let contents = step.contents || []
			let idsArr = action.refIds.split(',')
			let newContents = contents.filter(item => idsArr.indexOf(String(item.task.task_id)) === -1)
			let newStep = {
				...step,
				contents: newContents,
			}
			return {
				...state,
				processes: [...state.processes.slice(0, stepIndex), newStep, ...state.processes.slice(stepIndex + 1)]
			}
		}
		default:
			return state		
	}
}