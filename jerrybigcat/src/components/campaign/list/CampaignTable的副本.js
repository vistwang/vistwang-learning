import React from 'react'
import PropTypes from 'prop-types'

import { Checkbox, Icon, Switch, Dropdown, MenuItem, Colors } from '../../m1ui'

import CampaignRow from './CampaignRow'

const PanelTable = ({onEdit, campaigns, ...props}) => {

	return (
		<div className="m1-panel panel-table">
			<div className="panel-table-wrapper">
				<div className="panel-table-thead" style={{display: 'none'}}>
					<table className="m1-table">
						<thead>
							<tr>
								<th>Campaign名称
								</th>
								<th>触达人数
								</th>
								<th>邮件打开率
								</th>
								<th>邮件点击率
								</th>
								<th>邮件回复率
								</th>
								<th>活动类型
								</th>
								<th>状态
								</th>
								<th style={{width: '10%'}} ></th>
							</tr>
						</thead>
					</table>
				</div>
				<div className="panel-table-tbody" style={{minHeight:'300px'}} >
					<table className="m1-table">
						<thead>
							<tr>
								<th style={{width: '20%'}} >Campaign名称
								</th>
								<th style={{width: '13%'}} >触达人数
								</th>
								<th style={{width: '13%'}} >邮件打开率
								</th>
								<th style={{width: '13%'}} >邮件点击率
								</th>
								<th style={{width: '13%'}} >邮件回复率
								</th>
								<th style={{width: '10%'}} >活动类型
								</th>
								<th>状态
								</th>
								<th style={{width: '10%'}} ></th>
							</tr>
						</thead>
						<tbody>
							<CampaignRow
								onEdit={onEdit}
							/>
							<CampaignRow
								onEdit={onEdit}
							/>
							<CampaignRow
								onEdit={onEdit}
							/>
							<CampaignRow
								onEdit={onEdit}
							/>
						</tbody>
					</table>
				</div>
			</div>
			<div className="panel-table-fixed-left">
				<div className="panel-table-thead">
					<table className="m1-table">
						<thead>
							<tr>
								<th></th>
							</tr>
						</thead>
					</table>
				</div>
				<div className="panel-table-tbody">
					<table className="m1-table-editable">
						<tbody>
							<tr><td><span className="tb-cb" ><Checkbox /></span></td></tr>
							<tr><td><span className="tb-cb" ><Checkbox /></span></td></tr>
							<tr><td><span className="tb-cb" ><Checkbox /></span></td></tr>
							<tr><td><span className="tb-cb" ><Checkbox /></span></td></tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}

export default PanelTable