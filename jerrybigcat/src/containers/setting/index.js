import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../../sagas/setting'
import rootReducer from '../../reducers/setting'
import App from './App'

import '../../sass/setting/index.scss'

const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware]

let store 

if(window.__REDUX_DEVTOOLS_EXTENSION__) {
	const openReduxDevtool = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	store = createStore(
			rootReducer, 
			compose(applyMiddleware(...middlewares), openReduxDevtool)
	)
} else {
	store = createStore(
			rootReducer, 
			applyMiddleware(...middlewares)
	)
}


sagaMiddleware.run(rootSaga)

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
)