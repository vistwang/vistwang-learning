/**
 * 账户类型
 * @type {Object}
 */
export const AccountTypes = {
	// 普通用户
	ORDINARY: 1,
	// 管理员
	ADMIN: 2,
	// 创建者
	CREATOR: 3
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

export default {
	AccountTypes,
	AccountAuths,
	ScopeTypes,
	AppNames,
}