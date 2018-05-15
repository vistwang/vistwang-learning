import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { msg, utils } from '../../../utils'
import { ReplyTypes } from '../../../base/enums'

import { actions } from '../../../reducers/campaign/inbox'
import { actions as replyActions } from '../../../reducers/campaign/reply'
import { actions as customerActions } from '../../../reducers/campaign/customer'
import { actions as listActions } from '../../../reducers/campaign/campaignList'

import Layout from '../../../components/campaign/layout/Layout'
import Screening from '../../../components/campaign/inbox/Screening'
import InboxBox from '../../../components/campaign/inbox/InboxBox'
import MessageDetailModal from '../../../components/campaign/inbox/MessageDetailModal'
import AddToCampaignModal from '../../../components/campaign/inbox/AddToCampaignModal'
import SettingReplyTypeModal from '../../../components/campaign/inbox/SettingReplyTypeModal'
import SendReplyModalContainer from './SendReplyModalContainer'

const typeIcons = {
	'感兴趣': 'smiling1',
	'不感兴趣': 'sad',
	'转发': 'forward',
	'自动回复': 'news',
}

class InboxContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			showModal: false
		}
	}

	componentDidMount() {
		this.requestRecipients()
		this.requestReplyTypes()
	}

	getCampaignId = () => {
		let { campaignId } = this.props
		if(!campaignId) {
			const locationSearch = this.props.history.location.search
			campaignId = utils.getSearchParams(locationSearch).get('cid')
		}
		return campaignId
	}

	requestRecipients = (option) => {
		const campaignId = this.getCampaignId()
		if(!campaignId) {
			this.props.history.push('/')
			return 
		}
		const {limit} = this.props
		const param = {campaignId, limit, ...option}
		this.props.reqRecipients(param)
	}

	requestReplyTypes = () => {
		const { replyTypes } = this.props
		if(replyTypes.length === 0) {
			const campaignId = this.getCampaignId()
			if(!campaignId) {
				this.props.history.push('/')
				return 
			}
			this.props.reqReplyTypes(campaignId)
		}
	}

	requestCampaigns = () => {
		if(this.props.campaignStore.length === 0) {
			this.props.reqCampaignStore(1, 300)
		}
	}

	handleOpenDetail = (replyId) => {
		this.props.updateReplyId(0)
		this.props.reqReply(replyId)
	}

	handleCloseDetail = e => {
		this.props.updateReplyId(0)
		this.props.showReplyModal(false)
	}

	getCurrentReplySubject = (replyId) =>{
		const {recipients} = this.props
		let subject = ''
		for(let i = 0; i < recipients.length; i++) {
			const list = recipients[i].replies.list
			for(let j = 0; j < list.length; j++) {
				if(list[j].id === replyId) {
					subject = list[j].subject
				}
			}
		}
		return subject
	}

	handleSelectAll = (status, replyTypeId) => {
		this.props.updateRecipientCheckedBetch(status, replyTypeId)
	}

	checkAll = (replyTypeId) => {
		const { recipients } = this.props
		return recipients.every(recipient => {
			return recipient.replies.list.every(reply => reply.checked)
		})
	}

	getCheckCount = () => {
		const { recipients } = this.props
		return recipients.reduce((sum, recipient) => {
			return recipient.replies.list.reduce((s, item) => {
				return !!item.checked ? ++s : s
			}, sum)
		}, 0)
	}

	getCheckedIds = () =>  {
		const idsArr = this.props.recipients.reduce((idsArray, recipient) => {
			return recipient.replies.list.reduce((arr, item) => {
				if(item.checked) {
					arr.push(item.id)
				}
				return arr
			}, idsArray)
		}, [])
		return idsArr.join(',')
	}

	getCheckedRecipientIds = () => {
		const idsArr = this.props.recipients.reduce((idsArray, recipient) => {
			return recipient.replies.list.reduce((arr, item) => {
				if(item.checked) {
					arr.push(item.recipientsId)
				}
				return arr
			}, idsArray)
		}, [])
		return idsArr.join(',')
	}

	handleAddToReplyType = (replyTypeId, replyId) => {
		const ids = replyId ? String(replyId) : this.getCheckedIds()
		this.props.reqBetchAddToReplyType(ids, replyTypeId)
		// const replyType = this.props.replyTypes.find(item => item.id === replyTypeId) || {}
		// msg.confirm(`确认将选中的回复用户移动到“${replyType.type_name}”`, () => {
		// })
	}

	handleOpenCampaignModal = () => {
		this.requestCampaigns()
		this.props.showAddToCampaignModal(true)
	}

	handleAddToCampaign = (campaignId, replyId) =>  {
		if(!campaignId) {
			msg.info('请选择营销活动')
			return
		}
		const ids = replyId ? String(replyId) : this.getCheckedIds()
		this.props.reqBetchAddToCampaign(ids, campaignId)

	}

	handleBlacklist = (recipientId) => {
		const recipientIds = recipientId ? String(recipientId) : this.getCheckedRecipientIds()
		this.props.reqBetchAddBlacklist(recipientIds)
	}

	handleRemoveRecipient = (replyId) => {
		msg.confirm('确定删除选中的回复用户吗?', () => {
			const ids = replyId ? String(replyId) : this.getCheckedIds()
			this.props.reqBetchDeleteRecipients(ids)
		})
	}

	handleOpenSettingReplyTypeModal = (typeId) => {
		if(typeId) {
			const { replyTypes } = this.props
			const replyType = replyTypes.find(item => item.id === typeId)
			this.props.resetReplyType(replyType)
		} else {
			this.props.resetReplyType()
		}
		this.props.showSettingReplyTypeModal(true)
	}

	handleSaveReplyType = () => {
		const { typeName, typeId } = this.props
		if(typeName.trim().length === 0) {
			msg.info('请填写分类名称')
			return
		}
		let replyType = {
			name: typeName
		}
		if(typeId) {
			replyType.id = typeId
		}
		this.props.saveReplyType(replyType)
	}
	handleRemoveReplyType = (replyTypeId) => {
		const replyType = this.props.replyTypes.find(item => item.id === replyTypeId) || {}
		msg.confirm(`确认删除回复类别 “${replyType.name}” 吗`, () => {
			this.props.reqRemoveReplyType(replyTypeId)
		})
	}
	handleSelectReplyType = (classificationId) => {
		let param = classificationId === -1 ? {} : {classificationId}
		this.requestRecipients(param)
	}
	handleLoadMore = (classificationId, page) => {
		this.requestRecipients({classificationId, page})
	}

	handleReplyEmail = () => {
		this.props.showReplyEmailModal(true)
	}

	render() {
		const {replyTypes, recipients, limit, replyId, ...props} = this.props
		return (
			<Layout
				history={props.history}
			>
				<div className="container inbox">
					<Screening 
						checkedCount={this.getCheckCount()}
						checked={this.checkAll()}
						onSelectAll={this.handleSelectAll}

						replyTypes={replyTypes}
						recipients={recipients}
						onAddToReplyType={this.handleAddToReplyType}
						onAddToCampaign={this.handleOpenCampaignModal}
						onBlacklist={this.handleBlacklist}
						onRemoveRecipient={this.handleRemoveRecipient}
						onCreateReplyType={this.handleOpenSettingReplyTypeModal}
						onSettingReplyType={typeId => this.handleOpenSettingReplyTypeModal(typeId)}
						onRemoveReplyType={this.handleRemoveReplyType}
						onSelectReplyType={this.handleSelectReplyType}
					/>
					<div className="container">
						{recipients.map((replyType, i) => {
							const currentRecipients = replyType.replies.list
							const currentCount = currentRecipients.length
							const currentTotal = replyType.replies.total
							const currentPage = replyType.replies.page || 1
							const currentTotalPage = Math.ceil(currentTotal / limit)
							const hasNextPage = currentPage < currentTotalPage
							return (
								<InboxBox 
									key={i} 
									icon={typeIcons[replyType.name] || 'classification'} 
									name={replyType.name} 
									total={currentTotal}
									currentCount={currentCount}
									currentPage={currentPage}
									hasNextPage={hasNextPage}
									recipients={currentRecipients} 
									onDetail={recipientId => this.handleOpenDetail(recipientId)} 
									onSelect={(recipientId, status) => props.updateRecipientChecked(recipientId, status)}
									onLoadMore={(page) => this.handleLoadMore(replyType.id, page)}
								/>
							)
						})}
					</div>
				</div>
				<MessageDetailModal 
					show={props.replyDetailModal} 
					onClose={this.handleCloseDetail} 
					replySubject={this.getCurrentReplySubject(replyId)}
					reply={props.reply}
					onReplyEmail={this.handleReplyEmail}

					replyTypes={replyTypes}
					onAddToReplyType={replyTypeId => this.handleAddToReplyType(replyTypeId, replyId)}
					onAddToCampaign={this.handleOpenCampaignModal}
					onBlacklist={e => this.handleBlacklist(replyId)}
					onRemoveRecipient={e => this.handleRemoveRecipient(replyId)}
				/>
				<AddToCampaignModal 
					show={props.addToCampaignModal}  
					onClose={e => props.showAddToCampaignModal(false)}
					campaigns={props.campaignStore.filter(item => item.id !== props.campaignId)}
					onConfirm={replyTypeId => this.handleAddToCampaign(replyTypeId, replyId)}
					/>
				<SettingReplyTypeModal
					show={props.settingReplyTypeModal}
					onClose={e => props.showSettingReplyTypeModal(false)}
					replyTypeId={props.typeId}
					replyTypeName={props.typeName}
					onTypeNameChange={props.updateTypeName}
					onConfirm={this.handleSaveReplyType}
				/>
				<SendReplyModalContainer />
			</Layout>
		)
	}
}

