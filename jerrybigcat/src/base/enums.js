/**
 * 账户类型
 * @type {Object}
 */
export const AccountTypes = {
	// 普通用户
	GENERAL: 1,
	// 管理员
	ADMIN: 2,
	// 观察者
	OBSERVER: 3,
	// 创建者
	CREATOR: 4
}

/**
 * 账户权限设置
 * @type {Object}
 */
export const AccountAuths = {
	READABLE: 'readable',
	WRITABLE: 'writable',
	DELETABLE: 'deletable',
	EXPORTABLE: 'exportable',
	SHOWFOLDER: 'showFolder'
}

/**
 * 具体项目归类类型
 * @type {Object}
 */
export const ScopeTypes = {
	// 文件夹
	FOLDER: 1,
	// 联系人群组
	CONTACT_GROUP: 2,
	// 网页项目
	PAGE_ITEM: 3,
	// 邮件项目
	EDM_ITEM: 4,
	// 短信项目
	SMS_ITEM: 5
}

/**
 * M1各个应用名称
 * @type {Object}
 */
export const AppNames = {
	M1: 			'm1',
	CONTACT:  'contact',
	PAGE: 		'page',
	EDM: 			'edm',
	SMS: 			'sms'
}

/**
 * 联系人群组文件夹
 * @type {Object}
 */
export const ContactGroupTypes = {
	// 文件夹
	FOLDER: 1,
	// 群组
	GROUP:  2
}

/**
 * 交易支付类型
 * @type {Object}
 */
export const PayFor = {
	// 充值
	CHARGE: 1,
	// 升级
	UPGRADE: 2
}

/**
 * 字段所属范围
 * @type {Object}
 */
export const PropertyScopes = {
	// 联系人字段
	CONTACT: 1,
	// 公司字段
	COMPANY: 2
}

/**
 * 群组所属范围
 * @type {Object}
 */
export const GroupScopes = {
	// 联系人群组
	CONTACT: 1,
	// 公司群组
	COMPANY: 2,
}

/**
 * 群组类型
 * @type {Object}
 */
export const GroupTypes = {
	// 正常群组
	NORMAL: 1,
	// 动态细分群组
	DYNAMIC: 2,
}

/**
 * 字段类型
 * @type {Object}
 */
export const PropertyTypes = {
	// 数字
	NUMBER: 1,
	// 文本
	TEXT: 2,
	// 多项选择（下拉）
	MULTISELECT: 3,
	// 布尔
	BOOL: 4,
	// 日期
	DATE: 5
}

/**
 * api错误响应体
 * @type {Object}
 */
export const ErrorCodes = {
	INTERNAL_SERVER_ERROR: 		'E100000',
	REQUIRED_PARAMETER_ERROR: 'E100001',
	SYSTEM_HINT: 							'E100002',
}

/**
 * 邮箱发送类型
 * @type {Object}
 */
export const EmailSendTypes = {
	SYSTEM_MAIL: 0,
	CUSTOM_MAIL: 1,
	WY_MAIL: 2,
	QQ_MAIL: 3,
	GMAIL: 4,
}

/**
 * 事件类型
 * @type {Object}
 */
export const EventTypes = {
	ALL: 0,
	NUMBER: 1,
	TEXT: 2,
	MULTISELECT: 3,
	BOOL: 4,
	DATE: 5
}

/**
 * 活动类型
 * @type {Object}
 */
export const CampaignTypes = {
	// 单次
	SINGLE: 0,
	// 自动
	AUTOMATIC: 1,
}

/**
 * 活动状态
 * @type {Object}
 */
export const CampaignStatus = {
	// 草稿
	DRAFT: 0,
	// 正式通过
	PASS: 1,
	// 正在运行
	RUNNING: 2,
	// 停止运行
	STOP: 3
}

/**
 * 活动批量操作类型
 * @type {Object}
 */
export const CampaignBetchTypes = {
	// 停止
	STOP: 0,
	// 开启
	OPEN: 1,
	// 删除
	DELETE: 2,
	// 添加到文件夹
	FOLDER: 3
}

/**
 * 活动内容类型
 * @type {Object}
 */
export const CampaignContentTypes = {
	// 邮件
	EDM: 0,
	// 短信
	SMS: 1
}

/**
 * 活动用户行为
 * @type {Object}
 */
export const CampaignBehaviors = {
	// 打开邮件
	OPEN: 'open',
	// 点击链接
	CLICK: 'click',
	// 回复邮件
	REPLY: 'reply',
	// 退订
	UNSUBSCRIBE: 'unsubscribe',
	// 回弹
	BOUNCE: 'bounce',
}

export const CampaignResponseActions = {
	ADD_TO_CAMPAIGN: 1,
	ADD_TO_GROUP: 2,
	ADD_TAG: 3,
	ADD_STATUS: 4,
	SEND_TO_EMAIL: 5,
	ADD_TO_BLACKLIST: 6,
	DELETE_CONTACT: 7,
}

/**
 * 步骤条件事件类型
 * @type {Object}
 */
export const StepConditionTypes = {
	// 不做任何操作
	NOTHING: 0,
	// 未打开上一封邮件
	UNOPENED_PREV_EMAIL: 1,
	// 未点击上一封链接
	UNCLICKED_PREV_LINK: 2,
	// 点击了上一封链接
	CLICKED_PREV_LINK: 3,
	// 未回复上一封邮件
	UNANSWERED_PREV_EMAIL: 4,
}

/**
 * 收件人状态
 * @type {Object}
 */
export const AddresseeStatus = {
	// 等待发送
	WAIT_SEND: 0,
	// 发送完成
	SEND_COMPLETION: 1,
	// 已打开
	OPENED: 2,
	// 已点击
	CLICKED: 3,
	// 退订
	UNSUBSCRIBE: 4,
	// 投诉
	COMPLAINT: 5,
	// 未触达
	UNTOUCHED: 6,
}

/**
 * 回复类型
 * @type {Object}
 */
export const ReplyTypes = {
	// 感兴趣
	INTERESTED: 1,
	// 不感兴趣
	UNINTERESTED: 2,
	// 转发
	TRANSMIT: 3,
	// 自动回复
	AUTO_REPLY: 4,
}

export const ReplyStatus = {
	// 所有
	TOTAL: 0,
	// 打开
	OPENED: 2,
	// 点击
	CLICKED: 3,
	// 退订
	UNSUBSCRIBED: 4,
	// 投诉
	COMPLAIN: 5,
	// 未触达
	UNTOUCHED: 6,
	// 弹回
	BOUNCE: 7,
	// 回复
	REPLIED: 8,
}

/**
 * 筛选列表类型范围
 * @type {Object}
 */
export const QueryScopes = {
	// 联系人
	CONTACT: 1,
	// 公司
	COMPANY: 2,
	// 群组
	GROUP_NORMAL: 3,
	// 标签
	TAG: 6,
	// 事件
	EVENT: 7,
}

export default {
	AccountTypes,
	AccountAuths,
	ScopeTypes,
	AppNames,
	PayFor,
	PropertyScopes,
	PropertyTypes,
	ErrorCodes,
	EmailSendTypes,
	EventTypes,
	
	CampaignTypes,
	CampaignStatus,
	CampaignBetchTypes,
	CampaignContentTypes,
	CampaignBehaviors,
	CampaignResponseActions,
	StepConditionTypes,
	AddresseeStatus,
	ReplyTypes,
	ReplyStatus,
	QueryScopes,
}