import React from 'react'
import PropTypes from 'prop-types'

import { Icon } from '../../m1ui'

const propTypes = {
	title: PropTypes.string,
	icon: PropTypes.string,
	intro: PropTypes.string,
	show: PropTypes.bool,
	type: PropTypes.string,
	onToggle: PropTypes.func
}

const EmailSettingItem = ({title, icon, intro, type, show, onToggle, children}) => {
	return (
		<div className="m1-row email-set-item">
			<div 
				className="email-set-header" 
				onClick={e => onToggle(type)} 
			>
				<h3><Icon name={icon} /> {title} <Icon name="unfold-down" /></h3>
				<p>
					{intro}
				</p>
			</div>
			{show && <div className="email-set-content">
							{children}
						</div>}
		</div>
	)
}

EmailSettingItem.propTypes = propTypes

export default EmailSettingItem