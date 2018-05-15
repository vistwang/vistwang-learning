import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment'

import { utils } from '../../../utils'
import { actions } from '../../../reducers/campaign/stat'
import { actions as globalActions } from '../../../reducers/campaign'
import { actions as emailActions } from '../../../reducers/campaign/email'

import Layout from '../../../components/campaign/layout/Layout'
import Chart from '../../../components/campaign/stat/Chart'
import DateRange from '../../../components/campaign/stat/DateRange'
import StatLoops from '../../../components/campaign/stat/StatLoops'
import StatDetail from '../../../components/campaign/stat/StatDetail'

class StatisticsContainer extends Component {
	componentDidMount() {
		this.requestCampaignStatistic()
	}

	getCampaignId = () => {
		let { campaignId } = this.props
		if(!campaignId) {
			const locationSearch = this.props.history.location.search
			campaignId = utils.getSearchParams(locationSearch).get('cid')
		}
		return campaignId
	}

	requestCampaignStatistic = (props) => {
		const campaignId = this.getCampaignId()
		if(!campaignId) {
			this.props.history.push('/')
			return
		}

		// const startDate = moment().subtract(7, 'days').startOf('day').valueOf()
		// const endDate = moment().endOf('day').valueOf()

		this.toRequestStatistics()
	}

	toRequestStatistics = (startDate, endDate) => {
		const campaignId = this.getCampaignId()
		let param = {
			campaignId,
			// gmtStart: startDate,
			// gmtEnd: endDate,
		}
		if(startDate) {
			param.gmtStart = startDate
		}
		if(endDate) {
			param.gmtEnd = endDate
		}

		this.props.reqChart({...param})
		this.props.reqStatistics(param)
		this.props.updateTimeSlot(startDate, endDate)
	}

	handleApplyPicker = (e, picker) =>  {
		// console.log(picker.startDate.format('YYYY-MM-DD HH:mm:ss'))
		// console.log(picker.endDate.format('YYYY-MM-DD HH:mm:ss'))
		const startDate = picker.startDate.valueOf()
		const endDate = picker.endDate.valueOf()
		this.toRequestStatistics(startDate, endDate)
	}

	render() {
		const {startDate, endDate, timeZone, overview, stepOverview, charts, ...props } = this.props
		return (
			<Layout
				history={props.history}
			>
				<DateRange 
					startDate={startDate}
					endDate={endDate}
					onApply={this.handleApplyPicker}
					timeZone={timeZone}
				/>
				<StatLoops report={overview} />
				<Chart report={charts} />
				<StatDetail reports={stepOverview} />
			</Layout>
		)
	}
}


const mapStateToProps = (state) => ({
	campaignId: state.campaignCreate.campaignId,

	timeZone: state.stat.timeZone,
	overview: state.stat.overview,
	stepOverview: state.stat.stepOverview,
	charts: state.stat.charts,
	startDate: state.stat.startDate,
	endDate: state.stat.endDate,
})

const mapDispatchToProps = (dispatch) => ({
	reqChart: bindActionCreators(actions.reqChart, dispatch),
	reqStatistics: bindActionCreators(actions.reqStatistics, dispatch),
	updateTimeSlot: bindActionCreators(actions.updateTimeSlot, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(StatisticsContainer)