import React, { Component } from 'react'
import classnames from 'classnames'

import { Icon, Dropdown, MenuItem } from '../../../components/m1ui'

class FolderItem extends Component {
	componentDidMount() {
		document.body.addEventListener('click', this.handleDocumentClick, false)
	}
	componentWillUnmount() {
		document.body.removeEventListener('click', this.handleDocumentClick, false)
	}
	handleDocumentClick = (e) => {
		if(this.refs.btnCaret !== e.target) {
			this.props.onToggleMenu(this.props.item.id, false)
		}
	}
	handleToggleMenu = (id, toggle, e) => {
		e.nativeEvent.stopImmediatePropagation()
		this.isToggle = true //临时变量, 用于处理时间冒泡无效问题
		this.props.onToggleMenu(id, toggle)
	}
	handleRequestFolder = (e) => {
		if(!this.isToggle) {
			this.props.onSelect(e)
		} else {
			this.isToggle = false
		}
	}
	render() {
		const {item, onEdit, onRemove, isSelect, ...props} = this.props
		return (
	    <li className={classnames(
	    		'm1-dropdown',
	    		{open: item.toggleMenu}
	    	)} >
	    	<a 
	    		className={classnames(
		    		'm1-nav-item',
		    		{select: isSelect}
	    		)}
	    		onClick={this.handleRequestFolder}
	    	>
	    		<Icon name="folder-close" /> {item.name} 
	    		<span className="count">{item.campaign_count || 0}</span>
	    		<i ref="btnCaret" className="m1-nav-caret" onClick={e => this.handleToggleMenu(item.id, !item.toggleMenu, e)} ></i>
	    	</a>
	    	<ul className="m1-dropdown-menu">
	    		<MenuItem eventKey={item.id} onSelect={onEdit} >编辑</MenuItem>
	    		<MenuItem eventKey={item.id} onSelect={onRemove} >删除</MenuItem>
	      </ul>
	    </li>
		)
	}
} 

export default FolderItem