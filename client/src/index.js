import React, { Component } from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'

import App from './components/App'
const store = createStore(() => {}, {}, applyMiddleware(reduxThunk))

ReactDom.render(
	<Provider store={store}>
		<App></App>
	</Provider>,
	document.querySelector('#root')
)
