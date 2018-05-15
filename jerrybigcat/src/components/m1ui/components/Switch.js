import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { SwitchInputTypes } from '../enums'
import { classNames, removeProps, objectValues } from '../utils'



let currentId = 0

export default class Switch extends Component {

  render() {
    const { ...props } = this.props
    const className = classNames(
      'm1-tgl',
      props.className
    )

    const switchId = props.id || `switch${currentId++}`

    const passProps = removeProps(props, ['id'])
    return (
      <span className={className}>
        <SwitchInput {...passProps} id={switchId} />
        <SwitchPaddle htmlFor={switchId} />
      </span>
    )
  }
}
Switch.propTypes = {
  id: PropTypes.string
}

export const SwitchInput = props => {
  const className = classNames(
    props.className
  )

  const passProps = removeProps(props, ['type'])

  return (
    <input {...passProps} className={className} type={props.type || SwitchInputTypes.CHECKBOX}/>
  )
}
SwitchInput.propTypes = {
  type: PropTypes.oneOf(objectValues(SwitchInputTypes))
}


export const SwitchPaddle = props => {
  const className = classNames(
    'm1-tgl-switch',
    props.className
  )
  return (
    <label {...props} className={className} />
  )
}