import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { utils, msg } from '../../../utils'
import { Button, Input, Radio, Modal, Colors, Sizes } from '../../../components/m1-ui/'
import { user } from '../../../base/account'
import FormField from '../../../components/account/FormField'

const invoiceBase = [
 										 {key: 'total_fee', name: '金额'},
										 {key: 'recipients', name: '收件人'},
										 {key: 'address', name: '收货地址'},
										 {key: 'phone', name: '联系电话'},
										 {key: 'status', name: '状态'},
										 {key: 'createtime', name: '申请时间'}
									]
const invoiceVat = [
									{key: 'identification_num_of_taxpayer', name: '纳税人识别号'},
									{key: 'registered_address', name: '注册地址'},
									{key: 'registered_phone', name: '注册电话'},
									{key: 'account_name', name: '开户名称'},
									{key: 'account_number', name: '开户账号'}
]

const propTypes = {
	show: PropTypes.bool,
	onClose: PropTypes.func,
	detail: PropTypes.object
}

class InvoiceDetail extends Component {

	render() {
		const { show, onClose, detail } = this.props

		const type = !!detail.identification_num_of_taxpayer ? 2 : 1
		let invoices = []
		if(type === 1) {
			invoices = [{key: 'title', name: '发票抬头'}, ...invoiceBase]
		} else {
			invoices = [{key: 'title', name: '发票抬头'}, ...invoiceVat, ...invoiceBase]
		}

		return (
			<Modal show={show} onClose={onClose} style={{width:'600px'}}>
				<Modal.Header>
				 	<Modal.Title>发票详情</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="invoice-form-content">
						<div className="m1-form">
							<FormField 
								title="发票类型" 
								label={type === 1 ? '普通发票' : '增值税发票'}
							/>
							{invoices.map((item, i) => {
								let label = detail[item.key]
								if(item.key === 'status') {
									label = user.getInvoiceStatus(label).name
								}else if(item.key === 'createtime') {
									label = utils.formatDate(label)
								}
								return (
									<FormField 
										key={i}
										title={item.name} 
										label={label}
									/>
								)
							})}
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>

				</Modal.Footer>
			</Modal>
		)
	}
}

InvoiceDetail.propTypes = propTypes

export default InvoiceDetail
