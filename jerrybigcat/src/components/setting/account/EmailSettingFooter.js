import React from 'react'
import PropTypes from 'prop-types'

import { Button, Modal, Colors } from '../../m1ui'

const { Footer } = Modal

const propTypes = {
	step: PropTypes.number,
	onCancel: PropTypes.func,
	onConfirm: PropTypes.func
}

const EmailSettingFooter = ({step, onCancel, onConfirm}) => {
	return (
		<Footer key="footer">
			<Button onClick={onCancel} >{step === 1 ? '取消' : '上一步'}</Button>
			<Button color={Colors.PRIMARY} onClick={onConfirm} >{step === 1 ? '下一步' : '保存设置'}</Button>
		</Footer>
	)
}

EmailSettingFooter.propTypes = propTypes

export default EmailSettingFooter