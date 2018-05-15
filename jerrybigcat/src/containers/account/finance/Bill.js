import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import DateRangePicker from 'react-bootstrap-daterangepicker'

import { Tag, Button, ButtonGroup, Pagination, Icon, Colors, Sizes } from '../../../components/m1ui/'
import { utils, msg, config } from '../../../utils'
import { getBillList, alipay, wxpay } from '../../../api/account'
import { user } from '../../../base/system'

import WxPay from '../../../components/account/WxPay'

const DateFormat = 'YYYY-MM-DD'
const defaultStartDate = moment().subtract(6, 'days')
const defaultEndDate = moment()

const btnStatus = bool => {
	return bool ? Colors.PRIMARY : Colors.NONE
}

class Bill extends Component {
	constructor(props) {
		super(props)

		this.pageIndex = 1
		this.pageSize = 10
		this.sd = defaultStartDate.format(DateFormat)
		this.ed = defaultEndDate.format(DateFormat)
		this.status = -1


		this.state = {
			totalCount: 0,
			trades: [],

			showWxPay: false,
			wxpay_trade_id: '',
			wxpayQrcodeUrl: '',

			ranges: {
				'今天': [moment(), moment()],
				'昨天': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
				'最近7天': [moment().subtract(6, 'days'), moment()],
				'最近30天': [moment().subtract(29, 'days'), moment()],
				'本月': [moment().startOf('month'), moment().endOf('month')],
				'上月': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
			},
			locale: {
				format: DateFormat,
				applyLabel: '确定',
				cancelLabel: '取消',
				customRangeLabel: '自定义',
				daysOfWeek: ['日','一','二','三','四','五','六'],
				monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
			},
			startDate: defaultStartDate,
			endDate: defaultEndDate
		}
	}

	componentDidMount() {
		this.loadBillList()
	}

	loadBillList() {
		const self = this
		// 开始结束时间精确到秒
		// 链接符转斜杠，为了兼容safari
		const sd =  this.sd.replace(/-/g,'/') + ' 00:00:00'
		const ed =  this.ed.replace(/-/g,'/') + ' 23:59:59'
		// 转换为时间戳
		const sdTime = utils.getTimeStamp(sd)
		const edTime = utils.getTimeStamp(ed)
		msg.loading()
		getBillList(sdTime, edTime, this.pageIndex, this.pageSize, this.status).then(result => {
			msg.close()
			if(result.success) {
				self.setState({
					totalCount: result.data.total_count,
					trades: result.data.trades
				})
			}
		})
	}

	listFilter = (status) => {
		if(status !== this.status) {
			this.status = status
			this.loadBillList(status)
		}
	}

	handlePageChange = page => {
		page = parseInt(page)
		if(page !== this.pageIndex) {
			this.pageIndex = page
			this.loadBillList()
		}
	}

	handlePickerApply = (e, picker) => {
		this.setState({
			startDate: picker.startDate,
			endDate: picker.endDate
		})

		this.pageIndex = 1
		this.sd = picker.startDate.format(DateFormat)
		this.ed = picker.endDate.format(DateFormat)
		this.loadBillList()
	}

	handleAlipayClick = tradeNo => {
		const trade = this.state.trades.find(item => item.tradeNo === tradeNo)

		alipay({
			totalFee: trade.totalFee,
			for: trade.payFor,
			tradeNo: trade.tradeNo,
			scope: '&ref=charge&c=' + config.DOMAIN + '/account/#/bill',
			callbackUrl: config.DOMAIN + '/payment.html?'
		})
	}

	handleWxpayclick = trade_id => {
		const trade = this.state.trades.find(item => item.trade_id === trade_id)
		msg.loading()
		wxpay({
			total_fee: trade.total_fee, 
			type: trade.pay_for,
			trade_id: trade_id,
			scope: 'c=' + config.DOMAIN + '/account/#/bill'
		}).then(result => {
			msg.close()
			if(result.success) {
				this.setState({
					wxpay_trade_id: result.data.trade_id,
					wxpayQrcodeUrl: result.data.qr_code_url,
					showWxPay: true
				})
			} else {
				msg.info(result.data)
			}
		})
	}

