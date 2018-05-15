import { PropertyTypes, PropertyScopes, EventTypes, QueryScopes } from '../enums'

export default {

	keys: {

	},

	filter: {
		propertyScopes: {
			[PropertyScopes.CONTACT]: '联系人',
			[PropertyScopes.COMPANY]: '公司',
		},

		propertyScopeKeys: {
			[PropertyScopes.CONTACT]: 'contact',
			[PropertyScopes.COMPANY]: 'company',
		},

		propertyTypes: {
			[PropertyTypes.NUMBER]: 			'数字',
			[PropertyTypes.TEXT]: 				'文本',
			[PropertyTypes.MULTISELECT]: 	'多选项',
			[PropertyTypes.BOOL]: 				'布尔',
			[PropertyTypes.DATE]: 				'日期',
		},

		eventTypes: {
			[EventTypes.ALL]: '所有',
			[EventTypes.NUMBER]: '数字',
			[EventTypes.MULTISELECT]: '多选项',
			[EventTypes.TEXT]: '文本',
			[EventTypes.BOOL]: '布尔',
			[EventTypes.DATE]: '日期',
		},

		customPrefix: {
			field: 'custom-field-',
			event: 'custom-event-',
		},

		queryScopes: {
			[QueryScopes.CONTACT]: 			{label: 'contact', 	name: '联系人属性', 		key: 'query-terms-contact'},
			[QueryScopes.COMPANY]: 			{label: 'company', 	name: '公司属性', 			key: 'query-terms-company'},
			[QueryScopes.GROUP_NORMAL]: {label: 'group', 		name: '群组属性', 			key: 'query-terms-groups'},
			[QueryScopes.TAG]: 					{label: 'tag', 			name: '标签属性', 			key: 'query-terms-tags'},
			[QueryScopes.EVENT]: 				{label: 'event', 		name: '行为事件', 			key: 'query-terms-events'},
		},
	},


	sampleEvents: [
		{id: '', uniqueId: 'view_price_page', name: '浏览价格页', type: 2, description: '记录用户浏览价格页', website: '' },
		{id: '', uniqueId: 'view_price_page', name: '浏览价格页', type: 2, description: '记录用户浏览价格页', website: '' },
		{id: '', uniqueId: 'view_price_page', name: '浏览价格页', type: 2, description: '记录用户浏览价格页', website: '' },
		{id: '', uniqueId: 'view_price_page', name: '浏览价格页', type: 2, description: '记录用户浏览价格页', website: '' },
		{id: '', uniqueId: 'view_price_page', name: '浏览价格页', type: 2, description: '记录用户浏览价格页', website: '' },
		{id: '', uniqueId: 'view_price_page', name: '浏览价格页', type: 2, description: '记录用户浏览价格页', website: '' },
		{id: '', uniqueId: 'view_price_page', name: '浏览价格页', type: 2, description: '记录用户浏览价格页', website: '' },
		{id: '', uniqueId: 'view_price_page', name: '浏览价格页', type: 2, description: '记录用户浏览价格页', website: '' },
		{id: '', uniqueId: 'view_price_page', name: '浏览价格页', type: 2, description: '记录用户浏览价格页', website: '' },
	]
}