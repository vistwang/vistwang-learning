import React from 'react'
import PropTypes from 'prop-types'

import { Button, Modal, Colors } from '../../m1ui'

import InstallCodeTab from './InstallCodeTab'

const { Header, Title, Body, Footer } = Modal

const InstallCodeModal = ({ show, onClose, ...props } ) => {
	return (
		<Modal
			show={show}
			onClose={onClose}
			style={{width: '706px'}}
		>
			<Header>
				<Title>安装代码</Title>
				<div className="install-intro">
					如果您需要帮助，可以通过一下链接邀请团队的开发人员协助安装部署下面代码
				</div>
			</Header>
			<Body>
				<div className="m1-row install-copy">
					<input readOnly />
					<Button color={Colors.PRIMARY} >复制</Button>
				</div>
				<InstallCodeTab {...props} />
				
			</Body>
			<Footer>
				<div className="m1-row install-send">
					<span>通过邮件邀请开发人员协助安装：</span>
					<input placeholder="如：m1il@domain.com,mail2@domain.com" />
					<Button color={Colors.PRIMARY} >发送</Button>
				</div>
			</Footer>
		</Modal>
	)
}

export default InstallCodeModal