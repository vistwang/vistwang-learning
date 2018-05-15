import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Bundle from './Bundle'

import loadEmailContainer from 'bundle-loader?lazy!../containers/setting/email/EmailContainer'
import loadEmailAccountContainer from 'bundle-loader?lazy!../containers/setting/account/EmailAccountContainer'
import loadCustomEventContainer from 'bundle-loader?lazy!../containers/setting/event/CustomEventContainer'
import loadPushContainer from 'bundle-loader?lazy!../containers/setting/push/PushContainer'
import loadScheduleContainer from 'bundle-loader?lazy!../containers/setting/schedule/ScheduleContainer'
import loadFieldContainer from 'bundle-loader?lazy!../containers/setting/field/FieldContainer'

const EmailContainer = (props) => (
	<Bundle load={loadEmailContainer} >
		{(EmailContainer) => <EmailContainer {...props} />}
	</Bundle>
)

const EmailAccountContainer = (props) => (
	<Bundle load={loadEmailAccountContainer} >
		{(EmailAccountContainer) => <EmailAccountContainer {...props} />}
	</Bundle>
)

const ScheduleContainer = (props) => (
	<Bundle load={loadScheduleContainer} >
		{(ScheduleContainer) => <ScheduleContainer {...props} />}
	</Bundle>
)

const CustomEventContainer = (props) => (
	<Bundle load={loadCustomEventContainer} >
		{(CustomEventContainer) => <CustomEventContainer {...props} />}
	</Bundle>
)

const PushContainer = (props) => (
	<Bundle load={loadPushContainer} >
		{(PushContainer) => <PushContainer {...props} />}
	</Bundle>
)

const FieldContainer = (props) => (
	<Bundle load={loadFieldContainer} >
		{(FieldContainer) => <FieldContainer {...props} />}
	</Bundle>
)


class CampaignRouter extends Component {
	render() {
		return (
			<Switch>
				<Route exact path="/" component={EmailContainer} />
				<Route exact path="/account" component={EmailAccountContainer} />
				<Route exact path="/schedule" component={ScheduleContainer} />
				<Route exact path="/field" component={FieldContainer} />
				<Route exact path="/event" component={CustomEventContainer} />
				<Route exact path="/push" component={PushContainer} />
			</Switch>
		)
	}
}

export default  CampaignRouter