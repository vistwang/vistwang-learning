import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions } from '../../../reducers/campaign/campaignTmpl'
import { actions as createActions } from '../../../reducers/campaign/campaignCreate'

import Head from '../../../components/campaign/add/Head'
import TmplTab from '../../../components/campaign/add/TmplTab'
import TmplList from '../../../components/campaign/add/TmplList'
import PreviewGuideModal from '../../../components/campaign/add/PreviewGuideModal'


// const tmplList = [
// 	{id:1, icon:'hi', title: '新的用户和介绍', type: 1},
// 	{id:2, icon:'chapter', title: '复杂产品特性分章节介绍', type: 1},
// 	{id:8, icon:'magic-wand', title: '新的用户和介绍', type: 1},
// 	{id:4, icon:'gift', title: '查看价格后的又会推送', type: 1},
// 	{id:5, icon:'loss', title: '流失用户的定时回访邮件', type: 1},
// 	{id:6, icon:'recommend', title: '向深度客户请求客户推荐', type: 1},
// 	{id:3, icon:'bulb', title: '新特性的持续介绍', type: 2, imgUrl: 'http://resource.m1world.com/Fnh-9gpw1LaQGNS7qrXlscyHT9nd?imageMogr2/thumbnail/277x/gravity/North/crop/!277x375a0a15&_=1511860349000'},
// ]

class CampaignTmpl extends Component {
	componentDidMount() {
		this.props.reqTemplates({page:1, limit: 100})
	}

	componentWillReceiveProps(nextProps) {
		if(this.props.isCreateCampaignFetch !== nextProps.isCreateCampaignFetch && nextProps.isCreateCampaignFetch) {
			this.props.setCreateCampaignFetch(false)
			this.props.togglePreviewModal(false)
			this.props.history.push('/create')
		}
	}

	handleCreate = (type) => {
		const campaign = {
			name: '未命名营销活动',
			type: type,
		}
		this.props.setCreateCampaignFetch(false)
		this.props.reqSaveCampaign(campaign)
	}

	handleApply = (id) => {
		this.props.setCreateCampaignFetch(false)		
		this.props.reqUseTemplate(id)
	}

	handlePreview = (id) => {
		this.props.reqPreview(id)
	}

	handleClosePreview = e => {
		this.props.togglePreviewModal(false)
	}

	handlePreviewContent = (id) => {
		
	}

	render() {
		const { showPreviewModal, templates, previewData } = this.props
		return (
			<div className="body-container">
				<Head />
				{/*<TmplTab />*/}
				<TmplList 
					list={templates}
					onApply={this.handleApply}
					onPreview={this.handlePreview}
					onCreate={this.handleCreate}
					/>
				{previewData &&
					<PreviewGuideModal
									show={showPreviewModal}
									onClose={this.handleClosePreview}
									data={previewData}
									onApply={this.handleApply}
									onPreview={this.handlePreviewContent}
								/>}
			</div>
		)
	}
}

const mapStateToProps = state => ({
	showPreviewModal: state.campaignTmpl.showPreviewModal,
	previewData: state.campaignTmpl.previewData,
	templates: state.campaignTmpl.templates,
	totalCount: state.campaignTmpl.totalCount,
	pageIndex: state.campaignTmpl.pageIndex,
	pageSize: state.campaignTmpl.pageSize,
	isCreateCampaignFetch: state.campaignCreate.isCreateCampaignFetch,
})

const mapDispatchToProps = dispatch => ({
	togglePreviewModal: bindActionCreators(actions.togglePreviewModal, dispatch),
	reqTemplates: bindActionCreators(actions.reqTemplates, dispatch),
	reqPreview: bindActionCreators(actions.reqPreview, dispatch),
	reqUseTemplate: bindActionCreators(actions.reqUseTemplate, dispatch),
	reqSaveCampaign: bindActionCreators(createActions.reqSaveCampaign, dispatch),
	setCreateCampaignFetch: bindActionCreators(createActions.setCreateCampaignFetch, dispatch),
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CampaignTmpl)