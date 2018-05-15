import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ButtonIcon from '../../common/ButtonIcon'

import { Switch } from '../../m1ui'

class SendContentItem extends Component {

	render() {
		const { email, isPreview, onEdit, onRemove, onCopy, onPreview } = this.props
		return (
			<div className="content-item">
				<div className="title">
					{ email.subject }
					{!isPreview && 
						<div className="item-operation">
							<ButtonIcon name="edit-o" onClick={onEdit} />
							{/*<ButtonIcon name="batch" onClick={onCopy} />*/}
							<ButtonIcon name="delete-o" onClick={onRemove} />
						</div>}
					{isPreview && 
						<div className="item-operation">
							<ButtonIcon name="eye" onClick={onPreview} />
						</div>}
				</div>
				{/*<div className="intro">
					<Switch /> 再次邮件上引用上一封邮件
				</div>*/}
			</div>
		)
	}
}

SendContentItem.propTypes = {
	title: PropTypes.string
}


export default SendContentItem