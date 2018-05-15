import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Button, Modal, Colors } from '../m1-ui/'
import { user } from '../../base/account'


export default class AvatarCrop extends Component {
	static propTypes = {
		show: PropTypes.bool,
		onClose: PropTypes.func,
		imgUrl: PropTypes.string,
		onSubmit: PropTypes.func
	}

	constructor(props) {
		super(props)

		this.inputFile = null

		this.canvas = null
		this.canvasBig = null
		this.canvasSmall = null
		this.ctx = null
		this.ctxBig = null
		this.ctxSmall = null

		this.preview = null
		this.editImg = null
		this.editBg = null
		this.adjust = null

		this.img = null
		this.imgWidth = 0
		this.imgHeight = 0

		this.pixel = 300
		this.pixelBig = 80
		this.pixelSmall = 40

		this.min = 20

		this.position = 110

		this.prePosition = {
			x: 0,
			y: 0
		}
		this.x = 0
		this.y = 0
		this.width = this.pixelBig
		this.height = this.pixelBig

		this.initWidth = 300
		this.initHeight = 300

	}

	componentDidMount() {
		this.initComponentDom()
		this.bindComponentEvent()
	}

	componentWillUnmount() {
		this.unbindComponentEvent()
	}

	initComponentDom() {
		this.canvas = this.refs.canvas
		this.canvasBig = this.refs.canvasBig
		this.canvasSmall = this.refs.canvasSmall

		this.preview = this.refs.preview
		this.editImg = this.refs.editImg
		this.editBg = this.refs.editBg
		this.adjust = this.refs.adjust

		this.ctx = this.canvas.getContext('2d')
		this.ctxBig = this.canvasBig.getContext('2d')
		this.ctxSmall = this.canvasSmall.getContext('2d')

		this.img = document.createElement('img')

		this.inputFile = document.createElement('input')
		this.inputFile.type = 'file'
		this.inputFile.accept = '.jpg,.jpeg,.png,.gif,.bmp'

		if(this.props.imgUrl) {
			this.startDraw(this.props.imgUrl)
		}
	}

	bindComponentEvent() {
		this.inputFile.addEventListener('change', this.handleInputFileChange, false)
		this.editImg.addEventListener('mousedown', this.handleEditImgMouseDown, false)
		this.editImg.addEventListener('mouseup', this.handleEditImgMouseUp, false)
		this.adjust.addEventListener('mousedown', this.handleAdjustMouseDown, false)
		this.adjust.addEventListener('mouseup', this.handleAdjustMouseUp, false)
		document.addEventListener('mouseup', this.handleDocumentMouseUp, false)
	}

	unbindComponentEvent() {
		this.inputFile.removeEventListener('change', this.handleInputFileChange, false)
		this.editImg.removeEventListener('mousedown', this.handleEditImgMouseDown, false)
		this.editImg.removeEventListener('mouseup', this.handleEditImgMouseUp, false)
		this.adjust.removeEventListener('mousedown', this.handleAdjustMouseDown, false)
		this.adjust.removeEventListener('mouseup', this.handleAdjustMouseUp, false)
		document.removeEventListener('mouseup', this.handleDocumentMouseUp, false)
	}

	handleEditImgMouseDown = e => {
		e = e || window.event
		e.preventDefault()
		e.stopPropagation()
		this.editImg.addEventListener('mousemove', this.handleEditImgMouseMove, false)
	}

	handleEditImgMouseUp = e => {
		e.stopPropagation()
		this.editImg.removeEventListener('mousemove', this.handleEditImgMouseMove, false)
		this.preview.removeEventListener('mousemove', this.handlePreviewMove, false)
		this.prePosition = {x: 0, y: 0}
	}

