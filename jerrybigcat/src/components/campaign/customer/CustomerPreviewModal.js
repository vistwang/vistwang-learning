import React from 'react'
import PropTypes from 'prop-types'

import { Modal, Button, Colors } from '../../m1ui'

import CustomerPreview from './CustomerPreview'

const { Header, Title, Body, Footer } = Modal

const CustomerScreeningModal = ({show, onClose, ...props}) => {
	return (
		<Modal
			{...props}
			show={show}
			onClose={onClose}
			style={{width: '560px'}}
		>
			<Header>
				<Title>预览详情列表</Title>
			</Header>
			<Body>
				<CustomerPreview />
			</Body>
			<Footer>
				<Button onClick={onClose} >关闭</Button>
			</Footer>
		</Modal>
	)
}

export default CustomerScreeningModal