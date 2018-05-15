
const initState = {
	showPreviewModal: false,
	templates: [],
	totalCount: 0,
	classifiaction: 0,
	pageIndex: 1,
	pageSize: 10,

	previewData: null,
}

export const actionTypes = {
	TOGGLE_PREVIEW_MODAL: 'TOGGLE_PREVIEW_MODAL',

	REQ_CAMPAIGN_TEMPLATES: 'REQ_CAMPAIGN_TEMPLATES',
	RES_CAMPAIGN_TEMPLATES: 'RES_CAMPAIGN_TEMPLATES',

	REQ_USE_CAMPAIGN_TEMPLATE: 'REQ_USE_CAMPAIGN_TEMPLATE',

	REQ_CAMPAIGN_TEMPLATE_PREVIEW: 'REQ_CAMPAIGN_TEMPLATE_PREVIEW',
	RES_CAMPAIGN_TEMPLATE_PREVIEW: 'RES_CAMPAIGN_TEMPLATE_PREVIEW',
}

export const actions = {
	togglePreviewModal(status) {
		return {type: actionTypes.TOGGLE_PREVIEW_MODAL, status}
	},
	reqPreview(templateId) {
		return {type: actionTypes.REQ_CAMPAIGN_TEMPLATE_PREVIEW, templateId}
	},
	resPreview(previewData) {
		return {type: actionTypes.RES_CAMPAIGN_TEMPLATE_PREVIEW, previewData}
	},

	reqUseTemplate(templateId) {
		return {type: actionTypes.REQ_USE_CAMPAIGN_TEMPLATE, templateId}
	},

	reqTemplates(option) {
		return {type: actionTypes.REQ_CAMPAIGN_TEMPLATES, option}
	},
	resTemplates(templates, option) {
		return {type: actionTypes.RES_CAMPAIGN_TEMPLATES, templates, option}
	},


}


export function reducer(state = initState, action) {
	switch(action.type) {
		case actionTypes.TOGGLE_PREVIEW_MODAL:
			return {
				...state,
				showPreviewModal: action.status
			}
		case actionTypes.RES_CAMPAIGN_TEMPLATE_PREVIEW: 
			return {
				...state,
				previewData: action.previewData,
			}
		case actionTypes.RES_CAMPAIGN_TEMPLATES: {
			return {
				...state,
				templates: action.templates.list,
				totalCount: action.templates.total,
				classifiaction: action.option.classifiaction || state.classifiaction,
				pageIndex: action.option.page || state.pageIndex,
				pageSize: action.option.pageSize || state.limit
			}
		}

		default:
			return state
	}
}
