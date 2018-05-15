import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { actions } from '../../../reducers/setting/emailAccount'
import { actions as setActions } from '../../../reducers/setting/emailAccountSetting'

import { Button, Pagination, Colors } from '../../../components/m1ui'
import EmailAccountList from '../../../components/setting/account/EmailAccountList'
import EmailServiceModal from './EmailServiceModal'

class EmailAccountContainer extends Component {
	componentDidMount() {
		const {pageIndex, pageSize, emailAccounts} = this.props
		if(emailAccounts.length === 0) {
			this.props.reqEmailAccountList(pageIndex, pageSize)
		}
	}

	handleAddAccount = e => {
		this.props.resetEmailAccount()
		this.props.showEmailAccountModal(true)
	}

	handleCloseModal = e => {
		this.props.showEmailAccountModal(false)
	}

	handleEdit = (id) => {
		const emailAccount = this.props.emailAccounts.find(item => item.email_account_id === id)
		this.props.resetEmailAccount(emailAccount)
		this.props.showEmailAccountModal(true)
	}

	handleRemove = (id) => {
		this.props.removeEmailAccount(id)
	}

	handlePageChange = (page) => {
		this.props.reqEmailAccountList(page, this.props.pageSize)
	}

	render() {
		const { emailAccountModal, emailAccounts, emailAccountTotal, pageIndex, pageSize } = this.props
		return (
			<div className="m1-right">
				<div className="m1-panel">
					<div className="m1-panel-header email-account-header">
						<h2>邮箱相关设置</h2>
						<Button color={Colors.PRIMARY} onClick={this.handleAddAccount} >添加邮箱账户</Button>
					</div>
					<div className="m1-panel-content">
						<EmailAccountList 
							accounts={emailAccounts}
							onEdit={this.handleEdit}
							onRemove={this.handleRemove}
						/>
					</div>
				</div>
				<div className="m1-panel panel-btm">
					<div className="panel-btm-right">
						<Pagination 
							total={emailAccountTotal} 
							currentPage={pageIndex} 
							currentSize={pageSize} 
							onPageChange={this.handlePageChange}
						/>
					</div>
				</div>
				{emailAccountModal && 
					<EmailServiceModal 
						show={emailAccountModal} 
						onClose={this.handleCloseModal} 
					/>}
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	emailAccountModal: state.emailAccount.emailAccountGlobal.emailAccountModal,
	emailAccounts: state.emailAccount.emailAccountGlobal.emailAccounts,
	emailAccountTotal: state.emailAccount.emailAccountGlobal.emailAccountTotal,
	pageIndex: state.emailAccount.emailAccountGlobal.pageIndex,
	pageSize: state.emailAccount.emailAccountGlobal.pageSize,
})

const mapDispatchToProps = (dispatch) => ({
	showEmailAccountModal: bindActionCreators(actions.showEmailAccountModal, dispatch),
	reqEmailAccountList: bindActionCreators(actions.reqEmailAccountList, dispatch),
	removeEmailAccount: bindActionCreators(actions.removeEmailAccount, dispatch),
	resetEmailAccount: bindActionCreators(setActions.resetEmailAccount, dispatch),
})

export default connect(mapStateToProps,mapDispatchToProps)(EmailAccountContainer)