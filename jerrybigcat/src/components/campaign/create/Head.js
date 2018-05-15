import React from 'react'
import PropTypes from 'prop-types'
import { Button, Colors } from '../../m1ui'

const Head = ({name, onChangeName, onSaveDraft, onSaveAndReturn, ...props}) => {
	return (
		<div className="header">
			<h2 className="title"><input className="m1-form-input" placeholder="请输入活动名称" value={name} onChange={onChangeName}/></h2>
			<Button color={Colors.TAGPRIMARY} onClick={onSaveDraft} >草稿</Button>
			<Button className="btn-save" color={Colors.PRIMARY} onClick={onSaveAndReturn} >保存修改并返回</Button>
		</div>
	)
}

export default Head