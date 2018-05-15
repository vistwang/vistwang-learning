import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'


const EmailServiceItem = ({item, isSelect, onSelect, ...props}) => {
	return (
		<li 
			className={classnames({'select': isSelect})} 
			onClick={e => onSelect(item.type)}
		>
			<span className="img"><img src={item.icon}/></span>
			<p>{item.label}</p>
		</li>
	)
}

export default EmailServiceItem