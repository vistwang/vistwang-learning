import React, { Component } from 'react'
import classnames from 'classnames'

import { SysCampaign } from '../../../base/system'
import { Dropdown, MenuItem, Colors } from '../../m1ui'
import { StepConditionTypes } from '../../../base/enums'
import LinkDropdownMenu from '../../screening/LinkDropdownMenu'

const conditionTypes = SysCampaign.filter.stepConditionTypes


class EmailEventDropdown extends Component {

	handleSubMenuMouseOver = (e) => {
		if(!this.isRequestLinks) {
			this.isRequestLinks = true
			this.props.reqLinks()
		}
	}
	render() {
		const { emails, emailLinks, ...props } = this.props
		return (
			<Dropdown 
				isMulti
				color={Colors.TEXT}
			  title={conditionTypes[props.type] || '未回复上一封邮件'}
			  className="m1-dropdown-form dropdown-screening"
			>
				<ul>	
					<MenuItem 
						eventKey={StepConditionTypes.UNOPENED_PREV_EMAIL} 
						onSelect={type => props.onSelect(type)}
					>
						未打开上一封邮件
					</MenuItem>	
					<MenuItem 
						eventKey={StepConditionTypes.UNANSWERED_PREV_EMAIL} 
						onSelect={type => props.onSelect(type)}
					>
						未回复上一封邮件
					</MenuItem>
					<MenuItem notClose subMenu 
						title="未点击上一封链接" 
						onMouseOver={this.handleSubMenuMouseOver}
					>
						<LinkDropdownMenu
							emails={emails}
							links={emailLinks}
							onSelect={(taskId, linkId) => props.onSelect(StepConditionTypes.UNCLICKED_PREV_LINK, taskId, linkId)}
						/>
					</MenuItem>	
					<MenuItem notClose subMenu 
						title="点击上一封链接"
					>
						<LinkDropdownMenu
							emails={emails}
							links={emailLinks}
							onSelect={(taskId, linkId) => props.onSelect(StepConditionTypes.CLICKED_PREV_LINK, taskId, linkId)}
						/>
					</MenuItem>	
					<MenuItem 
						eventKey={StepConditionTypes.NOTHING} 
						onSelect={props.onSelect}
					>不做任何判断</MenuItem>	
				</ul>
			</Dropdown>
		)
	}
}


export default EmailEventDropdown