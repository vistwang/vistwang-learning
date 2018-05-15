import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal, Button, Colors } from '../../m1ui'
import CampaignDropdown from '../setting/CampaignDropdown'

const ModalHeader = Modal.Header
const ModalTitle = Modal.Title
const ModalBody = Modal.Body 
const ModalFooter = Modal.Footer

const propTypes = {
	show: PropTypes.bool,
	onClose: PropTypes.func
}

class AddToCampaignModal extends Component {
	constructor(props) {
		super(props)

		this.state = {
			campaignId: 0
		}
	}

	render() {
		const { show, onClose, campaigns, ...props } = this.props
		return (
			<Modal
				show={show}
				onClose={onClose}
				style={{width: '550px'}}
			>
				<ModalHeader>
					<ModalTitle>
						添加到营销活动
					</ModalTitle>
				</ModalHeader>
				<ModalBody>
					<div className="container" style={{textAlign: 'center'}}>
						<CampaignDropdown
							campaignId={this.state.campaignId}
							campaigns={campaigns}
							onSelect={campaignId => this.setState({campaignId})}
						/>
					</div>
				</ModalBody>
				<ModalFooter>
					<Button onClick={onClose} >取消</Button>
					<Button color={Colors.PRIMARY} onClick={e => props.onConfirm(this.state.campaignId)} >确定</Button>
				</ModalFooter>
			</Modal>
		)
	}
}

AddToCampaignModal.propTypes = propTypes

export default AddToCampaignModal