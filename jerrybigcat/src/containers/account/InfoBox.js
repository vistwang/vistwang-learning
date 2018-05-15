import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ReactTooltip from 'react-tooltip'
import { Icon, Colors, Sizes } from '../../components/m1ui'

import { getInviteList } from '../../api/account'

class InfoBox extends Component {
	constructor(props) {
		super(props)

		this.maxInviteCount = 10

		this.state = {
			value: 0,
			invites: []
		}
	}

	componentDidMount() {
		const { hasMember } = this.props
		if(hasMember){
			this.loadInviteList()
		}
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.hasMember){
			this.loadInviteList(nextProps.members)
		}
	}

	loadInviteList(currMembers) {
		const self = this
		const members = currMembers || this.props.members
		if(members){
			self.setState({
				value: members.length,
				invites: members
			})
		} else {
			getInviteList().then(result => {
				if(result.success) {
					self.setState({
						value: result.data.accounts.length,
						invites: result.data.accounts
					})
				}
			})
		}
		
	}

	renderMemberIcons() {
		const { invites } = this.state
		const memberList = invites.map((item, i) => {
			return (<li key={i} data-tip={item.username}><img src={item.avatar} />{i === 0 ? <ReactTooltip effect="solid"/> : null}</li>)
		})
		// const maxLength = invites.length > this.maxInviteCount ? this.maxInviteCount : invites.length
		// let memberList = []
		// for(let i = 0; i < maxLength; i++) {
		// 	memberList.push(<li key={i}><img src={invites[i].avatar} /></li>)
		// }
		// if(invites.length > this.maxInviteCount) {
		// 	memberList.push(<li key={this.maxInviteCount + 1}><Icon name="more" /></li>)
		// }

		return (
			<div className="avatar-icon">
				<ul>
					{memberList}
				</ul>
			</div>
		)
	}

	render() {
		const {iconName,describe,value,hasMember,isLoading,className,children} = this.props
		const boxClassName = classNames(
			'info-box',
			{'member': hasMember},
			className
		)
		const number = isLoading ? <i className="m1-loading"><i></i></i> : (value || this.state.value)
		const titleNode = <div className="title">
												<Icon name={iconName} />
												<strong>{number}</strong>
										</div>
		const describeNode =  <div className="describe">{describe}</div>
		const infoNode = <div className="box-intro">
											{titleNode}
											{describeNode}
										 </div>
		const numberNode = hasMember ?  this.renderMemberIcons() : null
		return (
			<div className={boxClassName}>
				{infoNode}
				{numberNode}
				{children}
			</div>
		)
	}
}
InfoBox.proptypes = {
	iconName: PropTypes.string,
	describe: PropTypes.string,
	value: 		PropTypes.string,
	className:PropTypes.string,
	hasMember:PropTypes.bool,
	members:  PropTypes.array
}

export default InfoBox

