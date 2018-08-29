import _React from 'react'
import { Component as _Component } from '../src/pages/lib/Component'


declare global {

	interface Window {
		Component: typeof _Component
		React: typeof _React
		__apiList: any
	}

	const React: typeof _React
	const Component: typeof _Component
}
