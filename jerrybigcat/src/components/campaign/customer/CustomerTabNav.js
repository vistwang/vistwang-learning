import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { ReplyStatus } from '../../../base/enums'

const CustomerTabNav = ({status, schema, ...props}) => {
	const isTotal = status === ReplyStatus.TOTAL
	const isOpen = status === ReplyStatus.OPENED
	const isReply = status === ReplyStatus.REPLIED
	const isClick = status === ReplyStatus.CLICKED
	const isInterest = status === ReplyStatus.INTERESTED
	const isUnsubscribe = status === ReplyStatus.UNSUBSCRIBED
	const isBounce = status === ReplyStatus.BOUNCE
	const isUntouched = status === ReplyStatus.UNTOUCHED
	return (
		<ul className="m1-tab-nav">
		  <li className={classnames({'select':isTotal})}><a onClick={e => props.onSelect(ReplyStatus.TOTAL)} >所有({schema.total || 0})</a></li>
		  <li className={classnames({'select':isOpen})}><a onClick={e => props.onSelect(ReplyStatus.OPENED)} >打开({schema.openedCount || 0})</a></li>
		  <li className={classnames({'select':isReply})}><a onClick={e => props.onSelect(ReplyStatus.REPLIED)} >回复({schema.repliedCount || 0})</a></li>
		  <li className={classnames({'select':isClick})}><a onClick={e => props.onSelect(ReplyStatus.CLICKED)} >点击({schema.clickedCount || 0})</a></li>
		  <li className={classnames({'select':isUnsubscribe})}><a onClick={e => props.onSelect(ReplyStatus.UNSUBSCRIBED)} >退订({schema.unsubscribedCount || 0})</a></li>
		  <li className={classnames({'select':isBounce})}><a onClick={e => props.onSelect(ReplyStatus.BOUNCE)} >弹回({(schema.bulletCount || 0)})</a></li>
		  <li className={classnames({'select':isUntouched})}><a onClick={e => props.onSelect(ReplyStatus.UNTOUCHED)} >未触达({schema.untouchedCount || 0})</a></li>
		</ul>
	)
}

export default CustomerTabNav