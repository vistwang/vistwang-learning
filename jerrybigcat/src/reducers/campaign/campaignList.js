import {CampaignBetchTypes, CampaignStatus} from '../../base/enums'

const initialState = {
	campaignPage: {
		page: 1,
		limit: 10,
		own: false,
		status: '',
		type: '',
		folderId: '',
	},
	statistics: {
		all: 0,
    running: 0,
    auto: 0,
    stop: 0,
    own: 0,
    draft: 0,
    oneTime: 0,
	},
	campaignTotal: 0,
	campaignList: [],
	folderList: [],
	

	campaignStore: [],

	folderSettingModal: false,
	folderId: '',
	folderName: '',

	folderSelectModal: false,
	folderSelectId: 0,
	folderSearchKey: '',

	catalogCount: {
		totalCount: 0,
		stopCount: 0,
		draftCount: 0,
		ownAllCount: 0,
		autoCount: 0,
		runningCount: 0,
		simpleCount: 0
	}
}


export const actionTypes = {
	REQ_CAMPAIGN_LIST: 'REQ_CAMPAIGN_LIST',
	RES_CAMPAIGN_LIST: 'RES_CAMPAIGN_LIST',
	REQ_REMOVE_CAMPAIGN: 'REQ_REMOVE_CAMPAIGN',
	RES_REMOVE_CAMPAIGN: 'RES_REMOVE_CAMPAIGN',
	REQ_BETCH_SET_CAMPAIGN: 'REQ_BETCH_SET_CAMPAIGN', 
	RES_BETCH_SET_CAMPAIGN: 'RES_BETCH_SET_CAMPAIGN',
	MODIFY_CAMPAIGN: 'MODIFY_CAMPAIGN',

	REQ_CAMPAIGN_STORE: 'REQ_CAMPAIGN_STORE',
	RES_CAMPAIGN_STORE: 'RES_CAMPAIGN_STORE',

	CHANGE_CAMPAIGN_STATUS: 'CHANGE_CAMPAIGN_STATUS',

	CHECKED_CAMPAIGN: 'CHECKED_CAMPAIGN',
	CHECKED_CAMPAIGN_ALL: 'CHECKED_CAMPAIGN_ALL',

	REQ_CAMPAIGN_CATALOG_COUNT: 'REQ_CAMPAIGN_CATALOG_COUNT',
	RES_CAMPAIGN_CATALOG_COUNT: 'RES_CAMPAIGN_CATALOG_COUNT',

	REQ_CAMPAIGN_FOLDER_LIST: 'REQ_CAMPAIGN_FOLDER_LIST',
	RES_CAMPAIGN_FOLDER_LIST: 'RES_CAMPAIGN_FOLDER_LIST',
	REQ_REMOVE_CAMPAIGN_FOLDER: 'REQ_REMOVE_CAMPAIGN_FOLDER',
	RES_REMOVE_CAMPAIGN_FOLDER: 'RES_REMOVE_CAMPAIGN_FOLDER',
	REQ_BETCH_ADD_CAMPAIGN_TO_FOLDER: 'REQ_BETCH_ADD_CAMPAIGN_TO_FOLDER',
	REQ_BETCH_REMOVE_CAMPAIGN_FROM_FOLDER: 'REQ_BETCH_REMOVE_CAMPAIGN_FROM_FOLDER',
	CAMPAIGN_FOLDER_SET_MODAL: 'CAMPAIGN_FOLDER_SET_MODAL',
	UPDATE_CAMPAIGN_FONDER_NAME: 'UPDATE_CAMPAIGN_FONDER_NAME',
	SET_CAMPAIGN_FOLDER_ID: 'SET_CAMPAIGN_FOLDER_ID',
	SAVE_CAMPAIGN_FOLDER: 'SAVE_CAMPAIGN_FOLDER',
	MODIFY_CAMPAIGN_FOLDER: 'MODIFY_CAMPAIGN_FOLDER',
	RESET_CAMPAIGN_FOLDER: 'RESET_CAMPAIGN_FOLDER',
	UPDATE_FOLDER_SEARCH_KEY: 'UPDATE_FOLDER_SEARCH_KEY',
	UPDATE_SELECT_FOLDER_ID: 'UPDATE_SELECT_FOLDER_ID',
	SHOW_FOLDER_SELECT_MODAL: 'SHOW_FOLDER_SELECT_MODAL',

	TOGGLE_CAMPAIGN_FOLDER_MENU: 'TOGGLE_CAMPAIGN_FOLDER_MENU',
	UPDATE_CAMPAIGN_PAGE_INFO: 'UPDATE_CAMPAIGN_PAGE_INFO',
}


