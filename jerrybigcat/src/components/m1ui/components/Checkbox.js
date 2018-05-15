import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { InputTypes } from '../enums'
import { classNames, removeProps } from '../utils'


let currentId = 0

export default class Checkbox extends Component {

  render() {
    const {id, name,text, children, ...props} = this.props 
    const className = classNames(
      'm1-tgl',
      props.className
    )
    const checkboxId = id || `checkbox${currentId++}`

    return (
      <span className={className} >
        <CheckboxInput {...props} name={name} id={checkboxId}/>
        <CheckboxPaddle htmlFor={checkboxId} />
        {' '}
        {text ? <label htmlFor={checkboxId}>{text}</label> : null}
        {children ? <label htmlFor={checkboxId}>{children}</label> : null}
      </span>
    )
  }
}
Checkbox.propTypes = {
  id: PropTypes.string
}


export const CheckboxInput = props => {
  const className = classNames(
    props.className
  )
  const passProps = removeProps(props, ['type'])
  return (
    <input {...passProps} className={className} type={props.type || InputTypes.CHECKBOX} />
  )
}
CheckboxInput.propTypes = {
  type: PropTypes.string
}

export const CheckboxPaddle = props => {
  const className = classNames(
    'm1-tgl-checkbox',
    props.className
  )
  return (
    <label {...props} className={className} />
  )
}