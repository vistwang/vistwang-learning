import React, { Component } from 'react'
import classNames from 'classnames'
import { Tag, Button, Icon, Text, Colors, Sizes } from '../../../components/m1ui'

import { utils } from '../../../utils'
import { user } from '../../../base/system'


class Price extends Component {
	constructor(props) {
		super(props)

		this.state = {
			version: 1,
			type: 'year',

			versionPrices: user.versionPrices
		}
	}

	handleBuyTypeClick = type => {
		this.setState({type})
	}

	handleUpgradeClick = v => {
		let routeParam = {}
		let url = '/account/'
		if(v === 1) {
			routeParam.pathname = '/recharge'
			url += '#/recharge' 
		} else {
			routeParam.pathname = '/upgrade'
			routeParam.search = `v=${v}&u=${this.state.type}`
			url += '#/upgrade'
			url += '?' + routeParam.search
		}
		if(this.props.history) {
			this.props.history.push(routeParam)
		} else {
			location.href = url
		}
	}

	render() {
		const { version, type, versionPrices } = this.state
		return (
			<div className="price-body">
				<div className="m1-panel price-intro">
					<div className="m1-panel-content">
						<div className="versions-header">
							<h2 className="slogan">我们能做的就是不竭余力的帮助您提升营销效率</h2>
							<div className="btns btn-buy-type">
								<Button 
									color={type === 'year' ? Colors.PRIMARY : Colors.NONE} 
									size={Sizes.LARGE}
									onClick={e => this.handleBuyTypeClick('year')}
									>按年购买</Button>
								<Button
									color={type === 'month' ? Colors.PRIMARY : Colors.NONE}
								 	size={Sizes.LARGE}
								 	onClick={e => this.handleBuyTypeClick('month')}
								 >按月购买</Button>
							</div>
						</div>
						<div className="price-versions">
							<div className={classNames('version-item','free',type)}>
								<h2>免费版</h2>
								<strong>¥ {versionPrices[0][type].price}</strong>
								<hr/>
								<div className="version-intro">
									<p>不限量创作Page</p>
									<p>所见即所得编辑器</p>
									<p>联系人导入</p>
									<p>高级统计功能</p>
								</div>
								<div className="btns">
									<Button 
										size={Sizes.LARGE}
										onClick={e => this.handleUpgradeClick(1)}
									>免费体验</Button>
								</div>
							</div>
							<div className="version-item base">
								<h2>标准版</h2>
								<strong>¥ {utils.formatMoney(versionPrices[1][type].price)}</strong>
								{type === 'year' && 
									<p className="version-origin">
										原价¥{utils.formatMoney(versionPrices[1][type].originalPrice)}
										{' '}
										<Tag color={Colors.DANGER} size={Sizes.SMALL}>
											省¥{utils.formatMoney(versionPrices[1][type].originalPrice - versionPrices[1][type].price)}
										</Tag>
									</p>}
								<hr/>
								<div className="version-intro">
									<p>包含免费版所有功能</p>
									<p>支持移除M1商标(80/月)</p>
									<p>支持在线低价正版图片购买</p>
									<p>支持表单收集自定义字段</p>
								</div>
								<div className="btns">
									<Button 
										size={Sizes.LARGE}
										onClick={e => this.handleUpgradeClick(2)}
									>升级标准版</Button>
								</div>
							</div>
							<div className="version-item gold expand">
								<div className="version-label">最受欢迎</div>
								<h2>黄金版</h2>
								<strong>¥ {utils.formatMoney(versionPrices[2][type].price)}</strong>
								{type === 'year' && 
									<p className="version-origin">
										原价¥{utils.formatMoney(versionPrices[2][type].originalPrice)}
										{' '}
										<Tag color={Colors.DANGER} size={Sizes.SMALL}>
											省¥{utils.formatMoney(versionPrices[2][type].originalPrice - versionPrices[2][type].price)}
										</Tag>
									</p>}
								<hr/>
								<div className="version-intro">
									<p>包含标准版所有功能</p>
									<p>免费移除M1商标</p>
									<p>自定义Page域名</p>
									<p>自定义SEO参数配置</p>
									<p>支持嵌入第三方统计代码</p>
									<p>享8折在线购买低价正版图片</p>
									<p>支持国内专属邮件通道配置(免费)</p>
									<p>支持3个协作账户</p>
									<p>支持API接口开放</p>
									<p>优先客服回复</p>
								</div>
								<div className="btns">
									<Button 
										size={Sizes.LARGE}
										onClick={e => this.handleUpgradeClick(3)}
									>升级黄金版</Button>
								</div>
							</div>
							<div className="version-item diamond">
								<h2>钻石版</h2>
								<strong>¥ {utils.formatMoney(versionPrices[3][type].price)}</strong>
								{type === 'year' && 
									<p className="version-origin">
										原价¥{utils.formatMoney(versionPrices[3][type].originalPrice)}
										{' '}
										<Tag color={Colors.DANGER} size={Sizes.SMALL}>
											省¥{utils.formatMoney(versionPrices[3][type].originalPrice - versionPrices[3][type].price)}
										</Tag>
									</p>}
								<hr/>
								<div className="version-intro">
									<p>包含黄金版所有功能</p>
									<p>支持单批次不限量导入联系人</p>
									<p>支持19个协作账号</p>
									<p>支持国际专属邮件通道配置(单独收费)</p>
									<p>专属客户顾问咨询及培训服务</p>
									<p>不限量空间存储</p>
								</div>
								<div className="btns">
									<Button 
										size={Sizes.LARGE}
										onClick={e => this.handleUpgradeClick(4)}
									>升级钻石版</Button>
								</div>
							</div>
						</div>
						<div className="versions-footer">
							<p>如果您对我们的产品感兴趣希望进一步深入了解产品及服务，请点击下方按钮预约客户经理演示</p>
							<div className="btns btn-appoinment">
								<Button color={Colors.PRIMARY} size={Sizes.LARGE} href="http://page.m1world.com/s/2cnlmh" target="_blank">预约客户经理演示</Button>
							</div>
						</div>
					</div>
				</div>

				<div className="m1-panel">
					<div className="price-detail">
						<div className="m1-panel-content">
							<h3>各套餐功能明细</h3>
							<h4>数据用量</h4>
							<table className="m1-table success">
								<thead>
									<tr><th>套餐用量</th><th>免费版</th><th>标准版</th><th>黄金版</th><th>钻石版</th></tr>
								</thead>
								<tbody>
									<tr>
										<td>邮件量 不够用？可充值</td>
										<td>200封（试用）</td>
										<td>2500封／月</td>
										<td>20000封／月</td>
										<td>100000封／月</td>
									</tr>
									<tr>
										<td>短信量 不够用？可充值</td>
										<td>10条（试用）</td>
										<td>200条／月</td>
										<td>2000条／月</td>
										<td>10000条／月</td>
									</tr>
									<tr>
										<td>单批次导入联系人量</td>
										<td>1500条</td>
										<td>5000条</td>
										<td>50000条</td>
										<td>不限量</td>
									</tr>
									<tr>
										<td>空间存储量</td>
										<td>200M／月</td>
										<td>1G／月</td>
										<td>5G／月</td>
										<td>不限量</td>
									</tr>
								</tbody>
							</table>
							<h4>套餐优惠</h4>
							<table className="m1-table warning">
								<thead>
									<tr><th>套餐用量</th><th>免费版</th><th>标准版</th><th>黄金版</th><th>钻石版</th></tr>
								</thead>
								<tbody>
									<tr>
										<td>邮件充值单价</td>
										<td>0.03元／封</td>
										<td>0.028元／封</td>
										<td>0.018元／封</td>
										<td>0.015元／封</td>
									</tr>
									<tr>
										<td>短信充值单价</td>
										<td>0.08元／条</td>
										<td>0.078元／条</td>
										<td>0.07元／条</td>
										<td>0.065元／条</td>
									</tr>
									<tr>
										<td>在线购买正版图片</td>
										<td><Text color={Colors.DANGER}><Icon name="close" /></Text></td>
										<td>原价</td>
										<td>专享8折</td>
										<td>专享7折（另送3张／月）</td>
									</tr>
								</tbody>
							</table>
							<h4>品牌服务</h4>
							<table className="m1-table primary">
								<thead>
									<tr><th>套餐用量</th><th>免费版</th><th>标准版</th><th>黄金版</th><th>钻石版</th></tr>
								</thead>
								<tbody>
									<tr>
										<td>移除M1商标</td>
										<td><Text color={Colors.DANGER}><Icon name="close" /></Text></td>
										<td>80元／月</td>
										<td><Text color={Colors.SUCCESS}><Icon name="right" /></Text></td>
										<td><Text color={Colors.SUCCESS}><Icon name="right" /></Text></td>
									</tr>
									<tr>
										<td>自定义Page域名</td>
										<td><Text color={Colors.DANGER}><Icon name="close" /></Text></td>
										<td><Text color={Colors.DANGER}><Icon name="close" /></Text></td>
										<td><Text color={Colors.SUCCESS}><Icon name="right" /></Text></td>
										<td><Text color={Colors.SUCCESS}><Icon name="right" /></Text></td>
									</tr>
									<tr>
										<td>配置国内邮件专属通道（免费）</td>
										<td><Text color={Colors.DANGER}><Icon name="close" /></Text></td>
										<td><Text color={Colors.DANGER}><Icon name="close" /></Text></td>
										<td><Text color={Colors.SUCCESS}><Icon name="right" /></Text></td>
										<td><Text color={Colors.SUCCESS}><Icon name="right" /></Text></td>
									</tr>
									<tr>
										<td>配置国际邮件专属通道（单独付费）</td>
										<td><Text color={Colors.DANGER}><Icon name="close" /></Text></td>
										<td><Text color={Colors.DANGER}><Icon name="close" /></Text></td>
										<td><Text color={Colors.DANGER}><Icon name="close" /></Text></td>
										<td><Text color={Colors.SUCCESS}><Icon name="right" /></Text></td>
									</tr>
									<tr>
										<td>支持品牌专属短信签名</td>
										<td><Text color={Colors.SUCCESS}><Icon name="right" /></Text></td>
										<td><Text color={Colors.SUCCESS}><Icon name="right" /></Text></td>
										<td><Text color={Colors.SUCCESS}><Icon name="right" /></Text></td>
										<td><Text color={Colors.SUCCESS}><Icon name="right" /></Text></td>
									</tr>
								</tbody>
							</table>
							<h4>增值功能</h4>
							<table className="m1-table danger">
								<thead>
									<tr><th>套餐用量</th><th>免费版</th><th>标准版</th><th>黄金版</th><th>钻石版</th></tr>
								</thead>
								<tbody>
									<tr>
										<td>30+模板素材（持续更新）</td>
										<td><Text color={Colors.SUCCESS}><Icon name="right" /></Text></td>
										<td><Text color={Colors.SUCCESS}><Icon name="right" /></Text></td>
										<td><Text color={Colors.SUCCESS}><Icon name="right" /></Text></td>
										<td><Text color={Colors.SUCCESS}><Icon name="right" /></Text></td>
									</tr>
									<tr>
										<td>所见即所得编辑器</td>
										<td><Text color={Colors.SUCCESS}><Icon name="right" /></Text></td>
										<td><Text color={Colors.SUCCESS}><Icon name="right" /></Text></td>
										<td><Text color={Colors.SUCCESS}><Icon name="right" /></Text></td>
										<td><Text color={Colors.SUCCESS}><Icon name="right" /></Text></td>
									</tr>
									<tr>
										<td>SEO配置自定义</td>
										<td><Text color={Colors.DANGER}><Icon name="close" /></Text></td>
										<td><Text color={Colors.DANGER}><Icon name="close" /></Text></td>
										<td><Text color={Colors.SUCCESS}><Icon name="right" /></Text></td>
										<td><Text color={Colors.SUCCESS}><Icon name="right" /></Text></td>
									</tr>
									<tr>
										<td>嵌入第三方统计代码</td>
										<td><Text color={Colors.DANGER}><Icon name="close" /></Text></td>
										<td><Text color={Colors.DANGER}><Icon name="close" /></Text></td>
										<td><Text color={Colors.SUCCESS}><Icon name="right" /></Text></td>
										<td><Text color={Colors.SUCCESS}><Icon name="right" /></Text></td>
									</tr>
									<tr>
										<td>开放API接口</td>
										<td><Text color={Colors.DANGER}><Icon name="close" /></Text></td>
										<td><Text color={Colors.DANGER}><Icon name="close" /></Text></td>
										<td><Text color={Colors.SUCCESS}><Icon name="right" /></Text></td>
										<td><Text color={Colors.SUCCESS}><Icon name="right" /></Text></td>
									</tr>
									<tr>
										<td>协作账号</td>
										<td><Text color={Colors.DANGER}><Icon name="close" /></Text></td>
										<td><Text color={Colors.DANGER}><Icon name="close" /></Text></td>
										<td>3个</td>
										<td>19个</td>
									</tr>
								</tbody>
							</table>
							<h4>客户支持</h4>
							<table className="m1-table gray">
								<thead>
									<tr><th>套餐用量</th><th>免费版</th><th>标准版</th><th>黄金版</th><th>钻石版</th></tr>
								</thead>
								<tbody>
									<tr>
										<td>优先客服响应</td>
										<td><Text color={Colors.DANGER}><Icon name="close" /></Text></td>
										<td><Text color={Colors.DANGER}><Icon name="close" /></Text></td>
										<td><Text color={Colors.SUCCESS}><Icon name="right" /></Text></td>
										<td><Text color={Colors.SUCCESS}><Icon name="right" /></Text></td>
									</tr>
									<tr>
										<td>专属顾问咨询及培训服务</td>
										<td><Text color={Colors.DANGER}><Icon name="close" /></Text></td>
										<td><Text color={Colors.DANGER}><Icon name="close" /></Text></td>
										<td><Text color={Colors.DANGER}><Icon name="close" /></Text></td>
										<td><Text color={Colors.SUCCESS}><Icon name="right" /></Text></td>
									</tr>
									<tr className="btns">
										<td></td>
										<td><Button color={Colors.PRIMARY} size={Sizes.LARGE} onClick={e => this.handleUpgradeClick(1)}>免费体验</Button></td>
										<td><Button color={Colors.SUCCESS} size={Sizes.LARGE} onClick={e => this.handleUpgradeClick(4)}>升级标准版</Button></td>
										<td><Button color={Colors.WARNING} size={Sizes.LARGE} onClick={e => this.handleUpgradeClick(2)}>升级黄金版</Button></td>
										<td><Button color={Colors.PRIMARY} size={Sizes.LARGE} onClick={e => this.handleUpgradeClick(3)}>升级钻石版</Button></td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					</div>
			</div>
			
		)
	}
}

export default Price