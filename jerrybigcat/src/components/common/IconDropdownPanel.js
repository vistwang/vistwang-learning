import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Icon } from '../m1ui'
import ButtonIcon from './ButtonIcon'

class IconDropdownPanel extends Component {
	constructor(props) {
		super(props)

		this.state = {
			togglePanel: false
		}
	}
	componentDidMount() {
		document.addEventListener('click', this.handleDocumentClick, false)
	}
	componentWillUnmount() {
		document.removeEventListener('click', this.handleDocumentClick, false)
	}

	handleDocumentClick = (e) => {
		if(e.target !== this.refs.wrap && !this.refs.wrap.contains(e.target)) {
			this.setState({togglePanel: false})
		}
	}
	render () {
		const {className, iconClassName, panelClassName, name, children, ...props} = this.props
		return (
			<span 
				ref="wrap"
				className={classnames('dropdown-panel-wrap', className)}
			>
				<ButtonIcon 
					{...props}
					name={name}
					className={iconClassName}
					onClick={e => this.setState({togglePanel: !this.state.togglePanel})}
					/>
				<div 
					ref="panel"
					className={classnames(
						'dropdown-panel',
						panelClassName,
						{'open': this.state.togglePanel}
					)}
				>
					{children}
				</div>
			</span>
		)
	}
}


IconDropdownPanel.propTypes = {
	name: PropTypes.string.isRequired
}

export default IconDropdownPanel
