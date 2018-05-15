import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { classNames } from '../utils'
import SafeAnchor from './SafeAnchor'

const propTypes = {
	active: PropTypes.bool,
	disabled: PropTypes.bool,
	eventKey: PropTypes.any,
	href: PropTypes.string,
	onClick: PropTypes.func,
	onSelect: PropTypes.func,
	subMenu: PropTypes.bool,
	title: PropTypes.string,
	// 表示点击此菜单项 不可关闭下拉菜单
	notClose: PropTypes.bool,
	// 表示点击此菜单项 可关闭下拉菜单(在父元素设置不可关闭的情况下使用)
	canClose: PropTypes.bool,
}

const defaultProps = {
	disabled: false
}

class MenuItem extends Component {

	handleClick = e => {
		const { href, disabled, onSelect, eventKey } = this.props

		if(!href || disabled) {
			e.preventDefault()
		}

		if(disabled) {
			return
		}

		if(onSelect) {
			onSelect(eventKey, e)
		}
	}

	render() {
		const { className, disabled, active, subMenu, title, style, notClose, canClose, children, ...props } = this.props
		delete props.eventKey
		return (
			<li
				{...props}
				className={classNames(
					className, 
					{
						'm1-dropdown-submenu': subMenu, 
						'menu-not-close': notClose,
						'menu-can-close': canClose,
						active, 
						disabled
					}
				)}
				style={style}
			>
				{(title || title !== 0 || children || children === 0) &&
					<SafeAnchor
						onClick={this.handleClick}
					>
						{title}
						{!subMenu && children}
					</SafeAnchor>}
				{subMenu && children}
			</li>
		)
	}
}

MenuItem.propTypes = propTypes
MenuItem.defaultProps = defaultProps

export default MenuItem