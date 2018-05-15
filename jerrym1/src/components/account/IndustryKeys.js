import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Tag, Colors } from '../m1-ui'

const propTypes = {
	onSelect: PropTypes.func,
	keyword: PropTypes.string
}

const defaultProps = {
	keyword: ''
}

class IndustryKeys extends Component {
	constructor(props) {
		super(props)

		this.state = {
			list: []
		}
	}
	componentDidMount() {
		const { keyword } = this.props
		this.initList(keyword)
	}
	componentWillReceiveProps(nextProps) {
		const { keyword } = nextProps
		this.initList(keyword)
	}
	initList(keyword) {
		const keys = keyword.split(',')
		const list = keys.map((item,i) => {
			return {id: i, name: item, checked: false}
		})
		this.setState({list})
	}
	handleToggleClick = id => {
		const list = this.state.list.map(item => {
			if(item.id === id){
				item.checked = !item.checked
			}
			return item
		})
		this.setState({list})

		const { onSelect } = this.props
		if(onSelect) {
			const selectItems = list.filter(item => item.checked)
			const keys = selectItems.reduce((str, item) => {
				if(str !== ''){
					str += ','
				}
				str += item.name
				return str
			}, '')
			onSelect(keys)
		}
	}
	render() {
		const{ onSelect, keyword, ...props } = this.props
		return (
			<div
				{...props}
			>
				{
					this.state.list.map((item, i) => <Tag key={i} color={item.checked ? Colors.PRIMARY : Colors.IGNORE} checkable onClick={e => this.handleToggleClick(item.id)}>{item.name}</Tag>)
				}
			</div>
		)
	}
}

IndustryKeys.propTypes = propTypes
IndustryKeys.defaultProps = defaultProps

export default IndustryKeys