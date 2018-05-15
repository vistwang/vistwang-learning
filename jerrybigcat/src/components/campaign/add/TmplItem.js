import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Button, Icon, Tag, Colors } from '../../m1ui'

const propTypes = {
	id: PropTypes.number,
	icon: PropTypes.string,
	type: PropTypes.number,
	title: PropTypes.string,
	imgUrl: PropTypes.string,
	onApply: PropTypes.func,
	onPreview: PropTypes.func,
	onCreate: PropTypes.func
}


const CreatePanel = ({onCreate}) => {
	return (
		<div className="create-panel">
			<div 
				className="create-btn automatic"
				onClick={e => onCreate(1)}
			>
				<span>创建自动营销活动</span>
			</div>
			<div 
				className="create-btn single"
				onClick={e => onCreate(0)}
			>
				<span>创建单次营销活动</span>
			</div>
		</div>
	)
}

const TmplItem = (props) => {
	return (
		<li
			className={classnames(
				{empty: props.type === 0},
				{single: props.type === 2}
			)}
			onClick={e => props.type === 0 ? props.onCreate(1) : null}
		>
			{props.type === 0 && 
				<CreatePanel 
					onCreate={props.onCreate}
				/>}
			{props.type !== 2 && <div className="content">
							<div className="icon">
								<Icon name={props.icon} />
							</div>
							<h3>{props.title}</h3>
						</div>}
			{props.type === 2 && <div className="image"><img src={props.imgUrl} alt=""/></div>}
			{props.type === 2 && <div className="title"><h3>{props.title}</h3></div>}
			{props.type !== 0 && <div className="top">
							<Tag>{props.type === 1 ? '自动' : '单次'}</Tag>
						</div>}
			{props.type !== 0 && <div className="button-group">
							<Button color={Colors.PRIMARY} onClick={e => props.onApply(props.id)} >使用</Button>
							<Button onClick={e => props.onPreview(props.id)} >预览</Button>
						</div>}
		</li>
	)
}

TmplItem.propTypes = propTypes

export default TmplItem