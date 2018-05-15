import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal, Button, Colors } from '../../m1ui'

const ModalHeader = Modal.Header
const ModalTitle = Modal.Title
const ModalBody = Modal.Body 
const ModalFooter = Modal.Footer

const propTypes = {
	show: PropTypes.bool,
	onClose: PropTypes.func
}

class SettingReplyTypeModal extends Component {
	render() {
		const { show, onClose, replyTypeId, replyTypeName, ...props } = this.props
		return (
			<Modal
				show={show}
				onClose={onClose}
				style={{width: '450px'}}
			>
				<ModalHeader>
					<ModalTitle>
						{!!replyTypeId ? '修改分类' : '创建新分类'}
					</ModalTitle>
				</ModalHeader>
				<ModalBody>
					<div className="container">
						<div className="m1-form-row">
							<label className="m1-form-label">创建分类:</label>
							<div className="m1-form-content">
								<input 
									className="m1-form-input" 
									value={replyTypeName} 
									onChange={e => props.onTypeNameChange(e.target.value)} 
									placeholder="如: 已分配跟进"
								/>
							</div>
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

SettingReplyTypeModal.propTypes = propTypes

export default SettingReplyTypeModal