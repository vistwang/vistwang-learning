import React from 'react'
import PropTypes from 'prop-types'

import { Icon } from '../../m1ui'

import CustomerRow from './CustomerRow'

const CustomerTable = ({customers, ...props}) => {
	return (
		<table className="m1-table">
			<thead>
				<tr>
					<th></th>
					<th>姓名</th>
					<th>邮箱</th>
					<th>状态</th>
					<th>触达</th>
					<th>打开</th>
					<th>回复</th>
					<th>当前步骤</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{customers.map((customer, i) => {
					return (
						<CustomerRow 
							key={i}
							customer={customer}
							onChecked={props.onChecked}
						/>
					)
				})}
			</tbody>
		</table>
	)
}

export default CustomerTable