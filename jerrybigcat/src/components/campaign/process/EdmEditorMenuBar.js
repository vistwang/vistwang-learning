import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown, MenuItem, Button, Icon, Colors } from '../../m1ui'
import { CampaignContentTypes } from '../../../base/enums'

const EdmEditorMenuBar = (props) => {

	return (
		<div className="container edm-menu-bar">
			<div className="left">
				<Dropdown
					title="创建邮件内容"
					className="m1-dropdown-form"
				>
					<MenuItem eventKey={CampaignContentTypes.EDM} onSelect={props.onCreate} >创建邮件内容</MenuItem>
					<MenuItem eventKey={CampaignContentTypes.SMS} onSelect={props.onCreate} >创建短信内容</MenuItem>
				</Dropdown>
			</div>
			<div className="right">
				<Dropdown
					title="邮件模板"
					className="m1-dropdown-form"
					icon="template"
				>
					{/*<MenuItem>从系统模板库导入</MenuItem>
					<MenuItem>从我的邮件素材导入</MenuItem>*/}
					<MenuItem eventKey={3} onSelect={props.onImport} >导入HTML模板</MenuItem>
				</Dropdown>
				{/*<Dropdown
					title="撤销"
					icon="revoke"
				>
					<MenuItem>重做</MenuItem>
					<MenuItem>历史记录</MenuItem>
				</Dropdown>*/}
				<Button color={Colors.TEXT} onClick={props.onSendSetting} > <Icon name="set-up" /> 发件设置</Button>
				<Button color={Colors.TEXT} onClick={props.onSendTest} > <Icon name="aircraft" /> 发送测试</Button>
			</div>
		</div>
	)
}

export default EdmEditorMenuBar