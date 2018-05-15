import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import CodeContent from './CodeContent'

const InstallCodeTab = ({codeTab, onTab, ...props}) => {
  const isJs = codeTab === 1
  const isIOS = codeTab === 2
  const isAndroid = codeTab === 3
	return (
		<div className="m1-tabs code-tab">
      <ul className="m1-tab-nav">
        <li className={classnames({select: isJs})} onClick={e => onTab(1)}><a>Javascript</a></li>
        <li className={classnames({select: isIOS})} onClick={e => onTab(2)}><a>iOS</a></li>
        <li className={classnames({select: isAndroid})} onClick={e => onTab(3)}><a>Android</a></li>
      </ul>
      <div className="m1-tab-content">
        <div className="m1-tab-pane select">
          {isJs && <CodeContent html={props.code_javascript} onChange={props.onJavascript} />}
          {isIOS && <CodeContent html={props.code_ios} onChange={props.onIOS} />}
          {isAndroid && <CodeContent html={props.code_android} onChange={props.onAndroid} />}
        </div>
      </div>
    </div>
	)
}

export default InstallCodeTab