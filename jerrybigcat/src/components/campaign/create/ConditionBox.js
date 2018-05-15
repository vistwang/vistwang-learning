import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon } from '../../m1ui'

import ButtonIcon from '../../common/ButtonIcon'
import ConditionItem from './ConditionItem'
import ButtonAdd from './ButtonAdd'
import ViewOr from './ViewOr'

class ConditionBox extends Component {
	render() {
		const { queryTerms, conditionGroup, ...props } = this.props
		return [
					<div key="panel" className="m1-panel">
						<div className="m1-panel-content">
							<table className="m1-table">
								<tbody>
									{conditionGroup.map((item, conditionIndex) => {
										return (
											<ConditionItem 
												key={conditionIndex}
												queryTerms={queryTerms}
												condition={item}
												onDeleteCondition={e => props.onDeleteCondition(conditionIndex)}
												onUpdateCondition={(...args) => props.onUpdateCondition(...args, conditionIndex)}
											/>
										)
									})}
								</tbody>
							</table>
							<div className="add-condition-item">
								<div className="condition-and">
									<span>AND</span>
								</div>
								<ButtonIcon
									className="btn-icon-add"
									name="newly-added"
									onClick={props.onAddCondition}
								/>
							</div>
							{/*<ButtonAdd
								className="btn-condition-item"
							>添加筛选条件</ButtonAdd>*/}
						</div>
					</div>,
					<ViewOr key="or" />
				]
	}
}

export default ConditionBox