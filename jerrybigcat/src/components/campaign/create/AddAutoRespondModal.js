import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { CampaignBehaviors, CampaignResponseActions } from '../../../base/enums'
import { Button, Modal, Dropdown, MenuItem, Colors } from '../../m1ui'

import FormRow from '../../common/FormRow'
import ScreeningCondition from '../../../containers/campaign/create/ScreeningCondition'
import ProcessDropdown from '../setting/ProcessDropdown'
import BehaviorDropdown from '../setting/BehaviorDropdown'
import AutoResponseDropdown from '../setting/AutoResponseDropdown'
import CampaignDropdown from '../setting/CampaignDropdown'
import LinkDropdown from '../setting/LinkDropdown'
import ContactGroupDropdown from '../setting/ContactGroupDropdown'
import TagDropdown from '../setting/TagDropdown'
import StatusDropdown from '../setting/StatusDropdown'

const { Header, Title, Body, Footer } = Modal

const propTypes = {
	show: PropTypes.bool,
	onClose: PropTypes.func.isRequired,
	onApply: PropTypes.func
}

class AddAutoRespondModal extends Component {

	render() {
		const { show, onClose, onApply, autoResponse, ...props } = this.props
		const showProcessDropdown = (autoResponse.type === CampaignBehaviors.OPEN || autoResponse.type === CampaignBehaviors.REPLY)
		const showLinkDropdown = autoResponse.type === CampaignBehaviors.CLICK
		const showCampaignDropdown = autoResponse.action_id === CampaignResponseActions.ADD_TO_CAMPAIGN
		const showContactGroupDropdown = autoResponse.action_id === CampaignResponseActions.ADD_TO_GROUP
		const showTagDropdown = autoResponse.action_id === CampaignResponseActions.ADD_TAG
		const showStatusDropdown = autoResponse.action_id === CampaignResponseActions.ADD_STATUS
		const showSendEmailInput = autoResponse.action_id === CampaignResponseActions.SEND_TO_EMAIL
		return (
			<Modal
				show={show}
				onClose={onClose}
				style={{width: '760px'}}
			>
				<Header>
					<Title>设置条件和自动响应</Title>
				</Header>
				<Body>
					<div className="m1-form set-auto-respond">
						{/*<FormRow
							label="选择用户"
						>
							<ScreeningCondition />
						</FormRow>*/}
						<FormRow
							label="选择行为"
						>
							<div className="m1-col-6">
								<BehaviorDropdown
									event={autoResponse.type}
									onSelect={props.onSelectBehavior}
								/>
							</div>
							<div className="m1-col-6">
								{showProcessDropdown && 
									<ProcessDropdown 
										stepId={autoResponse.step}
										mailId={autoResponse.mail_id}
										processes={props.processes}
										emails={props.emails}
										onSelect={props.onSelectProcessContent}
									/>}
								{showLinkDropdown &&
									<LinkDropdown
										linkId={autoResponse.url}
										emails={props.emails}
										links={props.emailLinks}
										onSelect={props.onSelectLink}
									/>}
							</div>
						</FormRow>
						<FormRow
							label="自动响应"
						>
							<div className="m1-col-6">
								<AutoResponseDropdown
									actionId={autoResponse.action_id}
									autoResponseActions={props.autoResponseActions}
									onSelect={props.onAutoResponseActions}
								/>
							</div>
							<div className="m1-col-6">
								{showCampaignDropdown && 
									<CampaignDropdown
										campaignId={autoResponse.data}
										campaigns={props.campaigns}
										onSelect={props.onActionDataChange}
									/>}
								{showContactGroupDropdown &&
									<ContactGroupDropdown
										groupId={autoResponse.data}
										queryTermsGroups={props.queryTermsGroups}
										onSelect={props.onActionDataChange}
									/>}
									{showTagDropdown &&
										<TagDropdown
											tagId={autoResponse.data}
											queryTermsTags={props.queryTermsTags}
											onSelect={props.onActionDataChange}
										/>}
								{showSendEmailInput && 
									<input 
										className="m1-form-input" 
										placeholder="请填写邮箱"
										value={autoResponse.data} 
										onChange={e => props.onActionDataChange(e.target.value)} 
									/>
								}
								{showStatusDropdown && 
									<StatusDropdown
										statusId={autoResponse.data}
										onSelect={props.onActionDataChange}
									/>
								}
							</div>
						</FormRow>
					</div>
				</Body>
				<Footer>
					<Button onClick={onClose} >取消</Button>
					<Button color={Colors.PRIMARY} onClick={onApply} >使用</Button>
				</Footer>
			</Modal>
		)
	}
}

AddAutoRespondModal.propTypes = propTypes

export default AddAutoRespondModal