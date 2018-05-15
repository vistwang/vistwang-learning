import React, { Component } from 'react'
import PropTypes from 'prop-types'

const propTypes = {
    gold: PropTypes.number,
    show: PropTypes.bool,
    code: PropTypes.string,
    onClose: PropTypes.func,
    // 支付成功后执行此函数
    onPay: PropTypes.func
}


class PropDemo extends Component{
    constructor(props){
        super(props);
        this.state = {
            name:'你好我喜欢你啊a',
            inputValue:'是的范德萨'
        };

        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(e){
        console.log(e.target.value)
        this.setState({
            inputValue:e.target.value
        })
    }

    render(){
        return(
            <div>
                <h2>{this.state.name}</h2>
                <div>{this.props.code}</div>
                <input type="text" ref="goodInput" value={this.state.inputValue} readOnly/><br/>
                <input type="text" defaultValue="大幅度发" onChange={this.handleChange}/><br/>
                <select name="" id="">
                    <option value="111">111</option>
                    <option value="222">222</option>
                    <option value="333">333</option>
                    <option value="444">444</option>
                </select>
            </div>
        )
    }
}

PropDemo.propTypes = propTypes

export default PropDemo