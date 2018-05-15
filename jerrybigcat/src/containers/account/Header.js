import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'
import { user } from '../../base/system'

const checkCurrent = (pathname) => {
	return location.pathname.indexOf(pathname) >= 0
}

class Header extends Component {
	render() {
		return (
			<div className="navigator">
				<ul>
					<li><a className={classNames({'active': checkCurrent('/contact')})} href="/contact">用户</a></li>
					<li><a className={classNames({'active': checkCurrent('/campaign')})} href="/campaign">营销活动</a></li>
					<li><a className={classNames({'active': checkCurrent('/setting')})} href="/setting">设置</a></li>
					<li><NavLink className={classNames({'active': (checkCurrent('/account') && user.checkNavClassify('account'))})} to="/summary">账户</NavLink></li>
					<li><NavLink className={classNames({'active': (checkCurrent('/contact') && user.checkNavClassify('finance'))})} to="/recharge">财务</NavLink></li>
				</ul>
			</div>
		)
	}
}

export default Header