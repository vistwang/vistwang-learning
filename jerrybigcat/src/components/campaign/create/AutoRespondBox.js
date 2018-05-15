import React, {Component} from 'react'
import PropTypes from 'prop-types'

import { utils } from '../../../utils'
import {SysCampaign} from '../../../base/system'
import { CampaignBehaviors, CampaignResponseActions } from '../../../base/enums'
import { Icon, Tag, Colors, Sizes } from '../../m1ui'
import ButtonIcon from '../../common/ButtonIcon'

const behaviorList = SysCampaign.behaviorList

const TagPrimary = ({children}) => {
	return (
		<Tag color={Colors.PRIMARY} size={Sizes.SMALL} >{children}</Tag>
	)
}

class AutoRespondBox extends Component {
	getCampaignName = (campaign_id) => {
		const {campaignList} = this.props
		const campaign = campaignList.find(item => item.id === campaign_id) || {}
		// console.log(campaign_id,campaignList,campaign)
		return campaign.name || ''
	}
	findGroup = (id) => {
		const {queryTermsGroups} = this.props
		let list = queryTermsGroups.list || []
		let groupItem
		for(let i in list) {
			const item = list[i]
			if(item.relations) {
				groupItem =  item.relations.find(relation => relation.id === id)
				if(!!groupItem) {
					break
				}
			}
		}
		return groupItem
	}
	getGroupName = (id) => { 
		const group = this.findGroup(id) || {}
		return group.name || ''
	}
	getTagName = (tagId) => {
		const { queryTermsTags } = this.props
		const tag = queryTermsTags.find(item => item.id === tagId) || {} 
		return tag.name || ''
	}
	getActionLabel = (action_id, data) => {
		let label = ''
		switch(action_id) {
			case CampaignResponseActions.ADD_TO_CAMPAIGN:
				label = this.getCampaignName(data)
				break
			case CampaignResponseActions.ADD_TO_GROUP:
				label = this.getGroupName(data)
				break
			case CampaignResponseActions.ADD_TAG:
				label = this.getTagName(data)
				break
			case CampaignResponseActions.ADD_STATUS:
				label = ''
			default:
				label = ''
		}	
		return label
	}
	getProcessContentName = (step_id, task_id)  => {
		const {processes,emails} = this.props
		const stepIndex = processes.findIndex(item => item.id === step_id) || -1
		const email = emails.find(item => item.task_id === task_id) || {}
		let label = stepIndex !== -1 ? `第${utils.numberToChinese(stepIndex + 1)}步 > ` : ''
		label += email.subject || '' 
		return label
	}
	getLinkName = (link_id) => {
		const {emailLinks} = this.props
		const link = emailLinks.find(item => item.id === link_id) || {}
		return link.link_name || ''
	}
	getBehaviorLabel = () => {
		const {response} = this.props
		let label = ''
		switch(response.type) {
			case CampaignBehaviors.OPEN:
			case CampaignBehaviors.REPLY:
				label = this.getProcessContentName(response.step, response.mail_id)
				break
			case CampaignBehaviors.CLICK:
				label = this.getLinkName(response.url)
				break
			case CampaignBehaviors.UNSUBSCRIBE:
			case CampaignBehaviors.BOUNCE:
			default:
				label =''
		}
		return label
	}
	render() {
		const {response, onEdit, onRemove, processes, autoResponseActions} = this.props
		const behavior = behaviorList.find(beh => beh.event === response.type) || {}
		const responseAction = autoResponseActions.find(ac => ac.id === response.action_id) || {}
		const behaviorLabel = this.getBehaviorLabel()
		const actionLabel = this.getActionLabel(response.action_id, response.data)
		return (
			<div className="m1-box auto-respond-box">
				<span className="icon-email">
					<Icon name="mail-o" />
				</span>
				<div className="respond-title">如果 <TagPrimary>满足此条件</TagPrimary> 的用户 <TagPrimary>{behavior.name}</TagPrimary> {behaviorLabel && <TagPrimary>{behaviorLabel}</TagPrimary>}</div>
				<div className="respond-intro">系统自动{responseAction.name} {actionLabel && <TagPrimary>{actionLabel}</TagPrimary>}</div>
				<span className="icon-setting">
					<ButtonIcon 
						name="set-up-thin" 
						onClick={onEdit}
					/>
					<ButtonIcon 
						name="delete-o" 
						onClick={onRemove}
					/>
				</span>
			</div>
		)
	}

}

 
export default AutoRespondBox