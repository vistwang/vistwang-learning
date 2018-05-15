import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BannerAnim from 'rc-banner-anim'
import QueueAnim from 'rc-queue-anim'

import { utils } from '../../utils'

import 'rc-banner-anim/assets/index.css'
import img_loading from '../../assets/images/login_load.svg'

const { Element } = BannerAnim
const BgElement = Element.BgElement

const propTypes = {
	arrow: PropTypes.bool,
	autoPlay: PropTypes.bool,
	prefixCls: PropTypes.string,
	list: PropTypes.array,
	onAdClick: PropTypes.func
}

const defaultProps = {
	arrow: false,
	autoPlay: true,
	prefixCls: 'banner-user',
	list: [{
		id: 1,
		name: '轻松体验超实用的触发式短信',
		intro: '五一活动预热，您准备好了吗？原500元起充值的短信套餐，现在只需99元，即可轻松拥有表单触发式短信、手机验证短信、及短信群发服务。',
		image: 'https://os.alipayobjects.com/rmsportal/IhCNTqPpLeTNnwr.jpg',
		qn_image: 'https://os.alipayobjects.com/rmsportal/IhCNTqPpLeTNnwr.jpg',
		link: 'http://www.m1world.com'
	},{
		id: 2,
		name: '轻松体验超实用的触发式短信',
		intro: '五一活动预热，您准备好了吗？原500元起充值的短信套餐，现在只需99元，即可轻松拥有表单触发式短信、手机验证短信、及短信群发服务。',
		image: 'https://os.alipayobjects.com/rmsportal/uaQVvDrCwryVlbb.jpg',
		qn_image: 'https://os.alipayobjects.com/rmsportal/uaQVvDrCwryVlbb.jpg',
		link: 'http://www.m1world.com'
	}]
}

class Banner extends Component {

	handleAdClick = id => {
		const{ list, onAdClick } = this.props
		const ad = list.find(item => item.id === id)
		if(ad && this.hasLink(ad.link)) {
			window.open(ad.link)
		}
		if(onAdClick) {
			onAdClick(id)
		}
	}

	hasLink(link) {
		return link && link.indexOf('#HIDEURL') < 0
	}

	handleName(name) {
		return name.trim() === 'M1云端市场部' ? '' : name
	}
	renderBanner() {
		const { autoPlay, arrow, prefixCls, list } = this.props

		return(
			<BannerAnim prefixCls={prefixCls} autoPlay={autoPlay} arrow={arrow}>
				{list.map((item, i) => {
					const styles = {
						cursor: this.hasLink(item.link) ? 'pointer' : 'default'
					}
					const bgUrl = utils.os.isMac ? item.qn_image : `${item.qn_image}?imageMogr2/thumbnail/665x`
					return (<Element key={i} prefixCls={`${prefixCls}-elem`} onClick={e => this.handleAdClick(item.id)} style={styles} >
											<BgElement
												key="bg"
												className="bg"
												style={{
													backgroundImage: `url(${bgUrl})`,
													backgroundSize: 'cover',
													backgroundPosition: 'center'
												}}
											/>
											<QueueAnim name="QueueAnim" className={`${prefixCls}-content`}>
												<h1 key="h1">{this.handleName(item.name)}</h1>
												<p key="p">{item.intro}</p>
											</QueueAnim>
										</Element>)
				})}
			</BannerAnim>
		)
	}

	renderLoading() {
		return (
			<div className="sign-banner-loading">
				<img src={img_loading} />
			</div>
		)
	}

	render() {

		return (
			<div className="banner-container">
				{
					this.props.list.length === 0 ? this.renderLoading() : this.renderBanner()
				}
			</div>
		)
	}
}

Banner.propTypes = propTypes
Banner.defaultProps = defaultProps

export default Banner

