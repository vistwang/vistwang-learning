import React, { Component } from 'react'
import axios from 'axios'
import { Pagination, Dropdown, MenuItem, Button, Modal } from './m1-ui'
import { msg, http } from '../utils'
import { getBalance, getAccountBalance } from '../api/account'

import moment from 'moment'
import DateRangePicker from 'react-bootstrap-daterangepicker'

export default class About extends Component {
	constructor(props){
		super(props)
		this.state = {
			check1: false,
			check2: false,
			check3: false,

			showModal: false,

			startDate: moment().subtract(29, 'days'),
			endDate: moment()
		}
	}

	componentWillMount() {
		// getBalance()
		// getAccountBalance()

		// axios.all([getBalance(),getAccountBalance()]).then(axios.spread((acct, perms) =>{

		// 	console.log(acct)
		// 	console.log(perms)
		// }))
		
		http.all(getBalance(), getAccountBalance()).then(([bal, acct]) => {
			console.log(bal, acct)
		})
	}

	handleChange = e => {
		console.log(e.target.value)
		const check = {}
		if(e.target.value == 1) {
			check.check1 = true
			check.check2 = false
			check.check3 = false
		} else if(e.target.value == 2) {
			check.check1 = false
			check.check2 = true
			check.check3 = false
		} else if(e.target.value == 3) {
			check.check1 = false
			check.check2 = false
			check.check3 = true
		}
		this.setState(check)
	}

  handleSelect = (eventKey, e) => {
    msg.info(`Alert from menu item.<br/>eventKey: ${eventKey}`)
  }

  handleShowModalClick = e => {
  	this.setState({
  		showModal: true
  	})
  }

  handleCloseModal = e => {
  	this.setState({
  		showModal: false
  	})
  }

  handleDateRangeEvent = (e, picker) => {
  	console.log('event start',picker.startDate)
  	console.log('event end',picker.endDate)

  	this.setState({
  		startDate: picker.startDate,
  		endDate: picker.endDate
  	})
  }

  handleDateRangeApply = (e, picker) => {
  	console.log('apply',picker.startDate)
  	this.setState({
  		startDate: picker.startDate,
  		endDate: picker.endDate
  	})
  }

	render() {
		const start = this.state.startDate.format('YYYY-MM-DD');
		const end = this.state.endDate.format('YYYY-MM-DD');
		return (<div>

			<h3>Welcome About</h3>
			<input id="test1" type="radio" value="1" checked={this.state.check1}  onChange={this.handleChange}/><label htmlFor="test1">111</label>{' '}
			<input id="test2" type="radio" value="2" checked={this.state.check2}  onChange={this.handleChange}/><label htmlFor="test2">222</label>{' '}
			<input id="test3" type="radio" value="3" checked={this.state.check3}  onChange={this.handleChange}/><label htmlFor="test3">333</label>
			<Pagination total={100} sizeArr={[5,10,20,30]} firstPage="首页" lastPage="尾页"/>
			<Dropdown title="菜单" color="primary" useAnchor={true}>
				<MenuItem eventKey="1" onSelect={this.handleSelect}>M1</MenuItem>
				<MenuItem eventKey="2" onSelect={this.handleSelect}>Page</MenuItem>
				<MenuItem eventKey="3" onSelect={this.handleSelect}>EDM</MenuItem>
				<MenuItem eventKey="4" onSelect={this.handleSelect}>Contact</MenuItem>
			</Dropdown>

			<DateRangePicker startDate={this.state.startDate} endDate={this.state.endDate} onEvent={this.handleDateRangeEvent} onApply={this.handleDateRangeApply}>
              <div><i className="iconfont icon-m1-calendar"></i> Click Me To Open Picker! {start}~{end}</div>
      </DateRangePicker>

			<Button onClick={this.handleShowModalClick}>Show Modal</Button>

			<Modal show={this.state.showModal} onClose={this.handleCloseModal}>
				<Modal.Header>
					<Modal.Title>Hello Title</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					hello world, this is body
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.handleCloseModal}>Close</Button>
				</Modal.Footer>
			</Modal>
			</div>)
	}
}