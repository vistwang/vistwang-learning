import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { Text, Icon, Colors } from '../m1-ui'

import picture from '../../assets/images/picture.svg'

class AuthLicence extends Component {
	constructor(props) {
		super(props)
		this.inputFile = null
	}

	componentWillMount() {
		this.inputFile = document.createElement('input')
		this.inputFile.type = 'file'
		this.inputFile.accept="image/gif, image/jpg, image/jpeg, image/png, image/bmp" 

		this.inputFile.addEventListener('change', this.handleFileChange, false)
	}

	componentWillUnmount() {
		this.inputFile.removeEventListener('change', this.handleFileChange, false)
	}

	handleFileChange = e => {
		if(this.props.onUpload) {
			this.props.onUpload(e.target, this.props.eventKey)
		}
	}

	handleUploadClick = e => {
		this.inputFile.click()
	}
	render() {
		const { title, intro, imgUrl, showUrl, operateUrl, onUpload, required, className } = this.props
		const emptyImage = <div className="empty-image"><img src={picture}/><p>上传图片</p></div>
		return (
			<div className={classNames('auth-licence', className)}>
				<h4>{title}</h4>
				<div className="licence-intro">
				<p>
					{required && <Text color={Colors.DANGER}>*</Text>} {intro}
				</p>
				</div>
				<div className="licence-image">
						{imgUrl ? <img src={imgUrl} /> : emptyImage}
						<div className="upload" onClick={this.handleUploadClick}><Icon name="upload" /></div>
				</div>
				<p>
					<a href={showUrl} target="_blank">查看示例图片</a>
					{operateUrl && <a href={operateUrl} target="_blank">，如何操作？</a>}
				</p>
			</div>
		)
	}
}

AuthLicence.propTypes = {
	eventKey: PropTypes.any,
	title: PropTypes.string,
	intro: PropTypes.any,
	imgUrl: PropTypes.string,
	operateUrl: PropTypes.string,
	onUpload: PropTypes.func,
	required: PropTypes.bool
}

export default AuthLicence