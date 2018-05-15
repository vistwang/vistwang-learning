import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal } from '../m1-ui'

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

const AuthViewBase = ({show, onClose, info, ...props}) => {
	const { company, address, website, name, phone, email, business, icp } = info
	return (
		<Modal 
			{...props}
			show={show}
			onClose={onClose}
			style={{width: '960px'}} 
		>
			<Modal.Header>
				<Modal.Title>企业资质认证</Modal.Title>
			</Modal.Header>
			<Modal.Body style={{padding: '10px 30px'}}>
					<div className="m1-row">
						<div className="m1-col-5">
							<div className="m1-form">
								<FormField title="公司名称" value={company}/>
								<FormField title="公司地址" value={address}/>
								<FormField title="公司网站"  value={website}/>
								<FormField title="联系人"  value={name}/>
								<FormField title="联系电话" value={phone}/>
								<FormField title="联系邮箱"  value={email}/>
							</div>
						</div>
						<div className="m1-col-7">
							<div className="auth-enterprise-licence">
									<Licence
										title="公司营业执照（公章电子版）"
										imgUrl={business || picture}
									/>
									<Licence
										eventKey="icp"
										title="企业ICP备案证明（公章电子版）"
										imgUrl={icp || picture}
									/>
							</div>
						</div>
					</div>
			</Modal.Body>
		</Modal>
	)
}

AuthViewBase.propTypes = propTypes

export default AuthViewBase

