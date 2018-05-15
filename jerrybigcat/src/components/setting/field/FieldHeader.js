import React from 'react'
import PropTypes from 'prop-types'

import { Button, Icon, Tag, Colors } from '../../m1ui'
import { PropertyScopes } from '../../../base/enums'
import { SysContact } from '../../../base/system'
import InputSearch from '../../common/InputSearch'

const getPropertyName = (scope) => {
	return scope === PropertyScopes.CONTACT ? '联系人' : '公司'
}

const FieldHeader = ({scope, onAdd, onSearchChange, searchKey }) => {
	const scopeName = SysContact.filter.propertyScopes[scope]
	return (
		<div className="m1-row top-opaction">
			<Button color={Colors.PRIMARY} onClick={onAdd} ><Icon name="add-to" /> 添加{scopeName}字段</Button>
			<InputSearch placeholder={`搜索${scopeName}字段`} onChange={onSearchChange} value={searchKey} />
		</div>
	)
}

export default FieldHeader