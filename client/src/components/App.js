import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Landing from './Landing.js'
import NewURL from './NewURL.js'
import RetrieveURL from './RetrieveURL.js'

class App extends Component {
	render() {
		return (
			<div>
				<BrowserRouter>
					<Route exact path="/" component={Landing}></Route>
					<Route path="/new" component={NewURL}></Route>
					<Route exact path="/retrieve" component={RetrieveURL}></Route>
				</BrowserRouter>
			</div>
		)
	}
}

export default App
