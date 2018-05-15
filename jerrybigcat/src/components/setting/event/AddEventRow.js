import React, {Component} from 'react'
import PropTypes from 'prop-types'

import { Dropdown, MenuItem } from '../../m1ui'

import { SysContact } from '../../../base/system'

const eventTypes = SysContact.filter.eventTypes

const handleUpdate = (onUpdateEvent, item, key, value) => {
	
}

class AddEventRow extends Component {
	handleUpdate = (key, value) => {
		const {eventItem, onUpdateEvent} = this.props
		const event = {
			...eventItem,
			[key]: value
		}
		onUpdateEvent(event)
	}

	handleChangeLazy = (key, value) => {
		const {eventItem, onChangeLazy} = this.props

		const event = {
			...eventItem,
			[key]: value
		}
		onChangeLazy(event)
	}

	handleSelectType = (value) => {
		this.handleUpdate('type', value)
		this.handleChangeLazy('type', value)
	}

	render() {
		const {eventItem, onUpdateEvent} = this.props
		let types = []
		for(let key in eventTypes) {
			if(key !== '0'){
				types.push(
					<MenuItem 
						key={key} 
						eventKey={key} 
						onSelect={this.handleSelectType}
					>
						{eventTypes[key]}
					</MenuItem>
				)
			}
		}

		return (
			<tr>
				<td style={{width: '20%'}}> 
					<input 
						className="m1-form-input" 
						value={eventItem.name} 
						onChange={e => this.handleUpdate('name', e.target.value)} 
						onBlur={e => this.handleChangeLazy('name',e.target.value)}
					/>
				</td>
				<td style={{width: '20%'}}>
					<input 
						className="m1-form-input" 
						value={eventItem.uniqueId} 
						onChange={e => this.handleUpdate('uniqueId', e.target.value)} 
						onBlur={e => this.handleChangeLazy('uniqueId',e.target.value)}
					/>
				</td>
				<td style={{width: '40%'}}>
					<input 
						className="m1-form-input" 
						value={eventItem.description} 
						onChange={e => this.handleUpdate('description', e.target.value)} 
						onBlur={e => this.handleChangeLazy('description',e.target.value)}
					/>
				</td>
				<td>
					<Dropdown
						title={eventTypes[eventItem.type]}
						className="m1-dropdown-form"
					>
						{types}
					</Dropdown>
				</td>
			</tr>
		)
	}
}

export default AddEventRow