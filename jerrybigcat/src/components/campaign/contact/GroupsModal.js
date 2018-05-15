import React from 'react'
import PropTypes from 'prop-types'

import { Dropdown, MenuItem, Button, Modal, Colors } from '../../m1ui'
import GroupDropdown from './GroupDropdown'


const {Header, Title, Body, Footer} = Modal

const GroupsModal = ({show, onClose, title, searchKey, groups, ...props}) => {
	return (
		<Modal
			show={show}
			onClose={onClose}
			style={{width: '450px'}}
		>
			<Header>
				<Title>{title || '添加到群组'}</Title>
			</Header>
			<Body>
				<div style={{textAlign: 'center'}}>
					<GroupDropdown
						placeholder="请输入群组名称"
						title={title}
						searchKey={searchKey}
						groups={groups}
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

GroupsModal.propTypes = {
	groups: PropTypes.array
}
GroupsModal.defaultProps = {
	groups: []
}

export default GroupsModal