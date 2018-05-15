import React, {Component} from 'react'
import {Navbar,Nav,NavItem,NavDropdown,MenuItem} from 'react-bootstrap'

class Header extends Component{
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
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#brand">面向过程</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1} href="#">
                            男生
                        </NavItem>
                        <NavItem eventKey={2} href="#">
                            女生
                        </NavItem>
                        <NavDropdown eventKey={3} title="联系方式" id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1}>微信</MenuItem>
                            <MenuItem eventKey={3.2}>微博</MenuItem>
                            <MenuItem eventKey={3.3}>邮箱</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={3.3}>手机</MenuItem>
                        </NavDropdown>
                    </Nav>
                    <Nav pullRight>
                        <NavItem eventKey={1} href="#">
                            派对
                        </NavItem>
                        <NavItem eventKey={2} href="#">
                            登录
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Header;