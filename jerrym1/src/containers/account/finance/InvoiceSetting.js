import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { utils, msg } from '../../../utils'
import { Button, Input, Radio, Modal, Colors, Sizes } from '../../../components/m1-ui/'

import { 
	getInvoiceSetting,
	saveInvoiceSetting
} from '../../../api/account'

import FormField from '../../../components/account/FormField'

const propTypes = {
	show: PropTypes.bool,
	onClose: PropTypes.func,
	onSave: PropTypes.func,
	invoiceSetting: PropTypes.object
}

class InvoiceSetting extends Component {
	constructor(props) {
		super(props)

		this.state = {
			title: '',
			recipients: '',
			address: '',
			phone: '',
			identification_num_of_taxpayer: '',
			registered_phone: '',
			registered_address: '',
			account_name: '',
			account_number: '',
			type: 1,

			checkTitle: true,
			checkRecipients: true,
			checkAddress: true,
			checkPhone: true,
			checkIdentification_num_of_taxpayer: true,
			checkRegistered_phone: true,
			checkRegistered_address: true,
			checkAccount_name: true,
			checkAccount_number: true,
			
		}
	}

	componentWillMount() {
		this.setInvoiceSetting(this.props.invoiceSetting)
	}

	componentWillReceiveProps(nextProps) {
		this.setInvoiceSetting(nextProps.invoiceSetting)
	}

	setInvoiceSetting = data => {
		if(data) {
			this.setState({
				title: data.title,
				registered_address: data.registered_address || '',
				registered_phone: data.registered_phone || '',
				account_name: data.account_name || '',
				account_number: data.account_number || '',
				identification_num_of_taxpayer: data.identification_num_of_taxpayer || '',
				recipients: data.recipients,
				address: data.address,
				phone: data.phone,
				type: data.type
			})
		}
	}

	saveInvoiceSetting() {
		let param = {
			title: this.state.title,
			recipients: this.state.recipients,
			address: this.state.address,
			phone: this.state.phone,
			identification_num_of_taxpayer: this.state.identification_num_of_taxpayer,
			type: this.state.type
		}

		if(this.state.type === 2) {
			param = {
				...param,
				registered_address: this.state.registered_address,
				registered_phone: this.state.registered_phone,
				account_name: this.state.account_name,
				account_number: this.state.account_number,
			}
		}

		return param
	}

	handleTabChange = e => {
		let type = parseInt(e.target.value)
		this.setState({type})
	}

	handleTitleChange = e => {
		this.setState({
			title: e.target.value.trim(),
			checkTitle: true
		})
	}
	handleRegisteredAddressChange = e => {
		this.setState({
			registered_address: e.target.value.trim(),
			checkRegistered_address: true
		})
	}
	handleRegisteredPhoneChange = e => {
		this.setState({
			registered_phone: e.target.value.trim(),
			checkRegistered_phone: true
		})
	}
	handleAccountNameChange = e => {
		this.setState({
			account_name: e.target.value.trim(),
			checkAccount_name: true
		})
	}
	handleAccountNumberChange = e => {
		this.setState({
			account_number: e.target.value.trim(),
			checkAccount_phone: true
		})
	}
	handleIdentificationNumOfTaxpayerChange = e => {
		this.setState({
			identification_num_of_taxpayer: e.target.value.trim(),
			checkIdentification_num_of_taxpayer: true
		})
	}
	handleRecipientsChange = e => {
		this.setState({
			recipients: e.target.value.trim(),
			checkRecipients: true
		})
	}
	handleAddressChange = e => {
		this.setState({
			address: e.target.value.trim(),
			checkAddress: true
		})
	}
	handlePhoneChange = e => {
		this.setState({
			phone: e.target.value.trim(),
			checkPhone: true
		})
	}

	handleSubmitSave = e => {
		if(!this.checkSubmitSave()) {
			return
		}
		if(this.props.onSave) {
			this.props.onSave(this.saveInvoiceSetting())
		}
	}

