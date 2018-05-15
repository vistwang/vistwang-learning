import React from 'react'
import PropTypes from 'prop-types'

import ContentEditable from '../../common/ContentEditable'

const CodeContent = (props) => {
	return (
		<div className="code-content">
			<ContentEditable 
				componentClass="pre"
				html={props.html}
				onChange={props.onChange}
			/>
		</div>
	)
}

export default CodeContent