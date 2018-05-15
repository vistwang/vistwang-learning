import React, { Component } from 'react'
import classNames from 'classnames'

import { Dropdown, MenuItem } from '../m1ui'

const checkCurrent = (pathname) => {
	return window.location.pathname.indexOf(pathname) >= 0
}

class Navigator extends Component {
	render() {
		const { name, email, avatar, ...props } = this.props
		return (
			<div className="navigator">
				<div className="left">
					<div className="logo">
						<img src="" alt=""/>
					</div>
					<div className="company">
						<Dropdown
							title="上海梅花信息股份有限公司"
							className="m1-dropdown-form"
						>
							<MenuItem className="active" > <span className="dot"></span>上海梅花信息股份有限公司</MenuItem>
							<MenuItem> <span className="dot"></span>上海万企明道软件有限公司</MenuItem>
						</Dropdown>
					</div>
				</div>
				<ul>
					<li><a className={classNames({'active': checkCurrent('/contact')})} href="/contact">客户</a></li>
					<li><a className={classNames({'active': checkCurrent('/campaign')})} href="/campaign">营销活动</a></li>
			</ul>
				<div className="right">
					<ul>
						<li><a></a></li>
						<li><a></a></li>
						<li><a></a></li>
						<li>
							<div className="account-base">
								<a className="avatar" ><img src={ avatar }/></a>
								<div className="account-menu">
									<ul>
										<li className="account-info">
											<div className="wrap">
												<h2 className="username">{name}</h2>
												<p className="email">{email}</p>
											</div>
										</li>
										<li><a href="/account">账户中心</a></li>
										<li><a href="/account/#/recharge">财务中心</a></li>
										<li><a href="/setting">系统设置</a></li>
										<li className="logout"><a onClick={props.onLogout} ><span className="wrap">安全登出</span></a></li>
									</ul>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		)
	}
}

export default Navigator