export const actions = {
	// 文件夹部分
	campaignFolderSetModal(status) {
		return { type: actionTypes.CAMPAIGN_FOLDER_SET_MODAL, status }
	},
	toggleFolderMenu(id, status) {
		return {type: actionTypes.TOGGLE_CAMPAIGN_FOLDER_MENU, id, status}
	},
	reqFolderList(parent_id) {
		return {type: actionTypes.REQ_CAMPAIGN_FOLDER_LIST, parent_id}
	},
	resFolderList(folderList) {
		return {type: actionTypes.RES_CAMPAIGN_FOLDER_LIST, folderList}
	},
	reqRemoveFolder(id) {
		return {type: actionTypes.REQ_REMOVE_CAMPAIGN_FOLDER, id}
	},
	resRemoveFolder(id) {
		return {type: actionTypes.RES_REMOVE_CAMPAIGN_FOLDER, id}
	},
	updateFolderName(name) {
		return { type: actionTypes.UPDATE_CAMPAIGN_FONDER_NAME, name }
	},
	setFolderId(id) {
		return { type: actionTypes.SET_CAMPAIGN_FOLDER_ID, id }
	},
	saveFolder(folder) {
		return {type: actionTypes.SAVE_CAMPAIGN_FOLDER, folder}
	},
	modifyFolder(folder) {
		return {type: actionTypes.MODIFY_CAMPAIGN_FOLDER, folder}
	},
	resetFolder(folder) {
		return {type: actionTypes.RESET_CAMPAIGN_FOLDER, folder}
	},
	reqBetchAddToFolder(folderId, campaignIds){
		return {type: actionTypes.REQ_BETCH_ADD_CAMPAIGN_TO_FOLDER, folderId, campaignIds}
	},
	reqBetchRemoveFromFolder(folderId, campaignIds) {
		return {type: actionTypes.REQ_BETCH_REMOVE_CAMPAIGN_FROM_FOLDER, folderId, campaignIds}
	},

	updateFolderSearchKey(searchKey) {
		return {type: actionTypes.UPDATE_FOLDER_SEARCH_KEY, searchKey}
	},
	updateSelectFolderId(folderId) {
		return {type: actionTypes.UPDATE_SELECT_FOLDER_ID, folderId}
	},
	showFolderSelectModal(status) {
		return {type: actionTypes.SHOW_FOLDER_SELECT_MODAL, status}
	},

	reqCampaignCatalogCount() {
		return {type: actionTypes.REQ_CAMPAIGN_CATALOG_COUNT}
	},
	resCampaignCatalogCount(catalogCount){
		return {type: actionTypes.RES_CAMPAIGN_CATALOG_COUNT, catalogCount}
	},

	// 活动部分
	reqCampaignList(option) {
		return {
			type: actionTypes.REQ_CAMPAIGN_LIST,
			option
		}
	},
	resCampaignList(data) {
		return {
			type: actionTypes.RES_CAMPAIGN_LIST,
			campaignList: data.list,
			total: data.total,
			statistics: data.statistics,
		}
	},
	reqCampaignStore(option) {
		return {type: actionTypes.REQ_CAMPAIGN_STORE, option}
	},
	resCampaignStore(campaignStore) {
		return {type: actionTypes.RES_CAMPAIGN_STORE, campaignStore}
	},
	reqRemoveCampaign(id) {
		return {
			type: actionTypes.REQ_REMOVE_CAMPAIGN,
			id
		}
	},
	resRemoveCampaign(id) {
		return {
			type: actionTypes.RES_REMOVE_CAMPAIGN,
			id
		}
	},
	reqBetchSetting(ids, setType) {
		return {
			type: actionTypes.REQ_BETCH_SET_CAMPAIGN,
			ids,
			setType
		}
	},
	resBetchSetting(ids, setType) {
		return {
			type: actionTypes.RES_BETCH_SET_CAMPAIGN,
			ids,
			setType
		}
	},

	changeCampaignStatus(id, status) {
		return {
			type: actionTypes.CHANGE_CAMPAIGN_STATUS,
			id,
			status
		}
	},

	checkedCampaign(id) {
		return {
			type: actionTypes.CHECKED_CAMPAIGN,
			id
		}
	},
	checkedCampaignAll(checked) {
		return {
			type: actionTypes.CHECKED_CAMPAIGN_ALL,
			checked
		}
	},

	modifyCampaign(campaign) {
		return {type: actionTypes.MODIFY_CAMPAIGN, campaign}
	},

	updateCampaignPageInfo(pagination) {
		return{type: actionTypes.UPDATE_CAMPAIGN_PAGE_INFO, pagination}
	},
}

// 处理批量操作
const handleBetchSetting = (campaignList,ids, type) => {
	let idArr = ids.split(',')
	switch(type) {
		case CampaignBetchTypes.STOP:
			return campaignList.map(item => {
				if(idArr.indexOf(String(item.id)) >= 0) {
					item.status = CampaignStatus.STOP
				}
				return item
			})
		case CampaignBetchTypes.OPEN:
			return campaignList.map(item => {
				if(idArr.indexOf(String(item.id)) >= 0) {
					item.status = CampaignStatus.RUNNING
				}
				return item
			})
		case CampaignBetchTypes.DELETE:
			return campaignList.filter(item => {
				return idArr.indexOf(String(item.id)) === -1
			})
		default:
			return campaignList
	}
}

