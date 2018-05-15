import React from 'react'
import PropTypes from 'prop-types'

import EmailConfigureBaseContainer from '../../../containers/setting/account/EmailConfigureBaseContainer'
import IMAPConfigureContainer from '../../../containers/setting/account/IMAPConfigureContainer'
import SMTPConfigureContainer from '../../../containers/setting/account/SMTPConfigureContainer'

const EmailConfigrue = (props) => {
	return (
		<div className="email-configure">
			<EmailConfigureBaseContainer />
			<div className="m1-row">
				<IMAPConfigureContainer />
				<SMTPConfigureContainer />
			</div>
		</div>
	)
}

export default EmailConfigrue