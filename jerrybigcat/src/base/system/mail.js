import { EmailSendTypes, ReplyStatus } from '../enums'

export default {

	// 邮件默认空模板
	default_mailbody: 'PCFET0NUWVBFIGh0bWwgUFVCTElDICItLy9XM0MvL0RURCBYSFRNTCAxLjAgVHJhbnNpdGlvbmFsLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL1RSL3hodG1sMS9EVEQveGh0bWwxLXRyYW5zaXRpb25hbC5kdGQiPjxodG1sIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sIj48aGVhZD48bWV0YSBjaGFyc2V0PSJ1dGYtOCIgLz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwvc3R5bGU%2BPC9oZWFkPjxib2R5Pjx0YWJsZSB3aWR0aD0iMTAwJSIgYm9yZGVyPSIwIiBjZWxscGFkZGluZz0iMCIgY2VsbHNwYWNpbmc9IjAiIGNsYXNzPSJtYWluLWJnIGRuIiBiYz0iI2ZmZmZmZiIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6IHJnYigyNTUsIDI1NSwgMjU1KTsiPgogICAgICAgIDx0Ym9keT4KICAgICAgICAgICAgPHRyPgogICAgICAgICAgICAgICAgPHRkIGFsaWduPSJjZW50ZXIiIGlkPSJ0ZF90YWJsZSIgdmFsaWduPSJ0b3AiIHN0eWxlPSJwYWRkaW5nOiAzJSAwcHg7Ij4KICAgICAgICAgICAgICAgICAgICA8dGFibGUgd2lkdGg9IjY1MCIgYm9yZGVyPSIwIiBzdHlsZT0id2lkdGg6IDY1MHB4OyB0YWJsZS1sYXlvdXQ6IGZpeGVkOyIgYWxpZ249ImNlbnRlciIgY2VsbHBhZGRpbmc9IjAiIGNlbGxzcGFjaW5nPSIwIiBpZD0idGFiX2VtYWlsIj4KICAgICAgICAgICAgICAgICAgICAgICAgPHRib2R5PgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT0idGV4dC1hbGlnbjogcmlnaHQ7IHBhZGRpbmctYm90dG9tOiAxM3B4OyBjb2xvcjogIzk5OTsgZm9udC1zaXplOiAxMnB4OwogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250LWZhbWlseTog5b6u6L2v6ZuF6buROyIgY2xhc3M9InRleHQgc2hvd190b29sQmdDb2xvciB0b3BfbGluayI%2BCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOWmguaenOmCruS7tuaXoOazleato%2BW4uOaYvuekuu%2B8jDxhIHN0eWxlPSJjb2xvcjogIzAwMDAwMDsgdGV4dC1kZWNvcmF0aW9uOiBub25lOyIgaWQ9ImxpbmtfZW1haWwiIGhyZWY9Imh0dHA6Ly9lZG0ubTF3b3JsZC5jb20vZW1haWwuaHRtP2k9e2NvZGVpZH0iIHRhcmdldD0iX2JsYW5rIj7or7fngrnlh7vov5nph4w8L2E%2BCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI%2BCiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI%2BCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGFsaWduPSJsZWZ0IiB2YWxpZ249InRvcCIgaWQ9InRkX2JnIiBiZ2NvbG9yPSIjZmZmZmZmIiBzdHlsZT0iYmFja2dyb3VuZDogI2ZmZmZmZjsiPjwvdGQ%2BCiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT0idGV4dC1hbGlnbjogcmlnaHQ7IHBhZGRpbmctdG9wOiAxM3B4OyBjb2xvcjogIzk5OTsgZm9udC1zaXplOiAxMnB4OyBmb250LWZhbWlseTog5b6u6L2v6ZuF6buROyIgY2xhc3M9InRleHQgc2hvd190b29sQmdDb2xvciB0b3BfbGluayI%2BCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOWmguaenOaCqOS4jeaDs%2BWGjeaUtuWIsOatpOexu%2BmCruS7tu%2B8jDxhIHN0eWxlPSJjb2xvcjogIzAwMDAwMDsgdGV4dC1kZWNvcmF0aW9uOiBub25lOyIgaHJlZj0ieyR1bnN1YnNjcmliZV91cmx9IiB0YXJnZXQ9Il9ibGFuayI%2B6K%2B354K55Ye76L%2BZ6YeM6YCA6K6iPC9hPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ%2BCiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPgogICAgICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PgogICAgICAgICAgICAgICAgICAgIDwvdGFibGU%2BCiAgICAgICAgICAgICAgICA8L3RkPgogICAgICAgICAgICA8L3RyPgogICAgICAgIDwvdGJvZHk%2BCiAgICA8L3RhYmxlPjwvYm9keT48L2h0bWw%2B',

	filter: {
		emailSendTypes: {
			[EmailSendTypes.SYSTEM_MAIL]: '系统邮件服务',
			[EmailSendTypes.CUSTOM_MAIL]: '自定义邮件服务',
			[EmailSendTypes.WY_MAIL]: '网易企业邮箱',
			[EmailSendTypes.QQ_MAIL]: '腾讯企业邮箱',
			[EmailSendTypes.GMAIL]: 'Gmail',
		},

		weeks: {
			sunday: '周日',
			monday: '周一',
			tuesday: '周二',
			wednesday: '周三',
			thursday: '周四',
			friday: '周五',
			saturday: '周六',
		},

		festivals: {
			1: '元旦',
			2: '春节',
			3: '清明',
			4: '劳动',
			5: '中秋',
			6: '国庆',
		},

		statClassifyLabels: {
			totalCount: '总数', 
			touchedCount: '触达', 
			openCount: '打开', 
			replyCount: '回复', 
			clickCount: '点击', 
			interestCount: '感兴趣' ,
			unInterestCount: '不感兴趣', 
			transpondCount: '转发',
			followCount: '已分配跟进',
			noRequireCount: '暂无需求',
			competitionCount: '使用竞品',
			autoReplyCount: '自动回复',
			noDisturbCount: '请勿扰',
			unsubscribeCount: '退订',
			untouchedCount: '未触达',
			hardbounceCount: '硬弹',
			softBounceCount: '软弹',
			untouched_autoReply: '自动回复',
			untouched_vacation: '休息中',
		},

		replyStatus: {
			[ReplyStatus.TOTAL]: {key: 'totalCount', name: '所有'},
			[ReplyStatus.REPLY]: {key: 'replyCount', name: '回复'},
			[ReplyStatus.OPENED]: {key: 'openCount', name: '打开'},
			[ReplyStatus.CLICKED]: {key: 'clickCount', name: '点击'},
			[ReplyStatus.INTERESTED]: {key: 'interestCount', name: '感兴趣'},
			[ReplyStatus.UNSUBSCRIBE]: {key: 'unsubscribeCount', name: '退订'},
			[ReplyStatus.BOUNCE]: {key: 'hardbounceCount', name: '弹回'},
			[ReplyStatus.UNTOUCHED]: {key: 'untouchedCount', name: '未触达'},
		}
	},

	weeks: [
		{name: 'sunday',label: '周日'},
		{name: 'monday',label: '周一'},
		{name: 'tuesday',label: '周二'},
		{name: 'wednesday',label: '周三'},
		{name: 'thursday',label: '周四'},
		{name: 'friday',label: '周五'},
		{name: 'saturday',label: '周六'},
	]
}