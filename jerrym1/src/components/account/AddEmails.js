import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { utils, msg } from '../../utils'
import { Button, Icon, Tag, Input, Colors } from '../m1-ui'

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

		if(inputEmail.length === 0) {
			return
		} else if(!utils.isEmail(inputEmail)) {
			msg.info('邮箱格式不正确')
			return
		}

		if(this.hasEmail(inputEmail)){
			msg.info('此邮箱已在列表中')
		} else {
			emails.push(inputEmail)
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
			return email !== removeEmail
		})

		this.emails = newEmails

		this.handleEmailsChange()
	}

	handleEmailsChange = () => {
		if(this.props.onChange) {
			this.props.onChange(this.emails)
		}
	}

	hasEmail(email) {
		return this.emails.indexOf(email) >= 0
	}

	render() {
		const { emails, placeholder } = this.props
		const { inputEmail } = this.state
		const emailList = emails.map((email, i) => {
			return <Tag key={i} color={Colors.PRIMARY} removeable onClose={e => this.handleRemoveEmail(email)}>{email}</Tag>
		})

		return (
			<div className="add-email-list">
				{emailList}
				<Input placeholder={placeholder || '请输入邮箱'} value={inputEmail} onChange={this.handleInputEmailChange} onKeyUp={this.handleAddEmailKeyUp} />
				<Button className="btn-add-email" color={Colors.TAGPRIMARY} onClick={this.handleAddEmailClick} > <Icon name="add-to" /> 添加</Button>
			</div>
		)
	}
}

AddEmails.propTypes = propTypes

export default AddEmails