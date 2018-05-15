import React from 'react'
import PropTypes from 'prop-types'

import { utils } from '../../../utils'
import { Button, Modal, Colors } from '../../m1ui'

import MessageItem from './MessageItem'
import InboxButtons from './InboxButtons'

const {Header, Title, Body, Footer} = Modal

const MessageDetailModal = ({show, onClose, reply, replySubject, replyTypes, ...props}) => {
	return (
		<Modal
			show={show}
			onClose={onClose}
			style={{width: '760px'}}
		>
			<Header className="message-header" >
				<Title>{replySubject}</Title>
				<InboxButtons 
					replyTypes={replyTypes}
					onAddToReplyType={props.onAddToReplyType}
					onAddToCampaign={props.onAddToCampaign}
					onBlacklist={props.onBlacklist}
					onRemoveRecipient={props.onRemoveRecipient}
				/>
			</Header>
			<Body>
				<div className="message-detail">
				{reply.map((item, i) => {
					return (
						<MessageItem 
							key={i}
							guest={!item.system} 
							name={item.fullname} 
							email={item.email}
							content={item.content} 
							gmtCreate={utils.formatDateTime(item.gmtCreate, '/')}
						/>
					)
				})}
				</div>
			</Body>
			<Footer>
				<Button color={Colors.PRIMARY} onClick={props.onReplyEmail} >回邮件给TA</Button>
			</Footer>
		</Modal>
	)
}

export default MessageDetailModal