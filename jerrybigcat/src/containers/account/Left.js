import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import { user } from '../../base/system'

class Left extends Component {
	render() {
		return (
			<div className="m1-left">
				{
					user.checkNavClassify('account') &&
					<ul className="m1-nav">
		        {user.navMenu.accounts.map((item,i) => {
		        	const isDefault = item.key === 'summary' && user.isNavDefault()
		        		return <li key={i}><NavLink className={isDefault ? 'active' : ''} to={`/${item.key}`}>{item.name} <i className="iconfont icon-m1-unfold-right"></i></NavLink></li>
		        	})}
					</ul>
				}
				{
					user.checkNavClassify('finance') &&
					<ul className="m1-nav">
		        {
		        	user.navMenu.finances.map((item, i) => {
		        		return <li key={i}><NavLink to={`/${item.key}`}>{item.name} <i className="iconfont icon-m1-unfold-right"></i></NavLink></li>
		        	})
		        }
					</ul>
				}
				
			</div>
		)
	}
}

export default Left