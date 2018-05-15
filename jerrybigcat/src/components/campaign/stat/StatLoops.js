import React from 'react'
import PropTypes from 'prop-types'

import LoopItem from './LoopItem'

const StatLoops = ({report, props}) => {
	report = !!report ? report : StatLoops.defaultProps.report
	const { 
		total, 
		touched, 
		untouched,
		opened, 
		replied, 
		clicked, 
		interested ,
		unsubscribed, 
	} = report

	const repliedDetail = report['replied-detail']

	const untouchedDetail = report['untouched-detail']

	return (
		<div className="stat-loops">
			<ul>
				<li>
					<div className="content">
						<h2>{total}</h2>
					</div>
					<div className="title">总人数</div>
				</li>
				<LoopItem label="触达率" count={touched} total={total} />
				<LoopItem label="打开率" count={opened} total={touched} />
				<LoopItem label="回复率" count={replied} total={touched} classify={repliedDetail} classifyName="回复邮件分类统计" />
				<LoopItem label="点击率" count={clicked} total={touched} />
				<LoopItem label="感兴趣" count={interested} total={touched} />
				<LoopItem label="退订" 	count={unsubscribed} total={touched} />
				<LoopItem label="未触达" count={untouched} total={total} classify={untouchedDetail} classifyName={'未触达分类统计'} />
			</ul>
		</div>
	)
}

StatLoops.propTypes = {
	report: PropTypes.object
}
StatLoops.defaultProps = {
	report: {
		total: 0,
		touched: 0,
		opened: 0,
		clicked: 0,
		replied: 0,
		interested: 0,
		unsubscribed: 0,
		untouched: 0,
		
		'replied-detail': [],
		'untouched-detail': [],
	}
}

export default StatLoops