import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Frame from 'react-frame-component'

import guestAvatar from '../../../assets/images/reply_avatar_guest.svg'
import systemAvatar from '../../../assets/images/reply_avatar_system.svg'

const MessageItem = ({guest, name, email, content, gmtCreate, ...props}) => {
	const avatar = guest ? guestAvatar : systemAvatar
	return(
		<div className={classnames(
				'message-item',
				{guest: guest}
			)}>
			<h2>
				<div className="avatar">
					<img src={avatar}/>
				</div>
				<strong>{name}</strong>
				<span className="email">
					{email}
				</span>
				<span className="datetime">
					{gmtCreate}
				</span>
			</h2>
			<div className="message-content">
				<Frame
					initialContent={`<!DOCTYPE html><html><head></head><body><div>${content}</div><div id="mountHere"></div></body></html>`}
					mountTarget='#mountHere'
				>
				</Frame>
			</div>
			{/*guest && <div className="message-source">
							来自阿里邮箱iPhone版
						</div>*/}
		</div>
	)
}

export default MessageItem