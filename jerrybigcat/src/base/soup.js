import { config, utils } from '../utils'
import { getAdList, setAdClick } from '../api/general'

export default {
	 /**
     * 整理获取用户信息,用于存入cookie
     * @param data
     * @returns {{}}
     */
     arrangeUserInfo(data) {
        let accountData = {}, totalAccounts = [], user = {}, accounts = [], account = {}, balance;

        balance = data.balance;
        
        data.totalAccounts.forEach((item, index) => {
            const totalAccount = {
                id: item.id,
                name: item.name,
            };
            totalAccounts.push(totalAccount);
        });

        account.id = data.user.accounts[0].id;
        account.name = data.user.accounts[0].name;
        account.edition = data.user.accounts[0].edition;
        account.type = data.user.accounts[0].type;
        account.mobileBound = data.user.accounts[0].mobileBound;
        account.gmtCreate = parseInt(data.user.accounts[0].gmtCreate) / 1000;
        account.gmtExpire = data.user.accounts[0].gmtExpire;

        accounts.push(account);
        user.accounts = accounts;

        //2016/7/15
        user.id = data.user.id;
        user.email = data.user.email;
        user.username = data.user.username;
        user.realname = data.user.realname;
        user.nickname = data.user.nickname;
        user.avatar = data.user.avatar;

        accountData.totalAccounts = totalAccounts;
        accountData.user = user;
        accountData.balance = balance;

        return accountData;
    },

    /**
     * 获取全站广告
     * @param  {Function} fn 回调函数
     */
    getAdList(fn, options) {
        const timeSpan = 5 * 60 * 1000  //持续时间5分钟
        let adString = localStorage.getItem(config.STORAGE_SOUPAI_AD_LIST)
        let adJson = {}

        const listFilter = (list) => {
            const { pageId, fieldId } = options || {}
            if(fieldId) {
                list = list.filter(item => item.fieldId === fieldId)
            } else if(pageId) {
                list = list.filter(item => item.pageId === pageId)
            }
            return list
        }

        const getAdListResult = result => {
            if(result.success) {
                if(fn) {
                    fn(listFilter(result.data))
                }
                adJson = {
                    list: result.data,
                    updateTime: utils.getTimeStamp()
                }
                adString = encodeURIComponent(JSON.stringify(adJson))
                localStorage.setItem(config.STORAGE_SOUPAI_AD_LIST, adString)
            }
        }

        if(adString) {
            adJson = JSON.parse(decodeURIComponent(adString))
            const nowTime = utils.getTimeStamp()
            if(nowTime - adJson.updateTime <= timeSpan) {
                if(fn) {
                    fn(listFilter(adJson.list))
                }
            } else {
                getAdList().then(getAdListResult)
            }
            
        } else {
            getAdList().then(getAdListResult)
        }
    },

    /**
     * 设置广告点击
     */
    setAdClick(id) {
        return setAdClick(id)
    }
}