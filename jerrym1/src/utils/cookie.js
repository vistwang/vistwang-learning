/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-06-26 17:41:59
 * @version $Id$
 */

function get(key) {
	const cookies = document.cookie ? document.cookie.split('; ') : []
	for(let i = 0, l = cookies.length; i < l; i++) {
		const parts = cookies[i].split('=')
		const name = parts[0]
		if(key && key === name) {
			return parts[1]
		}
	}
	return ''
}

function set(key, value, {expires, domain, path, secure}) {
	if(typeof expires === 'number') {
		let days = expires
		let t = expires = new Date()
		t.setTime(+t + days * 24 * 2600 * 1000)
	}
	document.cookie = [
		key, '=', value,
		expires ? '; expires=' + expires.toUTCString() : '',
		path ? '; path=' + path : '',
		domain ? '; domain=' + domain : '',
		secure ? '; secure' : ''
	].join('')
}

// function set(key, value, expires, domain, path) {
// 	let date = new Date()
// 	date.setTime(date.getTime() + expires * 24 * 3600 * 1000)
// 	document.cookie = [
// 		key, '=', value,
// 		expires ? '; expires=' + date.toUTCString() : '',
// 		path ? '; path=' + path : '',
// 		domain ? '; domain=' + domain : ''
// 	].join('')
// }

function remove(key, options) {
	set(key, '', {
		expires: -1,
		...options
	})
}

export default {get, set, remove}