import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'

import { Modal, Button, Tag, Icon, Colors, Sizes } from '../../../components/m1ui'
import { AccountAuths } from '../../../base/enums'
import { msg } from '../../../utils'

 const TagCheckedColor = (bool) => {
 	return bool ? Colors.PRIMARY : Colors.IGNORE
 }

const propTypes = {
	show: PropTypes.bool,
	onClose: PropTypes.func.isRequired,
	onUpdate: PropTypes.func.isRequired,
}

class TeamBatchEditAuth extends Component {
	constructor(props) {
		super(props)

		this.state = {
			[AccountAuths.READABLE]: false,
			[AccountAuths.WRITABLE]: false,
			[AccountAuths.DELETABLE]: false,
			[AccountAuths.EXPORTABLE]: false,
			[AccountAuths.SHOWFOLDER]: false
		}
	}

	handleToggleGeneral = auth => {
		if(auth !== AccountAuths.READABLE && !this.state[AccountAuths.READABLE]) {
			msg.info('请先选中可读')
			return
		}
		this.setState({
			[auth]: !this.state[auth]
		})
	}

	handleSubmitSave = e => {
		this.props.onUpdate(this.state)
	}

	render() {
		const { show, onClose, ...props } = this.props


		return (
			<Modal
				show={show}
				onClose={onClose}
				style={{width:'600px'}}
			>
				<Modal.Header>
					<Modal.Title>批量编辑权限</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="m1-row">
						<div className="team-general-auth">
						    <Tag 
						    	size={Sizes.LARGE} 
						    	color={TagCheckedColor(this.state[AccountAuths.READABLE])} 
						    	onClick={e => this.handleToggleGeneral(AccountAuths.READABLE)} 
						    	checkable 
						    	data-tip="拥有查看协作对象（如联系人群组、Page、EDM、SMS的文件夹及单个协作对象）的权限"
						    	><Icon name="browse"></Icon> 可读</Tag>
						    <Tag 
						    	size={Sizes.LARGE} 
						    	color={TagCheckedColor(this.state[AccountAuths.READABLE] && this.state[AccountAuths.WRITABLE])} 
						    	onClick={e => this.handleToggleGeneral(AccountAuths.WRITABLE)} 
						    	checkable 
						    	data-tip="拥有新建或修改协作对象（如新建联系人群组、新建Page、EDM、SMS的文件夹及单个协作对象）的权限"
						    	><Icon name="edit"></Icon> 可写</Tag>
						    <Tag 
						    	size={Sizes.LARGE} 
						    	color={TagCheckedColor(this.state[AccountAuths.READABLE] && this.state[AccountAuths.DELETABLE])} 
						    	onClick={e => this.handleToggleGeneral(AccountAuths.DELETABLE)} 
						    	checkable 
						    	data-tip="拥有删除协作对象（如删除联系人群组、删除Page、EDM、SMS的文件夹及单个协作对象）的权限"
						    	><Icon name="delete"></Icon> 可删</Tag>
						    <Tag 
						    	size={Sizes.LARGE} 
						    	color={TagCheckedColor(this.state[AccountAuths.READABLE] && this.state[AccountAuths.EXPORTABLE])} 
						    	onClick={e => this.handleToggleGeneral(AccountAuths.EXPORTABLE)} 
						    	checkable 
						    	data-tip="拥有导出包括联系人明细数据、EDM、SMS回执报告明细数据" 
						    	style={{marginRight:'0px'}}
						    	><Icon name="upload"></Icon> 可导出</Tag>
						    <Tag 
						    	size={Sizes.LARGE} 
						    	color={TagCheckedColor(this.state[AccountAuths.READABLE] && this.state[AccountAuths.SHOWFOLDER])} 
						    	onClick={e => this.handleToggleGeneral(AccountAuths.SHOWFOLDER)} 
						    	checkable 
						    	data-tip="在联系人中共享群组时，同时共享该群组所在的文件夹" 
						    	style={{marginTop:'15px'}}
						    	><Icon name="upload"></Icon> 显示文件夹</Tag>
						    <ReactTooltip effect="solid"/>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={onClose}>取消</Button>
					<Button color={Colors.PRIMARY} onClick={this.handleSubmitSave}>确定</Button>
				</Modal.Footer>
			</Modal>
		)
	}
}

TeamBatchEditAuth.propTypes = propTypes

export default TeamBatchEditAuth