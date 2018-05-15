import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal } from '../m1-ui'

import { user } from '../../base/account'

const propTypes = {
	show: PropTypes.bool,
	onClose: PropTypes.func,
	tasks: PropTypes.array
}

const typeStr = {
	1: '首次',
	2: '每日',
	3: '无限'
}

class GoldTaskList extends Component {

	render() {
		const { show, onClose, tasks, ...props } = this.props
		const taskList = tasks.map((item, i) => {
			const url = user.filter.goldTask[item.name]
			const finishStr = item.isFinished ? '已完成' : url ? <a href={url}>前往</a> : '未完成'
			return <tr key={i}>
				<td>{item.name}</td>
				<td>+{item.price}</td>
				<td>{typeStr[item.type]}</td>
				<td>{finishStr}</td>
			</tr>
		})
		return (
			<Modal 
				{...props}
				show={show}
				onClose={onClose}
				style={{width: '760px'}}
			>
				<Modal.Header>
					<Modal.Title>M币任务列表</Modal.Title>
				</Modal.Header>
				<Modal.Body style={{padding: '10px 30px 30px'}}>
						<table className="m1-table">
							<thead>
								<tr>
									<th>任务</th>
									<th>可获取M币</th>
									<th>每日上限</th>
									<th>完成状态</th>
								</tr>
							</thead>
								<tbody>
									{taskList}
								</tbody>
						</table>
				</Modal.Body>

			</Modal>
		)
	}
}

GoldTaskList.propTypes = propTypes

export default GoldTaskList

