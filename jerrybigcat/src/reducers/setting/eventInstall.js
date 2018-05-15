const initialState = {
	codeTab: 1,
	code_javascript: `window.soupSettings = {
	// 将横线部分替换成业务数据 js
	// 根据当时选择字段类型赋值，日期格式请转换为时间戳，如：”1510583516“
	// 如果空值将不记录，如null或空

		"utm_source": _______, // string
		“view_price_page”: _______ // number
}`,
	code_ios: `window.soupSettings = {
	// 将横线部分替换成业务数据 ios
	// 根据当时选择字段类型赋值，日期格式请转换为时间戳，如：”1510583516“
	// 如果空值将不记录，如null或空

		"utm_source": _______, // string
		“view_price_page”: _______ // number
}`,
	code_android: `window.soupSettings = {
	// 将横线部分替换成业务数据 android
	// 根据当时选择字段类型赋值，日期格式请转换为时间戳，如：”1510583516“
	// 如果空值将不记录，如null或空

		"utm_source": _______, // string
		“view_price_page”: _______ // number
}`,
}

export const actionTypes = {
	SET_CODE_TAB: 'SET_CODE_TAB',

	UPDATE_CODE_JAVASCRIPT: 'UPDATE_CODE_JAVASCRIPT',
	UPDATE_CODE_IOS: 'UPDATE_CODE_IOS',
	UPDATE_CODE_ANDROID: 'UPDATE_CODE_ANDROID',


}


export const actions = {
	setCodeTab(tab) {
		return {
			type: actionTypes.SET_CODE_TAB,
			tab
		}
	},

	updateCodeJavascript(code) {
		return {
			type: actionTypes.UPDATE_CODE_JAVASCRIPT,
			code
		}
	},

	updateCodeIOS(code) {
		return {
			type: actionTypes.UPDATE_CODE_IOS,
			code
		}
	},
	updateCodeAndroid(code) {
		return {
			type: actionTypes.UPDATE_CODE_ANDROID,
			code
		}
	},
}


export function eventInstallReducer(state = initialState, action) {
	switch(action.type) {
		case actionTypes.SET_CODE_TAB:
			return {
				...state,
				codeTab: action.tab
			}
		case actionTypes.UPDATE_CODE_JAVASCRIPT:
			return {
				...state,
				code_javascript: action.code
			}
		case actionTypes.UPDATE_CODE_IOS:
			return {
				...state,
				code_ios: action.code
			}
		case actionTypes.UPDATE_CODE_ANDROID:
			return {
				...state,
				code_android
			}
		default:
			return state
	}
}