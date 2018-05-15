import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal, Button, Colors, Sizes } from '../../../components/m1-ui'
import { msg } from '../../../utils'
import { editInvite } from '../../../api/account'
import TeamAuth from './TeamAuth'

const propTypes = {
	show: PropTypes.bool,
	onClose: PropTypes.func.isRequired,
	onSubmit: PropTypes.func,
	account: PropTypes.object
}

class TeamEditAuth extends Component {
	constructor(props) {
		super(props)

		this.auth = null

		this.state = {
			showHighAuth: false
		}
	}

	handleAuthChange = auth => {
		this.auth = auth
	}

	handleToggleHigh = showHighAuth => {
		this.setState({showHighAuth})
	}

	handleSubmitSave = e => {
		if(!this.auth) {
			return
		}

		let option = {
			type: this.auth.type,
			detail: this.auth.detail
		}
		if(this.auth.userid) {
			option.user_id = this.auth.userid
		} else {
			option.invite_id = this.auth.invite_id
		}
		msg.loading()
		editInvite(option).then(result => {
			msg.close()
			if(result.success) {
				msg.info('修改成功')
				if(this.props.onSubmit) {
					this.props.onSubmit(this.auth)
				}
			} else {
				msg.info(result.data)
			}
		})
	}

	render() {
		const { show, onClose, searchList, account, ...props } = this.props

		return (
			<Modal
				show={show}
				onClose={onClose}
				style={{width:this.state.showHighAuth ? '1000px' : '600px'}}
			>
				<Modal.Header>
					<Modal.Title>编辑账号权限</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<TeamAuth 
						onChange={this.handleAuthChange}
						account={account}
						onToggleHigh={this.handleToggleHigh}
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={onClose}>取消</Button>
					<Button color={Colors.PRIMARY} onClick={this.handleSubmitSave}>确定</Button>
				</Modal.Footer>
			</Modal>
		)
	}
}

TeamEditAuth.propTypes = propTypes

export default TeamEditAuth