import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Landing from './Landing.js'
import NotFound from './NotFound.js';

class App extends Component {
	render() {
		return (
			<div>
				<BrowserRouter>
					<Route exact path="/" component={Landing}></Route>
					<Route component={NotFound}></Route>
				</BrowserRouter>
			</div>
		)
	}
}

export default App