	checkSubmitSave() {
		const arrBase = ['identification_num_of_taxpayer', 'recipients', 'address', 'phone']
		const arrVat = ['registered_address', 'registered_phone', 'account_name', 'account_number']
		let arrFull = []

		if(this.state.type === 2) {
			arrFull = ['title', ...arrVat, ...arrBase]
		} else {
			arrFull = ['title', ...arrBase]
		}
		return !arrFull.some(v => {
				const isEmpty = this.state[v].length === 0
				if(isEmpty) {
					const upValue = v.substring(0,1).toUpperCase() + v.substring(1)
					this.setState({
						[`check${upValue}`]: false
					})
				}
				return isEmpty
		})
	}

	render() {
		const { show, onClose } = this.props
		const { type, title, recipients, address, phone, identification_num_of_taxpayer, registered_phone, registered_address, account_name, account_number,
			checkTitle, checkRecipients, checkAddress, checkPhone, checkIdentification_num_of_taxpayer, checkRegistered_phone, checkRegistered_address,
			checkAccount_name, checkAccount_number
		} = this.state
		const titleName = type === 2 ? '单位名称' : '发票抬头'
		return (
			<Modal show={show} onClose={onClose} backdrop="static" style={{width:'600px'}}>
				<Modal.Header>
				 	<Modal.Title>发票信息设置</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<ul className="invoice-setting-tabs">
					<li><Radio name="invoice_type" value="1" checked={type === 1} onChange={this.handleTabChange}>普通发票</Radio></li>
					<li><Radio name="invoice_type" value="2" checked={type === 2} onChange={this.handleTabChange}>增值税发票</Radio></li>
					</ul>
					<div className="invoice-form-content">
						<div className="m1-form">
							<FormField 
								title={titleName} 
								value={title}
								check={checkTitle}
								placeholder={`请填写${titleName}`}
								onChange={this.handleTitleChange}
							/>
							{(type === 2) &&
							<div className="vat">
								<FormField 
									title="注册地址"
									value={registered_address}
									check={checkRegistered_address}
									placeholder="请填写注册地址"
									onChange={this.handleRegisteredAddressChange}
								/>
								<FormField 
									title="注册电话"
									value={registered_phone}
									check={checkRegistered_phone}
									placeholder="请填写注册电话"
									onChange={this.handleRegisteredPhoneChange}
								/>
								<FormField 
									title="开户行名称"
									value={account_name}
									check={checkAccount_name}
									placeholder="请填写开户行名称"
									onChange={this.handleAccountNameChange}
								/>
								<FormField 
									title="开户账号"
									value={account_number}
									check={checkAccount_number}
									placeholder="请填写开户账号"
									onChange={this.handleAccountNumberChange}
								/>
							</div>
							}
							<FormField 
								title="纳税人识别号"
								value={identification_num_of_taxpayer}
								check={checkIdentification_num_of_taxpayer}
								placeholder="请填写纳税人识别号"
								onChange={this.handleIdentificationNumOfTaxpayerChange}
							/>
							<FormField 
								title="收件人"
								value={recipients}
								check={checkRecipients}
								placeholder="请填写收件人"
								onChange={this.handleRecipientsChange}
							/>
							<FormField 
								title="收件地址"
								value={address}
								check={checkAddress}
								placeholder="请填写收件地址"
								onChange={this.handleAddressChange}
							/>
							<FormField 
								title="联系电话"
								value={phone}
								check={checkPhone}
								placeholder="请填写联系电话"
								onChange={this.handlePhoneChange}
							/>
						</div>
					</div>

				</Modal.Body>
				<Modal.Footer>
					<Button color={Colors.PRIMARY} onClick={this.handleSubmitSave} >确认</Button>
				</Modal.Footer>
			</Modal>
		)
	}
}

InvoiceSetting.propTypes= propTypes

export default InvoiceSetting