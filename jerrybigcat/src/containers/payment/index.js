import React from 'react'
import { render } from 'react-dom'

import Payment from './Payment'

import '../../sass/account/payment.scss'

const rootEl = document.querySelector('#root')

render(<div className="m1-body">
				<Payment />
			</div>, rootEl)