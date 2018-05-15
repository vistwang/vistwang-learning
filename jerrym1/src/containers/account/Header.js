import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'
import { user } from '../../base/account'

class Header extends Component {
	render() {
		return (
			<div className="m1-acc-nav">
				<ul>
					<li><NavLink className={classNames({'active': user.checkNavClassify('account')})} to="/summary">账户中心</NavLink></li>
					<li><NavLink className={classNames({'active': user.checkNavClassify('finance')})} to="/recharge">财务中心</NavLink></li>
				</ul>
			</div>
		)
	}
}

export default Header