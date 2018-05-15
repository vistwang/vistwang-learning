import React,{Component} from 'react'

import {
    getCategory,
    getRecommendList
} from '../../api/templates'

class ModelNav extends Component{
    constructor(props){
        super(props)

        this.state={
            data:[],
            allTemplatesNub : 0,
            TmpType:'模板类型',
            TmpClass:'模板分类',
            searchValue:'',
            screenNaps:{},
            heightLight:[false,false,false,false,false]
        }
    }

    componentWillReceiveProps(nextProps){
        //获取模板的总数量
        if(nextProps.init !== this.props.init || nextProps.category !== this.props.category) {
            let allTemplatesNub = nextProps.init.account
            //console.log(window.filter)
            let data = nextProps.category
            //url携带参数对应筛选项高亮显示
            this.highlight(nextProps.init.lightNumber)

            if('type' in window.filter){
                switch (window.filter.type){
                    case '1':
                        this.setState({
                            TmpType:'Page模板'
                        })
                        break;
                    case '2':
                        this.setState({
                            TmpType:'EDM模板'
                        })
                        break;
                    default:
                        this.setState({
                            TmpType:'模板类型'
                        })
                }
            }

            if('cid' in window.filter){
                for(let i=0; i<data.length; i++){
                    if(window.filter.cid == data[i].c_id){
                        this.setState({
                            TmpClass:data[i].name
                        })
                        break
                    }
                }
            }


            this.setState({
                data,
                allTemplatesNub
            },function () {
                //console.log('模板的总数量')
            })
        }

    }

    componentDidMount(){

    }

    //判断模板类型是否为空
    isNull(arr){
        for(let i=0 ; i<arr.length ; i++){
            if(arr[i] !== undefined){
                return true
            }
        }
        return false
    }



    //关联筛选
    screenBoth(item,nam){
        let screenNaps=this.state.screenNaps
        let TmpClass = nam
        let TmpType = nam
        let n=''
        if('cid' in item){
            screenNaps.cid=item.cid
            //模板种类高亮
            n=0
            this.setState({
                screenNaps,
                TmpClass
            })
        }else if('type' in item){
            //模板类型高亮
            n=1
            screenNaps.type=item.type
            this.setState({
                screenNaps
            })
        }else{
            //点击显示所有类型
            this.setState({
                TmpType
            })
            if('type' in screenNaps ){
                //模板种类高亮
                n=''
                delete screenNaps.type
                this.setState({
                    screenNaps
                })
            }
        }
        if(('cid' in screenNaps) && ('type' in screenNaps)){
            n=6
        }

        this.screenTemplate(screenNaps,n)
    }

    //排他思想高亮显示筛选种类
    highlight(n){
        //添加高亮效果
        let heightLight = [false,false,false,false,false]
        if(n == 6){
            heightLight[0] = true
            heightLight[1] = true
        }else{
            heightLight[n] = true
        }
        this.setState({
            heightLight
        })
    }

    //获取当前类型下的模板
    screenTemplate(item,n){
        let self=this

        //修改提示信息
        if(JSON.stringify(item) == "{}"){
            this.setState({
                TmpClass:'模板分类',
                TmpType:'模板类型'
            })
        }
        if('type' in item){
            if(item.type == 1){
                this.setState({
                    TmpType:'Page模板'
                })
            }else if(item.type == 2){
                this.setState({
                    TmpType:'EDM模板'
                })
            }
        }

        //调用ajax
        getRecommendList(item).then(result => {
            if(result.success){
                //高亮筛选项
                self.highlight(n)

                m1.loading(0.3);
                const currentData = result.data
                //数据传递到父组件
                self.props.transferMsg(currentData)

                //存储全局搜索的对象
                window.filter = item
            }
        })

    }

    //获取模板种类数据
    getCategoryNavSon(fa){
        let sons=[]
        let cThis = this
        if(this.state.data.length > 0){
            return (
                this.state.data.map((item,i) => {
                    if(item.parent_id == fa.c_id){
                        sons=cThis.getCategoryNavSon(item)
                        if(cThis.isNull(sons)){
                            return (
                                <li key={i} className="m1-dropdown-submenu">
                                    <a key={item.name} onClick={() => {cThis.screenBoth({cid:item.c_id},item.name)}}>{item.name}<span>{item.total}</span></a>
                                    <ul className="m1-dropdown-menu">
                                        {sons}
                                    </ul>
                                </li>
                            )
                        }else {
                            return (
                                <li key={i}>
                                    <a key={item.name} onClick={() => {cThis.screenBoth({cid:item.c_id},item.name)}}>{item.name}<span>{item.total}</span></a>
                                </li>
                            )
                        }

                    }
                })
            )
        }
    }

