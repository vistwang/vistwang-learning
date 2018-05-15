import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { Dropdown, MenuItem, Icon, Button, Colors } from '../../m1ui'
import AddEventRow from './AddEventRow'
import SampleEventRow from './SampleEventRow'

const eventEntity = {
	id: '',
	uniqueId: '',
  name: '',
  type: 2,
  description: '',
  website: '',
}

const CustomEventTable = ({addEvents, onUpdateEvent, onChangeLazy}) => {
	return (
		<tbody>
		{addEvents.map((item, i) => (
			<AddEventRow 
				key={i}
				eventItem={item}
				name={item.name}
				onUpdateEvent={eventItem => onUpdateEvent(eventItem, i)}
				onChangeLazy={eventItem => onChangeLazy(eventItem, i)}
			/>
		))}
		</tbody>
	)
}

const SampleEventTable = ({sampleEvents, onUseSample}) => {
	return (
		<tbody>
			{sampleEvents.map((item, i) => (
				<SampleEventRow 
					key={i} 
					item={item} 
					onUse={onUseSample} 
				/>
			))}
		</tbody>
	)
}

const TableBottom = ({onAddEvent}) => {
	return (
		<div className="table-bottom">
			<Button 
				color={Colors.TEXT} 
				onClick={e => onAddEvent(eventEntity)} 
			>
				<Icon name="add-to" /> 添加更多
			</Button>
		</div>
	)
}

const AddEvent = ({customEventTab, onAddEvent, onEventTab, ...props}) => {
	const isCustom = customEventTab === 1
	return (
			<div className="m1-row">
				<div className="m1-tabs">
					<ul className="m1-tab-nav">
						<li 
							className={classnames({select: isCustom})} 
							onClick={e => onEventTab(1)}
						><a>自定义</a></li>
						<li
							className={classnames({select: !isCustom})} 
							onClick={e => onEventTab(2)}
						><a>实例事件</a></li>
					</ul>
					<div className="m1-tab-content">
						<div className="m1-tab-panel">
							<div className="table-head">
								<table className="m1-table">
									<thead>
										<tr>
											<th style={{width: '20%'}}>事件名称
											</th>
											<th style={{width: '20%'}}>唯一ID
											</th>
											<th style={{width: '40%'}}>描述
											</th>
											<th>数据类型
											</th>
											{!isCustom && <th></th>}
										</tr>
									</thead>
								</table>
							</div>
							<div className="table-body">
								<table className="m1-table">
									{isCustom ? <CustomEventTable {...props} /> : <SampleEventTable {...props} />}
								</table>
							</div>
							{isCustom && <TableBottom onAddEvent={onAddEvent} />}
						</div>
					</div>
				</div>
			</div>
	)
}

export default AddEvent