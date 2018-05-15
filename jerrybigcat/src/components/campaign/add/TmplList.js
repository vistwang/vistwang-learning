import React from 'react'
import PropTypes from 'prop-types'
import { Button, Colors } from '../../m1ui'

import TmplItem from './TmplItem'

const propTypes = {
	list: PropTypes.array,
	onApply: PropTypes.func,
	onPreview: PropTypes.func,
	onCreate: PropTypes.func
}

const TmplList = (props) => {
	return (
		<div className="tmpl-list-container">
			<ul className="tmpl-list">
				<TmplItem 
					title="从空白创建"
					icon="newly-added"
					type={0}
					onCreate={props.onCreate}
				/>
				{props.list.map((item, i) =>{
					return (<TmplItem 
										key={i} 
										id={item.id}
										icon={item.banner}
										title={item.name}
										imgUrl={item.banner}
										type={item.type}
										onApply={props.onApply}
										onPreview={props.onPreview}
									/>)
				})
				}
			</ul>
		</div>
	)
}

TmplList.propTypes = propTypes

export default TmplList