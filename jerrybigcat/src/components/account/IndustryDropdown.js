import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Dropdown, MenuItem } from '../m1ui'


const propTypes = {
	list: PropTypes.array,
	onSelect: PropTypes.func,
	title: PropTypes.string
}

const defaultProps = {
	list: []
}

class IndustryDropdown extends Component {

	handleSelect = id => {
		const { onSelect } = this.props
		if(onSelect) {
			onSelect(id)
		}
	}

	render() {
		const { list, title, className } = this.props

		const menuList = list.map((item, i) => {
			return <MenuItem key={i} onSelect={this.handleSelect} eventKey={item.id}>{item.name}</MenuItem>
		})

		return (
			<Dropdown
				title={title}
				className={className}
			>	
				{menuList}
			</Dropdown>
		)
	}
}

IndustryDropdown.propTypes = propTypes
IndustryDropdown.defaultProps = defaultProps

export default IndustryDropdown
