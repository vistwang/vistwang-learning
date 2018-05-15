import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { classNames } from '../utils'
import Icon from './Icon'
import DropdownToggle from './DropdownToggle'
import DropdownInput from './DropdownInput'
import DropdownMenu from './DropdownMenu'
import MenuItem from './MenuItem'

const propTypes = {
  noCaret: PropTypes.bool,
  color: PropTypes.string,
  size: PropTypes.string,
  title: PropTypes.string,
  icon: PropTypes.string,
  useAnchor: PropTypes.bool,
  useInput: PropTypes.bool,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  isMulti: PropTypes.bool,
  toggleClassName: PropTypes.string,
  placeholder: PropTypes.string,
}

class Dropdown extends Component {
  constructor(props) {
    super(props)

    this.state = {
      toggleClass: ''
    }
  }

  componentDidMount() {
    this.toggle = ReactDOM.findDOMNode(this.props.useInput ? this.refs.toggleInput : this.refs.toggle)
    this.dropdown = this.refs.dropdown
    document.addEventListener('click', this.handleDocumentClick, false)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick, false)
  }

  handleDocumentClick = e => {
    if(e.target !== this.toggle && !this.toggle.contains(e.target) && !this.checkNotClosable(e.target) && !this.checkNotClosable(e.target)) {
      this.setState({
        toggleClass: ''
      })
    }
  }

  checkNotClosable(targetNode) {
    const noCloseNodes = this.refs.dropdown.querySelectorAll('.menu-not-close')
    let noCloseNodeArr = []
    for(let n of noCloseNodes) {
      noCloseNodeArr.push(n)
    }
    const notClose = noCloseNodeArr.some(item => (item === targetNode || item.contains(targetNode)))
    const canClose = this.checkClosable(targetNode)
    return notClose && !canClose
  }

  checkClosable(targetNode) {
    const closeNodes = this.refs.dropdown.querySelectorAll('.menu-can-close')
    let closeNodeArr = []
    for(let n of closeNodes) {
      closeNodeArr.push(n)
    }
    return closeNodeArr.some(item => (item === targetNode || item.contains(targetNode)))
  }

  handleToggle = e => {
    const { toggleClass } = this.state
    const dropdownMenu = this.dropdown.querySelector('.m1-dropdown-menu')
    const top = this.dropdown.getBoundingClientRect().top
    const winHeight = window.innerHeight
    this.setState({
      toggleClass: toggleClass ? '' : 'open'
    })

    // 处理下拉菜单超过浏览器底部 主要解决获取隐藏元素高度问题
    setTimeout(() => {
      if(!!this.state.toggleClass && (top + dropdownMenu.clientHeight + 20 > winHeight)){
        
      }
    }, 4)
  }

	render() {
    const { toggleClass } = this.state
    const { color, size, title, noCaret, useAnchor, useInput, className, icon, style, toggleStyle, menuStyle, isMulti, toggleClassName, placeholder, children, ...props } = this.props
    const currClassName = classNames(
      'm1-dropdown',
      className,
      toggleClass
    )

		return (
      <div 
        {...props}
        ref="dropdown" 
        className={currClassName}
        style={style}
      >
        {!useInput && 
          <DropdownToggle 
            ref="toggle"
            noCaret={noCaret}
            color={color}
            size={size}
            useAnchor={useAnchor}
            className={toggleClassName}
            onClick={this.handleToggle}
            style={toggleStyle}
          >
            {icon && <Icon name={icon} />}
            {icon && ' '}
            {title}
          </DropdownToggle>}
        {useInput &&
          <DropdownInput
            ref="toggleInput"
            value={title}
            placeholder={placeholder}
            onChange={props.onChange}
            onClick={this.handleToggle}
          />}
        <DropdownMenu
          style={menuStyle}
        >
          {!isMulti && <ul>{children}</ul>}
          {isMulti && children}
        </DropdownMenu>
      </div>
    )
	}
}

Dropdown.propTypes = propTypes

Dropdown.Item = MenuItem

export default Dropdown

