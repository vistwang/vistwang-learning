import React,{Component} from 'react'
import RecomImg1 from '../../img/recommed/RecomImg1.png'

class AsideBox extends Component{
    constructor(props){
        super(props);
        this.state = {
            name:'sfadfsd'
        }
    }

    render() {
        return (
            <aside>
                <div className="right_box">
                    <h3 className="feed_new_tit">
                        <span className="line"></span>
                        <span className="txt">今日推荐</span>
                    </h3>
                    <div className="recommend">
                        <ul className="recom-list">
                            <li>
                                <div className="img_box">
                                    <a href="#">
                                        <img src={RecomImg1} alt=""/>
                                    </a>
                                </div>
                                <div className="content">
                                    <div>
                                        <a href="#">如何用分片技术把7笔/秒链上交易提到2488笔/秒</a>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="img_box">
                                    <a href="#">
                                        <img src={RecomImg1} alt=""/>
                                    </a>
                                </div>
                                <div className="content">
                                    <div>
                                        <a href="#">如何用分片技术把7笔/秒链上交易提到2488笔/秒</a>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="img_box">
                                    <a href="#">
                                        <img src={RecomImg1} alt=""/>
                                    </a>
                                </div>
                                <div className="content">
                                    <div>
                                        <a href="#">如何用分片技术把7笔/秒链上交易提到2488笔/秒</a>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="img_box">
                                    <a href="#">
                                        <img src={RecomImg1} alt=""/>
                                    </a>
                                </div>
                                <div className="content">
                                    <div>
                                        <a href="#">如何用分片技术把7笔/秒链上交易提到2488笔/秒</a>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="img_box">
                                    <a href="#">
                                        <img src={RecomImg1} alt=""/>
                                    </a>
                                </div>
                                <div className="content">
                                    <div>
                                        <a href="#">如何用分片技术把7笔/秒链上交易提到2488笔/秒</a>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="img_box">
                                    <a href="#">
                                        <img src={RecomImg1} alt=""/>
                                    </a>
                                </div>
                                <div className="content">
                                    <div>
                                        <a href="#">如何用分片技术把7笔/秒链上交易提到2488笔/秒</a>
                                    </div>
                                </div>
                            </li>

                        </ul>
                    </div>
                </div>
            </aside>
        )
    }
}

export default AsideBox;