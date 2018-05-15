import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { utils } from '../../../utils'
import { Dropdown, MenuItem } from '../../m1ui'
import EmailDropdown from './EmailDropdown'

const getStepName = (step) => {
	const chineseNumber = utils.numberToChinese(step)
	return chineseNumber !== '零' ? `第${chineseNumber}步` : ''
}

class ProcessDropdown extends Component {

	render() {
		const {stepId, mailId, processes, emails, ...props } = this.props
		const stepIndex = processes.findIndex(item => item.id === stepId)
		const email = emails.find(item => item.task_id === mailId)
		const currentStepName = getStepName(stepIndex + 1)
		const title = currentStepName + '>' + (email.subject || '')
		return (
			<Dropdown 
				isMulti
				title={title || '请选择步骤'}
				className="m1-dropdown-form dropdown-screening" 
			>
				<ul>
					{processes.map((processItem, i) => {
						const stepName = getStepName(i + 1)
						const currentEmails = emails.filter(email => email.step_id === processItem.id)
						return (
							<MenuItem key={i} notClose subMenu title={stepName}>
								<EmailDropdown 
									emails={currentEmails}
									onSelect={task_id => props.onSelect(task_id, processItem.id)}
								/>
							</MenuItem>
						)
					})}
				</ul>
			</Dropdown>
		)
	}
}

export default ProcessDropdown