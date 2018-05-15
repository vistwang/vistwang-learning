import React,{Component} from 'react'

class LeftBox extends Component{
    constructor(props){
        super(props);
        this.state = {
            name:'sfadfsd'
        }
    }

    render() {
        return (
            <nav id="left-nav" className="left-nav clearfix">
                <div className="nav-com">
                    <ul>
                        <li><a href="#">推荐</a></li>
                        <li><a href="#">最新文章</a></li>
                        <li><a href="#">关键</a></li>
                        <li><a href="#">关键</a></li>
                        <li><a href="#">关键</a></li>
                        <li><a href="#">关键</a></li>
                        <li><a href="#">关键</a></li>
                        <li><a href="#">关键</a></li>
                        <li><a href="#">关键</a></li>
                        <li><a href="#">关键</a></li>
                        <li><a href="#">关键</a></li>
                        <li><a href="#">关键</a></li>
                        <li className="active"><a href="#">最新文章</a></li>
                        <li><a href="#">关键</a></li>
                        <li><a href="#">关键</a></li>
                        <li><a href="#">关键</a></li>
                        <li><a href="#">关键</a></li>
                        <li><a href="#">关键</a></li>
                        <li><a href="#">关键</a></li>
                        <li><a href="#">关键</a></li>
                        <li><a href="#">关键</a></li>
                        <li><a href="#">关键</a></li>
                        <li><a href="#">关键</a></li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default LeftBox;