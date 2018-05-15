import React,{Component} from 'react'
import Adver from './Ad'
import RDCarousel from './RDCarousel'
import AsideBox from './Aside'

class RightBox extends Component{
    constructor(props){
        super(props);
        this.state = {
            name:'1111'
        }
    }

    render() {
        return (
            <div className="clear-float">
                <div className="right-content">
                    <main>
                        <Adver/>
                        <RDCarousel/>
                    </main>
                    <AsideBox/>
                </div>
            </div>

        )
    }
}

export default RightBox;