import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions } from '../../../reducers/setting/field'
import { actions as propertyActions } from '../../../reducers/setting/fieldNewProperty'
import { PropertyScopes } from '../../../base/enums'
import { SysContact } from '../../../base/system'

import ButtonIcon from '../../../components/common/ButtonIcon'
import FieldHeader from '../../../components/setting/field/FieldHeader'
import FieldTabNav from '../../../components/setting/field/FieldTabNav'
import ContactFieldTable from '../../../components/setting/field/ContactFieldTable'
import FieldSettingModal from './FieldSettingModal'

class FieldContainer extends Component {

	componentDidMount() {
		this.setFieldList(this.props.currentScope)
	}

	setFieldList = scope => {
		if((scope === PropertyScopes.CONTACT && this.props.contactFieldList.length === 0) ||
			 (scope === PropertyScopes.COMPANY && this.props.companyFieldList.length === 0)){
			this.props.getFieldList(scope)
		}
	}

	handleOpenModal = e => {
		this.props.resetProperty()
		this.props.setPropertyModal(true)
	}

	handleCloseModal = e => {
		this.props.setPropertyModal(false)
	}

	handleTabSelect = scope => {
		this.props.setTab(scope)
		this.setFieldList(scope)
	}

	handleRemoveProperty = (id) => {
		this.props.deleteProperty(id)
	}

	handleModifyProperty = (id) => {
		const scopeKey = SysContact.filter.propertyScopeKeys[this.props.currentScope]
		const property = this.props[`${scopeKey}FieldList`].find(item => item.id === id)
		this.props.resetProperty(property)
		this.props.setPropertyModal(true)
	}

	handleSearchChange = e => {
		this.props.updateSearchKey(e.target.value)
	}

	handleGetSearchList = (fieldList) => {
		const reg = new RegExp(this.props.searchKey)
		return fieldList.filter(item => (item.label.match(reg) || item.anotherName.match(reg) || item.description.match(reg)))
	}

	render() {
		const { currentScope, searchKey, contactFieldList, companyFieldList, showPropertyModal } = this.props
		const fieldList = currentScope === PropertyScopes.CONTACT ? contactFieldList : companyFieldList
		const showFieldList = searchKey !== '' ? this.handleGetSearchList(fieldList) : fieldList
		return (
			<div className="m1-right">
				<div className="m1-panel">
					<div className="m1-panel-header">
						<h2>字段</h2>
					</div>
					<div className="m1-panel-content">
						<FieldHeader scope={currentScope} onAdd={this.handleOpenModal} searchKey={searchKey} onSearchChange={this.handleSearchChange} />
						<div className="m1-tabs field-container">
							<FieldTabNav scope={currentScope} onSelect={this.handleTabSelect} />
							<div className="m1-tab-content">
								<div className="m1-tab-panel">
									<ContactFieldTable 
										list={showFieldList} 
										scope={currentScope}
										onRemove={this.handleRemoveProperty}
										onModify={this.handleModifyProperty}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<FieldSettingModal 
					show={showPropertyModal}
					onClose={this.handleCloseModal}
					scope={currentScope}
				/>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	currentScope: state.field.fieldGlobal.currentScope,
	showPropertyModal: state.field.fieldGlobal.showPropertyModal,
	contactFieldList: state.field.fieldGlobal.contactFieldList,
	companyFieldList: state.field.fieldGlobal.companyFieldList,
	searchKey: state.field.fieldGlobal.searchKey,
})

const mapDispatchToProps = (dispatch) => ({
	setTab: bindActionCreators(actions.setTab, dispatch),
	setPropertyModal: bindActionCreators(actions.setPropertyModal, dispatch),
	getFieldList: bindActionCreators(actions.getFieldList, dispatch),
	deleteProperty: bindActionCreators(actions.reqDeleteProperty, dispatch),
	resetProperty: bindActionCreators(propertyActions.resetProperty, dispatch),
	updateSearchKey: bindActionCreators(actions.updateSearchKey, dispatch),
})

export default connect(mapStateToProps,mapDispatchToProps)(FieldContainer)