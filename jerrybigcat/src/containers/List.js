import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions } from '../reducers'

import { config, msg } from '../utils'

const { get_list } = actions

class List extends Component {
	componentDidMount() {
		console.log(config.DOMAIN)
	}

	handleFetchListData = e => {
		this.props.get_list()

	}

	render() {
		return(
			<div>
				<ul className="list">
				{
					this.props.list.map((item,i) => {
						return <li key={i}>{item.title}</li>
					})
				}
				</ul>
				<button onClick={this.handleFetchListData} >Fetch List Data</button>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		list: state.list.list
	}
}

const mapDispatchToProps = (dispatch) => {
	return{
		get_list: bindActionCreators(get_list, dispatch)
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(List)