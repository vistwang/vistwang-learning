import React, { Component } from 'react'
import classnames from 'classnames'

import { Button, Dropdown, MenuItem, Icon, Colors } from '../../m1ui'

import ButtonIcon from '../../common/ButtonIcon'
import TagCircle from '../../common/TagCircle'
import DelaySendEdit from './DelaySendEdit'
import ProcessItem from './ProcessItem'
import EmailEventDropdown from './EmailEventDropdown'
import EventCondition from './EventCondition'

const defaultCondition = {
	"delaytime":"0:0:0", //-----（时分秒）
	"type": 4, //----(0:未做任何操作,1:未打开上一封邮件,2:未点击上一封连接,3:点击了上一封连接,4:未回复上一封邮件)
	"task_id":"", //-----（上一封邮件任务ID）
	"click_url":"" //----点击taskid#链接ID
}


class ProcessBox extends Component {

	render() {
		const { isFinal, indexNum, isPreview, onRemoveProcess, processStep, prevEmails, emails, emailLinks, ...props } = this.props
		const targetCondition = processStep.target_condition ? JSON.parse(processStep.target_condition) : defaultCondition
		const isFirst = indexNum === 0
		return (
			<div className={classnames(
					'content-box',
					{'final': isFinal}
				)} >
				<TagCircle className="tag-step" color={Colors.PRIMARY}>{(indexNum + 1)}</TagCircle>
				<TagCircle className="tag-delete" color={Colors.DANGER} onClick={onRemoveProcess}><Icon name="delete-o" /></TagCircle>
				<div className="content-top">
					<DelaySendEdit 
						delaytime={targetCondition.delaytime}
						onDelayChange={props.onDelayChange}
					/>
					{!isFirst && 
					<EventCondition
						prevEmails={prevEmails}
						emails={emails}
						emailLinks={emailLinks}
						type={targetCondition.type}
						linkUrl={targetCondition.click_url || ''}
						taskIds={targetCondition.task_id || ''}
						reqLinks={props.reqLinks}
						onClickUrlChange={props.onClickUrlChange}
						onEventTypeChange={props.onEventTypeChange}
					/>}
				</div>
				<div className="m1-panel">
					<div className="m1-panel-content">
						{emails.map((item, i) => {
							const task = item.task
							return (
								<ProcessItem 
									key={i}
								 	email={task || {}} 
								 	isPreview={isPreview} 
								 	onRemove={e => props.onRemoveContent(task.task_id)}
								 	onEdit={e => props.onEditContent(task.task_id)}
								 />
							)
						})
						}
					</div>
					<ButtonIcon
						className="btn-icon-add"
						name="newly-added"
						onClick={props.onAddContent}
					/>
				</div>
			</div>
		)
	}
}

export default ProcessBox