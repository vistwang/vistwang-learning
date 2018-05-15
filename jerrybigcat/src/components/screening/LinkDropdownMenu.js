import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Dropdown, DropdownMenu, MenuItem, MenuItemGroup, Input, Icon } from '../m1ui'
import InputSearch from '../common/InputSearch'
import ButtonIcon from '../common/ButtonIcon'

const Subnav = ({links, onSelect}) => {
	return (
		<ul className="m1-subnav">
			{links.map((link, index) => {
				return (
					<MenuItem canClose key={index} eventKey={link.id} onSelect={onSelect} >
						<ButtonIcon name="group" /> 
						<div className="content">
							<h3>{link.link_name}</h3>
							<p>{link.short_link}</p>
						</div>
					</MenuItem>
				)
			})
			}
		</ul>
	)
}

class LinkDropdownMenu extends Component {
	render() {
		const {emails, links, isStatic, onSelect} = this.props
		const MenuComponent = !isStatic ? DropdownMenu : 'div'
		return (
			<MenuComponent>
				<div className="m1-dropdown-menu-header">
					<InputSearch
						className="right"
						placeholder="搜索关键词"
					/>
				</div>
				<div className="m1-dropdown-menu-content">
					<ul>
						{emails.map((item, i) => {
							const task = item.task || {}
							const emailLinks = links.filter(link => link.task_id === task.task_id) || []
							return (
								<MenuItemGroup key={i}>
									<a>
										<Icon name="folder-close" /> {task.subject || '暂无邮件主题'} <Icon name="unfold-down" />
									</a>
									<Subnav links={emailLinks} onSelect={linkId => onSelect(task.task_id, linkId)} />
								</MenuItemGroup>
							)
						})}
					</ul>
				</div>
			</MenuComponent>
		)
	}
}

export default LinkDropdownMenu