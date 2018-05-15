import React,{Component} from 'react'

import picture from '../../assets/images/template/emptyTemplate.svg'

import {
    copyTemplate,
    getRecommendList
} from '../../api/templates'

import cooketOperate from '../../utils/cookie'

import Pagination from '../m1-ui/components/Pagination'

class ModelList extends Component{
    constructor(props) {
        super(props)
        this.state = {
            data:{templates:[]},
            emptyDom:'empty'
        }
    }

    componentDidMount(){

    }

    componentWillReceiveProps(nextProps){
        //别的地方请求了模板列表
        if(nextProps.msg !== this.props.msg) {
            let data = nextProps.msg
            //console.log(data)
            this.setState({
                data:data,
                emptyDom:nextProps.msg.templates.length ? 'empty' : 'empty2'
            },function () {
                //console.log('别的地方请求的组件列表')
            })
        }

    }
    //判断是否显示模板详细信息及价格
    hasUserInfo(it){
        if(it.userInfo !== null){
            return (
                <div className="model-detail">
                    <div className="model-detail-left">
                        <img src={it.userInfo.avatar} alt=""/>
                        <div>
                            <p title={it.title}>{it.title ? it.title : '未命名模板'}</p>
                            <p>由 {it.userInfo.realName} 设计提供</p>
                        </div>
                    </div>
                    <div className="model-detail-right">
                        <div>{it.type==1 ? 'PAGE' : 'EDM'}</div>
                        <div className={it.price == 0 ? 'freeTep': 'valuableTep'}>￥{it.price == 0 ? '免费' : it.price}</div>
                    </div>
                </div>
            )
        }
    }
    //预览模板跳转
    previewTemplate(item){
        if(item.type == 1){
            window.open('http://www.m1world.com/event/event.html?preview=http://page.m1world.com/c/'+item.n_id)
        }else if(item.type == 2){
            if(item.share_id){
                //http://edm.m1world.com/email.htm?tid={template_id}
                window.open('http://edm.m1world.com//email.htm?tid='+item.share_id)
            }else{
                m1.msg('该EDN模板无法预览');
            }

        }
    }

    //拷贝后携带返回的新id跳转到编辑页面
    turnEdit(item) {
        if(item.type == 1){
            let id = item.n_id
            //console.log(id)

            //防止浏览器拦截办法
            let tempwindow = window.open();

            copyTemplate(id).then(result => {
                if(result.success){
                    const data = result.data
                    const turnID = data.p_id
                    //console.log(turnID)
                    //如果是临时用户保存一下返回的temp_uid
                    if('temp_uid' in data){
                        let temp_user_id = cooketOperate.get('cookie_page_temp_user_id')
                        if(!temp_user_id){
                            cooketOperate.set('cookie_page_temp_user_id',data.temp_uid,{expires:365*100,path:'/',domain:'.m1world.com'})
                        }
                        cooketOperate.set('cookie_page_temp_user_key',temp_user_id,{expires:365*100,path:'/',domain:'.m1world.com'})
                        //console.log('page的temp_uid为：'+data.temp_uid)
                    }
                    //当前页面跳转到page编辑页面
                    //window.location.href = 'http://page.m1world.com/v2/edit.html?p='+turnID
                    //新窗口打开
                    //当回调的时候更改临时窗体的路径
                    tempwindow.location='http://page.m1world.com/v2/edit.html?p='+turnID;

                    //window.open('http://page.m1world.com/v2/edit.html?p='+turnID)
                }else{
                    m1.msg('Page模板复刻失败');
                    //回调发现无需打开窗体时可以关闭之前的临时窗体
                    tempwindow.close();
                }
            })
        }else if(item.type == 2){
            //当前页面跳转到EDM编辑页面
            let EDMid = item.o_id
            m1.msg('正在跳转到EDM编辑页面');
            //http://edm.m1world.com/v2/html/default.htm?i=68914
            //window.location.href = 'http://edm.m1world.com/v2/?tid=' + EDMid
            //新窗口打开
            window.open('http://edm.m1world.com/v2/?tid=' + EDMid)
        }

    }
    //模板加载渲染
    getModelList(){
        let self = this
        //加载分页插件
        self.pagin()
        if(this.state.data.templates.length > 0){
            return (
                this.state.data.templates.map((item,i)=>{
                    return (
                        <div className="no-empty" key={i}>
                            <div className="model-cover">
                                <img onClick={() => { self.previewTemplate(item)}} src={item.cover_image + '?imageMogr2/thumbnail/380x/gravity/North/crop/!380x534a0a0'} alt=""/>
                                <div>
                                    <div className="m1-btn m1-btn-primary" onClick={() => {self.turnEdit(item)}}>
                                        使用
                                    </div>
                                    <div className="m1-btn" onClick={() => { self.previewTemplate(item)}}>
                                        预览
                                    </div>
                                </div>
                            </div>
                            {self.hasUserInfo(item)}
                        </div>
                    )

                })
            )
        }
    }
    //分页点击查询
    turnPage(obj){
        let pThis=this
        let newObj = window.filter
        newObj.page_index = obj.page_index ? obj.page_index : 1
        newObj.page_size = obj.page_size ? obj.page_size : 12
        //window.filter = newObj
        getRecommendList(newObj).then(result => {
            if(result.success){
                m1.loading(0.3);
                let data = result.data
                //数据传递到父组件
                pThis.setState({
                    data
                },function () {
                    //页面回到顶部
                    window.scrollTo(0,0)
                })
            }
        })
    }
    //分页初始化
    pagin(){
        let pThis=this
        $('.pagination').pagination({
            firstPage: '首页',
            lastPage: '末页',
            currentPage: pThis.state.data.page_index,
            currentSize: pThis.state.data.page_size,
            total: pThis.state.data.total_count,
            sizeArr: [10, 20, 50],
            onPageChange: function (page) {
                //console.log('切换页数，当前页：'+page)
                pThis.turnPage({page_index : page})
            },
            onSizeChange: function (size) {
                //console.log('切换每页大小，当前大小：'+size)
                pThis.turnPage({page_size : size})
            }
        });
        if(pThis.state.data.templates.length == 0){
            $('.pagination').hide()
        }else{
            $('.pagination').show()
        }
    }
    render(){
        return (
            <div>
                <div className="model-list">
                    {this.getModelList()}
                    <div className={this.state.emptyDom}>
                        <img src={picture} alt=""/>
                        <p>抱歉！没有找到符合条件的模板，您可以尝试更换其他关键词搜索</p>
                    </div>
                </div>
                <div className="pagination"></div>
            </div>

        )
    }
}

export default ModelList