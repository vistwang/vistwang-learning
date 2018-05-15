import React from 'react'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'

import { Tag, Text, Colors, Sizes } from '../../m1ui'

const StatDetailColumn = ({count, total, isMost, tip}) => {
	const precentage = total === 0 ? 0 : parseInt(((count / total) * 100).toFixed(2))
	const precentageLabel = (isMost && precentage > 0) ? <Text color={Colors.PRIMARY} data-tip={tip} >{precentage}%</Text> : <span>{precentage}%</span>
	return (<td>{precentageLabel} <span className="count">{count}</span></td>)
}

StatDetailColumn.propTypes = {
	count: PropTypes.number,
	total: PropTypes.number,
}
StatDetailColumn.defaultProps = {
	count: 0,
	total: 0,
}

export default StatDetailColumn