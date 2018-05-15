import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {  Button, Colors } from '../../m1ui'
import ButtonIcon from '../../common/ButtonIcon'

const propTypes = {
	
}

class ContactSetting extends Component {
	render() {
		return (
			<div className="right-fixed">
				<div className="contact-setting">
					<div className="contact-header">
						<div className="contact-user">
							<div className="avatar">
								<img src="" alt=""/>
							</div>
							<div className="name"></div>
						</div>
						<div className="inbox-btns">
							<ButtonIcon name="aircraft-add" data-for={tooltipId} data-tip="将回复者添加到其他营销活动" onClick={props.onAddToCampaign} />
						</div>
					</div>
					<div className="contact-content">

					</div>
				</div>
			</div>
		)
	}
}

ContactSetting.propTypes = propTypes

export default ContactSetting