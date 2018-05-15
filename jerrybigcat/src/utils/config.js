
// 测试平台
export const SOUPAPI = 'http://rest_t.soup.ai'
export const PAGEAPI = 'http://pageapi_t.m1world.com'
export const DOMAIN = window.location.origin
// export const DOMAIN = 'http://beta.soup.ai'
// export const DOMAIN = 'http://metest.soup.ai:8080'

// soup api
// export const SOUPAPI = 'http://m1api.m1world.com'
// // page api
// export const PAGEAPI = 'http://pageapi.m1world.com'
// // soup domain
// export const DOMAIN = 'http://www.m1world.com'


// 账户api前缀
export const API_PREFIX_UCENTER = '/ucenter'
// 联系人API前缀
export const API_PREFIX_CONTACT = '/contact'
// 邮件API前缀
export const API_PREFIX_MAIL = '/mail'
// 活动API前缀
export const API_PREFIX_CAMPAIGN = '/campaign'
// 收件人API前缀
export const API_PREFIX_RECIPIENT = '/recipients'

// 账户API完整
export const SOUPAPI_UCENTER = SOUPAPI + API_PREFIX_UCENTER
// 联系人API完整
export const SOUPAPI_CONTACT = SOUPAPI + API_PREFIX_CONTACT
// 邮件API完整
export const SOUPAPI_MAIL = SOUPAPI + API_PREFIX_MAIL
// 活动API完整
export const SOUPAPI_CAMPAIGN = SOUPAPI + API_PREFIX_CAMPAIGN
// export const SOUPAPI_CAMPAIGN = 'http://172.16.21.221:5066'
// 收件人API完整
export const SOUPAPI_RECIPIENT = SOUPAPI + API_PREFIX_RECIPIENT
// export const SOUPAPI_RECIPIENT = 'http://172.16.21.221:5011'


/**
 * cookie names
 * @type {String}
 */
export const COOKIE_SOUPAI_DOMAIN = '.soup.ai'
export const COOKIE_SOUPAI_TOKEN = 'soupai_authorization'
export const COOKIE_SOUPAI_USER_NAME = 'soupai_username'
export const COOKIE_SOUPAI_USER = 'soupai_user'
export const COOKIE_SOUPAI_AUTO_LOGIN = 'soupai_autoLogin'
export const COOKIE_SOUPAI_COUPON = 'soupai_coupon'
export const COOKIE_PAGE_AUTH_WECHAT = 'm1_page_auth_wechat'
// 用户第一次登录
export const COOKIE_SOUPAI_FIRST_LOGIN = 'soupai_firstlogin'
export const COOKIE_SOUPAI_FIRST_LOGIN_URL = 'soupai_firstlogin_url'
// 来源百度推广
export const COOKIE_BAIDU_SEM = 'bd_SEM'


/**
 * localStorage name
 * @type {String}
 */
export const STORAGE_SOUPAI_AD_LIST = 'soupai_ad_list'
