import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Dropdown, MenuItem, Input, Icon, Tag, Colors } from '../../m1ui'
import {QueryScopes} from '../../../base/enums'
import { SysContact } from '../../../base/system'
import ButtonIcon from '../../common/ButtonIcon'
import ScreeningDropdown from '../../screening/ScreeningDropdown'
import OperationDropdown from '../../screening/OperationDropdown'

const queryScopes = SysContact.filter.queryScopes

class ConditionItem extends Component {
	findGroup = (currentQueryTerms, id) => {
		let list = currentQueryTerms.list || []
		let groupItem
		for(let i in list) {
			const item = list[i]
			if(item.relations) {
				groupItem =  item.relations.find(relation => relation.id === id)
				if(!!groupItem) {
					break
				}
			}
		}
		return groupItem
	}
	getGroupName = (id) => {
		const currentQueryTerms = this.props.queryTerms[queryScopes[QueryScopes.GROUP_NORMAL].key]  
		const term = this.findGroup(currentQueryTerms, id) || {}
		return term.name || ''
	}
	getCurrentQueryScopeData = () => {
		const { queryTerms, condition, ...props } = this.props
		const currentQueryScope = queryScopes[condition.scope]
		const currentQueryTerms = queryTerms[currentQueryScope.key] 
		let currentTerm = {}
		let currentQueryOpreations = []
		let currentOperation = {}
		
		if(condition.scope === QueryScopes.GROUP_NORMAL) {
			currentTerm = this.findGroup(currentQueryTerms, condition.condition) || {}
			currentQueryOpreations = queryTerms['query-terms-operation-gt'] || []
			currentOperation = currentQueryOpreations.find(item => item.operation === condition.operation) || {}
		} else {
			currentTerm = currentQueryTerms ? currentQueryTerms.find(item => item.field === condition.condition) : {}
			currentQueryOpreations = currentTerm.operations || []
			currentOperation = currentQueryOpreations.find(item => item.operation === condition.operation) || {}
		}

		return {
			currentQueryScope,
			currentTerm,
			currentQueryOpreations,
			currentOperation
		}
	}
	handleSelectCondition = (id, scope) => {
		const { queryTerms, condition } = this.props 
		const currentQueryScope = queryScopes[scope]
		const currentQueryTerms = queryTerms[currentQueryScope.key] 
		let currentTerm = {}
		let currentQueryOpreations = []
		let currentOperation = {}
		
		let param = {}
		if(scope === QueryScopes.GROUP_NORMAL) {
			currentTerm = this.findGroup(currentQueryTerms, id) || {}
			currentQueryOpreations = queryTerms['query-terms-operation-gt'] || []
			currentOperation = currentQueryOpreations[0] || {operation:0, name: ''}
			let value 
			if(condition.scope !== QueryScopes.GROUP_NORMAL) {
				value = [currentTerm.id]
			} else {
				const index = condition.value.findIndex(v => v === currentTerm.id)
				value =  index === -1 ? [...condition.value, currentTerm.id] : condition.value
			}
			param = {
				...condition,
				condition: currentTerm.id,
				operation: currentOperation.operation,
				type: 1,
				origin: false,
				scope,
				value
			}
		} else {
			currentTerm = currentQueryTerms ? currentQueryTerms.find(item => item.field === id) : {}
			currentQueryOpreations = currentTerm.operations || []
			currentOperation = currentQueryOpreations[0] || {operation: 0, name: ''} 
			param = {
				...condition,
				condition: currentTerm.field,
				operation: currentOperation.operation,
				type: currentTerm.type,
				origin: currentTerm.origin,
				scope,
				value: []
			}
		}

		this.props.onUpdateCondition(param)
	}
	handleSelectOperation = (operation) => {
		const { condition } = this.props
		const param = {
			...condition,
			operation
		}
		this.props.onUpdateCondition(param)
	}
	handleValueChange = (e) => {
		const {condition} = this.props
		const param = {
			...condition,
			value: e.target.value.split(/[,]/)
		}
		this.props.onUpdateCondition(param)
	}
	handleRemoveGroup = (id) => {
		const { condition } = this.props
		const param = {
			...condition,
			value: condition.value.filter(v => v !== id)
		}
		this.props.onUpdateCondition(param)
	}
	render() {
		const { queryTerms, condition, ...props } = this.props
		const {currentQueryScope, currentTerm, currentQueryOpreations, currentOperation} = this.getCurrentQueryScopeData()
		const conditionValue = condition.value.join(',')
		const isGroup = condition.scope === QueryScopes.GROUP_NORMAL
		const screeningTitle = isGroup ? '群组' : currentTerm.name
		return (
			<tr className="condition-item">
				<td>
					<h4>{currentQueryScope.name}</h4>
					<ScreeningDropdown
						title={screeningTitle}
						queryTerms={queryTerms}
						onSelectCondition={this.handleSelectCondition}
					/>
				</td>
				<td>
					<OperationDropdown
						title={currentOperation.name}
						operations={currentQueryOpreations}
						onSelectOperation={this.handleSelectOperation}
					/>
				</td>
				<td>
					{!isGroup ? 
						<Input className="m1-form-input" value={conditionValue} onChange={this.handleValueChange} />
						: 
						<div className="condition-item-group-tags" >
							{condition.value.map((id, i) => {
								return (
									<Tag 
										key={i}
										removeable
										color={Colors.PRIMARY}
										onClose={e => this.handleRemoveGroup(id)}
									>{this.getGroupName(id)}</Tag>
								)
							})}
						</div>
					}
				</td>
				<td>
					<ButtonIcon name="delete-o" onClick={props.onDeleteCondition} />
				</td>
			</tr>
		)
	}
}

export default ConditionItem