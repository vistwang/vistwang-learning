import { config, http } from '../utils'
import basic from '../base/basic'

const m1api = config.SOUPAPI_UCENTER
const token = basic.token

/**
 * 登录
 * @param  {String} username 
 * @param  {String} password 
 * @param  {String} from     
 */
export function login(username, password, from) {
	const url = m1api + '/user/login'
	const param = {username, password, from}
	return http.post(url, param)
}

/**
 * 登出账号
 * @return {[type]} [description]
 */
export function logout() {
	const url = m1api + '/user/logout'
	const param = {token}
	return http.get(url, param)
}
/**
 * 注册
 * @param  {String} options.email          
 * @param  {String} options.password       
 * @param  {String} options.recommend_code 推荐码
 * @param  {String} options.from           注册来源，默认m1
 * @param  {Number} options.social_type    社交账号绑定
 * @param  {String} options.access_token   社交账号授权token
 * @param  {String} options.mobilephone    手机号
 * @param  {String} options.verify_code    验证码
 */
export function register(options) {
	const url = m1api + '/user/register'
	const param = {
		// key: '047cee05-ebce-2e6d-01b6-8cfaefe392c0',
		...options}
	return http.post(url, param)
}
/**
 * 发送激活邮件
 * @param  {String} email 
 */
export function sendActiveEmail(email) {
	const url = m1api + '/user/send_active'
	const param = {email}
	return http.post(url, param)
}
/**
 * 校验邮箱是否已经注册
 * @param  {[type]} email [description]
 * @return {[type]}       [description]
 */
export function checkEmail(email) {
	const url = m1api + `/user/${email}/verify`
	return http.get(url)
}
/**
 * 发送手机验证码（极验版）
 * @param  {String} mobile            
 * @param  {String} geetest_challenge 
 * @param  {String} geetest_validate  
 * @param  {String} geetest_secode    
 */
export function sendTelCode(mobile, geetest_challenge, geetest_validate, geetest_seccode) {
	const url = m1api + '/bind/send_code'
	const param = {mobile, geetest_challenge, geetest_validate, geetest_seccode}
	return http.post(url, param)
}
/**
 * 获取gt验证码
 * @return {[type]} [description]
 */
export function getGTVerifyCode() {
	const url = m1api + '/gt?t=' + +new Date()
	return http.get(url)
}
/**
 * 绑定抵用券
 * @param  {String} coupon_id   
 * @param  {String} coupon_code 
 * @param  {String} activity_id 
 */
export function bindCoupon(coupon_id, coupon_code, activity_id) {
	const url = m1api + '/bind_coupons'
	const param = {token, coupon_code, coupon_code, activity_id}
	return http.post(url, param)
}
/**
 * 账户激活
 * @param  {String} active_token 
 */
export function activeAccount(active_token) {
	const url = m1api + '/user/active'
	const param = {active_token}
	return http.post(url, param)
}
/**
 * 激活绑定邮箱	
 * @param  {String} bind_token 
 */
export function activeBindEmail(bind_token) {
	const url = m1api + '/user/openbind_email'
	const param = {bind_token}
	return http.post(url, param)
}
/**
 * 获取邀请详情
 * @param  {String} code 
 */
export function getInviteDetail(code) {
	const url = m1api + `/invite/${code}`
	return http.get(url)
}
/**
 * 同意邀请
 * @param  {String} invite_id 
 * @param  {String} password  
 */
export function agreeInvite(code, password) {
	const url = m1api + `/invite/${code}/confirm`
	const param = {password}
	return http.post(url, param)
}