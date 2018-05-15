import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { utils } from '../../utils'
import { Text, Modal, Colors } from '../m1-ui/'

const propTypes = {
	coupons: PropTypes.array,
	show: PropTypes.bool,
	onClick: PropTypes.func
}

const renderTable = ({coupons}) => {
	let couponList
	if(coupons.length === 0) {
		couponList = <tr><td colSpan="6"><div className="empty-list">您还没有优惠券</div></td></tr>
	} else {
		couponList = coupons.map(item => {
			let statusStr = ''
			if(item.expire_time < new Date()) {
				statusStr = <Text color={Colors.IGNORE} >已过期</Text>
			} else if(item.status === 1){
				statusStr = <Link to={{pathname: '/price', search: `couponid=${item.id}`}}>立即使用</Link>
			} else {
				statusStr = <Text color={Colors.IGNORE} >已使用</Text>
			}
			return (<tr key={item.id}>
								<td>{item.coupon_code}</td>
								<td>{item.coupon_amount}</td>
								<td>{utils.formatDateTime(item.createtime)}</td>
								<td>{utils.formatDateTime(item.expire_time)}</td>
								<td>{item.description}</td>
								<td>{statusStr}</td>
							</tr>)
		})
	}
	return (
		<table className="m1-table">
			<thead>
				<tr>
					<th>券码</th>
					<th>金额</th>
					<th>生效时间</th>
					<th>到期时间</th>
					<th>备注</th>
					<th>状态</th>
				</tr>
			</thead>
				<tbody>
					{couponList}
				</tbody>
		</table>
	)
}

const  CouponDetail = ({show, onClose, coupons, ...props}) => {
	return(
		<Modal show={show} onClose={onClose} backdrop="static" style={{width:'900px'}}>
			<Modal.Header>
			 	<Modal.Title>我的优惠券</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="table-content" style={{minHeight: '300px'}} >
				{renderTable({coupons})}
				</div>
			</Modal.Body>
		</Modal>
	)
}

CouponDetail.propTypes = propTypes

export default CouponDetail

