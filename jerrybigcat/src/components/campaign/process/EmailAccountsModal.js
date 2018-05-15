import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal, Button, Icon, Colors } from '../../m1ui'
import EmailAccountRow from './EmailAccountRow'

const ModalHeader = Modal.Header
const ModalTitle = Modal.Title
const ModalBody = Modal.Body 
const ModalFooter = Modal.Footer

const propTypes = {
	show: PropTypes.bool,
	onClose: PropTypes.func,
	emailAccounts: PropTypes.array,
}

const defaultProps = {
	emailAccounts: []
}

class EmailAccountsModal extends Component {

	render() {
		const { show, onClose, emailAccounts, ...props } = this.props
		return (
			<Modal
				show={show}
				onClose={onClose}
				style={{width: '650px'}}
			>
				<ModalHeader>
					<ModalTitle>
						请选择要使用的邮箱账户
					</ModalTitle>
				</ModalHeader>
				<ModalBody>
					<div className="container">
						<table className="m1-table">
							<thead>
								<tr>
									<th></th>
									<th>姓名</th>
									<th>邮箱</th>
									<th>类型</th>
									<th>每日用量</th>
									<th>累计用量</th>
								</tr>
							</thead>
							<tbody>
								{emailAccounts.map((emailAccount, i) => <EmailAccountRow key={i} item={emailAccount} onRadioSelect={props.onRadioSelect} />)}
							</tbody>
						</table>
						<div className="btn-add-email-account">
							<a href="/setting/#/account" target="_blank" ><Icon name="add-to" /> 添加邮箱账户</a>
						</div>
					</div>
				</ModalBody>
				<ModalFooter>
					<Button onClick={onClose} >取消</Button>
					<Button color={Colors.PRIMARY} onClick={props.onConfirm} >确定</Button>
				</ModalFooter>
			</Modal>
		)
	}
}

EmailAccountsModal.propTypes = propTypes
EmailAccountsModal.defaultProps = defaultProps

export default EmailAccountsModal