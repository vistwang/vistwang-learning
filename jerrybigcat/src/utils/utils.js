

export default {
	/**
	 * 获取url search参数对象
	 * @param  {string} search 
	 * @return {object}        URLSearchParams
	 */
	getSearchParams(search) {
		search = search || window.location.search
		// return new URLSearchParams(search)
		return {
			get: key => {
				var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i")
				var r = search.substr(1).match(reg)
				return (r === null ? null : decodeURIComponent(r[2]))
			}
		}
	},

	/**
	 * 获取Url参数
	 * @param  {String} key 
	 */
	getUrlParam(key) {
		// return new URLSearchParams(window.location.search).get(key)
		return this.getSearchParams().get(key)
	},

	/**
	 * url重定向
	 * @param  {string} url 
	 */
	redirectTo(url) {
		window.location.href = url
	},

	/**
	 * 事件触发器（触发某鼠标事件）
	 * @param  {object} el        dom node object
	 * @param  {string} eventType 触发事件类型
	 * @return null           
	 */
	eventTrigger(el, eventType) {
		const event = new MouseEvent(eventType, {
		  'view': window,
		  'bubbles': true,
		  'cancelable': true
		})
		el.dispatchEvent(event)
	},

	/**
	 * 判断是否是JSON格式字符串
	 * @param  {String}  str [description]
	 * @return {Boolean}     [description]
	 */
	isJSON(str) {
		if (typeof str == 'string') {
		  try {
        JSON.parse(str);
           return true;
        } catch(e) {
           // console.log(e);
           return false;
        }
		  }
	},

	/**
	 * 格式化货币
	 * @param  {Number} money 
	 */
	formatMoney(money) {
		return String(money).split('.')[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + (String(money).split('.')[1] ? '.' + String(money).split('.')[1] : '')
	},

	/**
	 * 格式化日期 - 时间戳
	 * @param  {Number} timestamp  时间戳
	 * @param  {String} split     
	 */
	formatDate(timestamp, split) {
		split = split ? split : '.'
		const date = new Date(parseInt(timestamp))
		return this.getFormatDate(date,split)
	},

	/**
	 * 格式化日期时间 - 时间戳
	 * @param  {Number} timestamp 时间戳
	 * @param  {String} split     
	 */
	formatDateTime(timestamp, split) {
		split = split ? split : '.'
		const date = new Date(parseInt(timestamp))
		return this.getFormatDateTime(date,split)
	},

	getFormatDate(date, split) {
		split = split ? split : '.'
		const year = date.getFullYear()
		const month = date.getMonth() + 1
		const day = date.getDate()
		return `${year}${split}${month}${split}${day}`
	},

	getFormatDateTime(date, split) {
		split = split ? split : '.'
		const year = date.getFullYear()
		const month = date.getMonth() + 1
		const day = date.getDate()
		const hour = date.getHours()
		const minute = date.getMinutes()
		return `${year}${split}${month}${split}${day} ${hour}:${minute}`
	},

	getTimeStamp(time) {
		return time ? new Date(time).getTime() : new Date().getTime()
	},

	/**
	 * 判断是否是手机号码
	 * @param  {string}  s 手机号码字符串
	 * @return {Boolean}   true 是，false 否
	 */
	isMobile(s) {
		const reg = /^1[3456789]\d{9}$/
		return reg.test(s)
	},

	/**
	 * 验证邮箱格式是否正确
	 * @param  {String}  s 邮箱地址
	 * @return {Boolean}   
	 */
	isEmail(s) {
		const reg = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/; //邮箱格式
		return reg.test(s);
	},

	/**
	 * 验证网址是否正确
	 * @param  {String}  s url地址		
	 * @return {Boolean}   
	 */
	isUrl(s) {
		const reg = /^[a-zA-z]+:\/\/[^\s]*$/; //所填网址格式不正确
		return reg.test(s);
	},

	/**
	 * 验证是否是域名
	 * @param  {String}  s 域名 不含http://
	 * @return {Boolean}   
	 */
	isDomain(s) {
		const reg = /^([a-zA-Z\d][a-zA-Z\d-_]+\.)+[a-zA-Z\d-_][^]*$/
		return reg.test(s)
	},

	/**
	 * 验证是否是数字
	 * @param  {String, Number}  s 带验证数字货字符串
	 * @return {Boolean}   
	 */
	isNumber(s) {
		const reg = /^[1-9]\d+$/
		return reg.test(s)
	},

	/**
	 * 验证是否是密码格式 （字母和数字组合）
	 * @param  {String}  s 密码字符串
	 */
	isPassword(s) {
		const reg = /^(([a-zA-Z]{1,15}[0-9][a-zA-Z0-9]*)|([0-9]{1,15}[a-zA-Z][a-zA-Z0-9]*))$/
		return reg.test(s)
	},

	/**
	 * 判断系统或终端类型
	 * @return {[type]} [description]
	 */
	os:(() => {  
	     const ua = navigator.userAgent,  
	     isMac = /(?:Macintosh|Mac OS X)/.test(ua),  
	     isWindows = /(?:Windows NT|Win32)/.test(ua),  
	     isWindowsPhone = /(?:Windows Phone)/.test(ua),  
	     isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,   
	     isAndroid = /(?:Android)/.test(ua),   
	     isFireFox = /(?:Firefox)/.test(ua),   
	     isChrome = /(?:Chrome|CriOS)/.test(ua),  
	     isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),  
	     isPhone = /(?:iPhone)/.test(ua) && !isTablet,  
	     isPc = !isPhone && !isAndroid && !isSymbian;  
	     return {  
     			isMac : isMac,
     			isWindows: isWindows,
          isTablet: isTablet,  
          isPhone: isPhone,  
          isAndroid : isAndroid,  
          isPc : isPc  
	     }
		})(),

		/**
		 * 获取当前浏览器名称及版本
		 * @return {Object}  
		 */
		browser: (() => {
	    const ua = navigator.userAgent.toLowerCase();
			let Sys = {};
			let b;
	    let s;
	    (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = s[1] :
	    (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
	    (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
	    (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
	    (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
	    (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : '0';
	    
	    if(Sys.ie) {
	    	b = {name: 'IE', version: Sys.ie}
	    } else if(Sys.firefox) {
	    	b = {name: 'Firefox', version: Sys.firefox}
	    } else if(Sys.chrome) {
	    	b = {name: 'Chrome', version: Sys.chrome}
	    } else if(Sys.opera) {
	    	b = {name: 'Opera', version: Sys.opera}
	    } else if(Sys.safari) {
	    	b = {name: 'Safari', version: Sys.safari}
	    } else {
	    	b = {name: 'unknown', version: '0'}
	    }
	    return b
		})(),

		/**
		 * 检车浏览器支持
		 */
		checkBrowserSupport() {
			if(this.browser.name === 'IE' && parseFloat(this.browser.version) < 9) {
				this.redirectTo('/browser_upgrade.html')
				return
			}
		},

	/**
	 * 浮点数求和
	 * @param {Number} a 
	 * @param {Number} b 
	 */
	add(a, b) {
    let c, d, e;
    try {
        c = a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (this.mul(a, e) + this.mul(b, e)) / e;
	},
	/**
	 * 浮点数相减
	 * @param  {Number} a 
	 * @param  {Number} b 
	 * @return {Number}   
	 */
	sub(a, b) {
	    let c, d, e;
	    try {
	        c = a.toString().split(".")[1].length;
	    } catch (f) {
	        c = 0;
	    }
	    try {
	        d = b.toString().split(".")[1].length;
	    } catch (f) {
	        d = 0;
	    }
	    return e = Math.pow(10, Math.max(c, d)), (this.mul(a, e) - this.mul(b, e)) / e;
	},
	/**
	 * 浮点数相乘
	 * @param  {Number} a 
	 * @param  {Number} b 
	 * @return {Number}   
	 */
	mul(a, b) {
	    let c = 0,
	        d = a.toString(),
	        e = b.toString();
	    try {
	        c += d.split(".")[1].length;
	    } catch (f) {}
	    try {
	        c += e.split(".")[1].length;
	    } catch (f) {}
	    return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
	},
	/**
	 * 浮点数相除
	 * @param  {Number} a
	 * @param  {Number} b
	 * @return {Number}  
	 */
	div(a, b) {
	    let c, d, e = 0,
	        f = 0;
	    try {
	        e = a.toString().split(".")[1].length;
	    } catch (g) {}
	    try {
	        f = b.toString().split(".")[1].length;
	    } catch (g) {}
	    return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), this.mul(c / d, Math.pow(10, f - e));
	},

	/**
	 * 数字转换为中文
	 * @param  {Number} num 数字
	 * @return {String}     中文数字
	 */
	numberToChinese(num) {
		const chnNumChar = ["零","一","二","三","四","五","六","七","八","九"];
		const chnUnitSection = ["","万","亿","万亿","亿亿"];
		const chnUnitChar = ["","十","百","千"];

		const SectionToChinese = (section) => {
		  let strIns = '', chnStr = '';
		  let unitPos = 0;
		  let zero = true;
		  while(section > 0){
		    let v = section % 10;
		    if(v === 0){
		      if(!zero){
		        zero = true;
		        chnStr = chnNumChar[v] + chnStr;
		      }
		    }else{
		      zero = false;
		      strIns = chnNumChar[v];
		      strIns += chnUnitChar[unitPos];
		      chnStr = strIns + chnStr;
		    }
		    unitPos++;
		    section = Math.floor(section / 10);
		  }
		  return chnStr;
		}

		const NumberToChinese = (num) => {
		  let unitPos = 0;
		  let strIns = '', chnStr = '';
		  let needZero = false;
		 
		  if(num === 0){
		    return chnNumChar[0];
		  }
		 
		  while(num > 0){
		    let section = num % 10000;
		    if(needZero){
		      chnStr = chnNumChar[0] + chnStr;
		    }
		    strIns = SectionToChinese(section);
		    strIns += (section !== 0) ? chnUnitSection[unitPos] : chnUnitSection[0];
		    chnStr = strIns + chnStr;
		    needZero = (section < 1000) && (section > 0);
		    num = Math.floor(num / 10000);
		    unitPos++;
		  }
		 
		  return chnStr;
		}

		return NumberToChinese(num)
	},
	
	/**
	 * 中文数字转换为数字
	 * @param  {String} chnStr 中文数字
	 * @return {Number}        数字
	 */
	chineseToNumber(chnStr) {
		let chnNumChar = {
		  零:0,
		  一:1,
		  二:2,
		  三:3,
		  四:4,
		  五:5,
		  六:6,
		  七:7,
		  八:8,
		  九:9
		};
		let chnNameValue = {
		  十:{value:10, secUnit:false},
		  百:{value:100, secUnit:false},
		  千:{value:1000, secUnit:false},
		  万:{value:10000, secUnit:true},
		  亿:{value:100000000, secUnit:true}
		}

		function ChineseToNumber(chnStr){
		  var rtn = 0;
		  var section = 0;
		  var number = 0;
		  var secUnit = false;
		  var str = chnStr.split('');
		 
		  for(var i = 0; i < str.length; i++){
		    var num = chnNumChar[str[i]];
		    if(typeof num !== 'undefined'){
		      number = num;
		      if(i === str.length - 1){
		        section += number;
		      }
		    }else{
		      var unit = chnNameValue[str[i]].value;
		      secUnit = chnNameValue[str[i]].secUnit;
		      if(secUnit){
		        section = (section + number) * unit;
		        rtn += section;
		        section = 0;
		      }else{
		        section += (number * unit);
		      }
		      number = 0;
		    }
		  }
		  return rtn + section;
		}

		return ChineseToNumber(chnStr)
	}
}