import "babel-polyfill"
import axios from 'axios'
import qs from 'qs'

import * as config from './config'
import cookie from './cookie'

/**
 * @param  {Error}
 * @return {[type]}
 */
const catchError = (error) => {
	if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
}

/**
 * 检测用户Token是否有效
 * @param  {Object} data 服务端返回数据
 */
const checkInvalidToken = (data) => {
	if(data === 'Invalid token value') {
		const cookieParam = {expires: -1, path: '/', domain: 'm1world.com'}
		cookie.remove(config.COOKIE_M1_TOKEN, cookieParam)
		cookie.remove(config.COOKIE_M1_USER_NAME, cookieParam)
		cookie.remove(config.COOKIE_M1_USER_INFO, cookieParam)
		const currUrl = encodeURIComponent(window.location.href) 
		window.location.href = '/login.html?c=' + currUrl
		return
	}
}

export default {
	get(url, data) {
		return new Promise((resolve, reject) => {
			axios.get(url, {params:data})
				.then(result => {
					if(result.data) {
						if(!result.data.success) {
							checkInvalidToken(result.data.data)
						}

						resolve(result.data)
					} else {
						reject(result.data || result)
					}
				})
				.catch(catchError)
		})
	},

	post(url, data) {
		return new Promise((resolve, reject) => {
			axios.post(url, qs.stringify(data))
				.then(result => {
					if(result.data) {
						if(!result.data.success) {
							checkInvalidToken(result.data.data)
						}

						resolve(result.data)
					} else {
						reject(result.data || result)
					}
				})
				.catch(catchError)
		})
	},

	ajax(option) {
		return new Promise((resolve, reject) => {
			axios(option)
				.then(result => {
					if(result.data) {
						if(!result.data.success) {
							checkInvalidToken(result.data.data)
						}

						resolve(result.data)
					} else {
						reject(result.data || result)
					}
				})
				.catch(catchError)
		})
	},

	all(...args) {
		return new Promise((resolve, reject) => {
			axios.all([...args])
				.then(axios.spread((...params) => {
					resolve(params)
				}))
				.catch(catchError)
		})
	}
}
