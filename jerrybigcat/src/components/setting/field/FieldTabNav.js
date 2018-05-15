import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { PropertyScopes } from '../../../base/enums'

const propTypes = {
	scope: PropTypes.number,
	onSelect: PropTypes.func
}

const defaultProps = {
	scope: 1
}

const FieldTabNav = ({scope, onSelect}) => {
	return (
		<ul className="m1-tab-nav">
			<li className={classnames({select: scope === PropertyScopes.CONTACT})}>
				<a onClick={e => onSelect(PropertyScopes.CONTACT)} >联系人字段</a>
			</li>
			<li className={classnames({select: scope === PropertyScopes.COMPANY})}>
				<a onClick={e => onSelect(PropertyScopes.COMPANY)}>公司字段</a>
			</li>
		</ul>
	)
}

FieldTabNav.propTypes = propTypes
FieldTabNav.defaultProps = defaultProps

export default FieldTabNav