import { config, http } from '../utils'
import basic from '../base/basic'

const m1api = config.SOUPAPI_UCENTER
const token = basic.token

/**
 * 获取用户信息
 */
export function getUserInfo() {
	const url = m1api + '/user/current'
	const param = {token: token}
	return http.get(url, param)
}
/**
 * 开启／关闭增值服务
 * @param  {Number} type 增值服务类型
 * @param  {Boolean} bool true 开启 false 关闭
 */
export function editService(type, bool) {
	const url = m1api + `/mservice/${type}/${bool ? 'open' : 'close'}`
	const param = {token: token}
	return http.post(url, param)
}
/**
 * 开启服务
 * @param  {Numbrer} type 服务类型
 */
export function openMService(type) {
		const url = m1api + `/mservice/${type}/open`
		const param = {token: token}
		return http.post(url, param)
}
/**
 * 关闭服务
 * @param  {Number} type 服务类型
 */
export function closeMService(type) {
	const url = m1api + `/mservice/${type}/close`
	const param = {token: token}
	return http.post(url, param)
}
/**
 * 获取账户总览信息
 */
export function getSummary() {
	const url = m1api + '/account'
	const param = {token: token}
	return http.get(url, param)
}
/**
 * 获取余额
 */
export function getBalance() {
	const url = m1api + '/user/balance'
	const param = {token: token}
	return http.get(url, param)
}
/**
 * 获取金币，邮件
 */
export function getAccountBalance() {
	const url = m1api + '/account/balance'
	const param = {token: token}
	return http.get(url, param)
}
/**
 * 获取优惠券列表
 * @param  {String} options.code   券码
 * @param  {Number} options.status 状态，不传：返回全部，1：有效未使用
 */
export function getCoupons({code, status}) {
	const url = m1api + '/coupons'
	const param = {token: token, code, status}
	return http.get(url, param)
}
/**
 * 获取M币任务列表
 * @return {[type]} [description]
 */
export function getGoldList() {
	const url = m1api + '/mbtask/tasks'
	const param = {
		token,
		type: '1,2,3', //
		pro: '2,3',    //项目，1 mh，2 M1，3 公用
		status: '1,2'  //状态，1 显示，2 不显示，3 下架
	}
	return http.get(url, param)
}
/**
 * 获取M币详情
 * @param  {Number} index 当前页
 * @param  {Number} size  每页条数
 */
export function getGoldDetail(index, size) {
	const url = m1api + '/mbtask/logs'
	const param = {
		token,
		pro: '2,3',
		page: index,
		limit: size
	}
	return http.get(url, param)
}
/**
 * 获取账单列表
 * @param  {string} sd     起始日期
 * @param  {string} ed     终止日期
 * @param  {Number} index  当前页索引
 * @param  {Number} size   当前页分也条数
 * @param  {Number} status 订单状态
 * @param  {Number} type   订单类型
 */
export function getBillList(sd, ed, index, size, status, type) {
	const url = m1api + '/trades'
	const param = {
		token: token,
		sd,
		ed,
		pageIndex: index || 1,
		pageSize: size || 10,
		status,
		type
	}
	return http.get(url, param)
}
/**
 * 获取企业认证服务信息
 */
export function getAuthInfo() {
	const url = m1api + '/certify'
	const param = {token: token}
	return http.get(url, param)
}
/**
 * 提交基础信息认证
 * @param  {String} options.company  机构公司名称
 * @param  {String} options.address  机构公司地址
 * @param  {String} options.website  公司网站
 * @param  {String} options.business 公司营业执照（先上传获取地址）
 * @param  {String} options.name     联系人
 * @param  {String} options.phone    联系电话
 * @param  {String} options.email    联系邮箱
 * @param  {String} options.icp      企业ICP 图片地址
 */
export function authBase({company, address, website, business, name, phone, email, icp}) {
	const url = m1api + '/certify/base'
	const param = {
		token, 
		company,
		address,
		website,
		business,
		name,
		phone,
		email,
		icp
	}
	return http.post(url, param)
}
/**
 * 提交短信认证		
 * @param  {string} companySign 短信签名
 * @param  {String} tem         模板，结构：[{"name": "营销类短信模板", "content": "模板正式", "type": 1}]
 * @param  {String} zm          证明信息，图片UEL
 */