export function campaignListReducer(state = initialState, action) {
	switch(action.type) {
		// 文件夹部分
		case actionTypes.CAMPAIGN_FOLDER_SET_MODAL:
			return {
				...state,
				folderSettingModal: action.status
			}
		case actionTypes.TOGGLE_CAMPAIGN_FOLDER_MENU:
			return {
				...state,
				folderList: state.folderList.map(item => {
					if(item.id === action.id) {
						item.toggleMenu = action.status
					} 
					return item
				})
			}
		case actionTypes.UPDATE_CAMPAIGN_PAGE_INFO:
			return {
				...state,
				campaignPage: action.pagination
			}
		case actionTypes.RES_CAMPAIGN_FOLDER_LIST:
			return {
				...state,
				folderList: action.folderList
			}
		case actionTypes.RES_REMOVE_CAMPAIGN_FOLDER:
			return {
				...state,
				folderList: state.folderList.filter(item => item.id !== action.id)
			}
		case actionTypes.SET_CAMPAIGN_FOLDER_ID:
			return {
				...state,
				folderId: action.id
			}
		case actionTypes.UPDATE_CAMPAIGN_FONDER_NAME:
			return {
				...state,
				folderName: action.name
			}
		case actionTypes.MODIFY_CAMPAIGN_FOLDER: {
			let folderList = state.folderList
			let folderIndex = folderList.findIndex(item => item.id === action.folder.id)
			return {
				...state,
				folderList: folderIndex === -1 ? [...folderList, action.folder] : [...folderList.slice(0, folderIndex), action.folder, ...folderList.slice(folderIndex + 1)]
			}
		}
		case actionTypes.RESET_CAMPAIGN_FOLDER: {
			const folder = action.folder || {}
			return {
				...state,
				folderId: folder.id || '',
				folderName: folder.name || '',
			}
		}
		case actionTypes.RES_CAMPAIGN_CATALOG_COUNT:
			const stopCount = action.catalogCount.stopCount
			const	draftCount = action.catalogCount.draftCount
			const	ownAllCount = action.catalogCount.ownAllCount
			const autoCount = action.catalogCount.autoCount
			const	runningCount = action.catalogCount.runingCount
			const simpleCount = action.catalogCount.simpleCount
			return {
				...state,
				catalogCount: {
					totalCount: (autoCount + simpleCount),
					stopCount,
					draftCount,
					ownAllCount,
					autoCount,
					runningCount,
					simpleCount,
				}
			}

		case actionTypes.UPDATE_FOLDER_SEARCH_KEY:
			return {
				...state,
				folderSearchKey: action.searchKey
			}
		case actionTypes.UPDATE_SELECT_FOLDER_ID:
			return {
				...state,
				folderSelectId: action.folderId,
			}
		case actionTypes.SHOW_FOLDER_SELECT_MODAL:
			return {
				...state,
				folderSelectModal: action.status,
			}

		// 活动部分
		case actionTypes.RES_CAMPAIGN_LIST:
			return {
				...state,
				campaignTotal: action.total,
				campaignList: action.campaignList,
				statistics: {
					...action.statistics,
					oneTime: action.statistics['one-time'],
				},
			}
		case actionTypes.RES_CAMPAIGN_STORE:
			return {
				...state,
				campaignStore: action.campaignStore || [],
			}
		case actionTypes.RES_REMOVE_CAMPAIGN:
			return {
				...state,
				campaignList: state.campaignList.filter(item => item.id !== action.id)
			}
		case actionTypes.RES_BETCH_SET_CAMPAIGN:
			return {
				...state,
				campaignList: handleBetchSetting(state.campaignList, action.ids, action.setType)
			}
		case actionTypes.CHECKED_CAMPAIGN:
			return {
				...state,
				campaignList: state.campaignList.map(item => {
					if(item.id === action.id) {
						item.checked = !item.checked
					}
					return item
				})
			}
		case actionTypes.CHANGE_CAMPAIGN_STATUS:
			return {
				...state,
				campaignList: state.campaignList.map(item => {
					if(item.id === action.id) {
						item.status = action.status
					}
					return item
				})
			}
		case actionTypes.CHECKED_CAMPAIGN_ALL:
			return {
				...state,
				campaignList: state.campaignList.map(item => {
					item.checked = action.checked
					return item
				})
			}
		case actionTypes.MODIFY_CAMPAIGN:
			if(!action.campaign.id) {
				return state
			} else {
				let index = state.campaignList.findIndex(item => item.id === action.campaign.id)
				return {
					...state,
					campaignList: index === -1 ? [...state.campaignList, action.campaign] : [...state.campaignList.slice(0,index), action.campaign, ...state.campaignList.slice(index + 1)]
				}
			}
		default:
			return state
	}
}
