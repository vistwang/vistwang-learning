import React from 'react'
import PropTypes from 'prop-types'
import { Button, Colors } from '../../m1ui'

const Head = (props) => {
	return (
		<div className="header">
			<h2 className="title">新建营销活动</h2>
			<span className="subtitle">选择营销活动向导或从空白创建</span>
		</div>
	)
}

export default Head