import React from 'react'
import PropTypes from 'prop-types'

import { Checkbox } from '../../m1ui'

import CampaignRow from './CampaignRow'

const CampaignTable = ({onEdit, onRemove, onCheck, onStatus, campaigns,hasCheckAll, onCheckAll, onStatistic, ...props}) => {
	return (
		<div className="m1-panel">
			<div className="m1-panel-content" style={{minHeight: '300px'}}>
					<table className="m1-table">
						<thead>
							<tr>
								<th style={{width: '5%'}}><Checkbox checked={hasCheckAll} onChange={e => onCheckAll(!hasCheckAll)} onClick={e => onCheckAll(!hasCheckAll)} /></th>
								<th style={{width: '20%'}} >Campaign名称</th>
								<th style={{width: '11%'}} >触达人数</th>
								<th style={{width: '11%'}} >邮件打开率</th>
								<th style={{width: '11%'}} >邮件点击率</th>
								<th style={{width: '11%'}} >邮件回复率</th>
								<th style={{width: '10%'}} >活动类型</th>
								<th>状态</th>
								<th style={{width: '10%'}} ></th>
							</tr>
						</thead>
						<tbody>
							{campaigns.map((item, i) => (
								<CampaignRow
									key={i}
									item={item}
									onEdit={onEdit}
									onCheck={onCheck}
									onRemove={onRemove}
									onStatus={onStatus}
									onStatistic={onStatistic}
								/>
							))}
						</tbody>
					</table>
			</div>
		</div>
	)
}

export default CampaignTable