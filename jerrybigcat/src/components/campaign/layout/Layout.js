import React from 'react'
import PropTypes from 'prop-types'

import Menu from './Menu'
import HeaderContainer from '../../../containers/campaign/layout/HeaderContainer'

const Layout = ({noPanel, children, ...props}) => {
	return [
		<Menu key="menu" history={props.history} />,
		<div key="main" className="m1-right">
			<HeaderContainer />
			{!noPanel && 
				<div className="m1-panel">
					<div className="m1-panel-content">
						{children} 
					</div>
				</div>}
			{noPanel && children}
		</div>
	]
}

Layout.propTypes = {
	noPanel: PropTypes.bool
}
Layout.defaultProps = {
	noPanel: false
}

export default Layout