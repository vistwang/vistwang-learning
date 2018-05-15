import { config, http } from '../utils'
import basic from '../base/basic'

const m1api = config.SOUPAPI
const token = basic.token

/**
 * 获取全站广告列表
 */
export function getAdList() {
	const url = m1api + '/ad'
	return http.get(url)
}
/**
 * 广告点击
 */
export function setAdClick(id) {
	const url = m1api + `/ad/${id}/click`
	return http.get(url)
}

