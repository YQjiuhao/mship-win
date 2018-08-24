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
	history
}

export class Router extends Component<RouterState, RouterProps>{
	render() {
		let { children, ...rest } = this.props
		return (
			<ReactRouter history={history}{...rest}>
				<Switch>
					{this.props.children}
				</Switch>
			</ReactRouter>
		)
	}
}