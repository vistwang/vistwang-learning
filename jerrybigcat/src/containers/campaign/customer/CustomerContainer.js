import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {GroupScopes, GroupTypes} from '../../../base/enums'
import {msg,utils} from '../../../utils'

import {actions} from '../../../reducers/campaign/customer'
import {actions as processActions} from '../../../reducers/campaign/campaignProcess'
import {actions as createActions} from '../../../reducers/campaign/campaignCreate'
import {actions as listActions} from '../../../reducers/campaign/campaignList'
import {actions as screeningActions} from '../../../reducers/campaign/screening'
import {actions as inboxActions} from '../../../reducers/campaign/inbox'
import {actions as groupActions} from '../../../reducers/campaign/group'

import { Checkbox, Dropdown, MenuItem, Pagination, Text, Colors } from '../../../components/m1ui'
import Layout from '../../../components/campaign/layout/Layout'
import CustomerTabNav from '../../../components/campaign/customer/CustomerTabNav'
import CustomerTable from '../../../components/campaign/customer/CustomerTable'
import CustomerScreeningModal from '../../../components/campaign/customer/CustomerScreeningModal'
import CustomerPreviewModal from '../../../components/campaign/customer/CustomerPreviewModal'
import CustomerHeadScreening from '../../../components/campaign/customer/CustomerHeadScreening'
import ConditionNameModal from '../../../components/campaign/create/ConditionNameModal'
import AddToCampaignModal from '../../../components/campaign/inbox/AddToCampaignModal'
import GroupsModal from '../../../components/campaign/contact/GroupsModal'

class CustomerContainer extends Component {
  componentDidMount() {
    this.requestCustomers()
  }

  getCampaignId = () => {
    let { campaignId } = this.props
    if(!campaignId) {
      const locationSearch = this.props.history.location.search
      campaignId = utils.getSearchParams(locationSearch).get('cid')
    }
    return campaignId
  }

  requestCustomers = (option = {}) => {
    const campaignId = this.getCampaignId()
    if(!campaignId) {
      this.props.history.push('/')
      return 
    }

    const { pageIndex, pageSize, status, step } = this.props
    let param = {
      campaignId,
      page: pageIndex,
      limit: pageSize,
      status,
      step,
    }

    let customParam = {
      ...param,
      ...option
    }

    if(!customParam.status){
      delete customParam.status
    }
    if(!customParam.step){
      delete customParam.step
    }

    this.props.reqCustomers(customParam)
  }

  requestCampaigns = () => {
    if(this.props.campaignStore.length === 0) {
      this.props.reqCampaignStore(1, 300)
    }
  }

  handleShowScreening = e =>{
    this.props.showConditionModal(true)
  }

  handleCloseScreening = e =>{
    this.props.showConditionModal(false)
  }

  handleShowPreview = e => {
    const { queryConditions } = this.props
    const conditionStrArr = queryConditions.map((conditionGroup) => {
      return JSON.stringify(conditionGroup)
    })
    const conditionsStr = JSON.stringify(conditionStrArr)
    this.props.reqQueryContacts(conditionsStr)

    this.props.showConditionModal(false)
    this.props.showPreviewModal(true)
  }

  handleClosePreview = e => {
    this.props.showConditionModal(true)
    this.props.showPreviewModal(false)
  }

  handleCustomerChecked = (status, customerId) => {
    this.props.updateCustomerChecked(customerId, status) 
  }

  handleSelectStep = (step) => {
    this.requestCustomers({step})
  }

  handleSelectStatus = (status) => {
    this.requestCustomers({status})
  }

  handleSaveCondition = () => {
    const {queryConditions, campaign_id, conditionName} = this.props

    if(conditionName.trim().length === 0) {
      msg.info('动态细分群组名不能空')
      return
    }

    const conditionStrArr = queryConditions.map((conditionGroup) => {
      return JSON.stringify(conditionGroup)
    })
    const conditionsStr = JSON.stringify(conditionStrArr)
    const campaign = {
      campaign_id,
      conditionName,
      target_condition: conditionsStr
    }
    this.props.reqSaveCampaign(campaign, {showConditionModal: false})
  }

  handleConditionName = () => {
    if(this.props.conditionName.trim().length === 0) {
      this.props.showConditionNameModal(true)
    } else {
      this.handleSaveCondition()
    }
  }

