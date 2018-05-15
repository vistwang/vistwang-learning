import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { Icon } from '../../../components/m1ui'

const propTypes = {
	onSelect: PropTypes.func,
	icon: PropTypes.string,
	count: PropTypes.number,
	isSelect: PropTypes.bool,
	title: PropTypes.string,
}

const CampaignMenuItem = ({onSelect, icon, count, isSelect, title}) => {
	return (
    <li className="m1-dropdown m1-dropdown-right">
      <a className={classnames(
      	'm1-nav-item',
      	{select: isSelect}
      )} onClick={onSelect} >{icon && <Icon name={icon} />} {title} <span className="count">{count}</span></a>
    </li>
	)
}

CampaignMenuItem.propTypes = propTypes

export default CampaignMenuItem