import React from 'react'
import PropTypes from 'prop-types'

import { Button, Tag, Colors, Sizes } from '../../m1ui'
import { SysMail } from '../../../base/system'

const festivalObj = SysMail.filter.festivals

const sysFestivals = (() => {
	const f = []
	for(let v in festivalObj) {
		f.push({value: v, name: festivalObj[v]})
	}
	return f
})()

const hasFestival = (festivals, v) => {
	return festivals.some((f) => f === v)
}

const FestivalHoliday = ({festivals, onAddFestival, onRemoveFestival}) => {
	return (
		<div className="set-festival">
			<label>中国</label>
			<div className="festivals">
				{sysFestivals.map((item, i) => {
					return (
						<Tag 
							key={i} 
							color={hasFestival(festivals, item.value) ? Colors.PRIMARY : Colors.IGNORE} 
							size={Sizes.SMALL} 
							onClick={e => (hasFestival(festivals, item.value) ? onRemoveFestival(item.value) : onAddFestival(item.value))}
						>
							{item.name}
						</Tag>
					)
				})}
			</div>
		</div>
	)
}	

export default FestivalHoliday