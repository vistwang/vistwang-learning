import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Pagination, Text, Colors } from '../m1ui'
import { utils } from '../../utils'
import { getGoldDetail } from '../../api/account'

const propTypes = {
	show: PropTypes.bool,
	onClose: PropTypes.func
}

class GoldDetail extends Component {
	constructor(props) {
		super(props)

		this.index = 1
		this.size = 10
		this.total = 0

		this.state = {
			logs: []
		}
	}

	componentWillMount() {
		this.getGoldDetail()
	}

	getGoldDetail() {
		getGoldDetail(this.index, this.size).then(result => {
			if(result.success) {
				this.total = result.data.total
				this.setState({
					logs: result.data.logs
				})
			}
		})
	}

	handlePageChange = page => {
		page = parseInt(page)
		if(page !== this.index) {
			this.index = page
			this.getGoldDetail()
		}
	}

	render() {
		const { show, onClose, ...props } = this.props
		const logList = this.state.logs.map((item, i) => {
			const feeColor = item.fee > 0 ? Colors.SUCCESS : Colors.DANGER
			return <tr key={i}>
				<td>{utils.formatDateTime(item.createTime)}</td>
				<td><Text color={feeColor}>{item.type === 1 && '+'}{item.fee}</Text></td>
				<td>{item.total_fee}</td>
				<td>{item.detail}</td>
			</tr>
		})
		return (
			<Modal 
				{...props}
				show={show}
				onClose={onClose}
				style={{width: '700px'}}
			>
				<Modal.Header>
					<Modal.Title>M币任务列表</Modal.Title>
				</Modal.Header>
				<Modal.Body style={{padding: '10px 30px'}}>
						<table className="m1-table">
							<thead>
								<tr>
									<th style={{width: '30%'}}>时间</th>
									<th style={{width: '20%'}}>收支</th>
									<th style={{width: '20%'}}>M币余额</th>
									<th style={{width: '30%'}}>详情</th>
								</tr>
							</thead>
							<tbody>
									{logList}
							</tbody>
						</table>
				</Modal.Body>
				<Modal.Footer>
					<Pagination 
						firstPage="首页"
						lastPage ="尾页"
						currentPage={this.index}
						currentSize={this.size}
						total={this.total}
						onPageChange={this.handlePageChange}
					/>
				</Modal.Footer>
			</Modal>
		)
	}
}

GoldDetail.propTypes = propTypes

export default GoldDetail