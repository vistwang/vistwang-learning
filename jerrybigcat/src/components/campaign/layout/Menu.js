import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import { Icon } from '../../m1ui'
import { utils } from '../../../utils'

class Left extends Component {
	render() {
		const cid = utils.getSearchParams(this.props.history.location.search).get('cid')
		return (
			<div className="m1-left">
					<ul className="m1-nav">
		        <li><NavLink exact to={'/stat?cid=' + cid}>统计 <Icon name="unfold-right" /></NavLink></li>
		        <li><NavLink to={'/inbox?cid=' + cid}>收件箱 <Icon name="unfold-right" /></NavLink></li>
		        <li><NavLink to={'/process?cid=' + cid}>自动流程 <Icon name="unfold-right" /></NavLink></li>
		        <li><NavLink to={'/customer?cid=' + cid}>用户 <Icon name="unfold-right" /></NavLink></li>
		        <li><NavLink to={'/setting?cid=' + cid}>设置 <Icon name="unfold-right" /></NavLink></li>
					</ul>
			</div>
		)
	}
}

export default Left