export function authSMS({companySign,tem, zm}) {
	const url = m1api + '/certify/sms'
	const param = {
		token,
		companySign,
		tem,
		zm
	}
	return http.post(url, param)
}
/**
 * 提交基础信息认证和短信认证
 * @param {Object} baseObj 基础信息认证字段
 * @param {Object} smsObj  短信信息认证字段
 */
export function authBaseAndSMS(baseObj,smsObj) {
	return http.all(authBase(baseObj),authSMS(smsObj))
}
/**
 * 获取用户实时信息 
 */
export function getUser() {
	const url = m1api + '/user'
	const param = {token: token}
	return http.get(url, param)
}
/**
 * 微信授权认证
 * @param  {String} auth_code
 */
export function wechatAuth(auth_code) {
	const url = m1api + '/auth/wx/authorizer_info'
	const param = {token, auth_code}
	return http.get(url, param)
}
/**
 * 获取微信认证URL
 * @return {[type]} [description]
 */
export function getWechatAuth() {
	const url = m1api + '/wx/auth2'
	const param = {token}
	return http.get(url, param)
}
/**
 * 更新账户名
 * @param  {String} name 
 */
export function updateAccountName(name) {
	const url = m1api + `/account/${name}/update`
	const param = {
		token,
		name
	}
	return http.post(url, param)
}
/**
 * 修改用户设置信息
 * @param {object} obj 需设置的信息对象
 */
export function setSettingInfo(obj) {
	const url = m1api + '/user/edit'
	const param = {
		token: token,
		userStr: JSON.stringify(obj)
	}
	return http.post(url, param)
}
/**
 * 发送手机验证码
 * @param  {string} tel 手机号
 */
export function sendTelCode(phone) {
	const url = m1api + `/user/${phone}/code`
	const param = {
		token,
		phone
	}
	return http.post(url, param)
}
/**
 * 验证手机验证码是否有效
 * @param  {String} tel  
 * @param  {String} code 
 */
export function verifyTelCode(phone, code) {
	const url = m1api + `/user/phone/${code}/verify`
	const param = {
		token,
		phone,
		code
	}
	return http.post(url, param)
}
/**
 * 发送绑定邮箱
 * @param  {String} email 
 */
export function sendBindEmail(email) {
	const url = m1api + `/user/${email}/bind`
	const param = {
		token,
		email
	}
	return http.post(url, param)
}
/**
 * 修改密码
 * @param  {String} originalPassword 原始密码
 * @param  {String} password 				 新密码
 */
export function modifyPassword(originalPassword, password) {
	const url = m1api + '/user/password'
	const param = {
		token,
		originalPassword,
		password
	}
	return http.post(url, param)
}
/**
 * [uploadImage description]
 * @param  {MultipartFiole} options.file    图片文件
 * @param  {String} options.fileBase64 basee64 选择file 此参数可不传
 * @param  {String} options.pictype 目前两种tx 头像，wx 微信二维码
 * @return {[type]}                 [description]
 */
export function uploadFile({file, fileBase64, pictype}) {
	const url = m1api + `/user/edit/${pictype}`
	let formdata = new FormData()
	formdata.append('token', token)
	if(file) {
		formdata.append('file', file)
	} else {
		const subIndex = fileBase64.indexOf('base64')
		fileBase64 = subIndex >= 0 ? fileBase64.substring(subIndex + 7) : fileBase64
		formdata.append('fileBase64', fileBase64)
	}
	return http.ajax({
		url,
		method: 'POST',
		data: formdata,
		headers: {'Content-type': 'multipart/form-data'}
	})
}
/**
 * 上传图片 无token
 * @param  {String} options.file    文件
 * @param  {String} options.fileStr base64
 * @param  {String} options.fileUrl 图片url
 */
export function uploadFile2({file, fileStr, fileUrl}) {
	const url = m1api + '/upload/files'
	let formdata = new FormData()
	formdata.append('token', token)
	if(file) {
		formdata.append('file', file)
	} else if(fileStr) {
		const subIndex = fileStr.indexOf('base64')
		fileStr = subIndex >= 0 ? fileStr.substring(subIndex + 7) : fileStr
		formdata.append('fileStr', fileStr)
	} else {
		formdata.append('fileUrl', fileUrl)
	}
	return http.ajax({
		url,
		method: 'POST',
		data: formdata,
		headers: {'Content-type': 'multipart/form-data'}
	})
}
/**
 * 获取推荐人列表
 * @param  {String} project 项目名称（m1项目就传m1）
 */
