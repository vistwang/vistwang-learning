import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal, Button, Colors } from '../../m1ui'
import ButtonAdd from '../create/ButtonAdd'
import EmailAccountInfo from './EmailAccountInfo'


const ModalHeader = Modal.Header
const ModalTitle = Modal.Title
const ModalBody = Modal.Body 
const ModalFooter = Modal.Footer

const propTypes = {
	show: PropTypes.bool,
	onClose: PropTypes.func
}

class SendSettingModal extends Component {

	render() {
		const { show, onClose, emailAccount, sendSettingModalType, ...props } = this.props
		const hasEmailAccount = !!emailAccount.email_account_id
		const isSendTest = sendSettingModalType === 1
		return (
			<Modal
				show={show}
				onClose={onClose}
				style={{width: '650px'}}
			>
				<ModalHeader>
					<ModalTitle>
						{isSendTest ? '发送测试邮件' : '发件设置'}
					</ModalTitle>
				</ModalHeader>
				<ModalBody>
					<div className="container send-setting">
						<div className="m1-form">
							<div className="m1-form-row">
                <label className="m1-form-label">邮件主题</label>
                <div className="m1-form-content">
                  <input 
                  	className="m1-form-input" 
                  	placeholder="一个好的邮件标题是提高邮件打开率的有效方式之一" 
                  	value={props.subject || ''}
                  	onChange={e => props.onChangeSubject(e.target.value)}
                  />
                </div>
              </div>
							<div className="m1-form-row">
                <label className="m1-form-label">邮件摘要</label>
                <div className="m1-form-content">
                  <div className="input">
                  	<input 
                  		className="m1-form-input" 
                  		placeholder="当邮件正文未被打开时，邮件主题后面显示的邮件内容概要"
                  		value={props.summary || ''}
                  		onChange={e => props.onChangeSummary(e.target.value)}
                  	/>
                  </div>
                  <div className="intro">
                  	注：摘要不会显示在邮件的文正中，长度小于30字
                  </div>
                </div>
              </div>
							<div className="m1-form-row">
                <label className="m1-form-label">发件信息</label>
                <div className="m1-form-content">
                  {!hasEmailAccount && <ButtonAdd
                  	onClick={props.onAddEmailAccount}
                  >
                  	添加发件账户
                  </ButtonAdd>}
                  {hasEmailAccount && <EmailAccountInfo
                                    	emailAccount={emailAccount}
                                    	onChange={props.onAddEmailAccount}
                                    />}
                </div>
              </div>
							{isSendTest && <div className="m1-form-row">
							                <label className="m1-form-label">测试发送</label>
							                <div className="m1-form-content">
							                  <div className="input input-test">
							                  	<input 
							                  		className="m1-form-input" 
							                  		placeholder="如: m1service@mail.m1world.com"
							                  		value={props.tos || ''}
							                  		onChange={e => props.onChangeTos(e.target.value)}
							                  	/>
							                  	<Button onClick={props.onSendTest} >发送测试</Button>
							                  </div>
							                  <div className="intro">
							                  	注：测试邮箱最大使用量10个，多个用空格分割
							                  </div>
							                </div>
							              </div>}
						</div>
					</div>
				</ModalBody>
				<ModalFooter>
					<Button onClick={onClose} >取消</Button>
					<Button color={Colors.PRIMARY} onClick={props.onConfirm} >确定</Button>
				</ModalFooter>
			</Modal>
		)
	}
}

SendSettingModal.propTypes = propTypes

export default SendSettingModal