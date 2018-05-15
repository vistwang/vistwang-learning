import React, { Component } from 'react'
import classnames from 'classnames'

import { Button, Dropdown, MenuItem, Icon, Colors } from '../../m1ui'

import ButtonIcon from '../../common/ButtonIcon'
import TagCircle from '../../common/TagCircle'
import DelaySendEdit from './DelaySendEdit'
import ProcessItem from './ProcessItem'
import EmailEventDropdown from './EmailEventDropdown'
import EventCondition from './EventCondition'

class ProcessBoxPreview extends Component {

	render() {
		const { isFinal, order, emails, ...props } = this.props
		return (
			<div className={classnames(
					'content-box',
					{'final': isFinal}
				)} >
				<TagCircle className="tag-step" color={Colors.PRIMARY}>{(order)}</TagCircle>
				<div className="content-top"></div>
				<div className="m1-panel">
					<div className="m1-panel-content">
						{emails.map((item, i) => {
							return (
								<ProcessItem 
									key={i}
								 	email={item || {}} 
								 	isPreview={true} 
								 	onPreview={e => props.onPreview(item.id)}
								 />
							)
						})
						}
					</div>
				</div>
			</div>
		)
	}
}

export default ProcessBoxPreview