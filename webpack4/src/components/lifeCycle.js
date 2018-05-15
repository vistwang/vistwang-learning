import React,{Component} from 'react'


class Life extends Component{
    constructor(props){
        super(props)

        this.state={
            titleMissage:1
        }
    }

    componentWillMount(){
        console.log('componentWillMount')
    }

    componentDidMount(){
        console.log('componentDidMount')
        let self = this
        // setInterval(() => {
        //     self.setState({
        //         titleMissage:self.state.titleMissage + 1
        //     })
        // },1000)
    }

    //删除组件
    componentWillUnmount(){

    }

    componentWillReceiveProps(){

    }

    //跟新
    shouldComponentUpdate(){

    }

    componentWillUpdate(){

    }

    componentDidUpdate(){

    }


    render(){
        return(
            <div>
                <h2>hello life cycle</h2>
                <div>content：{this.state.titleMissage}</div>
            </div>

        )
    }
}

export default Life

