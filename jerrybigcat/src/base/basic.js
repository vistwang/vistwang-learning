import { cookie, config } from '../utils'

export default {
	token: cookie.get(config.COOKIE_SOUPAI_TOKEN),
	userName: cookie.get(config.COOKIE_SOUPAI_USER_NAME)
}

