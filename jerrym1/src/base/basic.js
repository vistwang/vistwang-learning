import { cookie, config } from '../utils'

export default {
	token: cookie.get(config.COOKIE_M1_TOKEN),
	userName: cookie.get(config.COOKIE_M1_USER_NAME)
}

