
import React,{Component} from 'react'

import {
    getCategory,
    getRecommendList
} from '../../api/templates'

import defaultCover from '../../assets/images/template/advertCoverDemo.jpg'

class Advert extends Component{
    constructor(props) {
        super(props)

        this.isRequest = false
        this.state = {
            data:[]
        }
    }

    componentWillReceiveProps(nextProps){
        //获取模板的总数量
        if(nextProps.category !== this.props.category) {
            let data = nextProps.category
            this.setState({
                data
            },function () {
                //console.log('模板的总数量')
            })
        }

    }

    componentDidMount(){
        /*const self=this
        getCategory().then(result => {
            if(result.success){
               const data = result.data

               self.setState({
                   data
               },function () {
                   //console.log('推荐主题加载模板列表成功了');
               })

           }
       });*/

    }
    //跳转到主题链接
    handelSelect(it){
        let self=this
        getRecommendList(it).then(result => {
            if(result.success){
                m1.loading(0.3);
                const currentData = result.data
                //数据传递到父组件
                self.props.transferMsg(currentData)

                //存储全局搜索的对象
                window.filter = it
            }
        })


    }
    //数据加载渲染
    getTemplate(){
       if(this.state.data.length > 0){
           return (
               this.state.data.map((item,i)=>{
                   if(item.is_theme){//上线替换 item.is_theme
                       return (
                           <div key={i} onClick={()=>this.handelSelect({cid:item.c_id})}>
                               <img src={item.cover_image ? item.cover_image : defaultCover} alt=""/>
                               <span>{item.name}</span>
                           </div>
                       )
                   }
               })
           )
       }
    }
    render(){
        return (
            <div className="advert-list">
                {this.getTemplate()}
            </div>
        )
    }
}

export default Advert