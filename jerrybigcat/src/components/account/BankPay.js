import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Button, Text, Colors } from '../m1ui'

const propTypes = {
	show: PropTypes.bool,
	onClose: PropTypes.func.isRequired,
	onSubmit: PropTypes.func
}

class BankPay extends Component {

	render() {
		const { show, onClose, onSubmit, ...props } = this.props
		return (
			<Modal
				{...props}
				className="center"
				backdrop="static"
				show={show}
				onClose={onClose}
				style={{width: '620px'}}
			>
				<Modal.Header>
					<Modal.Title>银行转账</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="bankpay-info">
						<p>
							现在您可以通过银行转账方式付款，
							并在付款后拍摄凭据发送到邮箱：<Text color={Colors.PRIMARY}>m1service@meihua.info</Text>
							请注明“M1云端市场部充值余额XXX元”，并留下您的姓名、M1注册邮箱和联系电话，以便我们尽快与您取得联系，确认付款状态
						</p>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={onClose}>取消</Button>	
					<Button color={Colors.PRIMARY} onClick={onSubmit}>确定</Button>
				</Modal.Footer>
			</Modal>
		)
	}
}

BankPay.propTypes = propTypes

export default BankPay