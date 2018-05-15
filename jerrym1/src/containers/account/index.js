import React from 'react'
import { render } from 'react-dom'
import { HashRouter as Router, Route, Link, NavLink } from 'react-router-dom'

import AppRouter from '../../router'
import AppContainer from './App'

import accountcss from '../../sass/account.scss'

import { user } from '../../base/account'

user.init()

const rootEl = document.querySelector('#root')

render(
  <Router>
    <AppContainer />
  </Router>, rootEl)
