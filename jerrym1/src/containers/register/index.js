import React from 'react'
import { render } from 'react-dom'

import Register from './Register'
import signcss from '../../sass/sign.scss'


const rootEl = document.querySelector('#root')

render(<Register />, rootEl)

