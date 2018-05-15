import React from 'react'
import { render } from 'react-dom'

import PriceBody from '../account/finance/PriceBody'

import '../../sass/prices.scss'

const rootEl = document.querySelector('#root')

render(<div className="m1-body single-price">
				<PriceBody />
			</div>, rootEl)