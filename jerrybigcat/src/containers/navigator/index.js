import React from 'react'
import { render } from 'react-dom'
import AppContainer from './App'
import '../../sass/navigator/index.scss'


const rootEl = document.querySelector('#navigator')

render(<AppContainer />, rootEl)
