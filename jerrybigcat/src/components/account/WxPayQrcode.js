import React, { Component } from 'react'
import PropTypes from 'prop-types'
import QRCode from 'qrcode.react'
import { Modal } from '../m1ui'

const propTypes = {
	show: PropTypes.bool,
	onClose: PropTypes.func,
	qrcodeUrl: PropTypes.string
}

class WxPayQrcode extends Component {
	render() {
		const { show, onClose, qrcodeUrl } = this.props
		return (
			<Modal show={show} onClose={onClose} backdrop="static" style={{width: '500px'}} >
				<Modal.Body style={{textAlign: 'center', paddingTop: '30px', paddingBottom: '30px'}}>
					<p style={{fontSize: '22px'}} >请扫描下方二维码完成支付</p>
					<QRCode value={qrcodeUrl} size={270} />
					<br/>
					<br/>
					<p>打开微信，点击底部的“发现”，<br/>
							使用“扫一扫”进行支付。</p>
				</Modal.Body>
			</Modal>
		)
	}
}

WxPayQrcode.propTypes = propTypes

export default WxPayQrcode