export function getRecommendList(project) {
	const url = m1api + '/recommend'
	const param = {
		token,
		project
	}
	return http.get(url, param)
}
/**
 * 发送推荐邮箱
 * @param  {String} receiveUser 邮箱地址字符串，多个邮箱用分号隔开
 */
export function sendRecommendEmail(receiveUser) {
	const url = m1api + '/recommend/send'
	const param = {
		token,
		receiveUser
	}
	return http.post(url, param)
}

/**
 * intercom 事件
 * @param  {String} name 事件名
 */
export function intercomEvent(name) {
	const url = m1api + '/intercom'
	const param = {
		token,
		name
	}
	return http.get(url, param)
}

/**
 * 获取、申请授权令牌
 */
export function getAPIDetail() {
	const url = m1api + '/app'
	const param = { token }
	return http.get(url, param)
}
/**
 * 编辑应用令牌信息
 * @param  {String} app_name
 * @param  {String} app_url 
 */
export function editAPI(app_name, app_url) {
	const url = m1api + '/app/edit'
	const param = { token, app_name, app_url }
	return http.post(url, param)
}
/**
 * 重置令牌
 */
export function resetAPI() {
	const url = m1api + '/app/reset'
	const param = { token }
	return http.get(url, param)
}

/**
 * 微信充值
 * @param  {Number} total_fee 充值金额
 * @param  {String} type   充值类型
 * @param  {String} scope     回调参数
 * @param  {String} trade_id  订单追踪ID
 */
export function wxpay({total_fee, type, scope, trade_id}) {
	const url = m1api + '/wxpay/pay'
	const param = {
		token, total_fee, for: type, scope, trade_id
	}
	return http.post(url, param)
}
/**
 * 支付宝支付
 * @param  {Number} total_fee    支付金额
 * @param  {String} callback_url 支付成功后回调地址
 * @param  {string} scope        需要回调的参数
 * @param  {String} for          类型 充值1 升级2 消费consume
 * @param  {String} trade_id     订单号 重新支付时候传
 */
export function alipay(options) {
	const url = m1api + '/alipay/pay'
	const param = {token, ...options}
	const post = (URL, PARAMS) => {
	    let temp = document.createElement("form");
	    temp.action = URL;
	    temp.method = "post";
	    temp.style.display = "none";
	    for (let x in PARAMS) {
	        let opt = document.createElement("textarea");
	        opt.name = x;
	        opt.value = PARAMS[x];
	        temp.appendChild(opt);
	    }
	    document.body.appendChild(temp);
	    temp.submit();
	    return temp;
	}
	return post(url, param)
}
/**
 * 银行支付
 * @param  {Number} options.total_fee 
 * @param  {String} options.type      充值 1 升级 2
 * @param  {[type]} options.scope     [description]
 * @return {[type]}                   [description]
 */
export function bankpay({totalFee, type, scope}) {
	const url = m1api + '/bank/pay'
	const param = {token, totalFee, for: type, scope}
	return http.post(url, param)
}
/**
 * 金币抵扣
 * @param  {Number} gold 
 * @param  {String} type 
 */
export function goldPay(gold, type) {
	const url = m1api + '/goldpay/pay'
	const param = {token, gold, for: type}
	return http.post(url, param)
}
/**
 * 查询订单状态
 * @param  {String} trade_id 订单号
 */
export function checkOrderStatus(trade_id) {
	const url = m1api + '/wxpay/check_order_status'
	const param = { token, trade_id}
	return http.get(url, param)
}
/**
 * 版本升级扣费
 * @param  {Number} version 升级版本
 * @param  {Number} util    时间单位
 * @param  {Number} code    券id,未选择券,不填
 */
export function upgrade({edition, unit, code}) {
	const url = m1api + '/upgrade'
	const param = {token, edition, unit, code}
	return http.post(url, param)
}

/**
 * 获取发票记录列表
 */
export function getInvoiceList() {
	const url = m1api + '/invoices'
	const param = {token}
	return http.get(url, param)
}
/**
 * 获取可申请发票的充值记录
 */
