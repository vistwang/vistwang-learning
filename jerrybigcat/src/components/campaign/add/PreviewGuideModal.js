import React from 'react'
import PropTypes from 'prop-types'

import { Modal, Button, Colors } from '../../m1ui'

import ProcessBoxPreview from '../process/ProcessBoxPreview'

const propTypes = {
	id: PropTypes.number,
	show: PropTypes.bool,
	onClose: PropTypes.func,
	onApply: PropTypes.func,
	data: PropTypes.object,
}

const defaultProps = {
	data: {
		name: '',
		type: 1,
		steps: []
	}
}

const PreviewGuideModal = ({show, onClose, onApply, data, ...props}) => {
	const steps = data.steps || []
	const stepCount = steps.length
	return(
		<Modal
			{...props}
			show={show}
			onClose={onClose}
			style={{width: '900px'}}
		>
			<Modal.Header>
				<Modal.Title>{data.name}-向导预览</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{/*<ProcessBox indexNum={1} isPreview />
				<ProcessBox indexNum={2} isFinal={true} isPreview />*/}
				<div className="container">
				{steps.map((step, i) => {
					return (
						<ProcessBoxPreview
							key={i}
							isFinal={stepCount === (i + 1)}
							order={step.order}
							emails={step.mails}
							onPreview={props.onPreview}
						/>
					)
				})}
				</div>
				<div className="preview-intro">
					此向导支持继续添加计划或删除计划
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={onClose} >取消</Button>
				<Button color={Colors.PRIMARY} onClick={e => onApply(data.id)} >使用此向导</Button>
			</Modal.Footer>
		</Modal>
	)
}

PreviewGuideModal.propTypes = propTypes
PreviewGuideModal.defaultProps = defaultProps

export default PreviewGuideModal