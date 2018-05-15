import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { utils, msg } from '../../../utils'
import { Button, Icon, Tag, Input, Colors } from '../../m1ui'

const propTypes = {
	emails: PropTypes.array,
	onChange: PropTypes.func,
	placeholder: PropTypes.string
}

class AddEmails extends Component {
	constructor(props) {
		super(props)

		this.emails = []

		this.state = {
			inputEmail: ''
		}
	}

	componentWillReceiveProps(nextProps) {
		this.emails = nextProps.emails

	}

	handleInputEmailChange = e => {
		const inputEmail = e.target.value.trim()
		this.setState({inputEmail})
	}

	handleAddEmailClick = e => {
		this.addEmail()
	}

	handleAddEmailKeyUp = e => {
		if(e.keyCode === 13) {
			this.addEmail()
		}
	}

	handleRemoveEmail = email => {
		this.removeEmail(email)
	}

	addEmail = () => {
		const emails = this.emails
		const { inputEmail } = this.state

		let emailArr = inputEmail.split(/\s+/)
		emailArr = emailArr.filter(email => email.trim() !== '')

		if(inputEmail.trim().length === 0) {
			return
		} else if(!this.checkEmail(emailArr)) {
			msg.info('邮箱或域格式不正确')
			return
		}

		if(this.hasEmail(emailArr)){
			msg.info('列表中已存在')
		} else {
			emails.push(...emailArr)
			this.setState({
				inputEmail: ''
			})

			this.emails = emails

			this.handleEmailsChange()
		}
	}

	removeEmail = (removeEmail) => {
		const emails = this.emails
		const newEmails = emails.filter(email => {
			return email.trim() !== removeEmail.trim()
		})
		this.emails = newEmails

		this.handleEmailsChange()
	}

	handleEmailsChange = () => {
		if(this.props.onChange) {
			this.props.onChange(this.emails)
		}
	}

	checkEmail = (emails) => {
		return emails.every(email => utils.isEmail(email) || utils.isDomain(email))
	}

	hasEmail(emails) {
		return emails.some(email => this.emails.indexOf(email) >= 0) 
	}

	render() {
		const { emails, placeholder } = this.props
		const { inputEmail } = this.state
		const emailList = emails.map((email, i) => {
			return <Tag key={i} color={Colors.PRIMARY} removeable onClose={e => this.handleRemoveEmail(email)}>{email}</Tag>
		})

		return (
				<div className="add-email-list">
					<div className="email-list">
						{emailList}
					</div>
					<div className="email-input">
						<Input placeholder={placeholder || '如: andy.zhang@meihua.info meihua.com mingdao.com'} value={inputEmail} onChange={this.handleInputEmailChange} onKeyUp={this.handleAddEmailKeyUp} />
						<Button className="btn-add-email" color={Colors.TAGPRIMARY} onClick={this.handleAddEmailClick} > <Icon name="add-to" /> 添加</Button>
						<p>多个请使用空格隔开</p>
					</div>
				</div>
		)
	}
}

AddEmails.propTypes = propTypes

export default AddEmails