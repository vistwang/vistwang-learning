import React from 'react'
import PropTypes from 'prop-types'

import ButtonIcon from '../../common/ButtonIcon'
import EndDatetimePicker from './EndDatetimePicker'

const EndConditionBox = (props) => {
	return (
		<div className="m1-box end-condition-box">
			<EndDatetimePicker /> 结束
			<div className="icon-setting">
				<ButtonIcon name="delete-o" />
			</div>
		</div>
	)
}

export default EndConditionBox