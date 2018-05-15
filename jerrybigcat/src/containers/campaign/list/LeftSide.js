import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import { actions } from '../../../reducers/campaign/campaignList'

import { msg } from '../../../utils'
import { Icon } from '../../../components/m1ui'
import CampaignMenu from '../../../components/campaign/list/CampaignMenu'
import CampaignFolder from '../../../components/campaign/list/CampaignFolder'
import FolderSettingModal from '../../../components/campaign/list/FolderSettingModal'

class LeftSide extends Component {
	componentDidMount() {
		const { folderList } = this.props
		if(folderList.length === 0) {
			this.props.reqFolderList()
		}
		
	}
	handleAddFolder = () => {
		this.props.setFolderId('')
		this.props.updateFolderName('')
		this.props.campaignFolderSetModal(true)
	}
	handleSaveFolder = () => {
		const { folderId, folderName } = this.props
		let folder = {
			name: folderName
		}
		if(folderId) {
			folder.id = folderId
		}
		this.props.saveFolder(folder)
	}
	handleEditFolder = (id) => {
		const { folderList } = this.props
		const folder = folderList.find(item => item.id === id)
		this.props.resetFolder(folder)
		this.props.toggleFolderMenu(id, false)
		this.props.campaignFolderSetModal(true)
	}
	handleRemoveFolder = (id) => {
		msg.confirm('确认删除此文件夹吗', () => {
			this.props.reqRemoveFolder(id)
			this.props.toggleFolderMenu(id, false)
			msg.close()
		})
	}
	handleToggleMenu = (id, status) => {
		this.props.toggleFolderMenu(id, status)
	}
	handleRequestCampaignList = (option) => {
		const { campaignPage } = this.props
		const options = {
			page: 1,
			limit: campaignPage.limit,
			current: false,
			status: '',
			type: '',
			folderId: '',
			...option,
		}
		const param = {
			page: 1,
			limit: campaignPage.limit,
			...option,
		}
		this.props.updateCampaignPageInfo(options)
		this.props.reqCampaignList(param)

	}
	render() {
		const {folderSettingModal, folderId, folderName, statistics, ...props} = this.props
		return (
			<div className="m1-left campaign-nav">
        <CampaignMenu 
        	info={props.campaignPage}
        	statistics={statistics}
        	onRequestList={this.handleRequestCampaignList}
        />
				<hr/>
        <CampaignFolder 
        	folders={props.folderList}
        	onAddFolder={this.handleAddFolder}
        	onEditFolder={this.handleEditFolder}
        	onRemoveFolder={this.handleRemoveFolder}
        	onToggleMenu={(id, status) => this.handleToggleMenu(id, status)}
        	pageInfo={props.campaignPage}
        	onRequestList={this.handleRequestCampaignList}
        />
        <FolderSettingModal
        	show={folderSettingModal}
        	folderId={folderId}
        	folderName={folderName}
        	onClose={e => props.campaignFolderSetModal(false)}
        	onChangeFolder={e => props.updateFolderName(e.target.value)}
        	onApply={this.handleSaveFolder}
        />
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	folderSettingModal: state.campaignList.folderSettingModal,
	folderList: state.campaignList.folderList,
	folderId: state.campaignList.folderId,
	folderName: state.campaignList.folderName,
	campaignPage: state.campaignList.campaignPage,
	statistics: state.campaignList.statistics,
})

const mapDispatchToProps = (dispatch) => ({
	campaignFolderSetModal: bindActionCreators(actions.campaignFolderSetModal, dispatch),
	setFolderId: bindActionCreators(actions.setFolderId, dispatch),
	updateFolderName: bindActionCreators(actions.updateFolderName, dispatch),
	reqFolderList: bindActionCreators(actions.reqFolderList, dispatch),
	saveFolder: bindActionCreators(actions.saveFolder, dispatch),
	reqRemoveFolder: bindActionCreators(actions.reqRemoveFolder, dispatch),
	resetFolder: bindActionCreators(actions.resetFolder, dispatch),
	toggleFolderMenu: bindActionCreators(actions.toggleFolderMenu, dispatch),
	updateCampaignPageInfo: bindActionCreators(actions.updateCampaignPageInfo, dispatch),
	reqCampaignList: bindActionCreators(actions.reqCampaignList, dispatch),
	reqCampaignCatalogCount: bindActionCreators(actions.reqCampaignCatalogCount, dispatch),
})

export default connect(mapStateToProps,mapDispatchToProps)(LeftSide)