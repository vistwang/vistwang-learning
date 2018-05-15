import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { utils, msg } from '../../../utils'
import { Button, Text, Checkbox, Modal, Colors, Sizes } from '../../../components/m1ui/'

const propTypes = {
	applyInvoice: PropTypes.array,
	show: PropTypes.bool,
	onClose: PropTypes.func,
	onApply: PropTypes.func
}

class InvoiceApply extends Component {
	constructor(props) {
		super(props)

		this.minMoney = 500

		this.state = {
			applyInvoices: [],
			selectTotalMoney: 0
		}
	}

	setInvoiceApplyList(applyInvoices) {
		this.setState({
			applyInvoices: applyInvoices
		})
	}

	componentDidMount() {
		this.setInvoiceApplyList(this.props.applyInvoices)
	}

	handleInvoiceChecked = e => {
		const id = parseInt(e.target.value)
		const checked = e.target.checked
		const applyInvoices = this.state.applyInvoices.map(item => {
			if(id === item.id) {
				item.checked = checked
			}
			return item
		})
		this.setState({applyInvoices})
		this.computedTotalMoney()
	}

	handleInvoiceApplyClick = e => {
		const invoices = this.state.applyInvoices.filter(item => !!item.checked)
		if(invoices.length === 0) {
			msg.info('请选择需要申请的发票')
			return
		}
		if(this.props.onApply) {
			this.props.onApply(invoices)
		}
	}

	computedTotalMoney = () => {
		let selectTotalMoney = 0
		// const invoices = this.state.applyInvoices.filter(item => !!item.checked)
		this.state.applyInvoices.forEach(item => {
			if(!!item.checked) {
				selectTotalMoney += item.totalFee
			}
		})
		this.setState({selectTotalMoney})
	}

	renderTable() {
		const { applyInvoices } = this.state
		let invoiceList
		if(applyInvoices.length === 0) {
			invoiceList = <tr><td colSpan="5"><div className="empty-list">您还没有可申请发票信息</div></td></tr>
		} else {
			invoiceList = applyInvoices.map(item => {
				return (<tr key={item.id}>
									<td><Checkbox value={item.id} checked={!!item.checked} onChange={this.handleInvoiceChecked} /></td>
									<td>{item.tradeNo}</td>
									<td>{item.totalFee}</td>
									<td>{utils.formatDateTime(item.gmtCreate)}</td>
									<td>{item.description}</td>
								</tr>)
			})
		}
		return (
			<table className="m1-table">
				<thead>
					<tr>
						<th style={{width: '1%'}}></th>
						<th>账单编号</th>
						<th>金额</th>
						<th>时间</th>
						<th>描述</th>
					</tr>
				</thead>
					<tbody>
						{invoiceList}
					</tbody>
			</table>
		)
	}

	render() {
		const { show, onClose } = this.props
		const canApply = this.state.selectTotalMoney >= this.minMoney
		return (
			<Modal show={show} onClose={onClose} backdrop="static" style={{width:'600px'}}>
				<Modal.Header>
				 	<Modal.Title>申请发票</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="table-content">
					{this.renderTable()}
					</div>
					 <p style={{marginTop: '16px', opacity: canApply ? 0 : 1}}>
					 	<Text color={Colors.DANGER}>*发票开具金额最小额度为500元</Text>
					 </p>
				</Modal.Body>
				<Modal.Footer>
					<Button 
						disabled={!canApply}
						color={Colors.PRIMARY} 
						onClick={this.handleInvoiceApplyClick} 
					>申请发票</Button>
				</Modal.Footer>
			</Modal>
		)
	}
}

InvoiceApply.propTypes = propTypes

export default InvoiceApply