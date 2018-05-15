import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Button, Tag, Text, Colors, Sizes } from '../../../components/m1-ui/'
import { utils, msg } from '../../../utils'
import { 
	getInvoiceList,
	getApplyInvoiceList,
	getInvoiceSetting,
	saveInvoiceSetting,
	applyInvoice

} from '../../../api/account'
import { user } from '../../../base/account'

import InvoiceApply from './InvoiceApply'
import InvoiceSetting from './InvoiceSetting'
import InvoiceDetail from './InvoiceDetail'

class Invoice extends Component {
	constructor(props) {
		super(props)

		this.isInvoiceApply = false
		// 选中需要申请的发票
		this.selectApplyInvoices = []

		this.state ={
			invoices: [],
			applyInvoices: [],
			invoiceSetting: null,

			// 查看单一发票详情
			invoiceDetail: {},

			showInvoiceApply: false,
			showInvoiceSetting: false,
			showInvoiceDetail: false,

		}
	}

	componentDidMount() {
		this.getInvoiceList()
	}

	getInvoiceList = () => {
		msg.loading()
		getInvoiceList().then(this.setInvoiceList)
	}

	setInvoiceList = (result) => {
		msg.close()
		if(result.success) {
			this.setState({
				invoices: result.data
			})
		} else {
			msg.info(result.data)
		}
	}

	setApplyInvoiceList = result => {
		msg.close()
		if(result.success) {
			this.setState({
				showInvoiceApply: true,
				applyInvoices: result.data
			})
		} else {
			msg.info(result.data)
		}
	}

	setInvoiceSetting = result => {
		if(result.success) {
			this.setState({
				invoiceSetting: result.data
			})
		} else {
			msg.info(result.data)
		}
	}

	handleInvoiceApplyOpen = e => {
		this.isInvoiceApply = false
		msg.loading()
		getApplyInvoiceList().then(this.setApplyInvoiceList)
	}

	handleInvoiceApplyClose = e => {
		this.setState({
			showInvoiceApply: false
		})
	}

	handleInvoiceSettingOpen = e => {
		this.setState({
			showInvoiceSetting: true
		})
		if(!this.state.invoiceSetting){
			getInvoiceSetting().then(this.setInvoiceSetting)
		}
	}
	handleInvoiceSettingClose = e => {
		this.setState({
			showInvoiceSetting: false
		})
		if(this.isInvoiceApply){
			this.isInvoiceApply = false
			this.selectApplyInvoices = []
		}
	}

	handleInvoiceDetailOpen = id => {
		const invoiceDetail = this.state.invoices.find(item => id === item.id)
		this.setState({
			invoiceDetail,
			showInvoiceDetail: true
		})
	}
	handleInvoiceDetailClose = e => {
		this.setState({
			invoiceDetail: {},
			showInvoiceDetail: false
		})
	}

	handleInvoiceSettingSave = setting => {
		saveInvoiceSetting(setting).then(result => {
			if(result.success) {
				this.setState({
					invoiceSetting: setting
				})
				if(this.isInvoiceApply) {
					this.isInvoiceApply = false
					// this.handleInvoiceApplyOpen()
					this.applyInvoice()
				} else {
					msg.info('发票信息保存成功')
				}
				this.handleInvoiceSettingClose()
			} else {
				msg.info(result.data)
			}
		})
	}

	handleInvoiceApply = list => {
		const { invoiceSetting } = this.state

		this.isInvoiceApply = true
		this.selectApplyInvoices = list

		if(invoiceSetting) {
				this.handleInvoiceApplyClose()
				this.handleInvoiceSettingOpen()
		} else {
			getInvoiceSetting().then(result => {
				if(result.success) {
					this.setInvoiceSetting(result)
					this.handleInvoiceApplyClose()
					this.handleInvoiceSettingOpen()
				}
			})
		}
	}

	applyInvoice = list => {
		list = list || this.selectApplyInvoices
		const setting = this.state.invoiceSetting
		let invoices = []
		list.forEach(item => {
			let invoice = {
				trade_id: item.trade_id,
				title: setting.title,
				recipients: setting.recipients,
				address: setting.address,
				phone: setting.phone
			}
			if(setting.type === 2) {
				invoice.identification_num_of_taxpayer = setting.identification_num_of_taxpayer
				invoice.registered_phone = setting.registered_phone
				invoice.registered_address = setting.registered_address
				invoice.account_name = setting.account_name
				invoice.account_number = setting.account_number
			}

			invoices.push(invoice)
		})

		applyInvoice(invoices).then(result => {
			if(result.success) {
				msg.info('发票申请成功')
				this.getInvoiceList()
				this.handleInvoiceApplyClose()
			} else {
				msg.info(result.data)
			}
		})
	}


	renderTable() {
		const { invoices } = this.state
		let invoiceList
		if(invoices.length === 0) {
			invoiceList = <tr><td colSpan="5"><div className="empty-list">您还没有发票信息</div></td></tr>
		} else {
			invoiceList = invoices.map(item => {
				const status = user.getInvoiceStatus(item.status)
				return (<tr key={item.id}>
									<td>{item.trade_id}</td>
									<td>{item.total_fee}</td>
									<td>{utils.formatDate(item.createtime)}</td>
									<td><Text color={status.color} size={Sizes.SMALL}>{status.name}</Text></td>
									<td><a onClick={e => this.handleInvoiceDetailOpen(item.id)}>详情</a></td>
								</tr>)
			})
		}
		
		return (<table className="m1-table">
					<thead>
						<tr>
							<th style={{width: '28%'}}>账单编号</th>
							<th style={{width: '18%'}}>金额</th>
							<th style={{width: '18%'}}>时间</th>
							<th style={{width: '18%'}}>状态</th>
							<th style={{width: '18%'}}>查看详情</th>
						</tr>
					</thead>
						<tbody>
							{invoiceList}
						</tbody>
					</table>)
	}

	render() {
		return (
			<div className="m1-panel">
				<div className="m1-panel-header">
					<div className="m1-row">
						<div className="m1-col-2"><h2>发票设置</h2></div> 
						<div className="m1-col-10" style={{textAlign:'right'}}>
							<Button onClick={this.handleInvoiceApplyOpen}>申请发票</Button>
							<Button color={Colors.PRIMARY} onClick={this.handleInvoiceSettingOpen}>发票设置</Button>
						</div>
					</div>
				</div>
				<div className="m1-panel-content">
					<div className="m1-row">
						{this.renderTable()}
					</div>
				</div>
				{this.state.showInvoiceApply && 
					<InvoiceApply 
						show={this.state.showInvoiceApply} 
						onClose={this.handleInvoiceApplyClose} 
						applyInvoices={this.state.applyInvoices} 
						onApply={this.handleInvoiceApply}
					/>}
				{this.state.showInvoiceSetting && 
					<InvoiceSetting 
						show={this.state.showInvoiceSetting} 
						onClose={this.handleInvoiceSettingClose} 
						onSave={this.handleInvoiceSettingSave}
						invoiceSetting={this.state.invoiceSetting}
					/>}
				{this.state.showInvoiceDetail && 
					<InvoiceDetail
						show={this.state.showInvoiceDetail}
						onClose={this.handleInvoiceDetailClose}
						detail={this.state.invoiceDetail}
					/>
				}
			</div>
		)
	}
}

export default Invoice