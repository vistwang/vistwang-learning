	import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TagColors, TagSizes } from '../enums'
import { classNames, objectValues } from '../utils'



class Tag extends Component {

	handleClose = e => {
		const { onClose } = this.props
		if(onClose) {
			onClose(e)
		}
	}

	randerClose = (props) => {
		return (
			<i className="m1-tag-close" onClick={this.handleClose}></i>
		)
	}

	randerCheck = (props) => {
		return (
			<i className="m1-tag-check"></i>
		)
	}

	render() {
		const { color, size, removeable, checkable, onClose, ...props } = this.props
		const profix = 'm1-tag'
		const className = classNames(
			profix,
			color ? profix + '-' + color : null,
			size ? profix + '-' + size: null,
			props.className
		)
		return (
			<span
				{...props}
				className={className}
			>
			{props.children}
			{removeable && this.randerClose()}
			{checkable && this.randerCheck()}
			</span>
		)
	}
}

Tag.propTypes = {
	color: PropTypes.oneOf(objectValues(TagColors)),
	size: PropTypes.oneOf(objectValues(TagSizes)),
	removeable: PropTypes.bool,
	checkable: PropTypes.bool,
	onClose: PropTypes.func
}


export default Tag
