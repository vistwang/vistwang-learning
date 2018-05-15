import React, {Component} from 'react'
import Adds from '../components/demo'
import Header from '../components/header/header'
import Propdemo from '../components/demoprops'
import Life from '../components/lifeCycle'
import  Sement from '../components/sement'
import  Bootstp from '../components/bootstp'
import Media from '../components/mediaText'
import LeftBox from '../components/left/LeftContent'
import RightBox from '../components/right/RightContent'

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            msg:[
                '我会搬砖',
                '我会花式搬砖',
                '我搬砖技术一流'
            ],
            code:'I love javascript - react'
        }
    }

    render(){
        return(
            <div>
                <Header/>
                <div className="container clearfix">
                    <LeftBox/>
                    <RightBox/>
                    <Media/>
                    <h1>我是header组件</h1>
                    <code>
                        I am a coder
                        I like javascript
                        I never mind!
                    </code>

                    <Adds name="我是demo组件的name" mgs={this.state.msg} />

                    <Propdemo code={this.state.code} />

                    <Life/>

                    <Sement/>

                    <Bootstp/>

                </div>

            </div>
        )
    }
}

export default Home;


