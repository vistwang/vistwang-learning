import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { classNames } from '../utils'
import Dropdown from './Dropdown'
import MenuItem from './MenuItem'

const propTypes = {
	currentPage: PropTypes.number,
	currentSize: PropTypes.number,
	total: 			 PropTypes.number,
	sizeArr: 		 PropTypes.array,
	firstPage:   PropTypes.string,
	lastPage: 	 PropTypes.string,
	prevPage: 	 PropTypes.string,
	nextPage: 	 PropTypes.string,
	onPageChange:PropTypes.func,
	onSizeChange:PropTypes.func
}

const defaultProps = {
	currentPage: 1,
	currentSize: 20,
	total: 0,
	sizeArr: [],
	firstPage: '',
	lastPage:  '',
	prevPage: '上一页',
	nextPage: '下一页'
}


class Pagination extends Component {
	constructor(props) {
		super(props)

		this.prevDisabled = false
		this.nextDisabled = false
		this.pages = 0
		this.pagesArr = []
	}

	computePage() {
		const { currentPage, currentSize, total } = this.props
		let pagesArr = []
		const pages = Math.ceil(total / currentSize);
		if (pages <= 5) {
		    for (let i = 1; i <= pages; i++) {
		        pagesArr.push(i);
		    }
		} else if (currentPage < 3) {
		    pagesArr = [1, 2, 3, 4, 5];
		} else if (currentPage <= pages - 2) {
		    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
		        pagesArr.push(i);
		    }
		} else {
		    for (let i = pages - 4; i <= pages; i++) {
		        pagesArr.push(i);
		    }
		}

		this.prevDisabled = currentPage === 1
		this.nextDisabled = currentPage === pages
		this.pages = pages
		this.pagesArr = pagesArr
	}

	handlePageChange = (eventKey, e) => {
		const { onPageChange } = this.props
		if(onPageChange) {
			onPageChange(eventKey)
		}
	}

	handleSizeChange = (eventKey, e) => {
		const { onSizeChange } = this.props
		if(onSizeChange) {
			onSizeChange(eventKey)
		}
	}

	handleFirstClick = e => {
		if(!this.prevDisabled) {
			this.handlePageChange(1)
		}
	}
	handleLastClick = e => {
		if(!this.nextDisabled) {
			this.handlePageChange(this.pages)
		}
	}
	handlePrevClick = e => {
		if(!this.prevDisabled) {
			this.handlePageChange(this.props.currentPage - 1)
		}
	}
	handleNextClick = e => {
		if(!this.nextDisabled) {
			this.handlePageChange(this.props.currentPage + 1)
		}
	}

	renderPage() {
		const { currentPage } = this.props
		const pagesList = this.pagesArr.map((page, i) => {
			return <MenuItem key={i} eventKey={page} onSelect={this.handlePageChange}>{page}</MenuItem>
		})
		
		return (
			<li>
				<Dropdown title={`第${currentPage}页`} useAnchor>
					{pagesList}
				</Dropdown>
			</li>
		)
	}

	renderSize() {
		const { currentSize, sizeArr } = this.props
		if(sizeArr.length === 0) {
			return null;
		}

		const sizeList = sizeArr.map((size, i) => {
			return <MenuItem key={i} eventKey={size} onSelect={this.handleSizeChange} >{size}</MenuItem>
		})

		return (
			<li>
				<Dropdown title={'' + currentSize} useAnchor>
					{sizeList}
				</Dropdown>条/页
			</li>
		)
	}

	renderFirst() {
		const { firstPage } = this.props
		if(!firstPage) {
			return null
		}
		return (<li><a disabled={this.prevDisabled} onClick={this.handleFirstClick}>{firstPage}</a></li>)
	}

	renderLast() {
		const { lastPage } = this.props
		if(!lastPage) {
			return null
		}
		return (<li><a disabled={this.nextDisabled} onClick={this.handleLastClick}>{lastPage}</a></li>)
	}

	renderPrev() {
		const { prevPage } = this.props
		return (<li><a disabled={this.prevDisabled} onClick={this.handlePrevClick}>{prevPage}</a></li>)
	}

	renderNext() {
		const { nextPage } = this.props
		return (<li><a disabled={this.nextDisabled} onClick={this.handleNextClick}>{nextPage}</a></li>)
	}

	render() {
		this.computePage()

		return (
			<div className="m1-pagination">
				<ul>
					{this.renderFirst()}
					{this.renderPrev()}
					{this.renderPage()}
					{this.renderNext()}
					{this.renderLast()}
					{this.renderSize()}
				</ul>
			</div>
		)
	}
}

Pagination.propTypes = propTypes
Pagination.defaultProps = defaultProps

export default Pagination