	handleWxPayClose = e => {
		this.setState({
			showWxPay: false,
			wxpay_trade_id: '',
			wxpayQrcodeUrl: ''
		})
	}

	renderTable() {
		const { trades, totalCount } = this.state
		let tradeList
		if(trades.length === 0) {
			tradeList = <tr><td colSpan="6"><div className="empty-list">您还没有账单信息</div></td></tr>
		} else {
			tradeList = trades.map(item => {
				const status = user.filter.tradeStatus[item.status]
				return (<tr key={item.id}>
									<td>{item.tradeNo}</td>
									<td>{item.totalFee}</td>
									<td>{utils.formatDateTime(item.gmtCreate)}</td>
									<td>{user.filter.tradeTypes[item.type]}</td>
									<td>{item.description}</td>
									<td>
										<div className="bill-status">
											<Tag color={status.color} size={Sizes.SMALL}>{status.name}</Tag>
											{item.status === 0 && <span className="bill-status-menu">
																							<Icon name="alipay" onClick={e => this.handleAlipayClick(item.tradeNo)} />
																							{/*<Icon name="wechat-payment" onClick={e => this.handleWxpayclick(item.tradeNo)} />*/}
																						</span>}
										</div>
									</td>
								</tr>)
			})
		}

		return (<div className="m1-row">
			<table className="m1-table">
					<thead>
						<tr>
							<th>账单编号</th>
							<th>金额</th>
							<th>时间</th>
							<th>交易类型</th>
							<th>账单备注</th>
							<th style={{width: '16%'}}>状态</th>
						</tr>
					</thead>
						<tbody>
							{tradeList}
						</tbody>
					</table>
					{totalCount > this.pageSize && 
						<div className="pagination">
							<Pagination 
								firstPage="首页"
								lastPage ="尾页"
								currentPage={this.pageIndex}
								currentSize={this.pageSize}
								total={totalCount}
								onPageChange={this.handlePageChange}
							/>
						</div>}
					</div>)
	}

	render() {
		const {startDate, endDate, ranges, locale, showWxPay, wxpay_trade_id, wxpayQrcodeUrl } = this.state
		const start = startDate.format(DateFormat)
		const end = endDate.format(DateFormat)
		const label = start === end ? start : start + ' ~ ' + end
		return (
			<div className="m1-panel">
				<div className="m1-panel-header">
					<div className="m1-row">
            <div className="m1-col-2"><h2>账单详情</h2></div>
            <div className="m1-col-10">
            	<div className="bill-btns">
            		<DateRangePicker
            			showDropdowns={true}
            			opens="left"
            			applyClass="m1-btn m1-btn-primary"
            			cancelClass="m1-btn"
            			startDate={startDate}
            			endDate={endDate}
            			ranges={ranges}
            			locale={locale}
            			onApply={this.handlePickerApply}
            		>
     							<span className="bill-picker">
	            			<i className="iconfont icon-m1-calendar"></i> <span>{label}</span>
     							</span>
            		</DateRangePicker>
	            	<ButtonGroup>
	            		<Button color={btnStatus(this.status === -1)} onClick={e => this.listFilter(-1)}>全部</Button>
	            		<Button color={btnStatus(this.status === 1)} onClick={e => this.listFilter(1)}>已付款</Button>
	            		<Button color={btnStatus(this.status === 0)} onClick={e => this.listFilter(0)}>未付款</Button>
	            	</ButtonGroup>
            	</div>
            </div>
          </div>
				</div>
				<div className="m1-panel-content">
						{this.renderTable()}
				</div>
				{showWxPay && 
					<WxPay
						trade_id={wxpay_trade_id}
						qrcodeUrl={wxpayQrcodeUrl}
						show={showWxPay}
						onClose={this.handleWxPayClose}
								/>}
			</div>
		)
	}
}

export default Bill