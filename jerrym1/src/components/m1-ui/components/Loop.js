import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { classNames } from '../utils'

class Loop extends Component {

	renderText({showValue, text, percentage}) {
		if(!showValue && !text) {
			return null
		}

		const percentageNode = showValue ? <div className="percentage">{percentage}%</div> : null
		const titleNode = text ? <p className="text">{text}</p> : null

		return (
			<div className="m1-progress-info">
				{percentageNode}
				{titleNode}
			</div>
		)
	}

	render() {
		const { r, cx, cy, width, value, showValue, text, ...props } = this.props
		const x = cx || 0
		const y = cy || 0
		const percentage = value || 0
		const c = 2 * Math.PI * r
		const dashoffset = c - (c * percentage / 100)
		const className = classNames(
			'm1-progress-circle-wrapper',
			props.className
		)
		const circleStyle = {strokeWidth: width + 'px'}

		const svgHeight = (r + 10) * 2;  //

		return (
			<div className={className} >
        <svg className="m1-progress-circle" height={svgHeight} style={{width: '100%'}}>
          <circle cx={x} cy={y} r={r}
          	strokeWidth={width}
          	style={circleStyle}
          ></circle>
          <circle cx={x} cy={y} r={r} 
          	strokeDasharray={c} 
          	strokeDashoffset={dashoffset}
          	strokeWidth={width}
          	style={circleStyle}
          ></circle>
        </svg>
       	{this.renderText({showValue, text, percentage})}
      </div>
		)
	}
}
Loop.propTypes = {
	r: PropTypes.number.isRequired,
	cx: PropTypes.number,
	cy: PropTypes.number,
	width: PropTypes.number,
	value: PropTypes.number
}

export default Loop
