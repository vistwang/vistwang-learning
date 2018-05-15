import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import TagCircle from '../../common/TagCircle'
import { Colors } from '../../m1ui'

const propTypes = {
	step: PropTypes.number
}

const defaultProps = {
	step: 1
}

const StepFlow = ({step}) => {

	return (
		<div className="step-container">
			<ul>
				<li className={classnames(
					{complete: (step > 1)},
					{current: (step === 1)}
					)} >
					<TagCircle color={ step === 1 ? Colors.PRIMARY : Colors.SUCCESS} >1</TagCircle>创作营销内容
				</li>
				<li className={classnames(
					{complete: (step > 2)},
					{current: (step === 2)}
					)} ><TagCircle color={ step === 2 ? Colors.PRIMARY : (step > 2 ? Colors.SUCCESS : Colors.IGNORE) } >2</TagCircle>选择用户</li>
				<li className={classnames(
					{current: (step === 3)}
					)}  ><TagCircle color={step === 3 ? Colors.PRIMARY : Colors.IGNORE} >3</TagCircle>启动及设置</li>
			</ul>
		</div>
	)
}

StepFlow.propTypes = propTypes
StepFlow.defaultProps = defaultProps

export default StepFlow