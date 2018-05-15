import React from 'react'
import { render } from 'react-dom'

import Templates from './Templates'

import '../../sass/templates.scss'


const rootEl = document.querySelector('#root')

render(<Templates	 />, rootEl)

