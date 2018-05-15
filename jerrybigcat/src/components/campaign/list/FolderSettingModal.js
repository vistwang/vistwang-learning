import React from 'react'
import PropTypes from 'prop-types'

import { Modal, Button, Colors } from '../../m1ui'


const propTypes = {
	id: PropTypes.number,
	show: PropTypes.bool,
	onClose: PropTypes.func,
	onApply: PropTypes.func,
}

const FolderSettingModal = ({show, onClose, onApply, folderName, folderId, onChangeFolder, ...props}) => {
	return(
		<Modal
			{...props}
			show={show}
			onClose={onClose}
			className="center"
			style={{width: '500px'}}
		>
			<Modal.Header>
				<Modal.Title>{!!folderId ? '编辑文件夹' : '新建文件夹'}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<input className="m1-form-input" placeholder="请输入文件夹名称" value={folderName} onChange={onChangeFolder} />
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={onClose} >取消</Button>
				<Button color={Colors.PRIMARY} onClick={onApply} >确认</Button>
			</Modal.Footer>
		</Modal>
	)
}

FolderSettingModal.propTypes = propTypes

export default FolderSettingModal