export function getApplyInvoiceList() {
	const url = m1api + '/invoice/trades'
	const param = {token}
	return http.get(url, param)
}
/**
 * 获取发票设置信息
 */
export function getInvoiceSetting() {
	const url = m1api + '/invoice/setting'
	const param = {token}
	return http.get(url, param)
}
/**
 * 保存发票设置信息
 * @param  {String} options.title                          发票抬头
 * @param  {String} options.recipients                     收件人
 * @param  {String} options.adress                         寄件地址
 * @param  {String} options.phone                          联系电话
 * @param  {String} options.identification_num_of_taxpayer 纳税人识别号
 * @param  {String} options.registered_phone               公司注册电话
 * @param  {String} options.registered_address             公司注册地址
 * @param  {String} options.account_name                   开户行名称
 * @param  {String} options.account_num                    开户账号
 * @param  {Number} options.type                           发票类型 普通传1，增值税发票传2
 */
export function saveInvoiceSetting(options) {
	const url = m1api + '/invoice/setting'
	const param = {token, ...options}
	return http.post(url, param)
}
/**
 * 申请开具发票
 * @param  {Array} invoices 发票列表
 */
export function applyInvoice(invoices) {
	const url = m1api + '/invoice/apply'
	const param = {token, invoices: JSON.stringify(invoices)}
	return http.post(url, param)
}
/**
 * 社交应用号解绑
 * @param  {Number} type 应用类型，目前只有1:明道，2:微信，3:金数据
 */
export function unbindApp(type) {
	const url = m1api + '/social_bind/debind'
	const param = {token, type}
	return http.post(url, param)
}
/**
 * 获取邀请列表
 */
export function getInviteList() {
	const url = m1api + '/invites'
	const param = {token}
	return http.get(url, param)
}
/**
 * 发送邀请邮件
 * @param  {String} emails 多邮件用逗号隔开
 * @param  {Number} type   权限类别 1普通用户 2管理员
 * @param  {String} detail 权限详情
 */
export function sendInvite(emails,type,authority) {
	const url = m1api + '/invite'
	const param = {token, emails, type, authority: JSON.stringify(authority)}
	return http.post(url, param)
}
/**
 * 重发邀请
 * @param  {Stting} email  
 * @param  {Numbrer} type   
 * @param  {String} detail 
 */
export function resendInvite(email, type, authority) {
	const url = m1api + `/invite/${email}/${type}`
	const param = {token, authority}
	return http.post(url, param)
}
/**
 * 编辑子账号、邀请权限
 * @param  {Number} type      
 * @param  {String} detail    
 * @param  {String} invite_id 修改邀请时传
 * @param  {Number} user_id   修改子账号时传
 */
export function editInvite({type,authority,code,userId}) {
	const url = m1api + '/invite/edit'
	const param = {token, type, authority: JSON.stringify(authority), code, userId}
	return http.post(url, param)
}
/**
 * 删除子账号、邀请
 * @param  {Number} options.user_id   子账号ID，删除子账号传
 * @param  {Number} options.invite_id 邀请ID，删除邀请传
 */
export function removeInvite({userId,code}) {
	const url = m1api + '/invite/del'
	const param = {token, userId, code}
	return http.post(url, param)
}
/**
 * 搜索建议-获取所有权限
 * @param  {Number} app 1 Contact,2 Page, 3 Edm, 4 Sms
 */
export function getAuthSuggestion(app) {
	const url = m1api + '/invite/auth/suggestion'
	const param = {token, app}
	return http.get(url, param)
}
/**
 * 完善用户信息
 * @param  {String} options.realname 
 * @param  {String} options.company  
 * @param  {String} options.jobtitle 
 */
export function improveInfo({realname, company, job, phone, industry, industryKey, code}) {
	const url = m1api + '/user/perfect'
	const param = {token, realname, company, job, phone, industry, industryKey, code}
	return http.post(url, param)
}
/**
 * 获取行业列表
 */
export function getIndustry() {
	const url = m1api + '/user/industry'
	return http.get(url)
}
/**
 * 充值赠送活动
 */
export function getTradeGift() {
	const url = m1api+ '/trade/gift'
	return http.get(url)
}