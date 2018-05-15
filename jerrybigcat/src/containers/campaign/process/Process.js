import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { CampaignContentTypes } from '../../../base/enums'
import { SysMail } from '../../../base/system'
import { Button, Icon, Colors } from '../../../components/m1ui'
import { utils } from '../../../utils'

import ProcessBox from '../../../components/campaign/process/ProcessBox'
import ButtonAdd from '../../../components/campaign/create/ButtonAdd'
import EdmEditorModal from '../../../components/campaign/process/EdmEditorModal'
import SendSettingModalContainer from './SendSettingModalContainer'

import { actions } from '../../../reducers/campaign/campaignProcess'
import { actions as emailActions } from '../../../reducers/campaign/email'
import { actions as contentActions } from '../../../reducers/campaign/emailContent'
import { actions as createActions } from '../../../reducers/campaign/campaignCreate'

const defaultCondition = {
	"delaytime":"0:0:0", //-----（时分秒）
	"type":4, //----(0:未做任何操作,1:未打开上一封邮件,2:未点击上一封连接,3:点击了上一封连接,4:未回复上一封邮件)
	"task_id":"", //-----（上一封邮件任务ID）
	"click_url":"" //----点击taskid#链接ID
}

class Process extends Component {
	componentDidMount() {
		this.requestCampaign()
	}

	getCampaignId = () => {
		let { campaignId } = this.props
		if(!campaignId) {
			const locationSearch = this.props.history.location.search
			campaignId = utils.getSearchParams(locationSearch).get('cid')
		}
		return campaignId
	}

	requestCampaign = () => {
		const campaignId = this.getCampaignId()
		if(!campaignId) {
			this.props.history.push('/')
			return 
		}
		this.props.reqCampaign(campaignId)
	}

	handleAddProcess = () => {
		const campaignId = this.getCampaignId()
		const campaignProcess = {
			campaignId,
		}
		this.props.saveCampaignProcess(campaignProcess)
	}

	handleRemoveProcess = (stepId) => {
		const campaignId = this.getCampaignId()
		this.props.reqRemoveCampaignProcess(stepId, campaignId)
	}

