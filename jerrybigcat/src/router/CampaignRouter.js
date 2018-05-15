import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Bundle from './Bundle'

import loadCampaignList from 'bundle-loader?lazy!../containers/campaign/list/CampaignList'
import loadCampaignTmpl from 'bundle-loader?lazy!../containers/campaign/add/CampaignTmpl'
import loadCampaignCreate from 'bundle-loader?lazy!../containers/campaign/create/CampaignCreate'
import loadSettingContainer from 'bundle-loader?lazy!../containers/campaign/setting/CampaignSettingContainer'
import loadCustomerContainer from 'bundle-loader?lazy!../containers/campaign/customer/CustomerContainer'
import loadStatisticsContainer from 'bundle-loader?lazy!../containers/campaign/stat/StatisticsContainer'
import loadInboxContainer from 'bundle-loader?lazy!../containers/campaign/inbox/InboxContainer'
import loadProcessContainer from 'bundle-loader?lazy!../containers/campaign/process/ProcessContainer'


const CampaignList = (props) => (
	<Bundle load={loadCampaignList} >
		{(CampaignList) => <CampaignList {...props} />}
	</Bundle>
)

const CampaignTmpl = (props) => (
	<Bundle load={loadCampaignTmpl} >
		{(CampaignTmpl) => <CampaignTmpl {...props} />}
	</Bundle>
)

const CampaignCreate = (props) => (
	<Bundle load={loadCampaignCreate} >
		{(CampaignCreate) => <CampaignCreate {...props} />}
	</Bundle>
)

const SettingContainer = (props) => (
	<Bundle load={loadSettingContainer} >
		{(SettingContainer) => <SettingContainer {...props} />}
	</Bundle>
)

const CustomerContainer = (props) => (
	<Bundle load={loadCustomerContainer} >
		{(CustomerContainer) => <CustomerContainer {...props} />}
	</Bundle>
)

const StatisticsContainer = (props) => (
	<Bundle load={loadStatisticsContainer} >
		{(BundleComponent) => <BundleComponent {...props} />}
	</Bundle>
)

const InboxContainer = (props) => (
	<Bundle load={loadInboxContainer} >
		{(BundleComponent) => <BundleComponent {...props} />}
	</Bundle>
)

const ProcessContainer = (props) => (
	<Bundle load={loadProcessContainer} >
		{(BundleComponent) => <BundleComponent {...props} />}
	</Bundle>
)


class CampaignRouter extends Component {
	render() {
		return (
			<Switch>
				<Route exact path="/" component={CampaignList} />
				<Route path="/add" component={CampaignTmpl} />
				<Route path="/create" component={CampaignCreate} />
				<Route path="/setting" component={SettingContainer} />
				<Route path="/customer" component={CustomerContainer} />
				<Route path="/stat" component={StatisticsContainer} />
				<Route path="/inbox" component={InboxContainer} />
				<Route path="/process" component={ProcessContainer} />
			</Switch>
		)
	}
}

export default  CampaignRouter