import React from 'react'
import PropTypes from 'prop-types'

import { Modal, Button, Colors } from '../../m1ui'

const { Header, Title, Body, Footer } = Modal

const CreateClassifyModal = ({show, onClose}) => {
	return (
		<Modal
			backdrop="static"
			show={show}
			onClose={onClose}
			className="center"
		>
			<Header>
				<Title>创建新分类</Title>
			</Header>
			<Body>
				<div className="m1-form inbox-create-classify">
					<div className="m1-form-row">
						<div className="m1-form-label">分类名称：</div>
						<div className="m1-form-content">
							<input className="m1-form-input" placeholder="如：已分配跟进" />
						</div>
					</div>
				</div>
			</Body>
			<Footer>
				<Button>取消</Button>
				<Button color={Colors.PRIMARY} >确认</Button>
			</Footer>
		</Modal>
	)
}

export default CreateClassifyModal