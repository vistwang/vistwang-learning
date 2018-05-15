import React,{Component} from 'react'
import Carousel from '../../components/carousel'

class RDCarousel extends Component{
    constructor(props){
        super(props);
        this.state = {
            name:'sfadfsd'
        }
    }

    render() {
        return (
            <div>
                <Carousel/>
            </div>
        )
    }
}

export default RDCarousel;