    //类型数据加载处理
    getCategoryNav(){
        let son=''
        let mThis = this
        if(this.state.data.length > 0){
            return (
                this.state.data.map((item,i)=>{
                    if(item.parent_id == 0){
                        son =mThis.getCategoryNavSon(item)
                        if(mThis.isNull(son)){
                            return (
                                <li key={i} className="m1-dropdown-submenu">
                                    <a>{item.name}筛选<span>{item.total}</span></a>
                                    <ul className="m1-dropdown-menu">
                                        {son}
                                    </ul>
                                </li>
                            )

                        }else{
                            return (
                                <li key={i}>
                                    <a key={item.name} onClick={() => {mThis.screenBoth({cid:item.c_id},item.name)}}>{item.name}<span>{item.total}</span></a>
                                </li>
                            )
                        }
                    }
                })
            )
        }
    }

    //搜索框事件
    changeValue(e){
        this.setState({
            searchValue : e.target.value
        },function () {

        })
    }

    enterUp(e){
        e.keyCode === 13 && this.searchBlur()
    }

    searchBlur(){
        //请求数据
        if(this.state.searchValue){
            //存储用户搜索的信息
            this.screenTemplate({key: this.state.searchValue})
        }else{
            m1.msg('请输入搜索内容');
        }
    }

    render(){
        //验收数据
        let hColor = this.state.heightLight.map((item,i) => {
            return (
                {color : item ? "#1dacfd" : "#94969B"}
            )
        })

        return (
            <div className="model-nav">
                <div className="model-nav-filter">
                    <div className="m1-dropdown">
                        <div>
                            <div data-m1-toggle="dropdown" className="TypeTitle" style={hColor[0]}>{this.state.TmpClass}</div>
                            <span className="m1-caret" data-m1-toggle="dropdown"></span>
                        </div>
                        <div className="m1-dropdown-menu">
                            <ul>
                                <li>
                                    <a onClick={() => {this.screenTemplate({})}}>所有模板<span>{this.state.allTemplatesNub}</span></a>

                                </li>
                                {this.getCategoryNav()}
                            </ul>
                        </div>
                    </div>
                    <div className="m1-dropdown">
                        <div>
                            <div data-m1-toggle="dropdown" className="TypeTitle" style={hColor[1]}>{this.state.TmpType}</div>
                            <span className="m1-caret" data-m1-toggle="dropdown"></span>
                        </div>
                        <div className="m1-dropdown-menu">
                            <ul>
                                <li><a onClick={() => {this.screenBoth({},'模板类型')}}>显示所有类型</a></li>
                                <li><a onClick={() => {this.screenBoth({type : 1})}}>只显示Page模版</a></li>
                                <li><a onClick={() => {this.screenBoth({type : 2})}}>只显示EDM模版</a></li>
                            </ul>
                        </div>
                    </div>
                    <div onClick={() => {this.screenTemplate({orderBy :'[{"createtime":"desc"}]',page_size : 9},2)}}><div className="TypeTitle" style={hColor[2]}>最新模版</div></div>
                    <div onClick={() => {this.screenTemplate({orderBy : '[{"copy_count":"desc"}]',page_size : 18},3)}}><div className="TypeTitle" style={hColor[3]}>最热模版</div></div>
                    <div onClick={() => {this.screenTemplate({isRecommended : true},4)}}><div className="TypeTitle" style={hColor[4]}>模板推荐</div></div>
                </div>

                <div className="model-nav-search">
                    <div className="m1-input-group">
                        <i className="iconfont icon-m1-search"></i>
                        <input type="text" value={this.state.searchValue}
                               onChange={(event) => {this.changeValue(event)}}
                               onBlur={() => {this.searchBlur()}}
                               onKeyUp={(event) => {this.enterUp(event)}}
                               placeholder="输入关键字"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default ModelNav