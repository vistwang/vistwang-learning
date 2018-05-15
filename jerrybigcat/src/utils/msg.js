
export default {
	coverIndex:0,

	info(message, fn) {
		let msg = document.createElement('div')
		let content = document.createElement('div')
		msg.className = 'm1-msg'
		content.className = 'm1-msg-content'
		content.innerHTML = message
		msg.appendChild(content)
		document.body.appendChild(msg)
		setTimeout(function () {
        document.body.removeChild(msg)
        fn && fn()
    }, 2000);
	},

	loading(timer) {
		const _this = this;
		if (document.querySelectorAll('.m1-loading').length) {
		    return;
		}
		timer = +timer;
		const content = document.createElement('div')
		content.className = 'm1-loading-bg'
		content.innerHTML = '<div class="m1-loading"><i></i></div>';
		const index = this.cover(content, 'loading');
		if (!isNaN(timer)) {
		    setTimeout(function () {
		        _this.close(index);
		    }, timer * 1000);
		}
		return index;
	},

	confirm(message,confirm,cancel) {
		let content = document.createElement('div')
		content.className = 'm1-confirm'
		content.innerHTML = '<span class="m1-confirm-close" data-m1-cover-cancel></span>\
						               <div class="m1-confirm-content">\
						                 <h3 class="m1-text-center">' + message + '</h3>\
						               </div>\
						               <div class="m1-confirm-footer">\
						                 <button class="m1-btn" data-m1-cover-cancel>取消</button>\
						                 <button class="m1-btn m1-btn-primary" data-m1-cover-confirm>确认</button>\
						               </div>'
		return this.cover(content, 'confirm', confirm, cancel);
	},

	dialog(selector, confirm, cancel) {
		selector = typeof selector === 'string' ? document.querySelector(selector) : selector
		this.cover(selector, 'dialog', confirm, cancel)
	},

	cover(content, type, confirm, cancel) {
	    const _this = this
	    let index = ++this.coverIndex
	    let body = document.body
	    let shadow = document.createElement('div')
	    shadow.className = 'm1-cover-shadow'
	    shadow.setAttribute('data-m1-cover',index)
	    shadow.setAttribute('data-m1-cover-type',type)
	    body.appendChild(shadow)

	    if(content instanceof NodeList && content.length > 0) {
	    	content = content[0]
	    }

	    content.setAttribute('data-m1-cover',index)
	    content.setAttribute('data-m1-cover-type',type)

	    if (type === 'loading') {
	    	body.appendChild(content)
	    } else if (type === 'confirm') {
	    	body.appendChild(content)
	    } else if (type === 'dialog') {
	    	content.classList.add('open')
	    }

	    const bindCancel = btn => {
	    	btn.addEventListener('click', e => {
	    		_this.close(index, cancel)
	    	}, false)
	    }
	    
	    const bindConfirm = btn => {
	    	btn.addEventListener('click', e => {
	    		if (typeof confirm === 'function') {
	    		    confirm();
	    		}
	    	}, false)
	    }

	    const m1covers = document.querySelectorAll('[data-m1-cover="' + index + '"]')
	    // m1covers.forEach(cover => {
	    // 	const btnCancels = cover.querySelectorAll('[data-m1-cover-cancel]')
	    // 	const btnConfirms = cover.querySelectorAll('[data-m1-cover-confirm]')
	    // 	btnCancels.forEach(bindCancel)
	    // 	btnConfirms.forEach(bindConfirm)
	    // })

	    for(var i=0; i < m1covers.length; i++) {
	    	const btnCancels = m1covers[i].querySelectorAll('[data-m1-cover-cancel]')
	    	const btnConfirms = m1covers[i].querySelectorAll('[data-m1-cover-confirm]')

	    	for(let n = 0; n < btnCancels.length; n++) {
	    		bindCancel(btnCancels[n])
	    	}
	    	for(let m = 0; m < btnConfirms.length; m++) {
	    		bindConfirm(btnConfirms[m])
	    	}
	    }
	    	    
	    return index;
	},

	close(index, func) {
		const removeNodes = nodes => {
			// nodes.forEach(node => {
			// 	node.parentNode.removeChild(node)
			// })
			for(let i = 0; i< nodes.length; i++) {
				nodes[i].parentNode.removeChild(nodes[i])
			}
		}

		if (typeof index === 'string') {
			const covers = document.querySelectorAll('[data-m1-cover-type="' + index + '"]')
	    if (index === 'loading' || index === 'confirm') {
	        removeNodes(covers)
	    } else if (index === 'dialog') {
				const coverShadows = document.querySelectorAll('.m1-cover-shadow[data-m1-cover-type="' + index + '"]')
    		removeNodes(coverShadows)
    		// covers.forEach(cover => {
    		// 	cover.classList.remove('open')
    		// })
    		for(let i = 0; i < covers.length; i++) {
    			covers[i].classList.remove('open')
    		}
	    }
		} else if (typeof index === 'number') {
	    const covers = document.querySelectorAll('[data-m1-cover="' + index + '"]')
	    if (covers.length) {
	    	const type = covers[0].getAttribute('data-m1-cover-type')
        if (type === 'loading' || type === 'confirm') {
           removeNodes(covers)
        } else if (type === 'dialog') {
        	removeNodes(coverShadows)
        	// covers.forEach(cover => {
        	// 	cover.classList.remove('open')
        	// })
        	for(let i = 0; i < covers.length; i++) {
        		covers[i].classList.remove('open')
        	}
        }
	    }
		} else {
			const loadings = document.querySelectorAll('[data-m1-cover-type="loading"]')
			const confirms = document.querySelectorAll('[data-m1-cover-type="confirm"]')
			const dialogs = document.querySelectorAll('[data-m1-cover-type="dialog"]')
			removeNodes(loadings)
			removeNodes(confirms)
			// dialogs.forEach(dialog => {
			// 	dialog.classList.remove('open')
			// })
			for(let i = 0; i < dialogs.length; i++) {
				dialogs[i].classList.remove('open')
			}
		}

		if (typeof func === 'function') {
		    func();
		}
	}
}
