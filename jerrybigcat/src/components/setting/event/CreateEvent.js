import React from 'react'
import PropTypes from 'prop-types'

import customEvent from '../../../assets/images/event/custom_event.svg'
import traceEvent from '../../../assets/images/event/trace_event.svg'
import discoverEvent from '../../../assets/images/event/discover_event.svg'

const CreateEvent = (Props) => {
	return (
			<ul className="select-event">
				<li>
					<div className="img">
						<img src={customEvent} alt=""/>
					</div>
					<p>添加自定义事件</p>
				</li>

				<li>
				<div className="img">
					<img src={traceEvent} alt=""/>
				</div>
					<p>添加自定义事件</p>
				</li>

				<li>
				<div className="img">
					<img src={discoverEvent} alt=""/>
				</div>
					<p>添加自定义事件</p>
				</li>
			</ul>
	)
}

export default CreateEvent