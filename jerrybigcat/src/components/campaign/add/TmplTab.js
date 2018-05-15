import React from 'react'
import PropTypes from 'prop-types'
import { Button, Colors } from '../../m1ui'
const TmplTab = (props) => {
	return (
		<div className="tmpl-tab">
			<Button className="btn-save" color={Colors.DEFAULT} >全部</Button>
			<Button className="btn-save" >Saas</Button>
			<Button className="btn-save" >B2B</Button>
			<Button className="btn-save" >Tag Name</Button>
			<Button className="btn-save" >Web</Button>
		</div>
	)
}

export default TmplTab