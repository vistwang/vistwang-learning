import React from 'react'
import PropTypes from 'prop-types'
import { Pagination } from '../../m1ui'


const PanelBottom = ({totalCount,checkCount, ...props}) => {
	return(
		<div className="m1-panel panel-btm">
			<div className="panel-btm-left">共 {totalCount} 个营销活动， 已经选择 {checkCount} 个营销活动</div>
			<div className="panel-btm-right">
				<Pagination 
					{...props}
					total={totalCount}
				/>
			</div>
		</div>
	)
}

PanelBottom.propTypes = {
	total: PropTypes.number,
	checkCount: PropTypes.number
}

PanelBottom.defaultProps = {
	total: 0,
	checkCount: 0,
}

export default PanelBottom