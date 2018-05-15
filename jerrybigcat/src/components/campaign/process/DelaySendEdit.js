import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Button, Dropdown, MenuItem, Icon, Colors } from '../../m1ui'

const hours = (() => {
	const h = []
	for(let i = 0; i < 24; i++) {
		h.push(i)
	}
	return h
})()

const minutes = (() => {
	const m = []
	for(let i = 0; i < 60; i += 10) {
		m.push(i)
	}
	return m
})()

class DelaySendEdit extends Component {
	constructor(props) {
		super(props) 
		this.state = {
			isOpen: false,

			day: 0,
			hour: 0,
			minute: 0,
		}
	}

	componentDidMount() {
		this.initPropsToState()
		document.addEventListener('click', this.handleDocumentClick, false)
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.delaytime !== this.props.delaytime) {
			this.initPropsToState()
		}
	}

	componentWillUnmount() {
		document.removeEventListener('click', this.handleDocumentClick, false)
	}

	handleDocumentClick = (e) => {
		if(this.refs.delay !== e.target && !this.refs.delay.contains(e.target)) {
			this.setState({
				isOpen: false
			})
		}
	}

	handleToggle = (e) => {
		this.setState({
			isOpen: !this.state.isOpen
		})
	}

	handleCancel = (e) => {
		this.setState({
			isOpen: false
		})
	}

	initPropsToState = () => {
		const { delaytime } = this.props
		const delayTimeArr = delaytime.split(':')
		const day = delayTimeArr[0]
		const hour = delayTimeArr[1]
		const minute = delayTimeArr[2]
		this.setState({
			day,
			hour,
			minute
		})
	}

	handleApply = () => {
		const { day, hour, minute } = this.state
		this.props.onDelayChange(`${day}:${hour}:${minute}`)
		this.setState({
			isOpen: false
		})
	}

	render() {
		const {day, hour, minute } = this.state
		return (
			<div 
				ref="delay"
				className={classnames(
					'delay-time',
					{open: this.state.isOpen}
				)} >
				<Button 
					color={Colors.TEXT}
					onClick={this.handleToggle}
				>
					第{day}天 <Icon name="unfold-down" />
				</Button>
				<div className="delay-time-box">
					<p>等待多久后开始营销活动</p>
					<div className="delay-time-setting">
						<input type="number" value={day} onChange={e => this.setState({day: e.target.value})} /> 天
						{/*<Dropdown className="m1-dropdown-form" title={hour + '' || '0'} >
							{hours.map((v, i) => {
								return (
									<MenuItem key={i} eventKey={v} onSelect={value => this.setState({hour: value})} >{v}</MenuItem>
								)
							})}
						</Dropdown> 小时
						<Dropdown className="m1-dropdown-form" title={minute + '' || '0'} >
							{minutes.map((v, i) => {
								return (
									<MenuItem key={i} eventKey={v} onSelect={value => this.setState({minute: value})} >{v}</MenuItem>
								)
							})}
						</Dropdown> 分钟*/}
					</div>
					<div className="box-bottom">
						<Button onClick={this.handleCancel} >取消</Button>
						<Button color={Colors.PRIMARY} onClick={this.handleApply} >确定</Button>
					</div>
				</div>
			</div>
		)
	}
}

export default DelaySendEdit