  handleSelectAll = (status) => {
    this.props.updateCustomersCheckedBetch(status)
  }

  checkAll = () => {
    const { customers } = this.props
    return customers.every(customer => {
      return customer.checked
    })
  }

  getCheckCount = () => {
    const { customers } = this.props
    const filtreCustomers = customers.filter(item => item.checked)
    return filtreCustomers.length
  }

  getCheckedIds = () =>  {
    const filtreCustomers = this.props.customers.filter(item => item.checked)
    const idsArr = filtreCustomers.map(item => item.id)
    return idsArr.join(',')
  }

  handleSendEmail = () => {

  }

  handleOpenGroupModal = () => {
    if(this.props.groups.length === 0) {
      this.props.reqGroups(GroupScopes.CONTACT, GroupTypes.NORMAL)
    }
    this.props.updateGroupKey('')
    this.props.showGroupModal(true)
  }
  handleAddToGroup = () => {
    const {groupSearchKey} = this.props
    if(groupSearchKey.trim().length === 0) {
      msg.info('群组名不能空')
      return
    }
    const filtreCustomers = this.props.customers.filter(item => item.checked)
    const idsArr = filtreCustomers.map(item => item.contactId)
    const contactIds = idsArr.join(',')
    const param = {
      contacts: contactIds,
      group: groupSearchKey,
      scope: GroupScopes.CONTACT,
    }
    this.props.reqGroupPutContact(param)
  }

  handleOpenCampaignModal = () => {
    this.requestCampaigns()
    this.props.showAddToCampaignModal(true)
  }
  handleAddToCampaign = (campaign_id) => {
    if(!campaign_id) {
      msg.info('请选择营销活动')
      return
    }
    const ids = this.getCheckedIds()
    this.props.reqBetchAddToCampaign(ids, campaign_id)
  }

  handleBlacklist = () => {
    const ids = this.getCheckedIds()
    this.props.reqBetchAddBlacklist(ids)
  }

  handleRemoveRecipient = () => {
    const { campaign_id } = this.props
    const ids = this.getCheckedIds()
    this.props.reqBetchRemoveFromCampaign(ids, campaign_id)
  }

  handlePageChange = (page) => {
    const { pageIndex, pageSize } = this.props
    if(page !== pageIndex) {
      this.requestCustomers({page})
    }
  }

	render() {
    const { customers, step, status, stepNum, statistics, pageIndex, pageSize, totalCount, ...props } = this.props
		return (
			<Layout noPanel
        history={props.history}
      >
				<div className="container customer">
          <div className="m1-panel">
            <div className="m1-panel-content">
    					<div className="m1-tabs">
                <CustomerTabNav 
                  status={status}
                  schema={statistics}
                  onSelect={this.handleSelectStatus}
                />
                <div className="m1-tab-content">
                  <CustomerHeadScreening
                    checkedCount={this.getCheckCount()}
                    checked={this.checkAll()}
                    onSelectAll={this.handleSelectAll}

                    onSendEmail={this.handleSendEmail}
                    onAddToGroup={this.handleOpenGroupModal}
                    onAddToCampaign={this.handleOpenCampaignModal}
                    onBlacklist={this.handleBlacklist}
                    onRemoveRecipient={this.handleRemoveRecipient}

                    step={step}
                    stepNum={stepNum}
                    onSelectStep={this.handleSelectStep}
                    onChangeCondition={this.handleShowScreening}
                  />
                  <div className="m1-tab-pane select">
                  	<CustomerTable 
                      customers={customers}
                      onChecked={this.handleCustomerChecked}
                    />
                  </div>
                </div>
              </div>
    				</div>
            </div>
            <div className="m1-panel panel-btm">
              <div className="panel-btm-right">
                <Pagination 
                  total={totalCount} 
                  currentPage={pageIndex} 
                  currentSize={pageSize} 
                  onPageChange={this.handlePageChange}
                />
              </div>
            </div>
          </div>
				<CustomerScreeningModal 
					show={props.conditionModal}
          totalCount={props.queryTotalCount}
          onClose={this.handleCloseScreening}
          onPreview={this.handleShowPreview}
          onConfirm={this.handleConditionName}
				/>
				<CustomerPreviewModal 
					show={props.contactPreviewModal}
          onClose={this.handleClosePreview}
				/>
        <ConditionNameModal
          show={props.conditionNameModal}
          onClose={e => props.showConditionNameModal(false)}
          conditionName={props.conditionName}
          onChangeName={e => props.updateQueryConditionName(e.target.value)}
          onConfirm={this.handleSaveCondition}
        />
        <AddToCampaignModal 
          show={props.addToCampaignModal}  
          onClose={e => props.showAddToCampaignModal(false)}
          campaigns={props.campaignStore.filter(item => item.id !== props.campaign_id)}
          onConfirm={this.handleAddToCampaign}
          />
        <GroupsModal
          show={props.groupModal}
          searchKey={props.groupSearchKey}
          groups={props.groups}
          onClose={e => props.showGroupModal(false)}
          onChangeKey={e => props.updateGroupKey(e.target.value)}
          onSelect={group => props.updateGroupKey(group)}
          onConfirm={this.handleAddToGroup}
        />
			</Layout>
		)
	}
}

