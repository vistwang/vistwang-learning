import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { InputTypes } from '../enums'
import { classNames, removeProps } from '../utils'

let currentId = 0

export default class Radio extends Component {

  render() {
    const {name,text,children, ...props} = this.props 
    const className = classNames(
      'm1-tgl',
      props.className
    )
    const radioId = props.id || `radio${currentId++}`
    const passProps = removeProps(props, ['id','name'])
    return (
      <span className={className} >
        <RadioInput {...passProps} name={name} id={radioId}/>
        <RadioPaddle className={props.className} htmlFor={radioId} />
        {' '}
        {text ? <label htmlFor={radioId}>{text}</label> : null}
        {children && <label htmlFor={radioId}>{children}</label>}
      </span>
    )
  }
}
Radio.propTypes = {
  id: PropTypes.string
}


export const RadioInput = props => {
  const className = classNames(
    props.className
  )

  const passProps = removeProps(props, ['type'])

  return (
    <input {...passProps} className={className} type={props.type || InputTypes.RADIO} />
  )
}
RadioInput.propTypes = {
  type: PropTypes.string
}

export const RadioPaddle = props => {
  const className = classNames(
    'm1-tgl-radio',
    props.className
  )
  return (
    <label {...props} className={className} />
  )
}