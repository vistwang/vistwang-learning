import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import { actions as listActions } from '../../../reducers/campaign/campaignList' 
import { actions } from '../../../reducers/campaign/campaignCreate' 
import { actions as screeningActions } from '../../../reducers/campaign/screening'

import {msg} from '../../../utils'
import { CampaignStatus, CampaignBetchTypes } from '../../../base/enums'

import Screening from '../../../components/campaign/list/Screening'
import CampaignTable from '../../../components/campaign/list/CampaignTable'
import PanelBottom from '../../../components/campaign/list/PanelBottom'
import FoldersModal from '../../../components/campaign/list/FoldersModal'

class RightSide extends Component {
	componentDidMount() {
		if(this.props.campaignList.length === 0) {
			this.getCampaignList({})
		}
	}

	handleCreate = (e) => {
		this.props.resetCampaign()
		this.props.history.push('/add')
	}

	handleEdit = (id) => {
		const { campaignList } = this.props
		const campaign = campaignList.find(item => item.id === id)
		// let queryConditions = []
		
		// if(campaign.target_condition) {
		// 	let targetCondition = JSON.parse(campaign.target_condition) || []
		// 	queryConditions = targetCondition.map(v => JSON.parse(v))
		// }

		const campaignParam = {
			...campaign,
			// target_condition: queryConditions
		}

		this.props.resetCampaign(campaignParam)
		// this.props.resetQueryConditions(queryConditions)

		// this.props.history.push('/create')
		if(campaign.status === CampaignStatus.DRAFT) {
			this.props.setCreateStep(1)
			this.props.history.push('/create?cid=' + id)
		} else {
			this.props.history.push('/process?cid=' + id)
		}
	}

	handleStatistics = (id) => {
		const { campaignList } = this.props
		const campaign = campaignList.find(item => item.id === id)


		const campaignParam = {
			...campaign,
		}
		this.props.resetCampaign(campaignParam)
		if(campaign.status === CampaignStatus.DRAFT) {
			this.props.setCreateStep(1)
			this.props.history.push('/create?cid=' + id)
		} else {
			this.props.history.push('/stat?cid=' + id)
		}
	}

	checkAll = () => {
		return this.props.campaignList.every(item => !!item.checked)
	}

	getCheckCount = () => {
		return this.props.campaignList.filter(item => !!item.checked).length
	}

	getCheckIds = () => {
		const {campaignList} = this.props
		const idArr = campaignList.reduce((arr, item) => {
			if(!!item.checked) {
				arr.push(item.id)
			}
			return arr
		}, [])
		return idArr.join(',')
	}

	handleCheckBetchSetting = (type) => {
		if(type === CampaignBetchTypes.DELETE) {
			msg.confirm('确认删除选中的活动吗', () => {
				msg.close()
				this.handleBetchSetting(type)
			})
		} else {
			this.handleBetchSetting(type)
		}
	}

	handleBetchSetting = (type) => {
		const ids = this.getCheckIds()
		if(ids.length === 0) {
			msg.info('请先选择要批量操作的活动')
		} else {
			this.props.reqBetchSetting(ids,type)
		}
	}

	handleBetchFolder = (type) => {
		const ids = this.getCheckIds()
		if(ids.length === 0) {
			msg.info('请先选择要批量操作的活动')
			return
		} 
		if(type === 1) {
			this.handleBetchRemoveFromFolder()
		} else {
			this.props.showFolderSelectModal(true)
		}
	}

	handleBetchAddToFolder = () => {
		const {folderSearchKey, folderList} = this.props
		const ids = this.getCheckIds()
		const findFolder = folderList.find(item => item.name.trim() === folderSearchKey)
		if(!findFolder) {
			msg.info('没找到相应的文件夹')
			return
		}
		this.props.reqBetchAddToFolder(findFolder.id, ids)
	}

	handleBetchRemoveFromFolder = () => {
		const {campaignPage} = this.props
		const currFolderId = campaignPage.folderId
		const ids = this.getCheckIds()
		this.props.reqBetchRemoveFromFolder(currFolderId, ids)
	}

	handleFolderSelectChange = (folderName) => {
		this.props.updateFolderSearchKey(folderName)
	}

	handleChangeStatus(id, status) {
		let type
		if(status === CampaignStatus.RUNNING) {
			type = CampaignBetchTypes.OPEN
		} else {
			type = CampaignBetchTypes.STOP
		}
		this.props.reqBetchSetting(String(id), type)
	}

