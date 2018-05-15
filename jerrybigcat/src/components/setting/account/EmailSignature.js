import React from 'react'
import PropTypes from 'prop-types'
import ReactQuill from 'react-quill'

import { Switch } from '../../m1ui'

import 'react-quill/dist/quill.snow.css'

const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
       [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  }

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

const EmailSignature = ({email_signature, can_signature, onEmailSignature, onCanSignature}) => {
	return (
		<div className="email-signature">
			<div className="signature-switch">
				<Switch onChange={onCanSignature} checked={can_signature} /> 启用
			</div>
			<div className="signature-content">
				<ReactQuill
					value={email_signature}
					modules={modules}
					formats={formats}
					onChange={onEmailSignature}
					placeholder="请输入签名"
				/>
				{!can_signature && <div className="not-editable"></div>}
			</div>
		</div>
	)
}

export default EmailSignature