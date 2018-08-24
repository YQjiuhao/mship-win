import { hot } from 'react-hot-loader'
import Main from './pages/main'
import { Route, Router } from './config/route'

let App = () => (
	<Router>
		<Route path='/' component={Main}/>
	</Router>
)

export default hot(module)(App)