import React, { Component } from 'react'
import classnames from 'classnames'

import { Button, Dropdown, MenuItem, Icon, Colors } from '../../m1ui'
import { StepConditionTypes } from '../../../base/enums'
import EmailEventDropdown from './EmailEventDropdown'
import TagLinks from './TagLinks'


class EventCondition extends Component {
	componentWillReceiveProps(nextProps) {
		if(this.props.emails.length !== nextProps.emails.length && nextProps.emails.length !== 0) {
			this.requestLinks(nextProps)
		}
	}
	handleRemoveLink = (taskId, linkId) => {
		const {linkUrl} = this.props
		const taskLink = taskId + '#' + linkId
		const linkUrlArr = linkUrl.split(',')
		const newLinkUrlArr = linkUrlArr.filter(item => item !== taskLink)
		this.props.onClickUrlChange(newLinkUrlArr.join(','))
	}
	handleEventSelect = (type, taskId, linkId) => {
		let taskIdsStr = '', clickUrlStr = ''
		if(type === StepConditionTypes.UNCLICKED_PREV_LINK || type === StepConditionTypes.CLICKED_PREV_LINK) {
			const { taskIds, linkUrl } = this.props
			const taskIdsArr = taskIds.split(',')
			const linkUrlArr = linkUrl.split(',')
			const taskLink = taskId + '#' + linkId
			if(taskIdsArr.indexOf(String(taskId)) === -1) {
				taskIdsArr.push(String(taskId))
			}
			if(linkUrlArr.indexOf(taskLink) === -1) {
				linkUrlArr.push(taskLink)
			}
			taskIdsStr = taskIdsArr.join(',')
			clickUrlStr = linkUrlArr.join(',')
		}
		this.props.onEventTypeChange(type, taskIdsStr, clickUrlStr)
	}
	handleRequestLinks = () => {
		this.requestLinks(this.props)
	}
	requestLinks = (props) => {
		const {prevEmails, emailLinks} = props
		prevEmails.forEach(email => {
			const item = email.task || {}
			const links = emailLinks.filter(link => link.task_id === item.task_id)
			if(links.length === 0) {
				this.props.reqLinks(item.task_id)
			}
		})
	}
	render() {
		const { linkUrl, prevEmails, emailLinks, type, ...props } = this.props
		return (
			<div className="event-condition">
				<span>如果</span>
				{' '}
				<EmailEventDropdown 
					type={type}
					emails={prevEmails}
					emailLinks={emailLinks}
					onSelect={this.handleEventSelect}
					reqLinks={this.handleRequestLinks}
				/>
				<TagLinks
					closable
					linkUrl={linkUrl}
					emailLinks={emailLinks}
					onClose={this.handleRemoveLink}
				/>
			</div>
		)
	}
}

export default EventCondition