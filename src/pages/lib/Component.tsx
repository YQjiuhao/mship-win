import React from 'react'

interface ComponentState {
}

interface ComponentProps {
}

export class Component<P, S> extends React.Component<ComponentProps & P, ComponentState & S>{
	constructor(props: ComponentProps & P) {
		super(props)
		this.state = {} as any
	}
	render() {
		return (
			this.props.children
		)
	}
}