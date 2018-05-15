import React from 'react'
import PropTypes from 'prop-types'

import {Button, Icon, Dropdown, Colors} from '../../m1ui/' 

import { CampaignBetchTypes } from '../../../base/enums'

const MenuItem = Dropdown.Item

const Screening = ({onCreate, onSelect, totalCount, selectCount, onBetchFolder, canRemoveFromFolder, ...props}) => {

	return (
		<div className="screening">
			<Button 
				className="btn-add-campaign" 
				color={Colors.PRIMARY} 
				onClick={onCreate}
				>
				<Icon name="add-to" /> 创建营销活动
			</Button>
			<Dropdown
				className="dropdown-betch"
				title="批量操作"
				icon="batch"
				color={Colors.TEXT}
			>
				<MenuItem onSelect={onSelect} eventKey={CampaignBetchTypes.OPEN} >开启</MenuItem>
				<MenuItem onSelect={onSelect} eventKey={CampaignBetchTypes.STOP} >停止</MenuItem>
				<MenuItem onSelect={onSelect} eventKey={CampaignBetchTypes.DELETE} >删除</MenuItem>
				<MenuItem onSelect={onBetchFolder} eventKey={0} >添加到文件夹</MenuItem>
				{canRemoveFromFolder && <MenuItem onSelect={onBetchFolder} eventKey={1} >从文件夹移除</MenuItem>}
			</Dropdown>
			{selectCount > 0 && <span>已累计创建{totalCount}个营销活动 已选择{selectCount}个营销活动</span>}
		</div>
	)
}

Screening.propTypes = {
	totalCount: PropTypes.number,
	selectCount: PropTypes.number,
	onCreate: PropTypes.func.isRequired,
	onSelect: PropTypes.func.isRequired,
}

Screening.defaultProps = {
	totalCount: 0,
	selectCount: 0
}

export default Screening