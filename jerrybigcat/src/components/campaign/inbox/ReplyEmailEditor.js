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

const ReplyEmailEditor = ({value, onChange}) => {
	return (
		<div className="email-signature">
			<div className="signature-content">
				<ReactQuill
					value={value}
					modules={modules}
					formats={formats}
					onChange={onChange}
					placeholder="请输入回复邮件内容"
				/>
			</div>
		</div>
	)
}

export default ReplyEmailEditor