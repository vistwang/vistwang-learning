import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal, Button, Colors } from '../../m1ui'

import ButtonAdd from '../create/ButtonAdd'
import EmailAccountInfo from '../process/EmailAccountInfo'
import ReplyEmailEditor from './ReplyEmailEditor'

const ModalHeader = Modal.Header
const ModalTitle = Modal.Title
const ModalBody = Modal.Body 
const ModalFooter = Modal.Footer

const propTypes = {
	show: PropTypes.bool,
	onClose: PropTypes.func
}

class SendReplyEmailModal extends Component {
	render() {
		const { show, onClose, replyId, email, fullname, emailAccount, content, ...props } = this.props
		const hasEmailAccount = !!emailAccount.email_account_id
		return (
			<Modal
				show={show}
				onClose={onClose}
				style={{width: '450px'}}
			>
				<ModalHeader>
					<ModalTitle>
						回复邮件
					</ModalTitle>
				</ModalHeader>
				<ModalBody>
					<div className="container">
						<div className="m1-form-row">
							<label className="m1-form-label">收件人:</label>
							<div className="m1-form-content">
								{fullname} [{email}]
							</div>
						</div>
						<div className="m1-form-row">
							<label className="m1-form-label">邮件账户:</label>
							<div className="m1-form-content">
								{!hasEmailAccount && <ButtonAdd
									onClick={props.onAddEmailAccount}
								>
									添加发件账户
								</ButtonAdd>}
								{hasEmailAccount && <EmailAccountInfo
								                  	emailAccount={emailAccount}
								                  	onChange={props.onAddEmailAccount}
								                  />}
							</div>
						</div>
						<div className="m1-form-row">
							<ReplyEmailEditor
								value={content}
								onChange={props.onContentChange}
							/>
						</div>
					</div>
				</ModalBody>
				<ModalFooter>
					<Button onClick={onClose} >取消</Button>
					<Button color={Colors.PRIMARY} onClick={props.onConfirm} >立即回复</Button>
				</ModalFooter>
			</Modal>
		)
	}
}

SendReplyEmailModal.propTypes = propTypes

export default SendReplyEmailModal