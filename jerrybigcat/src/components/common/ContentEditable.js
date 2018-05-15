import React, { Component } from 'react'
import PropTypes from 'prop-types'

const propTypes = {
	html: PropTypes.any,
	onChange: PropTypes.func,
	componentClass: PropTypes.node
}

class ContentEditable extends Component {
	shouldComponentUpdate(nextProps) {
		return nextProps.html !== this.lastHtml
	}

	emitChange = () => {
		const html = this.refs.elem.innerHTML
		if(this.props.onChange && html !== this.lastHtml) {
			this.props.onChange({
				target: {
					value: html
				}
			})
		}
		this.lastHtml = html
	}

	render() {
		const { html, componentClass, ...props } = this.props
		const Component = componentClass || 'div'
		return (
			<Component 
				{...props}
				ref="elem"
				onInput={this.emitChange}
				onBlur={this.emitChange}
				contentEditable
				dangerouslySetInnerHTML={{__html: html}}
			/>
		)
	}
}

ContentEditable.propTypes = propTypes

export default ContentEditable