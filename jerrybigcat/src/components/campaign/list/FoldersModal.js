import React from 'react'
import PropTypes from 'prop-types'

import { Dropdown, MenuItem, Button, Modal, Colors } from '../../m1ui'
import FolderDropdown from './FolderDropdown'


const {Header, Title, Body, Footer} = Modal

const FoldersModal = ({show, onClose, searchKey, folders, ...props}) => {
	return (
		<Modal
			show={show}
			onClose={onClose}
			style={{width: '450px'}}
		>
			<Header>
				<Title>{'添加到文件夹'}</Title>
			</Header>
			<Body>
				<div style={{textAlign: 'center'}}>
					<FolderDropdown
						placeholder="请输入文件夹名称"
						searchKey={searchKey}
						list={folders}
						onSelect={props.onSelect}
						onChange={props.onChangeKey}
					/>
				</div>
			</Body>
			<Footer>
				<Button onClick={onClose} >取消</Button>
				<Button color={Colors.PRIMARY} onClick={props.onConfirm} >确定</Button>
			</Footer>
		</Modal>
	)
}

FoldersModal.propTypes = {
	folders: PropTypes.array
}
FoldersModal.defaultProps = {
	folders: []
}

export default FoldersModal