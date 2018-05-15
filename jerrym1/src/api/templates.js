import { config, http } from '../utils'
import basic from '../base/basic'

import cooketOperate from '../utils/cookie'

const m1api = config.M1API
const pageApi = config.PAGEAPI
const token = basic.token
//判断是否是登录用户
const is_login = cooketOperate.get('m1authorization') ? true : false


/**
    access_token 否 m1 token  登陆后传
    key 否 搜索关键词
    cid 否 分类id
    type 否 类型  1 page  2 edm
    orderBy 否 排序 默认 时间排序
    isRecommended 否 是否为推荐
    page_index 是 页码
    page_size 是 每页条数，默认10
 * 获取推荐列表
 */
export function getRecommendList(obj){
    const url = m1api + '/templates'
    let param = obj_property(obj)
    if(param){
        return http.get(url, param)
    }

}

//获取模板分类列表 不带参数自行筛选加载
export function getCategory(){
    const url = m1api + '/templates/category'
    const param = {

    }
    return http.get(url, param)
}

//拷贝当前模板,调用api
export function copyTemplate(id) {
    let url = ''
    let param = {}
    let temp = {}
    let temp_user_id = cooketOperate.get('cookie_page_temp_user_id')
    //获取K值
    //2017年9月25日
    if(!temp_user_id){
        //console.log('厉害了我的哥')
        temp = {
            type:0,
            temp_uid: '',
            tpl_id: id
        }
    }else{
        temp = {
            type:0,
            temp_uid: temp_user_id,
            tpl_id: id
        }
    }

    if( is_login ){//判断是不是临时用户
        url = pageApi + '/pages/tpls/'+ id +'/choose'
        param = {
            token: token,
            tpl_id:id
        }
    }else {
        url = pageApi + '/pages/tpls/'+ id +'/choose_temp'
        param = temp
        //console.log(typeof param.temp_uid)
    }

    return http.get(url, param)
}

//处理用户请求数据
function obj_property(obj) {
    //1
    if( is_login ){
        obj.access_token = token
    }
    //2
    if(!('page_index' in obj) || !('page_index' in obj)){
        obj.page_index = obj.page_index ? obj.page_index : 1
        obj.page_size = obj.page_size ? obj.page_size : 12
    }
    //3
    if(!('orderBy' in obj)){
        obj.orderBy = '[{"createtime":"desc"}]'
    }
    //4
    if('key' in obj){
        if(obj.key){
            return obj
        }else{
            m1.msg('请输入搜索内容');
            return false
        }

    }else{
        return obj
    }
}



