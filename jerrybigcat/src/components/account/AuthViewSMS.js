import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal } from '../m1ui'

import { utils } from '../../utils'

import picture from '../../assets/images/picture.svg'

const propTypes = {
	show: PropTypes.bool,
	onClose: PropTypes.func,
	info: PropTypes.object.isRequired
}

const FormField = ({title, value}) => {
	return (
		<div className="m1-form-row">
			<div className="m1-form-label">
				{title}：
			</div>
			<div className="m1-form-content">
				{value}
			</div>
		</div>
	)
}

const Licence = ({title, imgUrl}) => {
	return (
		<div className="auth-licence">
			<h4>{title}</h4>
			<div className="licence-image">
					<img src={imgUrl} />
			</div>
		</div>
	)
}

const AuthViewSMS = ({show, onClose, info, ...props}) => {
	const { companySign, tem, zm } = info
	const temContent = utils.isJSON(tem) ? JSON.parse(tem)[0].content : ''
	return (
		<Modal 
			{...props}
			show={show}
			onClose={onClose}
			style={{width: '760px'}}
		>
			<Modal.Header>
				<Modal.Title>短信认证服务</Modal.Title>
			</Modal.Header>
			<Modal.Body style={{padding: '10px 30px'}}>
					<div className="m1-row">
						<div className="m1-col-7">
							<div className="m1-form">
								<FormField title="短信签名" value={companySign}/>
								<FormField title="短信模板" value={temContent}/>
							</div>
						</div>
						<div className="m1-col-5">
							<Licence
								title="签名与营业执照不符证明"
								imgUrl={zm || picture}
							/>
						</div>
					</div>
			</Modal.Body>
		</Modal>
	)
}

AuthViewSMS.propTypes = propTypes

export default AuthViewSMS

