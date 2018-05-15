import React from 'react'
import { render } from 'react-dom'

import Login from './Login'

import signcss from '../../sass/sign.scss'


const rootEl = document.querySelector('#root')

render(<Login />, rootEl)

