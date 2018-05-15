import React, { Component } from 'react'
import PropTypes from 'prop-types'

import AutoRespondBox from './AutoRespondBox'
import ButtonAdd from './ButtonAdd'

class AutoRespond extends Component {
	render() {
		const { onAdd, autoResponses, ...props } = this.props
		return (
			<div className="container auto-respond">
				<div className="setting-header">
					<h2>自动响应设置</h2>
					<h4 className="subtitle">针对自动过流程中的触发邮件，如果用户做出反馈，则系统自动进行下一步响应动作</h4>
				</div>
				<div className="setting-content">
					{autoResponses.map((item, i) => {
						return (
							<AutoRespondBox
								key={i}
								response={item}
								campaignList={props.campaignList}
								processes={props.processes}
								emails={props.emails}
								emailLinks={props.emailLinks}
								queryTermsGroups={props.queryTermsGroups}
								queryTermsTags={props.queryTermsTags}
								autoResponseActions={props.autoResponseActions}
								onEdit={e => props.onEdit(i)}
								onRemove={e => props.onRemove(i)}
							/>
						)
					})}
					<ButtonAdd
						onClick={onAdd}
					>添加自动响应</ButtonAdd>
				</div>
			</div>
		)
	}
}


export default AutoRespond