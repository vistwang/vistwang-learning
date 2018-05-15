import React, {Component} from 'react'
import {Carousel,Nav,NavItem,NavDropdown,MenuItem} from 'react-bootstrap'
import P1 from '../img/p1.png'
import P2 from '../img/p2.jpg'
import P3 from '../img/p3.jpg'

class Caro extends Component{
    constructor(props){
        super(props);
        this.state = {
            name:'sfadfsd'
        }
    }

    render(){
        return(
            <div className="carousel-box">
            <Carousel>
                <Carousel.Item>
                    <img width={760}  alt="760x300" src={P1} />
                    <Carousel.Caption>
                        <h3>程序员交友网站</h3>
                        <p>为系统而生，为框架而死，为debug奋斗一辈子 </p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img width={760}  alt="760x300" src={P2} />
                    <Carousel.Caption>
                        <h3>程序员交友网站</h3>
                        <p>吃符号的亏，上大小写的当，最后死在需求上！</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img width={760}  alt="760x300" src={P3} />
                    <Carousel.Caption>
                        <h3>程序员交友网站</h3>
                        <p>足不出户一台电脑打天下，窝宅在家两只巧手定乾坤</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            </div>
        )
    }
}

export default Caro;