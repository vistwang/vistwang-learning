import { CampaignTypes, StepConditionTypes, AddresseeStatus } from '../enums'

export default {

	filter: {
		campaignTypes: {
			[CampaignTypes.SINGLE]: '单次',
			[CampaignTypes.AUTOMATIC]: '自动'
		},

		stepConditionTypes: {
			[StepConditionTypes.NOTHING]: '不做任何条件判断',
			[StepConditionTypes.UNOPENED_PREV_EMAIL]: '未打开上一封邮件',
			[StepConditionTypes.UNCLICKED_PREV_LINK]: '未点击上一封链接',
			[StepConditionTypes.CLICKED_PREV_LINK]: '点击了上一封链接',
		},

		addresseeStatus: {
			[AddresseeStatus.WAIT_SEND]: '等待发送',
			[AddresseeStatus.SEND_COMPLETION]: '发送完成',
			[AddresseeStatus.OPENED]: '打开',
			[AddresseeStatus.CLICKED]: '点击',
			[AddresseeStatus.UNSUBSCRIBE]: '退订',
			[AddresseeStatus.COMPLAINT]: '投诉',
			[AddresseeStatus.UNTOUCHED]: '未触达',
		},

		
	},

	behaviorList: [
		{name: '打开了邮件', event: 'open'},
		{name: '点击了链接', event: 'click'},
		{name: '回复了邮件', event: 'reply'},
		{name: '已退订', event: 'unsubscribe'},
		{name: '反弹', event: 'bounce'},
	],

}