import React, { Component } from 'react'

import utils from '../../utils/utils'

import Advert from '../../components/templates/Advert'

import ModelNav from '../../components/templates/ModelNav'

import ModelList from '../../components/templates/ModelList'

import {
    getRecommendList,
    getCategory
} from '../../api/templates'

class Templates extends Component {
    constructor(props) {
        super(props)

        this.state = {
            msg:{},
            init:{
                account:0,
                lightNumber:''
            },
            category:[]
        }
    }
    //处理子组件传递的数据
    transferMsg(msg) {
        this.setState({
            msg
        });
    }

    componentDidMount(){
        const self=this
        let msg={}

        //记录初始化模板总数，高亮显示
        let init=this.state.init
        window.filter = {}

        //获取URL数据初始化模板列表
        let cid = utils.getUrlParam('cid')
        let t_type = utils.getUrlParam('t_type')
        let sort = utils.getUrlParam('sort')

        switch (sort){
            case 'new':
                window.filter = {orderBy :'[{"createtime":"desc"}]',page_size : 9}
                init.lightNumber= 2
                break;
            case 'hot':
                window.filter = {orderBy : '[{"copy_count":"desc"}]',page_size : 18}
                init.lightNumber= 3
                break;
            case 'recom':
                window.filter = {isRecommended : true}
                init.lightNumber= 4
                break;
            default:
                window.filter = {}
        }

        if(cid){
            window.filter.cid = cid;
            init.lightNumber = 0
        }

        if(t_type){
            window.filter.type = t_type;
            init.lightNumber = 1
        }

        if(cid && t_type){
            init.lightNumber = 6
        }

        //初始化请求模板分类及推荐列表数据
        getCategory().then(result => {
            if(result.success){
                const category = result.data

                self.setState({
                    category
                },function () {
                    //console.log('推荐主题加载模板列表成功了');
                })

            }
        })
        //初始化请求模板列表数据
        getRecommendList(window.filter).then(result => {
            if(result.success){
                msg = result.data
                init.account = msg.total_count
                //console.log(msg)
                self.setState({
                    msg,
                    init
                },function () {

                    //console.log('ModelList初始化加载成功')
                });

                m1.loading(0.5);
            }
        })
    }

	render() {
		return (
			<div>
				<div className="template-content">
					<Advert transferMsg={msg => this.transferMsg(msg)} category={this.state.category} />
					<ModelNav transferMsg={msg => this.transferMsg(msg)} init={this.state.init} category={this.state.category}/>
					<ModelList transferMsg={msg => this.transferMsg(msg)} msg={this.state.msg} />
				</div>
			</div>
		)
	}
}

export default Templates