import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { classNames } from '../utils'
import DropdownToggle from './DropdownToggle'



const propTypes = {
  noCaret: PropTypes.bool,
  color: PropTypes.string,
  size: PropTypes.string,
  title: PropTypes.string.isRequired,
  useAnchor: PropTypes.bool,
  onChange: PropTypes.func
}

class Dropdown extends Component {
  constructor(props) {
    super(props)

    this.state = {
      toggleClass: ''
    }
  }

  componentDidMount() {
    this.toggle = ReactDOM.findDOMNode(this.refs.toggle)
    this.dropdown = this.toggle.parentNode
    document.addEventListener('click', this.handleDocumentClick, false)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick, false)
  }

  handleDocumentClick = e => {
    if(e.target !== this.toggle && !this.toggle.contains(e.target)) {
      this.setState({
        toggleClass: ''
      })
    }
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
    const { color, size, title, noCaret, useAnchor, className, children } = this.props
    const currClassName = classNames(
      'm1-dropdown',
      className,
      toggleClass
    )

		return (<div ref="dropdown" className={currClassName}>
              <DropdownToggle 
                ref="toggle"
                noCaret={noCaret}
                color={color}
                size={size}
                useAnchor={useAnchor}
                onClick={this.handleToggle}
              >
                {title}
              </DropdownToggle>
              <div className="m1-dropdown-menu">
                <ul>
                  {children}
                </ul>
              </div>
            </div>)
	}
}

Dropdown.propTypes = propTypes

export default Dropdown

