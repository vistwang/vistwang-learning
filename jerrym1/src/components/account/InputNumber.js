import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Input, Icon, Colors } from '../m1-ui'

class InputNumber extends Component {
	constructor(props) {
		super(props)

		this.inputNode = null
		this.max = null
		this.min = null

		this.state = {
			value: 0
		}
	}

	componentWillMount() {
		const { value, min, max } = this.props 
		this.min = min
		this.max = max
		this.setState({
			value: value || 0
		})
	}

	componentDidMount() {
		this.inputNode = ReactDOM.findDOMNode(this.refs.inputNumber)
	}

	eventTrigger(el,eventType) {
		const event = new MouseEvent('input', {
		  'view': window,
		  'bubbles': true,
		  'cancelable': true
		})
		el.dispatchEvent(event)
	}

	subtract = () => {
		let v = Number(this.state.value)
		let value = isNaN(v) ? 0 : v - 1
		if(this.min) {
			value = value < this.min ? this.min : value
		}
		this.inputNode.value = value
		this.eventTrigger(this.inputNode, 'input')
	}

	addition = () => {
		let v = Number(this.state.value)
		let value = isNaN(v) ? 0 : v + 1
		if(this.max) {
			value = value > this.max ? this.max : value
		}
		this.inputNode.value = value
		this.eventTrigger(this.inputNode, 'input')
	}

	changeHandler = e => {
		this.setState({
			value: e.target.value
		})
		
		const { onChange } = this.props
		if(typeof onChange === 'function') {
			onChange(e)
		}
	}

	render() {
		const { max, min, onChange, ...props } = this.props
		return (
			<div className="m1-input-number">
				<span onClick={this.subtract}>
					<Icon name="unfold-left" color={Colors.IGNORE}/>
				</span>
					<Input {...props} ref="inputNumber" value={this.state.value} onChange={this.changeHandler} />
				<span onClick={this.addition}>
					<Icon name="unfold-right" color={Colors.IGNORE}/>
				</span>
			</div>
		)
	}
}
InputNumber.propTypes = {
	min: PropTypes.number,
	max: PropTypes.number,
	onChange: PropTypes.func
}

export default InputNumber