	handlePageChange = (page) => {
		const {campaignPage} = this.props
		const pageOption = {
			...campaignPage,
			page
		}
		this.props.updateCampaignPageInfo(pageOption)
		this.getCampaignList({page})
	}

	getCampaignList(option) {
		const { campaignPage } = this.props
		let param = {
			page: campaignPage.page,
			limit: campaignPage.limit,
			...option
		}

		if(campaignPage.own) {
			param.own = campaignPage.own
		}else if(campaignPage.status !== '') {
			param.status = campaignPage.status
		} else if(campaignPage.type !== '') {
			param.type = campaignPage.type
		} else if(campaignPage.folder_id) {
			param.folder_id = campaignPage.folder_id
		}
		this.props.reqCampaignList(param)
	}

	render() {
		const { campaignList, campaignTotal, campaignPage, folderList, folderSearchKey, ...props} = this.props
		const checkCount = this.getCheckCount()
		const totalCount = campaignTotal
		const canRemoveFromFolder = campaignPage.folderId !== ''
		return (
			<div className="m1-right">
				<Screening 
					totalCount={totalCount}
					selectCount={checkCount}
					onSelect={this.handleCheckBetchSetting}
					onCreate={this.handleCreate}
					onBetchFolder={this.handleBetchFolder}
					canRemoveFromFolder={canRemoveFromFolder}
				/>
				<CampaignTable 
					hasCheckAll={this.checkAll()}
					campaigns={campaignList}
					onEdit={this.handleEdit}
					onCheck={id => props.checkedCampaign(id)}
					onCheckAll={status => props.checkedCampaignAll(status)}
					onStatus={(id, status) => this.handleChangeStatus(id, status)}
					onRemove={props.reqRemoveCampaign}
					onStatistic={this.handleStatistics}
				/>
				<PanelBottom 
					totalCount={totalCount}
					checkCount={checkCount}
					currentPage={campaignPage.page}
					currentSize={campaignPage.limit}
					onPageChange={this.handlePageChange}
				/>
				<FoldersModal
					show={props.folderSelectModal}
					folders={folderList}
					searchKey={folderSearchKey}
					onClose={e => props.showFolderSelectModal(false)}
					onSelect={this.handleFolderSelectChange}
					onChangeKey={e => props.updateFolderSearchKey(e.target.value)}
					onConfirm={this.handleBetchAddToFolder}
				/>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	campaignList: state.campaignList.campaignList,
	campaignPage: state.campaignList.campaignPage,
	campaignTotal: state.campaignList.campaignTotal,
	folderList: state.campaignList.folderList,
	folderSearchKey: state.campaignList.folderSearchKey,
	folderSelectId: state.campaignList.folderSelectId,
	folderSelectModal: state.campaignList.folderSelectModal,
})

const mapDispatchToProps = (dispatch) => ({
	reqCampaignList: bindActionCreators(listActions.reqCampaignList, dispatch),
	reqRemoveCampaign: bindActionCreators(listActions.reqRemoveCampaign, dispatch),
	reqBetchSetting: bindActionCreators(listActions.reqBetchSetting, dispatch),
	checkedCampaign: bindActionCreators(listActions.checkedCampaign, dispatch),
	checkedCampaignAll: bindActionCreators(listActions.checkedCampaignAll, dispatch),
	changeCampaignStatus: bindActionCreators(listActions.changeCampaignStatus, dispatch),
	updateCampaignPageInfo: bindActionCreators(listActions.updateCampaignPageInfo, dispatch),
	updateFolderSearchKey: bindActionCreators(listActions.updateFolderSearchKey, dispatch),
	showFolderSelectModal: bindActionCreators(listActions.showFolderSelectModal, dispatch),
	reqBetchAddToFolder: bindActionCreators(listActions.reqBetchAddToFolder, dispatch),
	reqBetchRemoveFromFolder: bindActionCreators(listActions.reqBetchRemoveFromFolder, dispatch),
	resetCampaign: bindActionCreators(actions.resetCampaign, dispatch),
	setCreateStep: bindActionCreators(actions.setCreateStep, dispatch),
	resetQueryConditions: bindActionCreators(screeningActions.resetQueryConditions, dispatch),
})

export default connect(mapStateToProps,mapDispatchToProps)(RightSide)