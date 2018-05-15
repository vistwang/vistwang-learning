import React,{Component} from 'react'
import {Button,Icon} from 'semantic-ui-react'
//
//import 'semantic-ui-css/semantic.min.css'

class Sement extends Component{
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
                <Button size='small' color='green'>
                    <Icon name='download' />
                    Download
                </Button>
            </div>
        )
    }
}

export default Sement


