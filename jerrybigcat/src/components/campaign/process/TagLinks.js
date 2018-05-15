import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import TagLink from '../../common/TagLink'

const TagLinks = ({closable, onClose, linkUrl, emailLinks, ...props}) => {
	const linkUrlArr = linkUrl.split(',')
	return (
		<span className="tag-links">
			{linkUrlArr.map((item, i) => {
				const idsArr = item.split('#')
				const taskId = idsArr[0]
				const linkId = idsArr[1]
				if(taskId && linkId) {
					const link = emailLinks.find(l => l.id === parseInt(linkId)) || {}
					return (
						<TagLink
							{...props}
							key={i} 
							closable={closable} 
							onClose={e => onClose(taskId, linkId)} 
						>{link.link_name || '暂无链接名称'}</TagLink>
					)
				}else {
					return null
				}
			})
			}
		</span>
	)
}

TagLinks.propTypes = {
	linkUrl: PropTypes.string,
	links: PropTypes.array,
	closable: PropTypes.bool,
	onClose: PropTypes.func,
}

export default TagLinks
