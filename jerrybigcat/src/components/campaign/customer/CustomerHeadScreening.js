import React from 'react'
import PropTypes from 'prop-types'

import { utils } from '../../../utils'
import { Checkbox, Dropdown, MenuItem, Text, Colors } from '../../../components/m1ui'
import CustomerButtons from './CustomerButtons'


const CustomerHeadScreening = ({step, stepNum, checked, checkedCount, ...props}) => {
	const hasChecked = checkedCount > 0
	const stepLabel = step === 0 ? '所有步骤' : `第${utils.numberToChinese(step)}步`
	const stepMenuItems = []
	for(let i = 1; i <= stepNum; i++) {
		stepMenuItems.push(<MenuItem key={i} eventKey={i} onSelect={props.onSelectStep} >第{utils.numberToChinese(i)}步</MenuItem>)
	}
	return (
		<div className="customer-screening">
			<Checkbox
				checked={!!checked}
				onChange={e => props.onSelectAll(!checked)}
			>全选</Checkbox>
			<Dropdown title={stepLabel} >
				<MenuItem eventKey={0} onSelect={props.onSelectStep} >所有步骤</MenuItem>
				{stepMenuItems}
			</Dropdown>  
			{' '}
			{hasChecked && <span className="text-record">已选中 {checkedCount} 条记录</span>}
			{' '}
			{hasChecked && <CustomerButtons
							onSendEmail={props.onSendEmail}
							onAddToGroup={props.onAddToGroup}
							onAddToCampaign={props.onAddToCampaign}
							onBlacklist={props.onBlacklist}
							onRemoveRecipient={props.onRemoveRecipient}
						/>}
			<Text color={Colors.PRIMARY} onClick={props.onChangeCondition} >
				更改筛选用户条件
			</Text>
		</div>
	)
}

export default CustomerHeadScreening