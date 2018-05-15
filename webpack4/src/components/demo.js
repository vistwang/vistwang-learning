import React, { Component } from 'react'
class Demo extends Component{
    constructor(props){
        super(props);
        this.state = {
            data:0,
            title:'我是demo组件'
        }

        this.tick = this.tick.bind(this)
        this.tick_ = this.tick_.bind(this)
    }

    tick(e){
        this.setState({
            data:this.state.data + 1
        });
    }

    tick_(e){
        this.setState({
            data:this.state.data - 1
        });

        console.log(this.props)
    }

    happy(){
        return(
            <div>
                <i>{this.state.title}</i>
            </div>

        )
    }

    /*addEmail = () => {
        console.log(1);
    }*/

    render(){
        var msgs = [];
        this.props.mgs.forEach((item,index) => {
            msgs.push(
                <p key={index}>{item}</p>
            );
        })

        return (
            <div>
                <button onClick={this.tick}>点我加1</button>
                <button onClick={this.tick_}>点我减1</button>
                {this.happy()}
                <h2>{this.state.title}</h2>
                <h2>{this.state.data}</h2>
                {msgs}
            </div>
        )

    }
}

export default Demo;