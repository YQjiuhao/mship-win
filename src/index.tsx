import React from 'react'
import { Component } from './pages/lib/Component'
import { hydrate } from 'react-dom'
import 'antd-mobile/dist/antd-mobile.css'

window.React = React
window.Component = Component

import App from './App'

hydrate(<App />, document.querySelector('#app'))