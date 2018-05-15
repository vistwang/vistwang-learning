import React,{Component} from 'react'
import Ad1 from '../../img/ad/ad1.jpg'
import Ad2 from '../../img/ad/ad2.jpg'

class AdBox extends Component{
    constructor(props){
        super(props);
        this.state = {
            name:'sfadfsd'
        }
    }

    render() {
        return (
            <div className="banner-ad-box">
                <div className="J-adv"><img src={Ad1} alt=""/></div>
                <div className="J-adv"><img src={Ad2} alt=""/></div>
            </div>
        )
    }
}

export default AdBox;