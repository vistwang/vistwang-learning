import React from 'react'
import { render } from 'react-dom'
import App from './App'

let rootEl = document.querySelector('#root')

render(
    <App />,
    rootEl
)

document.title = 'React-M1-UI'