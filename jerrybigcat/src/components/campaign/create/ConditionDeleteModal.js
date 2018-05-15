import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Button, Colors } from '../../m1ui'

const {Header, Title, Body, Footer} = Modal

const CodnitionDeleteModal = ({show, conditionIndex, conditionGroupIndex, onConfirm, onClose, ...props}) => {
	return (
		<Modal
			show={show}
			onClose={onClose}
			backdrop="static"
			style={{width: '400px'}}
		>
			<Header>
				<Title>是否删除该筛选条件</Title>
			</Header>
			<Body>
			</Body>
			<Footer>
				<Button onClick={onClose} >取消</Button>
				<Button onClick={onConfirm} color={Colors.PRIMARY} >确定</Button>
			</Footer>
		</Modal>
	)
}

CodnitionDeleteModal.propTypes = {
	show: PropTypes.bool,
	onClose: PropTypes.func,
	conditionIndex: PropTypes.number,
	conditionGroupIndex: PropTypes.number,
	onConfirm: PropTypes.func
}

export default CodnitionDeleteModal