	handleAddContent = (stepId) => {
		const { accountInfo, campaignId } = this.props
		const emailContent = {
			campaign_id: campaignId,
			email_account_id: 0,
			mailbody: SysMail.default_mailbody
			// mailbody: `PCFET0NUWVBFIGh0bWwgUFVCTElDICItLy9XM0MvL0RURCBYSFRNTCAxLjAgVHJhbnNpdGlvbmFsLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL1RSL3hodG1sMS9EVEQveGh0bWwxLXRyYW5zaXRpb25hbC5kdGQiPjxodG1sIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sIj48aGVhZD48bWV0YSBjaGFyc2V0PSJ1dGYtOCIgLz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPiAgICAgICAgYm9keQ0KICAgICAgICB7DQogICAgICAgICAgICAgIGZvbnQtc2l6ZTogMTJweDsNCiAgICBjb2xvcjogIzAwMDsNCiAgICBmb250LXdlaWdodDogbm9ybWFsOw0KICAgIG1hcmdpbjogMDsNCiAgICBwYWRkaW5nOiAwOw0KICAgIGZvbnQtZmFtaWx5OiBIZWx2ZXRpY2EsQXJpYWwsVmVyZGFuYSwgIk1pY3Jvc29mdCBZYUhlaSIgLCAi5b6u6L2v6ZuF6buRIjsNCiAgICAgYmFja2dyb3VuZC1jb2xvcjojZjdmN2Y3DQogICAgICAgICAgICB9DQogICAgYm9keSwgdGFibGUsIHRkLCBwLCBhLCBsaSwgYmxvY2txdW90ZXstd2Via2l0LXRleHQtc2l6ZS1hZGp1c3Q6MTAwJTstbXMtdGV4dC1zaXplLWFkanVzdDoxMDAlO30NCiAgICB0YWJsZSwgdGR7IGJvcmRlci1jb2xsYXBzZTpjb2xsYXBzZTttc28tdGFibGUtbHNwYWNlOjBwdDttc28tdGFibGUtcnNwYWNlOjBwdDtib3JkZXItc3BhY2luZzowO30NCiAgICBpbWcgey1tcy1pbnRlcnBvbGF0aW9uLW1vZGU6YmljdWJpYzt9DQoNCiAudGV4dCB1bCwudGV4dCBvbA0KIHsNCiAgICAgIHBhZGRpbmc6MCAhaW1wb3J0YW50Ow0KICAgICAgbWFyZ2luLWxlZnQ6MTVweDsNCiAgICAgICptYXJnaW46MDsNCiAgICAgICpwYWRkaW5nOjA7DQogICAgICAgIG1hcmdpbjowXDk7DQogICAgICBwYWRkaW5nOjBcOTsNCiAgICAgfQ0KcA0Kew0KICAgIG1hcmdpbjogMDsNCiAgICAgcGFkZGluZzowOw0KICAgIGZvbnQtc2l6ZTogMTJweDsNCn0NCmENCnsNCiAgICBvdXRsaW5lOiAwOw0KICAgICB0ZXh0LWRlY29yYXRpb246bm9uZTsNCiAgICAgIGNvbG9yOiM0NDQ0NDQ7DQp9DQogICAgICAgIC50ZXh0IHAgYQ0KICAgICAgICB7DQogICAgICAgICAgICBtYXJnaW4tYm90dG9tOiA1cHg7DQogICAgICAgICAgICAgIHRleHQtZGVjb3JhdGlvbjp1bmRlcmxpbmU7DQogICAgICBjb2xvcjojNDQ0NDQ0Ow0KICAgICAgICB9DQogICAgICAgIC50ZXh0IHVsDQogICAgICAgIHsNCiAgICAgICAgICAgIGxpc3Qtc3R5bGUtdHlwZTogZGlzYzsNCiAgICAgICAgfQ0KICAgICAgICAudGV4dCB1bCBsaQ0KICAgICAgICB7DQogICAgICAgICAgICBsaW5lLWhlaWdodDogMjRweDsNCiAgICAgICAgfQ0KICAgICAgICBodG1sIHsgd2lkdGg6IDEwMCU7IH0NCmJvZHkgeyAtd2Via2l0LXRleHQtc2l6ZS1hZGp1c3Q6IG5vbmU7IC1tcy10ZXh0LXNpemUtYWRqdXN0OiBub25lOyBtYXJnaW46IDA7IHBhZGRpbmc6IDA7IH0NCnRhYmxlIHsgYm9yZGVyLXNwYWNpbmc6IDA7IGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7Ym9yZGVyLXdpZHRoOjA7IH0NCnRhYmxlIHRkIHsgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTsgYm9yZGVyLXdpZHRoOjA7IH0NCi50b3BfbGluayBhDQp7DQogICAgIGNvbG9yOiMwMDAwMDA7IHRleHQtZGVjb3JhdGlvbjpub25lOw0KICAgIH0NCiAgICBibG9ja3F1b3RlDQogICAgew0KICAgICAgICAgcGFkZGluZy1sZWZ0OjE0cHg7DQogICAgICAgICBib3JkZXItbGVmdDogNHB4IHNvbGlkICM3ZjhhOTY7DQogICAgICAgIH0NCiAgICAgICAgaDEsaDIsaDMsaDQNCiAgICAgICAgew0KICAgICAgICAgICAgIG1hcmdpbjowcHggMHB4Ow0KICAgICAgICAgICAgICBwYWRkaW5nOjBweCAwcHg7DQogZm9udC13ZWlnaHQ6bm9ybWFsOw0KIGZvbnQtc3R5bGU6bm9ybWFsOw0KICAgICAgICAgICAgfQ0KICAgYSBpbWcNCiAgICB7DQogICAgICAgIGJvcmRlci13aWR0aDowOw0KICAgICAgICB9DQogICAgICAgIHNwYW4NCiAgICAgICAgew0KICAgICAgICAgICAgIGRpc3BsYXk6aW5saW5lOw0KICAgICAgICAgICAgfTwvc3R5bGU%2BPC9oZWFkPjxib2R5Pjx0YWJsZSB3aWR0aD0iMTAwJSIgYm9yZGVyPSIwIiBjZWxscGFkZGluZz0iMCIgY2VsbHNwYWNpbmc9IjAiIGNsYXNzPSJtYWluLWJnIiBiYz0iI2Y3ZjdmNyIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6IHJnYigyNDcsIDI0NywgMjQ3KTsiPgogICAgICAgIDx0Ym9keT4KICAgICAgICAgICAgPHRyPgogICAgICAgICAgICAgICAgPHRkIGFsaWduPSJjZW50ZXIiIGlkPSJ0ZF90YWJsZSIgdmFsaWduPSJ0b3AiIHN0eWxlPSJwYWRkaW5nOiAzJSAwcHg7Ij4KICAgICAgICAgICAgICAgICAgICA8dGFibGUgd2lkdGg9IjY1MCIgYm9yZGVyPSIwIiBzdHlsZT0id2lkdGg6IDY1MHB4OyB0YWJsZS1sYXlvdXQ6IGZpeGVkOyIgYWxpZ249ImNlbnRlciIgY2VsbHBhZGRpbmc9IjAiIGNlbGxzcGFjaW5nPSIwIiBpZD0idGFiX2VtYWlsIj4KICAgICAgICAgICAgICAgICAgICAgICAgPHRib2R5PgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT0idGV4dC1hbGlnbjogcmlnaHQ7IHBhZGRpbmctYm90dG9tOiAxM3B4OyBjb2xvcjogI2MxYzFjMTsgZm9udC1zaXplOiAxMnB4OwogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250LWZhbWlseTog5b6u6L2v6ZuF6buROyIgY2xhc3M9InRleHQgc2hvd190b29sQmdDb2xvciB0b3BfbGluayI%2BPGRpdiBjbGFzcz0iZWRtX2VkaXRvciBtZWRpdW0tZWRpdG9yLWVsZW1lbnQiIGRhdGEtcGxhY2Vob2xkZXI9Iuivt%2Bi%2Bk%2BWFpeaWh%2BacrCI%2BCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOWmguaenOmCruS7tuaXoOazleato%2BW4uOaYvuekuu%2B8jDxhIHN0eWxlPSJjb2xvcjogI2MxYzFjMTsgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7IiBpZD0ibGlua19lbWFpbCIgaHJlZj0iaHR0cDovL2VkbS5tMXdvcmxkLmNvbS9lbWFpbC5odG0%2FaT11bmRlZmluZWQiIHRhcmdldD0iX2JsYW5rIj7or7fngrnlh7vov5nph4w8L2E%2BCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY%2BPC90ZD4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI%2BCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI%2BCiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ%2BJm5ic3A7PC90ZD4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI%2BCiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI%2BCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGFsaWduPSJsZWZ0IiB2YWxpZ249InRvcCIgaWQ9InRkX2JnIiBiZ2NvbG9yPSIjZmZmZmZmIiBzdHlsZT0iYmFja2dyb3VuZDogI2ZmZmZmZjsiPjx0YWJsZSB3aWR0aD0iMTAwJSIgY2VsbHNwYWNpbmc9IjAiIGNlbGxwYWRkaW5nPSIwIiBib3JkZXI9IjAiIGNsYXNzPSJtYWluIiBwYXRocz0iLi4vdGVtcC9odG1sL2xpc3QvaW1ndGV4dF92ZXIuaHRtfC4uL3RlbXAvaHRtbC9saXN0L2ltZ3RleHRfdmVyMi5odG0iPjx0Ym9keT48dHI%2BPHRkIGFsaWduPSJsZWZ0IiB2YWxpZ249InRvcCIgc3R5bGU9IiI%2BPHRhYmxlIHdpZHRoPSIxMDAlIiBib3JkZXI9IjAiIGFsaWduPSJsZWZ0IiBjZWxscGFkZGluZz0iMCIgY2VsbHNwYWNpbmc9IjAiIHN0eWxlPSJ0YWJsZS1sYXlvdXQ6Zml4ZWQ7Ij48dGJvZHk%2BPHRyPjx0ZCB2YWxpZ249InRvcCI%2BPHRhYmxlIHdpZHRoPSIxMDAlIiBib3JkZXI9IjAiIGNlbGxwYWRkaW5nPSIwIiBjZWxsc3BhY2luZz0iMCIgc3R5bGU9InRhYmxlLWxheW91dDpmaXhlZDsiPjx0Ym9keT48dHI%2BPHRkIHZhbGlnbj0idG9wIiBzdHlsZT0iIj48ZGl2IGNsYXNzPSJpbWdCb3JkZXIiIHN0eWxlPSJoZWlnaHQ6IGF1dG87Ij48aW1nIHNyYz0iaHR0cDovL2VkbS5tMXdvcmxkLmNvbS92Mi90ZW1wL2ltZy9saXN0L2RlbW8yLmpwZyIgc3R5bGU9Im1heC13aWR0aDoxMDAlOyIgd2lkdGg9IjY1MCIgaGVpZ2h0PSI0NDQiPjwvZGl2PjwvdGQ%2BPC90cj48dHI%2BPHRkIHZhbGlnbj0idG9wIiBzdHlsZT0iIj4KPHRhYmxlIHdpZHRoPSIxMDAlIiBjZWxsc3BhY2luZz0iMCIgY2VsbHBhZGRpbmc9IjAiIGJvcmRlcj0iMCIgY2xhc3M9Im1haW5fY2hpbGQiPjx0Ym9keT48dHI%2BPHRkIGFsaWduPSJsZWZ0IiB2YWxpZ249InRvcCIgc3R5bGU9InBhZGRpbmc6MHB4IDUwcHgiPjx0YWJsZSB3aWR0aD0iMTAwJSIgYm9yZGVyPSIwIiBhbGlnbj0ibGVmdCIgY2VsbHBhZGRpbmc9IjAiIGNlbGxzcGFjaW5nPSIwIj48dGJvZHk%2BPHRyPjx0ZCBjbGFzcz0idGV4dCIgdmFsaWduPSJ0b3AiIHN0eWxlPSJsaW5lLWhlaWdodDogMjRweDsgZm9udC1mYW1pbHk6IOW%2Brui9r%2Bmbhem7kTsgZm9udC1zaXplOiAxM3B4OyBjb2xvcjogcmdiKDUxLCA1MSwgNTEpOyBwYWRkaW5nOiAwcHg7Ij4KPGJyPgo8aDIgc3R5bGU9ImZvbnQtc2l6ZTogMjhweDsgdGV4dC1hbGlnbjogY2VudGVyOyBsaW5lLWhlaWdodDogNTZweDsgZm9udC13ZWlnaHQ6IDYwMDsgbWFyZ2luOiAwcHg7IHBhZGRpbmc6IDBweDsiPueJueaAp%2BS7i%2Be7jTwvaDI%2BCjxwIHN0eWxlPSJsaW5lLWhlaWdodDogMjZweDsgdGV4dC1hbGlnbjogY2VudGVyOyBtYXJnaW46IDBweDsgcGFkZGluZzogMHB4OyI%2BCuS9v%2BeUqOS4gOauteeugOefreeahOivneadpeaPj%2Bi%2FsOaCqOeahOS6p%2BWTgeS7t%2BWAvO%2B8jOaIluiAheino%2BmHiuS4u%2BmimOamguW%2FteOAgeiusui%2FsOS4gOauteaVheS6i%2BOAgeWxleW8gOS4gOasoea0u%2BWKqOS7i%2Be7jeetieetiQrov5nph4zlr7nnibnmgKfmj4%2Fov7Dlj6%2Fku6XnroDljZXop6Pph4rvvIzorqnmsqHogJDlv4PnmoTnlKjmiLfkuIDlj6Xor53orrDkvY%2FmgqjnmoTkuLvpopjmpoLopoHmgLvkuYvvvIzkuI3opoHnlKjov4flpJrjgIHov4fkuo7llbDll6bnmoTor53mnaXlkYror4nnlKjmiLfmmK%2Fku4DkuYgg44CCCjwvcD4KPGJyPgo8L3RkPjwvdHI%2BPC90Ym9keT48L3RhYmxlPjwvdGQ%2BPC90cj48L3Rib2R5PjwvdGFibGU%2BCjx0YWJsZSB3aWR0aD0iMTAwJSIgY2VsbHNwYWNpbmc9IjAiIGNlbGxwYWRkaW5nPSIwIiBib3JkZXI9IjAiIGNsYXNzPSJtYWluX2NoaWxkIj48dGJvZHk%2BPHRyPjx0ZCBhbGlnbj0ibGVmdCIgdmFsaWduPSJ0b3AiPjx0YWJsZSBjZWxsc3BhY2luZz0iMCIgY2VsbHBhZGRpbmc9IjAiIGJvcmRlcj0iMCIgYWxpZ249ImNlbnRlciIgc3R5bGU9ImJvcmRlci1jb2xsYXBzZTogc2VwYXJhdGU7Ij4gICAgICAgICAgICAgICAgICAgIDx0Ym9keT4gICAgICAgICAgICAgICAgICAgICAgICA8dHI%2BICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz0iYnRuX3RkIiBzdHlsZT0iY29sb3I6IHJnYigyNTUsIDI1NSwgMjU1KTsgcGFkZGluZzogMTBweCAwcHg7IGJvcmRlci1yYWRpdXM6IDNweDsgdGV4dC1hbGlnbjogY2VudGVyOyBmb250LXNpemU6IDE2cHg7IGZvbnQtd2VpZ2h0OiA2MDA7IG1pbi13aWR0aDogOTBweDsgYmFja2dyb3VuZC1jb2xvcjogcmdiKDY4LCA2OCwgNjgpOyB3aWR0aDogMTQwcHg7IiB3PSI5MCI%2BICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT0iZm9udC1mYW1pbHk6IOW%2Brui9r%2Bmbhem7kTsgZm9udC1zaXplOjE2cHg7IGNvbG9yOiNmZmZmZmY7Ij48YSB0YXJnZXQ9Il9ibGFuayIgY2xhc3M9InRvb2xzX2xpbmsiIHN0eWxlPSJjb2xvcjojZmZmZmZmOyB0ZXh0LWRlY29yYXRpb246IG5vbmU7IiBocmVmPSIiPueri%2BWNs%2BS4i%2Bi9vTwvYT48L3NwYW4%2BICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ%2BICAgICAgICAgICAgICAgICAgICAgICAgPC90cj4gICAgICAgICAgICAgICAgICAgIDwvdGJvZHk%2BICAgICAgICAgICAgICAgIDwvdGFibGU%2BPC90ZD48L3RyPjwvdGJvZHk%2BPC90YWJsZT4KPHRhYmxlIHdpZHRoPSIxMDAlIiBjZWxsc3BhY2luZz0iMCIgY2VsbHBhZGRpbmc9IjAiIGJvcmRlcj0iMCIgY2xhc3M9Im1haW5fY2hpbGQiPjx0Ym9keT48dHI%2BPHRkIGFsaWduPSJsZWZ0IiB2YWxpZ249InRvcCIgY2xhc3M9InRkX3NwYWNlIiBzdHlsZT0iaGVpZ2h0OiAzMHB4OyI%2BICAgICAgICAgICA8L3RkPjwvdHI%2BPC90Ym9keT48L3RhYmxlPgo8L3RkPjwvdHI%2BPC90Ym9keT48L3RhYmxlPjwvdGQ%2BPC90cj48L3Rib2R5PjwvdGFibGU%2BPC90ZD48L3RyPjwvdGJvZHk%2BPC90YWJsZT48L3RkPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD4mbmJzcDs8L3RkPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9InRleHQtYWxpZ246IHJpZ2h0OyBwYWRkaW5nLXRvcDogMTNweDsgY29sb3I6ICNjMWMxYzE7IGZvbnQtc2l6ZTogMTJweDsgZm9udC1mYW1pbHk6IOW%2Brui9r%2Bmbhem7kTsiIGNsYXNzPSJ0ZXh0IHNob3dfdG9vbEJnQ29sb3IgdG9wX2xpbmsiIHBhdGhzPSIuLi90ZW1wL2h0bWwvYmFzaWMvaW1nLmh0bXwuLi90ZW1wL2h0bWwvYmFzaWMvaW1nMi5odG18Li4vdGVtcC9odG1sL2Jhc2ljL2ltZzMuaHRtIj48ZGl2IGNsYXNzPSJlZG1fZWRpdG9yIG1lZGl1bS1lZGl0b3ItZWxlbWVudCIgZGF0YS1wbGFjZWhvbGRlcj0i6K%2B36L6T5YWl5paH5pysIj4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg5aaC5p6c5oKo5LiN5oOz5YaN5pS25Yiw5q2k57G76YKu5Lu277yMPGEgc3R5bGU9ImNvbG9yOiAjYzFjMWMxOyB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTsiIGhyZWY9InskdW5zdWJzY3JpYmVfdXJsfSIgdGFyZ2V0PSJfYmxhbmsiPuivt%2BeCueWHu%2Bi%2FmemHjOmAgOiuojwvYT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj48L3RkPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj4KICAgICAgICAgICAgICAgICAgICAgICAgPC90Ym9keT4KICAgICAgICAgICAgICAgICAgICA8L3RhYmxlPgogICAgICAgICAgICAgICAgPC90ZD4KICAgICAgICAgICAgPC90cj4KICAgICAgICA8L3Rib2R5PgogICAgPC90YWJsZT48L2JvZHk%2BPC9odG1sPg%3D%3D`
		}

		const relation = {
			stepId,
			type: CampaignContentTypes.EDM,
			refId: ''
		}

		this.props.reqSaveEmailContent(emailContent, relation)
	}

