import { config, utils } from '../utils'
import { getAdList, setAdClick } from '../api/general'

export default {
	 /**
     * 整理获取用户信息,用于存入cookie
     * @param data
     * @returns {{}}
     */
     arrangeUserInfo(data) {
        let accountData = {}, totalAccounts = [], userinfo = {}, accounts = [], account = {}, balance;

        balance = data.balance;
        
        data.totalAccounts.forEach((item, index) => {
            const totalAccount = {
                id: item.id,
                accountName: item.accountName,
                //2016/7/20增加hideLogo属性
                hideLogo: item.hideLogo
            };
            totalAccounts.push(totalAccount);
        });

        account.id = data.userinfo.accounts[0].id;
        account.accountName = data.userinfo.accounts[0].accountName;
        account.detail = data.userinfo.accounts[0].detail;
        account.authDetail = data.userinfo.accounts[0].authDetail;

        let fullName = "";

        if (data.userinfo != null && data.userinfo.realName != null && data.userinfo.realName != '')
            fullName = data.userinfo.realName;
        if (fullName == '') {
            if (data.userinfo != null && data.userinfo.nickName != null && data.userinfo.nickName != '')
                fullName = data.userinfo.nickName;
        }
        if (fullName == '') {
            fullName = data.userinfo.userName;
        }
        account.fullName = fullName;
        account.email = data.userinfo.email;
        account.version = data.userinfo.accounts[0].version;
        account.type = data.userinfo.accounts[0].type;
        account.createTime = parseInt(data.userinfo.accounts[0].createTime) / 1000;


        //2016/6/21 修改header增加字段
        account.expireTime = data.userinfo.accounts[0].expireTime;
        account.avatar = data.userinfo.avatar;

        //2016/7/20增加hideLogo属性
        account.hideLogo = data.userinfo.accounts[0].hideLogo;

        account.mobileBind = data.userinfo.accounts[0].mobileBind;

        accounts.push(account);

        userinfo.accounts = accounts;

        //2016/7/15
        userinfo.userId = data.userinfo.userId;
        userinfo.userName = data.userinfo.userName;

        accountData.totalAccounts = totalAccounts;
        accountData.userinfo = userinfo;
        accountData.balance = balance;

        return accountData;
    },

    /**
     * 获取全站广告
     * @param  {Function} fn 回调函数
     */
    getAdList(fn, options) {
        const timeSpan = 5 * 60 * 1000  //持续时间5分钟
        let adString = localStorage.getItem(config.STORAGE_M1_AD_LIST)
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
                localStorage.setItem(config.STORAGE_M1_AD_LIST, adString)
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