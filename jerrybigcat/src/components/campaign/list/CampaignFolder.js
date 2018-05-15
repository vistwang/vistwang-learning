import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon, Dropdown, MenuItem } from '../../../components/m1ui'

import FolderItem from './FolderItem'

const propTypes = {
	folders: PropTypes.array
}

const defaultProps = {
	folders: []
}

const CampaignFolder = ({folders, pageInfo, ...props}) => {
	return (
    <div className="nav-group nav-folder">
			<ul className="m1-nav nav-header">
        <li className="m1-dropdown m1-dropdown-right">
            <a>按文件夹显示 <Icon className="right" name="add-to" onClick={props.onAddFolder} /></a>
        </li>
      </ul>
			<ul className="m1-nav nav-menu">
				{folders.map((item, i) => {
					return (
						<FolderItem
							key={i}
							item={item}
							isSelect={item.id === pageInfo.folderId}
							onEdit={props.onEditFolder}
							onRemove={props.onRemoveFolder}
							onToggleMenu={props.onToggleMenu}
							onSelect={e => props.onRequestList({folderId: item.id})}
						/>
					)
				})}
      </ul>
    </div>
	)
}

CampaignFolder.propTypes = propTypes
CampaignFolder.defaultProps = defaultProps

export default CampaignFolder