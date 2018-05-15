import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Dropdown, DropdownMenu, MenuItem, MenuItemGroup, Input, Icon } from '../m1ui'
import InputSearch from '../common/InputSearch'

const Subnav = ({relations, onSelect}) => {
	return (
		<ul className="m1-subnav">
			{relations.map((relation, relationIndex) => {
				return (
					<MenuItem canClose key={relationIndex} eventKey={relation.id} onSelect={onSelect} ><Icon name="group" /> {relation.name} <span className="count">{relation.size}</span></MenuItem>
				)
			})
			}
		</ul>
	)
}

class ContactGroupMenu extends Component {

	render() {
		const {queryTermsGroups, isStatic, onSelect} = this.props
		const MenuComponent = !isStatic ? DropdownMenu : 'div'
		return (
			<MenuComponent>
				<div className="m1-dropdown-menu-header menu-not-close">
					<InputSearch
						className="right"
						placeholder="搜索关键词"
					/>
				</div>
				<div className="m1-dropdown-menu-content">
					<ul>
						{queryTermsGroups.list.map((item, i) => {
							const relations = item.relations || []
							return (
								<MenuItemGroup key={i}>
									<a onClick={e => console.log(item.id)}>
										<Icon name="folder-close" /> {item.name} <Icon name="unfold-down" />
									</a>
									<Subnav relations={relations} onSelect={id => onSelect(id)} />
								</MenuItemGroup>
							)
						})}
					</ul>
				</div>
			</MenuComponent>
		)
	}
}

export default ContactGroupMenu