	handleEditImgMouseMove = e => {
		e.stopPropagation()
		if(this.prePosition.x != 0) {
			const styles = window.getComputedStyle(this.editImg, false)
			const pixel = this.pixel
			const pixelBig = this.pixelBig
			const pixelSmall = this.pixelSmall
			const initWidth = this.initWidth
			const initHeight = this.initHeight
			const width = this.width
			const height = this.height
			let x = parseInt(styles.left) + e.clientX - this.prePosition.x
			x = x < 0 ? 0 : x
			x = x > (pixel - width) ? (pixel - width) : x
			let y = parseInt(styles.top) + e.clientY - this.prePosition.y
			y = y < 0 ? 0 : y
			y = y > (pixel - height) ? (pixel - height) : y

			this.editImg.style.left = x + 'px'
			this.editImg.style.top = y + 'px'
			this.editBg.style.borderWidth = y + 'px ' + (pixel - width - x) + 'px ' + (pixel - height - y) + 'px ' + x + 'px'
			this.ctxBig.clearRect(0, 0, pixelBig, pixelBig);
			this.ctxSmall.clearRect(0, 0, pixelSmall, pixelSmall);
      // this.ctxBig.drawImage(this.img, x, y, pixel, pixel, 0, 0, pixel * initWidth / width, pixel * initHeight / height);
      // this.ctxSmall.drawImage(this.img, x, y, pixel, pixel, 0, 0, pixel * initWidth / width / 2, pixel * initHeight / height / 2);
			this.ctxBig.drawImage(this.img, x, y, width, height, 0, 0, pixelBig, pixelBig);
			this.ctxSmall.drawImage(this.img, x, y, width, height, 0, 0, pixelSmall, pixelSmall);

			this.x = x
			this.y = y
		}

		this.prePosition = {
			x: e.clientX,
			y: e.clientY
		}
	}

	handleAdjustMouseDown = e => {
		e.stopPropagation()
		this.preview.addEventListener('mousemove', this.handlePreviewMove, false)
	}

	handleAdjustMouseUp = e => {
		e.stopPropagation()
		this.preview.removeEventListener('mousemove', this.handlePreviewMove, false)
		this.prePosition = {x: 0, y: 0}
	}

	handlePreviewMove = e => {
		e.stopPropagation();
		const styles = window.getComputedStyle(this.editImg, false)
		const preWidth = parseInt(styles.width)
		const preHeight = parseInt(styles.width)
		if (this.prePosition.x != 0) {
				const min = this.min
				const pixel = this.pixel
				const pixelBig = this.pixelBig
				const pixelSmall = this.pixelSmall
				const initWidth = this.initWidth
				const initHeight = this.initHeight
				const x = this.x
				const y = this.y
				let width = this.width
				let height = this.height

		    width = parseInt(styles.width) + e.clientX - this.prePosition.x;
		    width = width < min ? min : width;
		    width = parseInt(styles.left) + width > pixel ? preWidth : width;

		    height = parseInt(styles.height) + e.clientY - this.prePosition.y;
		    height = height < min ? min : height;
		    height = parseInt(styles.top) + height > pixel ? preHeight : height;

		    this.editImg.style.width = width + 'px'
		    this.editImg.style.height = height + 'px'
		    this.editBg.style.borderWidth = y + 'px ' + (pixel - width - x) + 'px ' + (pixel - height - y) + 'px ' + x + 'px'

		    this.ctxBig.clearRect(0, 0, pixelBig, pixelBig);
		    this.ctxSmall.clearRect(0, 0, pixelSmall, pixelSmall);
		    // this.ctxBig.drawImage(this.img, x, y, pixel, pixel, 0, 0, pixel * initWidth / width, pixel * initHeight / height);
		    // this.ctxSmall.drawImage(this.img, x, y, pixel, pixel, 0, 0, pixel * initWidth / width / 2, pixel * initHeight / height / 2);
				this.ctxBig.drawImage(this.img, x, y, width, height, 0, 0, pixelBig, pixelBig);
				this.ctxSmall.drawImage(this.img, x, y, width, height, 0, 0, pixelSmall, pixelSmall);

		    this.width = width
		    this.height = height
		}
		this.prePosition.x = e.clientX;
		this.prePosition.y = e.clientY;
	}

