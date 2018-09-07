import React, { Component } from 'react'
import {
	Route,
	Router as ReactRouter,
	Switch
} from 'react-router'
import { createBrowserHistory } from 'history'

let history = createBrowserHistory()

interface RouterState {
}

interface RouterProps {
}

export {
	Route,
	history,
	Switch
}

export class Router extends Component<RouterState, RouterProps>{
	render() {
		let { children, ...rest } = this.props
		return (
			<ReactRouter history={history}{...rest}>
				<Route render={({ location }) => (
					<Switch location={location}>
						{this.props.children}
					</Switch>
				)}>

				</Route>
			</ReactRouter>
		)
	}
}