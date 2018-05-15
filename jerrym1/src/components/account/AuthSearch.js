import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { ContactGroupTypes } from '../../base/enums'
import { MenuItem } from '../m1-ui'

const propTypes = {
	app: PropTypes.string,
	placeholder: PropTypes.string,
	onSubmit: PropTypes.func,
	onRequest: PropTypes.func
}

class AuthSearch extends Component {
	constructor(props) {
		super(props) 
		this.isRequest = false
		this.searchList = props.searchList || []

		this.searchKey = props.searchKey || ''

		this.state = {
			showMenu: false,
			searchKey: this.searchKey,

			itemIndex: -1,
			items: []
		}
	}

	componentDidMount() {
		document.addEventListener('click', this.handleAutoHideDropdownMenu, false)
	}

	componentWillUnmount() {
		document.removeEventListener('click', this.handleAutoHideDropdownMenu, false)
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.searchList) {
			this.isRequest = false
			this.searchList = nextProps.searchList
			this.handleSearchKeyList(this.state.searchKey)
		}
	}

	handleAutoHideDropdownMenu = e => {
		if(e.target !== this.refs.input && this.refs.dropdown && e.target !== this.refs.dropdown && !this.refs.dropdown.contains(e.target)) {
			this.setState({
				showMenu: false
			})
		}
	}

	handleSearchFocus = e => {
		this.checkRequest()
		this.handleSearchKeyList(e.target.value)
		this.setState({
			showMenu: true
		})
	}

	handleSearchMouseUp = e => {
		this.setState({
			showMenu: true
		})
	}

	handleSearchChange = e => {
		const searchKey = e.target.value.replace('\\','')
		this.searchKey = searchKey
		this.setState({
			showMenu: true,
			searchKey
		})
		this.handleSearchKeyList(searchKey)
	}

	// handleSelectItemClick = (index) => {
	// 	const item = this.state.items[index]

	// 	if(item) {
	// 		this.setState({
	// 			showMenu: false
	// 		})

	// 		this.handleSubmit(item)
	// 	}
		
	// }

	handleSelectItemClick = (id) => {
		const items = this.getSearchItem(this.state.items, id)
		if(items.length > 0) {
			// this.setState({
			// 	showMenu: false
			// })

			this.handleSubmit(items[0])
		}
		
	}

	getSearchItem = (items, id, array) => {
		return items.reduce((arr, item) => {
			if(item.id === id){
				arr.push(item)
			}
			if(!!item.items) {
				return this.getSearchItem(item.items,id,arr)
			}
			return arr
		}, array || [])
	}

	// handleSearchKeyDown = e => {
	// 	// key Back
	// 	if(e.keyCode === 8) {
	// 		this.setState({
	// 			itemIndex: -1
	// 		})
	// 	}
	// 	const { items, itemIndex } = this.state
	// 	const length = items.length
	// 	if( length === 0) {
	// 		return
	// 	}
	// 	let index = itemIndex
	// 	// keyDown
	// 	if(e.keyCode === 40) {
	// 		index = itemIndex + 1
	// 		if(index >= length) {
	// 			index = -1
	// 		}

	// 	// keyUp
	// 	} else if(e.keyCode === 38) {
	// 		index = itemIndex - 1
	// 		if(index <= -2) {
	// 			index = length - 1
	// 		}
	// 	}
	// 	const searchItem = items[index]
	// 	let key = index === -1 ? this.searchKey : searchItem.name
	// 	let stateObj = {
	// 		itemIndex: index,
	// 		searchKey: key
	// 	}

	// 	// keyEnter
	// 	if(e.keyCode === 13) {
	// 		this.setState({
	// 			showMenu: false
	// 		})
	// 		if(index !== -1) {
	// 			this.handleSubmit(searchItem)
	// 		}
	// 	} else {
	// 		this.setState(stateObj)
	// 	}

	// }

	// searchItem = (items, key, array) => {
	// 	const reg = new RegExp(key.toLowerCase())
	// 	return items.reduce((arr, item) => {
	// 		if(reg.test(item.name.toLowerCase())){
	// 			arr.push(item)
	// 		}
	// 		if(!!item.items) {
	// 			return this.searchItem(item.items,key,arr)
	// 		}
	// 		return arr
	// 	}, array || [])
	// }

	searchItem = (items, key, array) => {
		const reg = new RegExp(key.toLowerCase())
		return items.reduce((arr, item) => {
			if(item.type === ContactGroupTypes.GROUP && reg.test(item.name.toLowerCase())){
				arr.push(item)
			}
			if(item.type === ContactGroupTypes.FOLDER && !!item.items) {
				const list = this.searchItem(item.items,key,[])
				if(list.length > 0) {
					const newItem = {}
					for(let o in item) {
						newItem[o] = item[o]
					}
					newItem.items = list
					arr.push(newItem)
				}
				// return list
			}
			return arr
		}, array || [])
	}

	handleSearchKeyList = (searchKey) => {
		const list = this.searchList
		const items = this.searchItem(list, searchKey)
		this.setState({
			// items: array.filter(item => this.props.addItemIds.indexOf(item.id) === -1)
			items: this.handleDisabledItems(items)
		})
	}

	// handleDisabledItems = items => {
	// 	return items.map(item => {
	// 		item.disabled = this.props.addItemIds.indexOf(item.id) >= 0
	// 		return item
	// 	})
	// }

	handleDisabledItems = items => {
		return items.map(item => {
			item.disabled = this.props.addItemIds.indexOf(item.id) >= 0
			if(!!item.items) {
				item.items = this.handleDisabledItems(item.items)
			}
			return item
		})
	}

	handleSubmit = item => {
		if(item.disabled) {
			return
		}
		const { app, onSubmit } = this.props
		if(onSubmit) {
			onSubmit(app, item)
		}
		// this.searchKey = ''
		// this.setState({
		// 	itemIndex: -1,
		// 	searchKey: ''
		// })
	}

	checkRequest() {
		if((!this.searchList || this.searchList.length === 0) && !this.isRequest) {
			if(this.props.onRequest) {
				this.props.onRequest(this.props.app)
				this.isRequest = true
			}
		}
	}

	handleToggleFolder = (id, items) => {
		items = items || this.state.items
		items = items.map(item => {
			if(item.id === id) {
				item.openFolder = item.openFolder === undefined ? false : !item.openFolder
			}
			// if(!!item.items) {
			// 	item.items = this.handleToggleFolder(item.items)
			// }
			return item
		})

		this.setState({items})
		return false
	}

	render() {
		const { placeholder, addItemIds } = this.props
		const { searchKey, items, showMenu, itemIndex } = this.state
		const showDropdown = showMenu && (this.isRequest || items.length > 0)
		// const itemList = items.map((item, i) => {
		// 	return <li key={i}><a className={classNames({'active': itemIndex === i})} onClick={e => item.type === ContactGroupTypes.FOLDER ? null : this.handleSelectItemClick(i)} disabled={item.disabled || item.type === ContactGroupTypes.FOLDER}>{item.name}{item.disabled && <i className="m1-dropdown-check"></i>}</a></li>
		// })
		
		const itemList = items.map((folder, k) => {
			const openFolder = folder.openFolder === undefined ? true : folder.openFolder
			const folderIconClass = openFolder ? 'open' : 'close'
			return <li 
							className={classNames({'folder-open': openFolder})} 
							key={k}>
							<a onClick={e => this.handleToggleFolder(folder.id)}>
								<i className={`iconfont icon-m1-folder-${folderIconClass}`}></i>
								{folder.name}
							</a>
							{openFolder && folder.items.length > 0 &&
								<ul className="m1-subnav">
									{folder.items.map((item, i) => {
										return <li key={i}>
															<a onClick={e => item.disabled ? null : this.handleSelectItemClick(item.id)} disabled={item.disabled}>
																<span className="icon">
																	<i className="iconfont icon-m1-group"></i>
																</span>
																{item.name}
																{item.disabled && <i className="m1-dropdown-check"></i>}
																{!item.disabled && <span className="size">{item.size}</span>}
															</a>
													</li>
									})}
								</ul>
							}
						</li>
		})

		const itemLoading = <li className="item-loading"><i className="m1-loading"><i></i></i></li>
		return (
			<div className="m1-search m1-dropdown open m1-search-group">
				<div className="m1-input-group">
		     <i className="iconfont icon-m1-search"></i>
		     <input 
		     	ref="input" 
		     	onFocus={this.handleSearchFocus} 
		     	onChange={this.handleSearchChange}
		     	onKeyDown={this.handleSearchKeyDown}
		     	onMouseUp={this.handleSearchMouseUp}
		     	value={searchKey}  
		     	placeholder={placeholder || '请输入'}/>
		   </div>
		   {showDropdown && 
 	         <ul className="m1-nav m1-dropdown-menu" ref="dropdown">
 	           {this.isRequest ? itemLoading : itemList}
 	         </ul>
		   }
			</div>
		)
	}
}

AuthSearch.propTypes = propTypes

export default AuthSearch