const mapStateToProps = (state) => ({
  campaignId: state.campaignCreate.campaignId,
  processes: state.campaignProcess.processes,
  totalCount: state.customer.totalCount,
  pageIndex: state.customer.pageIndex,
  pageSize: state.customer.pageSize,
  status: state.customer.status,
  step: state.customer.step,
  stepNum: state.customer.stepNum,
  customers: state.customer.customers,
  statistics: state.customer.statistics,
  conditionModal: state.customer.conditionModal,
  contactPreviewModal: state.customer.contactPreviewModal,

  addToCampaignModal: state.inbox.addToCampaignModal,
  campaignStore: state.campaignList.campaignStore,

  queryConditions: state.screening.queryConditions,
  queryTotalCount: state.screening.queryTotalCount,
  conditionName: state.screening.conditionName,
  conditionNameModal: state.screening.conditionNameModal,

  groupModal: state.group.groupModal,
  groupSearchKey: state.group.searchKey,
  groups: state.group.groups,
})

const mapDispatchToProps = (dispatch) => ({
  reqCustomers: bindActionCreators(actions.reqCustomers, dispatch),
  reqSchema: bindActionCreators(actions.reqSchema, dispatch),
  updateStep: bindActionCreators(actions.updateStep, dispatch),
  updateStatus: bindActionCreators(actions.updateStatus, dispatch),
  showConditionModal: bindActionCreators(actions.showConditionModal, dispatch),
  showPreviewModal: bindActionCreators(actions.showPreviewModal, dispatch),
  updateCustomerChecked: bindActionCreators(actions.updateCustomerChecked, dispatch),
  updateCustomersCheckedBetch: bindActionCreators(actions.updateCustomersCheckedBetch, dispatch),
  reqBetchAddToCampaign: bindActionCreators(actions.reqBetchAddToCampaign, dispatch),
  reqBetchAddBlacklist: bindActionCreators(actions.reqBetchAddBlacklist, dispatch),
  reqBetchRemoveFromCampaign: bindActionCreators(actions.reqBetchRemoveFromCampaign, dispatch),

  showAddToCampaignModal: bindActionCreators(inboxActions.showAddToCampaignModal, dispatch),

  reqCampaignStore: bindActionCreators(listActions.reqCampaignStore, dispatch),
  reqCampaignProcesses: bindActionCreators(processActions.reqCampaignProcesses, dispatch),

  updateQueryConditionName: bindActionCreators(screeningActions.updateQueryConditionName, dispatch),
  showConditionNameModal: bindActionCreators(screeningActions.showConditionNameModal, dispatch),
  reqQueryContacts: bindActionCreators(screeningActions.reqQueryContacts, dispatch),
  reqSaveCampaign: bindActionCreators(createActions.reqSaveCampaign, dispatch),

  updateGroupKey: bindActionCreators(groupActions.updateGroupKey, dispatch),
  showGroupModal: bindActionCreators(groupActions.showGroupModal, dispatch),
  reqGroups: bindActionCreators(groupActions.reqGroups, dispatch),
  reqGroupPutContact: bindActionCreators(groupActions.reqGroupPutContact, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomerContainer)