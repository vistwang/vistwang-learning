import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { Dropdown, MenuItem, Icon, Colors } from '../../m1ui'
import { PropertyTypes } from '../../../base/enums'
import { SysContact } from '../../../base/system' 
import ButtonIcon from '../../common/ButtonIcon'

const propTypes = {
	label: PropTypes.string,
	value: PropTypes.number,
	items: PropTypes.array,
	onSelect: PropTypes.func,
	onAddItem: PropTypes.func,
	onUpdateItem: PropTypes.func,
	onRemoveItem: PropTypes.func,
}

const defaultProps = {
	items: []
}

const getMenuItems = ({onSelect}) => {
	const menuItems = []
	const propertyTypes = SysContact.filter.propertyTypes
	for(let p in propertyTypes) {
		menuItems.push(<MenuItem key={p} eventKey={p} onSelect={onSelect} >{propertyTypes[p]}</MenuItem>)
	}
	return menuItems
}

const MultiItems = ({items, onRemoveItem, onUpdateItem}) => {
	items = items || []
	return (
		<div className="m1-form-content">
			<ul className="multi-item">
			{items.map((item, i) => {
				return (
					<li key={i}>
						<input 
							className="m1-form-input" 
							value={item.value} 
							placeholder="添加选项"
							onChange={e => onUpdateItem(i, {value: e.target.value})} 
						/>
						<Icon name="delete-o" onClick={e => onRemoveItem(i)} />
					</li>
				)
			})}
			</ul>
		</div>
	)
}

const FieldDropdownItem = ({label, className, value, onAddItem, ...props}) => {
	const isMultiSelect = value === PropertyTypes.MULTISELECT
	return (
		<div className="m1-form-row field-type">
			<label className="m1-form-label">{label}</label>
			<div className="m1-form-content">
				<Dropdown
					title={SysContact.filter.propertyTypes[value] || '添加选项'}
					className="m1-dropdown-form"
					style={{width: '100%'}}
				>
					{getMenuItems(props)}
				</Dropdown>
				{isMultiSelect && <Icon name="add-to" onClick={e => onAddItem({value: ''})} />}
			</div>
			{isMultiSelect && <MultiItems {...props} />}
		</div>
	)
}

FieldDropdownItem.propTypes = propTypes
FieldDropdownItem.defaultProps = defaultProps


export default FieldDropdownItem