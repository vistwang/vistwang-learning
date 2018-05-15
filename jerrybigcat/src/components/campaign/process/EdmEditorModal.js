import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal, Button, Colors } from '../../m1ui'

import EdmEditor from '../../../containers/campaign/process/EdmEditor'

const ModalHeader = Modal.Header
const ModalTitle = Modal.Title
const ModalBody = Modal.Body 
const ModalFooter = Modal.Footer

const propTypes = {
	show: PropTypes.bool,
	onClose: PropTypes.func
}

class EdmEditorModal extends Component {

	render() {
		const { show, onClose, ...props } = this.props
		return (
			<Modal
				show={show}
				onClose={onClose}
				style={{width: '1200px'}}
			>
				<ModalHeader>
					<ModalTitle>
						第一步 > {props.subject}
					</ModalTitle>
				</ModalHeader>
				<ModalBody>
					<EdmEditor />
				</ModalBody>
				<ModalFooter>
					<Button onClick={onClose} >取消</Button>
					<Button color={Colors.PRIMARY} >确定</Button>
				</ModalFooter>
			</Modal>
		)
	}
}

EdmEditorModal.propTypes = propTypes

export default EdmEditorModal