const mapStateToProps = (state) => ({
	campaignId: state.campaignCreate.campaignId,
	recipients: state.inbox.recipients,
	replyTypes: state.inbox.replyTypes,
	limit: state.inbox.limit,
	typeId: state.inbox.typeId,
	typeName: state.inbox.typeName,
	addToCampaignModal: state.inbox.addToCampaignModal,
	settingReplyTypeModal: state.inbox.settingReplyTypeModal,

	replyDetailModal: state.reply.replyDetailModal,
	replyEmailModal: state.reply.replyEmailModal,
	reply: state.reply.reply,
	replyId: state.reply.replyId,

	campaignStore: state.campaignList.campaignStore,
})

const mapDispatchToProps = (dispatch) => ({
	reqRecipients: bindActionCreators(actions.reqRecipients, dispatch),
	reqReplyTypes: bindActionCreators(actions.reqReplyTypes, dispatch),
	updateRecipientChecked: bindActionCreators(actions.updateRecipientChecked, dispatch),
	updateRecipientCheckedBetch: bindActionCreators(actions.updateRecipientCheckedBetch, dispatch),
	updateTypeName: bindActionCreators(actions.updateTypeName, dispatch),
	resetReplyType: bindActionCreators(actions.resetReplyType, dispatch),
	saveReplyType: bindActionCreators(actions.saveReplyType, dispatch),
	reqRemoveReplyType: bindActionCreators(actions.reqRemoveReplyType, dispatch),
	reqBetchAddToReplyType: bindActionCreators(actions.reqBetchAddToReplyType, dispatch),
	reqBetchDeleteRecipients: bindActionCreators(actions.reqBetchDeleteRecipients, dispatch),
	reqBetchAddToCampaign: bindActionCreators(actions.reqBetchAddToCampaign, dispatch),
	showAddToCampaignModal: bindActionCreators(actions.showAddToCampaignModal, dispatch),
	showSettingReplyTypeModal: bindActionCreators(actions.showSettingReplyTypeModal, dispatch),

	reqReply: bindActionCreators(replyActions.reqReply, dispatch),
	reqReply: bindActionCreators(replyActions.reqReply, dispatch),
	updateReplyId: bindActionCreators(replyActions.updateReplyId, dispatch),
	showReplyModal: bindActionCreators(replyActions.showReplyModal, dispatch),
	showReplyEmailModal: bindActionCreators(replyActions.showReplyEmailModal, dispatch),

	reqBetchAddBlacklist: bindActionCreators(customerActions.reqBetchAddBlacklist, dispatch),

	reqCampaignStore: bindActionCreators(listActions.reqCampaignStore, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(InboxContainer)