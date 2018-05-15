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
		const { r, cx, cy, width, value, showValue, text, strokeFront, strokeBack, ...props } = this.props
		const strokeWidth = width || 0
		const x = cx || (r + (strokeWidth / 2))
		const y = cy || (r + (strokeWidth / 2))
		const percentage = value || 0
		const c = 2 * Math.PI * r
		const dashoffset = c - (c * percentage / 100)
		const className = classNames(
			'm1-progress-circle-wrapper',
			props.className
		)
		const svgSize = (r * 2) + strokeWidth;  //
		const svgStyle = {width: `${svgSize}px`, height: `${svgSize}px`}

		const circleStyleFront = {strokeWidth: strokeWidth + 'px', stroke: strokeFront}
		const circleStyleBack = {strokeWidth: strokeWidth + 'px', stroke: strokeBack}

		return (
			<div className={className} >
        <svg className="m1-progress-circle" width={svgSize} height={svgSize} style={svgStyle}>
          <circle cx={x} cy={y} r={r}
          	strokeWidth={strokeWidth}
          	stroke={strokeBack}
          	style={circleStyleBack}
          ></circle>
          <circle cx={x} cy={y} r={r} 
          	strokeDasharray={c} 
          	strokeDashoffset={dashoffset}
          	strokeWidth={strokeWidth}
          	stroke={strokeFront}
          	style={circleStyleFront}
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
	value: PropTypes.number,
	strokeFront: PropTypes.string,
	strokeBack: PropTypes.string
}

export default Loop
