import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { actions } from '../../../reducers/campaign/campaignCreate'
import { actions as screeningActions } from '../../../reducers/campaign/screening'
import ConditionBox from '../../../components/campaign/create/ConditionBox'
import ConditionDeleteModal from '../../../components/campaign/create/ConditionDeleteModal'
import ButtonAdd from '../../../components/campaign/create/ButtonAdd'
import ButtonIcon from '../../../components/common/ButtonIcon'

const defaultCondition =     {
	"condition": "name",
  "operation": 22,
  "type": 2,
  "origin": true,
  "scope": 1,
  "value": []
}

const defaultConditionGroup = [defaultCondition]

class ScreeningCondition extends Component {
	componentDidMount() {
		const { queryTerms, campaignId, targetConditionId, autoQueryContact } = this.props
		if(!queryTerms) {
			this.props.reqQueryTerms()
		}
		// console.log('targetConditionId',targetConditionId)
		if(targetConditionId) {
			this.props.reqQueryConditions(targetConditionId, autoQueryContact)
		}
	}
	handleAddConditionGroup = () => {
		this.props.addQueryConditionGroup(defaultConditionGroup)
	}
	handleAddCondition = (conditionGroupIndex) => {
    this.props.addQueryCondition(defaultCondition, conditionGroupIndex)
	}
	handleUpdateCondition = (condition, conditionIndex, conditionGroupIndex) => {
		// console.log(condition, conditionIndex, conditionGroupIndex)
		
		// console.log(1, this.props.queryConditions)
		this.props.updateQueryCondition(condition, conditionIndex, conditionGroupIndex)
		// console.log(2, this.props.queryConditions)
		
		if(this.props.autoQueryContact && condition.value.length > 0) {
			this.handleRequestQueryContacts()
		}
	}

	handleRequestQueryContacts = () => {
		if(this.queryContactsTimer) {
			clearTimeout(this.queryContactsTimer)
		}
		this.queryContactsTimer = setTimeout(() => {
			// console.log(3, this.props.queryConditions)
			const conditionStrArr = this.props.queryConditions.map((conditionGroup) => {
				return JSON.stringify(conditionGroup)
			})
			const conditionsStr = JSON.stringify(conditionStrArr)
			this.props.reqQueryContacts(conditionsStr)
		}, 2000)
	}

	handleShowDeleteModal = (conditionIndex, conditionGroupIndex) => {
		// console.log(conditionIndex, conditionGroupIndex)
		this.props.updateConditionDeleteIndex(conditionIndex, conditionGroupIndex)
		this.props.showConditionDeleteModal(true)
	}

	handleConditionDelete = (conditionIndex, conditionGroupIndex) => {
		this.props.deleteQueryCondition(conditionIndex, conditionGroupIndex)
		this.props.showConditionDeleteModal(false)
	}

	render() {
		const { queryTerms, queryConditions, ...props } = this.props
		return (
			<div className="screening-condition">
				{queryConditions.map((item, conditionGroupIndex) => {
					return (
						<ConditionBox 
							key={conditionGroupIndex}
							queryTerms={queryTerms || {}}
							conditionGroup={item}
							onAddCondition={e => this.handleAddCondition(conditionGroupIndex)}
							onDeleteCondition={(conditionIndex) => this.handleShowDeleteModal(conditionIndex, conditionGroupIndex)}
							onUpdateCondition={(...args) => this.handleUpdateCondition(...args, conditionGroupIndex)}
						/>
					)
				})}
				<div className="add-condition-group">
					<ButtonIcon
						className="btn-icon-add"
						name="newly-added"
						onClick={this.handleAddConditionGroup}
					/>
				</div>
				<div className="save-to-condition">
					<span>将以上筛选保存到我的筛选条件</span>
				</div>
				<ConditionDeleteModal
					show={props.conditionDeleteModal}
					onClose={e => props.showConditionDeleteModal(false)}
					onConfirm={e => this.handleConditionDelete(props.conditionDeleteIndex, props.conditionDeleteGroupIndex)}
				/>
			</div>
		)
	}
} 

ScreeningCondition.propTypes = {
	autoQueryContact: PropTypes.bool,
}
ScreeningCondition.defaultProps = {
	autoQueryContact: false
}

const mapStateToProps = (state) => ({
	campaignId: state.campaignCreate.campaignId,
	targetConditionId: state.campaignCreate.target_condition,
	campaignList: state.campaignList.campaignList,
	queryTerms: state.screening.queryTerms,
	queryContents: state.screening.queryContents,
	queryTotalCounts: state.screening.queryTotalCounts,
	queryConditions: state.screening.queryConditions,
	conditionDeleteModal: state.screening.conditionDeleteModal,
	conditionDeleteIndex: state.screening.conditionDeleteIndex,
	conditionDeleteGroupIndex: state.screening.conditionDeleteGroupIndex
})

const mapDispatchToProps = (dispatch) => ({
	setCreateStep: bindActionCreators(actions.setCreateStep, dispatch),
	reqQueryTerms: bindActionCreators(screeningActions.reqQueryTerms, dispatch),
	reqQueryContacts: bindActionCreators(screeningActions.reqQueryContacts, dispatch),
	deleteQueryCondition: bindActionCreators(screeningActions.deleteQueryCondition, dispatch),
	updateQueryCondition: bindActionCreators(screeningActions.updateQueryCondition, dispatch),
	addQueryCondition: bindActionCreators(screeningActions.addQueryCondition, dispatch),
	addQueryConditionGroup: bindActionCreators(screeningActions.addQueryConditionGroup, dispatch),
	reqQueryConditions: bindActionCreators(screeningActions.reqQueryConditions, dispatch),
	showConditionDeleteModal: bindActionCreators(screeningActions.showConditionDeleteModal, dispatch),
	updateConditionDeleteIndex: bindActionCreators(screeningActions.updateConditionDeleteIndex, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(ScreeningCondition)