	saveTargetCondition = (option) => {
		const {processes} = this.props
		const step_id = option.step_id
		const processStep = processes.find(item => item.id === step_id)
		const targetCondition = processStep.target_condition ? JSON.parse(processStep.target_condition) : defaultCondition
		delete option.step_id
		const newCondition = {
			...targetCondition,
			...option
		}

		const processEntity = {
			...processStep,
			target_condition: JSON.stringify(newCondition)
		}
		const processParam = {
			step_id,
			target_condition: JSON.stringify(newCondition)
		}
		this.props.saveCampaignProcess(processParam, processEntity)
	}

	handleDelayChange = (delaytime, step_id) => {
		this.saveTargetCondition({delaytime, step_id})
	}

	handleClickUrlChange = (click_url, step_id) => {
		this.saveTargetCondition({click_url, step_id})
	}
	handleEventTypeChange = (type, task_id, click_url, step_id) => {
		this.saveTargetCondition({type, task_id, click_url, step_id})
	}

	handleEditEmail = (taskId, stepId) => {
		const { processes } = this.props
		const step = processes.find(item => item.id === stepId)
		const content = step.contents.find(item => item.task.task_id === taskId)
		this.props.resetEmailContent(content)
		this.props.showProcessContentModal(true)
	}

	handleRemoveEmail = (taskId, stepId) => {
		const refIds = String(taskId)
		this.props.reqBetchRemoveContent(stepId, refIds)
	}
	render() {
		const { processes, processContentModal, emailLinks, ...props } = this.props
		const processCount = processes.length
		return (
			<div key="content" className="container">
				<div className="content-box-group">
					{processes.map((item, i) => {
						const prevEmails = i === 0 ? [] : processes[i - 1].contents
						return (
							<ProcessBox 
								key={i} 
								indexNum={i} 
								isFinal={processCount === (i + 1)} 
								processStep={item} 
								prevEmails={prevEmails}
								emails={item.contents || []} 
								emailLinks={emailLinks}
								reqLinks={props.reqLinks}
								onRemoveProcess={e => this.handleRemoveProcess(item.id)} 
								onAddContent={e => this.handleAddContent(item.id)}
								onRemoveContent={task_id => this.handleRemoveEmail(task_id, item.id)}
								onEditContent={task_id => this.handleEditEmail(task_id, item.id)}
								onDelayChange={delaytime => this.handleDelayChange(delaytime, item.id)}
								onClickUrlChange={clickUrl => this.handleClickUrlChange(clickUrl, item.id)}
								onEventTypeChange={(...args) => this.handleEventTypeChange(...args, item.id)}
							/>
						)
					})}
				</div>
				<div className="send-content-bottom">
					<ButtonAdd onClick={this.handleAddProcess} >添加新步骤</ButtonAdd>
				</div>
				<EdmEditorModal 
					show={processContentModal}
					onClose={e => props.showProcessContentModal(false)}
					subject={props.subject}
				/>
				<SendSettingModalContainer />
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		processContentModal: state.campaignProcess.processContentModal,
		processes: state.campaignProcess.processes,
		campaignId: state.campaignCreate.campaignId,
		emails: state.email.emails,
		emailLinks: state.email.emailLinks,
		accountInfo: state.email.accountInfo,
		subject: state.emailContent.subject,
	}
}

const mapDispatchToProps = (dispatch) =>({
	showProcessContentModal: bindActionCreators(actions.showProcessContentModal, dispatch),
	saveCampaignProcess: bindActionCreators(actions.saveCampaignProcess, dispatch),
	modifyCampaignProcess: bindActionCreators(actions.modifyCampaignProcess, dispatch),
	reqCampaignProcesses: bindActionCreators(actions.reqCampaignProcesses, dispatch),
	reqRemoveCampaignProcess: bindActionCreators(actions.reqRemoveCampaignProcess, dispatch),
	saveProcessContentSet: bindActionCreators(actions.saveCampaignProcess, dispatch),
	reqBetchRemoveContent: bindActionCreators(actions.reqBetchRemoveContent, dispatch),
	reqEmails: bindActionCreators(emailActions.reqEmails, dispatch),
	reqRemoveEmail: bindActionCreators(emailActions.reqRemoveEmail, dispatch),
	reqLinks: bindActionCreators(emailActions.reqLinks, dispatch),
	reqAccountInfo: bindActionCreators(emailActions.reqAccountInfo, dispatch),
	reqSaveEmailContent: bindActionCreators(contentActions.reqSaveEmailContent, dispatch),
	resetEmailContent: bindActionCreators(contentActions.resetEmailContent, dispatch),

	reqCampaign: bindActionCreators(createActions.reqCampaign, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Process)