	handleDocumentMouseUp = e => {
		this.editImg.removeEventListener('mousemove', this.handleEditImgMouseMove, false)
		this.preview.removeEventListener('mousemove', this.handlePreviewMove, false)
		this.prePosition = {x: 0, y: 0}
	}

	handleInputFileChange = e => {
		user.loadImageBase64(e.target.files[0], this.startDraw)
	}

	handleSelectFileClick = e => {
		this.inputFile.click()
	}

	handleConfirmClick = e => {
		if(this.props.onSubmit) {
			this.props.onSubmit(this.canvasBig.toDataURL('image/png'))
		}
	}

	startDraw = (data) => {
		this.img.src = data
		if(this.img.complete) {
			this.draw()
		} else {
			this.img.onload = () => {
				this.draw()
				this.img.onload = () => {}
			}
		}
	}

	draw = () => {
		let rate = 1
		const pixel = this.pixel
		const pixelBig = this.pixelBig
		const pixelSmall = this.pixelSmall
		const imgWidth = this.imgWidth = this.img.width
		const imgHeight = this.imgHeight = this.img.height

		const x = this.x = this.position;
		const y = this.y = this.position;
		const width = this.width = pixelBig;
		const height = this.height = pixelBig;

		if(imgWidth > 300) {
			rate = imgWidth / pixel
		} else if(imgHeight > 300) {
			rate = imgHeight / pixel
		}
		
		this.editImg.style.left = x + 'px'
		this.editImg.style.top = y + 'px'
		this.editImg.style.width = width + 'px'
		this.editImg.style.height = height + 'px'

		this.editBg.style.borderWidth = (y + 'px ' + (pixel - width - x) + 'px ' + (pixel - height - y) + 'px ' + x + 'px')
		
		//清理canvas
		this.ctxBig.clearRect(0, 0, pixelBig, pixelBig);
		this.ctxSmall.clearRect(0, 0, pixelSmall, pixelSmall);
		this.ctx.clearRect(0, 0, pixel, pixel);
		//重绘
		this.ctx.drawImage(this.img, 0, 0, imgWidth, imgHeight, 0, 0, imgWidth / rate, imgHeight / rate);
		//预览大小头像从预览头像导入
		this.img.src = this.canvas.toDataURL('image/png');
		this.ctxBig.drawImage(this.img, x, y, pixel, pixel, 0, 0, pixel, pixel);
		this.ctxSmall.drawImage(this.img, x, y, pixel, pixel, 0, 0, pixel / 2, pixel / 2);
		
	}

	render() {
		const { show, onClose } = this.props
		return (
			<Modal className="center" show={show} onClose={onClose} backdrop="static" style={{width:'720px'}}>
				<Modal.Body style={{paddingTop: '30px', paddingBottom: '30px'}}>
					<div className="avatar-crop">
						<div ref="preview" className="preview">
							<canvas ref="canvas" width={this.pixel} height={this.pixel} className="preview-image" />
							<div ref="editBg" className="edit-image-bg"></div>
							<div ref="editImg" className="edit-image"><span ref="adjust"></span></div>
						</div>
						<div className="edit">
							<p className="preview-image-thumbs">
								<canvas ref="canvasBig" width={this.pixelBig} height={this.pixelBig} className="preview-image-big" />
								<canvas ref="canvasSmall" width={this.pixelSmall} height={this.pixelSmall} className="preview-image-small" />
							</p>
							<p>
								<Button color={Colors.PRIMARY} onClick={this.handleSelectFileClick}>选择文件</Button>
							</p>
							<p>
								<Button onClick={onClose}>取消</Button>
								<Button color={Colors.PRIMARY} onClick={this.handleConfirmClick}>确定</Button>
							</p>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		)
	}
}