import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import { Icon } from '..//m1ui'

class Menu extends Component {
	render() {
		return (
			<div className="m1-left">
					<ul className="m1-nav">
		        <li><NavLink exact to="/">邮件 <Icon name="unfold-right" /></NavLink></li>
		        <li><NavLink to="/account">邮件账户 <Icon name="unfold-right" /></NavLink></li>
		        <li><NavLink to="/schedule">发送时间表 <Icon name="unfold-right" /></NavLink></li>
		        <li><NavLink to="/field">字段 <Icon name="unfold-right" /></NavLink></li>
		        {/*<li><NavLink to="/link">链接管理 <Icon name="unfold-right" /></NavLink></li>
		        <li><NavLink to="/screening">筛选条件 <Icon name="unfold-right" /></NavLink></li>*/}
		        <li><NavLink to="/event">自定义事件 <Icon name="unfold-right" /></NavLink></li>
		        <li><NavLink to="/push">报告推送 <Icon name="unfold-right" /></NavLink></li>
					</ul>
			</div>
		)
	}
}

export default Menu