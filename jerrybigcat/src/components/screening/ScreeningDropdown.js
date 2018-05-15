import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Dropdown, DropdownMenu, MenuItem, Input, Icon } from '../m1ui'
import {QueryScopes} from '../../base/enums'
import { SysContact } from '../../base/system'
import InputSearch from '../common/InputSearch'
import MenuItemList from './MenuItemList'
import ContactGroupMenu from './ContactGroupMenu'
import CompanyMenu from './CompanyMenu'
import TagMenu from './TagMenu'

const queryScopes = SysContact.filter.queryScopes
const queryScopeContact = queryScopes[QueryScopes.CONTACT]
const queryScopeCompany = queryScopes[QueryScopes.COMPANY]
const queryScopeGroup = queryScopes[QueryScopes.GROUP_NORMAL]
const queryScopeEvent = queryScopes[QueryScopes.EVENT]
const queryScopeTag = queryScopes[QueryScopes.TAG]



class ScreeningDropdown extends Component {

	render() {
		const { queryTerms, title, ...props } = this.props 
		const queryTermsContacts = queryTerms[queryScopeContact.key] || []
		const queryTermsCompanys = queryTerms[queryScopeCompany.key] || []
		const queryTermsGroups = queryTerms[queryScopeGroup.key] || {total: 0, list: []}
		const queryTermsEvents = queryTerms[queryScopeEvent.key] || []
		const queryTermsTags = queryTerms[queryScopeTag.key] || []


		return (
			<Dropdown className="m1-dropdown-form dropdown-screening" isMulti title={title || ' '}>
				<div className="m1-dropdown-menu-expand">
					<div className="m1-dropdown-menu-content">
						<MenuItemList 
							label="联系人属性"  
							list={queryTermsContacts} 
							onSelect={(id) => props.onSelectCondition(id, QueryScopes.CONTACT)}
						/>
						<hr />
						<MenuItemList 
							label="行为事件" 
							list={queryTermsEvents} 
							onSelect={(id) => props.onSelectCondition(id, QueryScopes.EVENT)}
						/>
					</div>
					<div className="btn-expand">
						<Icon name="pack-down" />
					</div>
				</div>
				<ul>
					<MenuItem notClose subMenu title="群组">
						<ContactGroupMenu 
							queryTermsGroups={queryTermsGroups}
							onSelect={(id) => props.onSelectCondition(id, QueryScopes.GROUP_NORMAL)}
						/>
					</MenuItem>
					<MenuItem notClose subMenu title="标签">
						<TagMenu 
							queryTermsTags={queryTermsTags}
							onSelect={(id) => props.onSelectCondition(id, QueryScopes.TAG)}
						/>
					</MenuItem>
					<MenuItem notClose subMenu title="公司">
						<CompanyMenu 
							queryTermsCompanys={queryTermsCompanys}
							onSelect={(id) => props.onSelectCondition(id, QueryScopes.COMPANY)}
						/>
					</MenuItem>
				</ul>
			</Dropdown>
		)
	}
}

export default ScreeningDropdown