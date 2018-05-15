import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Icon } from '../../m1ui'
import InboxRow from './InboxRow'

import imgEmpty from '../../../assets/images/empty.svg'

class InboxTable extends Component {
	constructor(props) {
		super(props)

		this.state = {
			toggleMore: false
		}
	}
	renderList() {
		const {recipients, ...props} = this.props
		delete props.show
		delete props.currentPage
		delete props.hasNextPage
		return (
			<table className="m1-table">
				<tbody>
				{recipients.map((item, i) =>{
						return <InboxRow key={i} {...props} recipient={item} />
					})}
				</tbody>
			</table>
		)
	}
	renderEmpty() {
		return (
			<div className="empty-content">
				<img src={imgEmpty} className="no-add"/>
			</div>
		)
	}
	render() {
		const { toggleMore } = this.state
		const { show, recipients, currentPage, hasNextPage, ...props} = this.props
		const isEmpty = recipients.length === 0
		return (
			<div className="inbox-table" style={{display: show ? 'block' : 'none'}} >
				<div className="inbox-table-content" >
					{isEmpty
						? this.renderEmpty()
						: this.renderList()}
				</div>
				{hasNextPage && <div className="load-more" onClick={e => props.onLoadMore(currentPage + 1)} >
									<span><Icon name="pack-down" /> 加载更多</span> 
								</div>}
			</div>
		)
	}
}

InboxTable.propTypes = {
	recipients: PropTypes.array,
	show: PropTypes.bool,
}

InboxTable.defaultProps = {
	recipients: [],
	show: false,
}

export default InboxTable