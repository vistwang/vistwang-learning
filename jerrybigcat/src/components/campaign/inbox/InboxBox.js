import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Icon } from '../../m1ui'
import InboxTable from './InboxTable'

class InboxBox extends Component {
	constructor(props) {
		super(props)

		this.state = {
			toggleShow: false
		}
	}
	render() {
		const {toggleShow} = this.state
		const {icon, name, total, currentCount, ...props} = this.props
		return (
			<div className="inbox-box">
				<h2 onClick={e => this.setState({toggleShow: !toggleShow})} >
					<Icon name={icon} />
					<span className="title">{name}（{currentCount}/{total}）</span>
					<Icon name={toggleShow ? 'unfold-up' : 'unfold-down'} />
				</h2>
				<InboxTable {...props} show={toggleShow} />
			</div>
		)
	}
}

InboxBox.propTypes = {
	total: PropTypes.number,
	currentCount: PropTypes.number,
	icon: PropTypes.string,
	name: PropTypes.string,
}

InboxBox.defaultProps = {
	recipients: [],
	total: 0,
	currentCount: 0,
}

export default InboxBox