import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { utils, msg } from '../../../utils'
import { Button, Input, Radio, Modal, Colors, Sizes } from '../../../components/m1ui/'

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
			taxpayerIdentity: '',
			registeredPhone: '',
			registeredAddress: '',
			bank: '',
			bankAccount: '',
			type: 1,

			checkTitle: true,
			checkRecipients: true,
			checkAddress: true,
			checkPhone: true,
			checkTaxpayerIdentity: true,
			checkRegisteredPhone: true,
			checkRegisteredAddress: true,
			checkBank: true,
			checkBankAccount: true,
			
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
				registeredAddress: data.registeredAddress || '',
				registeredPhone: data.registeredPhone || '',
				bank: data.bank || '',
				bankAccount: data.bankAccount || '',
				taxpayerIdentity: data.taxpayerIdentity || '',
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
			taxpayerIdentity: this.state.taxpayerIdentity,
			type: this.state.type
		}

		if(this.state.type === 2) {
			param = {
				...param,
				registeredAddress: this.state.registeredAddress,
				registeredPhone: this.state.registeredPhone,
				bank: this.state.bank,
				bankAccount: this.state.bankAccount,
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
			registeredAddress: e.target.value.trim(),
			checkRegisteredAddress: true
		})
	}
	handleRegisteredPhoneChange = e => {
		this.setState({
			registeredPhone: e.target.value.trim(),
			checkRegisteredPhone: true
		})
	}
	handleAccountNameChange = e => {
		this.setState({
			bank: e.target.value.trim(),
			checkBank: true
		})
	}
	handleAccountNumberChange = e => {
		this.setState({
			bankAccount: e.target.value.trim(),
			checkAccount_phone: true
		})
	}
	handleIdentificationNumOfTaxpayerChange = e => {
		this.setState({
			taxpayerIdentity: e.target.value.trim(),
			checkTaxpayerIdentity: true
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
		const arrBase = ['taxpayerIdentity', 'recipients', 'address', 'phone']
		const arrVat = ['registeredAddress', 'registeredPhone', 'bank', 'bankAccount']
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
		const { type, title, recipients, address, phone, taxpayerIdentity, registeredPhone, registeredAddress, bank, bankAccount,
			checkTitle, checkRecipients, checkAddress, checkPhone, checkTaxpayerIdentity, checkRegisteredPhone, checkRegisteredAddress,
			checkBank, checkBankAccount
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
									value={registeredAddress}
									check={checkRegisteredAddress}
									placeholder="请填写注册地址"
									onChange={this.handleRegisteredAddressChange}
								/>
								<FormField 
									title="注册电话"
									value={registeredPhone}
									check={checkRegisteredPhone}
									placeholder="请填写注册电话"
									onChange={this.handleRegisteredPhoneChange}
								/>
								<FormField 
									title="开户行名称"
									value={bank}
									check={checkBank}
									placeholder="请填写开户行名称"
									onChange={this.handleAccountNameChange}
								/>
								<FormField 
									title="开户账号"
									value={bankAccount}
									check={checkBankAccount}
									placeholder="请填写开户账号"
									onChange={this.handleAccountNumberChange}
								/>
							</div>
							}
							<FormField 
								title="纳税人识别号"
								value={taxpayerIdentity}
								check={checkTaxpayerIdentity}
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