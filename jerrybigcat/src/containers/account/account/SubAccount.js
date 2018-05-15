import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Tag, Input, Radio, Button, Icon, Colors, Sizes } from '../../../components/m1ui'

class SubAccount extends Component {

	renderInvitationPanel() {
		return (
			<div className="m1-panel">
				<div className="m1-panel-header">
					<h2>子账户</h2>
				</div>
				<div className="m1-panel-content">
					<div className="m1-row">
						<h3>添加邮箱</h3>
						<div className="m1-form-row">
							<Tag color={Colors.PRIMARY} size={Sizes.LARGE} removeable>jerry.lang@meihua.info</Tag>
							<Tag color={Colors.PRIMARY} size={Sizes.LARGE} removeable>jerry.lang@meihua.info</Tag>
							<Tag color={Colors.PRIMARY} size={Sizes.LARGE} removeable>jerry.lang@meihua.info</Tag>
							<Tag color={Colors.PRIMARY} size={Sizes.LARGE} removeable>jerry.lang@meihua.info</Tag>
							<Input placeholder="请输入邀请协作者的邮箱" />
							<Tag color={Colors.PRIMARY} size={Sizes.LARGE} > + 添加</Tag>
						</div>
					</div>
					<div className="m1-row">
						<h3>权限设置</h3>
						<div className="m1-form-row">
							<Radio name="selectAuth" text={'邀请账号可拥有同主账号相同权限（管理员）'} />
						</div>
						<div className="m1-form-row">
							<Radio name="selectAuth" text={'邀请账号可拥有部分权限'} />
						</div>
						<div className="m1-form-row">
							<Button color={Colors.PRIMARY} size={Sizes.LARGE}>发送邮件邀请</Button>
						</div>
					</div>
				</div>
			</div>
		)
	}

	renderMemberPanel() {
		return (<div className="m1-panel">
				<div className="m1-panel-header">
					<h2>协作成员（5）</h2>
				</div>
				<div className="m1-panel-content">
					<div className="m1-row">
						<table className="m1-table">
							<tbody>
								<tr><td>img</td><td>jerry.lang@meihua.info</td><td>创建者</td><td><Tag color={Colors.SUCCESS}>已加入</Tag></td><td><Icon name={'edit'} /></td></tr>
								<tr><td>img</td><td>jerry.lang@meihua.info</td><td>创建者</td><td><Tag color={Colors.SUCCESS}>已加入</Tag></td><td><Icon name={'edit'} /></td></tr>
								<tr><td>img</td><td>jerry.lang@meihua.info</td><td>创建者</td><td><Tag color={Colors.SUCCESS}>已加入</Tag></td><td><Icon name={'edit'} /></td></tr>
								<tr><td>img</td><td>jerry.lang@meihua.info</td><td>创建者</td><td><Tag color={Colors.SUCCESS}>已加入</Tag></td><td><Icon name={'edit'} /></td></tr>
								<tr><td>img</td><td>jerry.lang@meihua.info</td><td>创建者</td><td><Tag color={Colors.SUCCESS}>已加入</Tag></td><td><Icon name={'edit'} /></td></tr>
							</tbody>
						</table>
					</div>
				</div>
		</div>)
	}

	render() {
		return (
			<div>
				{this.renderInvitationPanel()}
				{this.renderMemberPanel()}
			</div>
		)
	}
}

export default SubAccount
