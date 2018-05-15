import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Bundle from './Bundle'

import loadSummary from 'bundle-loader?lazy!../containers/account/account/Summary'
import loadSubAccount from 'bundle-loader?lazy!../containers/account/account/SubAccount'
import loadScheme from 'bundle-loader?lazy!../containers/account/account/Scheme'
import loadAuth from 'bundle-loader?lazy!../containers/account/account/Auth'
import loadSetting from 'bundle-loader?lazy!../containers/account/account/Setting'
import loadApi from 'bundle-loader?lazy!../containers/account/account/Api'
import loadTeam from 'bundle-loader?lazy!../containers/account/account/Team'
import loadBill from 'bundle-loader?lazy!../containers/account/finance/Bill'
import loadPrice from 'bundle-loader?lazy!../containers/account/finance/Price'
import loadInvoice from 'bundle-loader?lazy!../containers/account/finance/Invoice'
import loadRecharge from 'bundle-loader?lazy!../containers/account/finance/Recharge'
import loadUpgrade from 'bundle-loader?lazy!../containers/account/finance/Upgrade'

import loadImprove from 'bundle-loader?lazy!../containers/account/Improve'

const Summary = (props) => (
  <Bundle load={loadSummary}>
    {(Summary) => <Summary {...props}/>}
  </Bundle>
)

const SubAccount = (props) => (
	<Bundle load={loadSubAccount}>
    {(SubAccount) => <SubAccount {...props}/>}
  </Bundle>
)

const Scheme = (props) => (
  <Bundle load={loadScheme}>
    {(Scheme) => <Scheme {...props}/>}
  </Bundle>
)

const Auth = (props) => (
	<Bundle load={loadAuth}>
    {(Auth) => <Auth {...props}/>}
  </Bundle>
)
const Setting = (props) => (
	<Bundle load={loadSetting}>
    {(Setting) => <Setting {...props}/>}
  </Bundle>
)
const Api = (props) => (
  <Bundle load={loadApi}>
    {(Api) => <Api {...props}/>}
  </Bundle>
)
const Team = (props) => (
  <Bundle load={loadTeam}>
    {(Team) => <Team {...props}/>}
  </Bundle>
)

const Bill = (props) => (
  <Bundle load={loadBill}>
    {(Bill) => <Bill {...props}/>}
  </Bundle>
)

const Price = (props) => (
  <Bundle load={loadPrice}>
    {(Price) => <Price {...props}/>}
  </Bundle>
)
const Upgrade = (props) => (
  <Bundle load={loadUpgrade}>
    {(Upgrade) => <Upgrade {...props}/>}
  </Bundle>
)
const Recharge = (props) => (
  <Bundle load={loadRecharge}>
    {(Recharge) => <Recharge {...props}/>}
  </Bundle>
)
const Invoice = (props) => (
  <Bundle load={loadInvoice}>
    {(Invoice) => <Invoice {...props}/>}
  </Bundle>
)
const Improve = (props) => (
  <Bundle load={loadImprove}>
    {(Improve) => <Improve {...props}/>}
  </Bundle>
)


class AppRouter extends Component {

	render() {
		return (
				<div>
					<Route exact path="/" component={Summary} />
          <Route path="/summary" component={Summary} />
					<Route path="/aSummary" component={Summary} />
          <Route path="/auth" component={Auth} />
          <Route path="/aEnterprise" component={Auth} />
          <Route path="/setting" component={Setting} />
          <Route path="/aSetting" component={Setting} />
          <Route path="/scheme" component={Scheme} />
          <Route path="/sScheme" component={Scheme} />
          <Route path="/api" component={Api} />
          <Route path="/aApi" component={Api} />
          <Route path="/team" component={Team} />
					<Route path="/aSub" component={Team} />
          <Route path="/bill" component={Bill} />
          <Route path="/fBill" component={Bill} />
          <Route path="/price" component={Price} />
          <Route path="/fPrice" component={Price} />
          <Route path="/upgrade" component={Upgrade} />
          <Route path="/recharge" component={Recharge} />
          <Route path="/fRecharge" component={Recharge} />
          <Route path="/invoice" component={Invoice} />
          <Route path="/fInvoice" component={Invoice} />
				</div>
		)
	}
}

export default AppRouter