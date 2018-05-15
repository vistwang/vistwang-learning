import React, { Component } from 'react'
import PropTypes from 'prop-types'

import CustomerPreviewItem from './CustomerPreviewItem'

import imgEmpty from '../../../assets/images/empty.svg'

const CustomerPreviewTable = ({queryContacts}) => {
	return (
		<table className="m1-table">
			<tbody>
				{queryContacts.map((item, i) => {
					return (
						<CustomerPreviewItem 
							key={i} 
							name={item.name} 
							avatar={item.avatar}
							telephone={item.telephone}
						/>
					)
				})}
			</tbody>
		</table>
	)
}


class CustomerPreview extends Component {

	render() {
		const { queryTotalCount, queryContacts } = this.props
		const isEmpty = queryContacts.length === 0
		return (
			<div className="customer-preview">
				<div className="customer-preview-head">
					<h2>当前条件匹配到{queryTotalCount}位用户</h2>
					<p>如果你将此campaign设置为运行状态后，此campaign流程将触及到这些用户。</p>
				</div>
				<div className="customer-preview-content">
					{!isEmpty ? <CustomerPreviewTable queryContacts={queryContacts} /> : <div className="empty-content"><img src={imgEmpty}/></div>}
				</div>
			</div>
		)
	}
}

CustomerPreview.propTypes = {
	queryTotalCount: PropTypes.number,
	queryContacts: PropTypes.array
}
CustomerPreview.defaultProps = {
	queryTotalCount: 0,
	queryContacts: []
}

export default CustomerPreview