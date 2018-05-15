import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Button, Colors } from '../../m1ui'

const {Header, Title, Body, Footer} = Modal

const CodnitionNameModal = ({show, conditionName, onChangeName, onConfirm, onClose, ...props}) => {
	return (
		<Modal
			show={show}
			onClose={onClose}
			backdrop="static"
			style={{width: '400px'}}
		>
			<Header>
				<Title>将此筛选条件保存为动态细分群组</Title>
			</Header>
			<Body>
				<input className="m1-form-input" placeholder="请输入动态细分群组名" value={conditionName} onChange={onChangeName} />
			</Body>
			<Footer>
				<Button onClick={onClose} >取消</Button>
				<Button onClick={onConfirm} color={Colors.PRIMARY} >确定</Button>
			</Footer>
		</Modal>
	)
}

CodnitionNameModal.propTypes = {
	show: PropTypes.bool,
	onClose: PropTypes.func,
	conditionName: PropTypes.string,
	onChangeName: PropTypes.func,
	onConfirm: PropTypes.func
}

export default CodnitionNameModal