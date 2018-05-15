import React from 'react'
import PropTypes from 'prop-types'

import { Loop, Icon } from '../../m1ui'
import { SysMail } from '../../../base/system'


const LoopItem = ({label, count, total, classify, classifyName, ...props}) => {
	const precentage = total === 0 ? 0 : parseFloat(((count / total) * 100).toFixed(2))
	return (
		<li>
			<div className="content">
				<div className="left">
					<Loop r={20} width={6} value={precentage} />
				</div>
				<div className="right">	
					<h2>{precentage}%</h2>
					<p>{count}</p>
				</div>
			</div>
			<div className="title"><span>{label}</span>
				{classify && <div className="classify-detail">
									<h3>{classifyName}</h3>
									<ul>
									{classify.map((item,i) => {
										return (<li key={i} >{item.name}<Icon name="i" /> <span>{item.size}</span></li>)
									})}
									</ul>
								</div>}
			</div>
		</li>
	)
}

LoopItem.propTypes = {
	label: PropTypes.string.isRequired,
	count: PropTypes.number.isRequired,
	total: PropTypes.number.isRequired,
	classify: PropTypes.array,
	classifyName: PropTypes.string,
}

export default LoopItem