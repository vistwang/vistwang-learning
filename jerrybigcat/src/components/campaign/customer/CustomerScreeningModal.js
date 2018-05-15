import React from 'react'
import PropTypes from 'prop-types'

import { Modal, Button, Colors } from '../../m1ui'

import ScreeningCondition from '../../../containers/campaign/create/ScreeningCondition'

const { Header, Title, Body, Footer } = Modal

const CustomerScreeningModal = ({show, onClose, onPreview, onConfirm, totalCount, ...props}) => {
	return (
		<Modal
			{...props}
			show={show}
			onClose={onClose}
			style={{width: '760px'}}
		>
			<Header>
				<Title>更改用户筛选条件</Title>
			</Header>
			<Body>
				<ScreeningCondition />
				<div className="customer-preview-foot enter">
					<span>当前条件匹配到{totalCount}位用户</span>
					<a onClick={onPreview} >预览详细列表</a>
				</div>
			</Body>
			<Footer>
				<Button onClick={onClose} >取消</Button>
				<Button color={Colors.PRIMARY} onClick={onConfirm} >保存</Button>
			</Footer>
		</Modal>
	)
}

export default CustomerScreeningModal