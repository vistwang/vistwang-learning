import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions } from '../../../reducers/setting/fieldNewProperty'
import { PropertyScopes, PropertyTypes } from '../../../base/enums'

import { Button, Modal, Dropdown, Colors } from '../../../components/m1ui'
import { SysContact } from '../../../base/system'

import FieldInputItem from '../../../components/setting/field/FieldInputItem'
import FieldDropdownItem from '../../../components/setting/field/FieldDropdownItem'

const { Header, Title, Body, Footer } = Modal


class FieldSettingModal extends Component {

	handleLabelChange = e => {
		const label = e.target.value
		this.props.updateLabel(label)
		if(label.trim().length > 0) {
			this.props.setLabelError('')
		}
	}

	handleAnotherNameChange = e => {
		this.props.updateAnotherName(e.target.value)
	}

	handleTypeSelect = (type) => {
		this.props.updateType(parseInt(type))
	}

	handleDescriptionChange = e => {
		this.props.updateDescription(e.target.value)
	}

	handleRemoveItem = (index) => {
		this.props.removeItem(index)
	}

	handleUpdateItem = (index, item) => {
		this.props.updateItem(index, item)
	}

	handleAddItem = (item) => {
		this.props.addItem(item)
	}

	handleSave = (e) => {
		const label = this.props.label.trim()

		if(label.length === 0) {
			this.props.setLabelError('字段名不能空')
			return
		}

		const {id, anotherName, type, scope, description, items} = this.props

		let property = {
			label: label,
			anotherName: anotherName.trim(),
			type,
			description: description.trim(),
		}

		if(id) {
			property.id = id
		}
		if(type === PropertyTypes.MULTISELECT) {
			const propertyItems = items ? items.filter(item => item.value.trim() !== '') : []
			property.items = propertyItems
		}

		this.props.saveProperty(property, scope)
	}

	render() {
		const { id, show, onClose, label, anotherName, type, scope, description, items, labelError } = this.props
		return (
			<Modal
				show={show}
				onClose={onClose}
				style={{width: '520px'}}
			>
				<Header>
					<Title>{id === '' ? '添加' : '编辑' }{SysContact.filter.propertyScopes[scope]}字段</Title>
				</Header>
				<Body>
					<div className="m1-form field-setting-form">
						<FieldInputItem
							label="字段名称"
							placeholder="请输入字段名称"
							value={label}
							error={labelError}
							onChange={this.handleLabelChange}
						/>
						<FieldInputItem
							label="别名"
							placeholder="请输入字段别名"
							value={anotherName}
							onChange={this.handleAnotherNameChange}
						/>
						<FieldDropdownItem
							label="字段类型"
							placeholder="请选择字段类型"
							value={type}
							items={items}
							onSelect={this.handleTypeSelect}
							onRemoveItem={this.handleRemoveItem}
							onUpdateItem={this.handleUpdateItem}
							onAddItem={this.handleAddItem}
						/>
						<FieldInputItem
							label="描述"
							placeholder="用一段进行描述"
							value={description}
							onChange={this.handleDescriptionChange}
						/>
					</div>
				</Body>
				<Footer>
					<Button onClick={onClose} >取消</Button>
					<Button color={Colors.PRIMARY} onClick={this.handleSave} >确定</Button>
				</Footer>
			</Modal>
		)
	}
}

const mapStateToProps = (state) => {
	const {id, label, anotherName, type, description, items, labelError} = state.field.newProperty
	return {
		id,
		label,
		anotherName,
		type,
		description,
		items,
		labelError
	}
}

const mapDispatchToProps = (dispatch) => ({
	updateLabel: bindActionCreators(actions.updateLabel, dispatch),
	updateAnotherName: bindActionCreators(actions.updateAnotherName, dispatch),
	updateType: bindActionCreators(actions.updateType, dispatch),
	updateDescription: bindActionCreators(actions.updateDescription, dispatch),
	addItem: bindActionCreators(actions.addItem, dispatch),
	updateItem: bindActionCreators(actions.updateItem, dispatch),
	removeItem: bindActionCreators(actions.removeItem, dispatch),
	saveProperty: bindActionCreators(actions.saveProperty, dispatch),
	setLabelError: bindActionCreators(actions.setLabelError, dispatch),
})

export default connect(mapStateToProps,mapDispatchToProps)(FieldSettingModal)