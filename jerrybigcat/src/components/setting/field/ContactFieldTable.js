import React from 'react'
import PropTypes from 'prop-types'

import ContactFieldRow from './ContactFieldRow'

const propTypes = {
	list: PropTypes.array
}

const ContactFieldTable = ({list, ...props}) =>{
	return (
		<table className="m1-table">
			<thead>
				<tr>
					<th>字段名称</th>
					<th>字段别名</th>
					<th>唯一ID</th>
					<th>类型</th>
					<th>描述</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{list.map((item,i) => {
					return <ContactFieldRow 
										{...props}
										key={i} 
										item={item} 
									/>
				})
				}
			</tbody>
		</table>
	)
}

ContactFieldTable.propTypes = propTypes 

export default ContactFieldTable