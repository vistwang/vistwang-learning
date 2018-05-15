import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ButtonColors, ButtonSizes } from '../enums'
import { removeProps, classNames, objectValues } from '../utils'


const propTypes = {
  color: PropTypes.oneOf(objectValues(ButtonColors)),
  size: PropTypes.oneOf(objectValues(ButtonSizes))
}

class Button extends Component {

  renderLink(props, className) {
    const passProps = removeProps(props, Object.keys(Button.propTypes))

    if(passProps.disabled) {
      delete passProps.href
    }

    return <a {...passProps} className={className} />
  }

  renderButton(props,className) {
    const passProps = removeProps(props, Object.keys(Button.propTypes))

    return (
      <button
        {...passProps}
        type={'button'}
        className={className}
      />
    )
  }

  render() {
    const { ...props } = this.props
    const prefix = 'm1-btn'
    const className = classNames(
      prefix,
      props.color ? prefix + '-' + props.color : null,
      props.size ? prefix + '-' + props.size : null,
      props.className
    )

    if(props.href) {
      return this.renderLink(props, className)
    }

    return this.renderButton(props, className)
  }
}

Button.propTypes = propTypes

export default Button