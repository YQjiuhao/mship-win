import { Router, Route, Switch } from '../../../config/route'
import { HotPage, ShipsPage, ProfilePage } from './constant'

interface RoutesState {
}

interface RoutesProps {
}

export class Routes extends Component<RoutesProps, RoutesState>{
	render() {
		return (
			<Router>
				<Switch>
					<Route path='/profile' component={ProfilePage} />
					<Route path='/hot' component={HotPage} />
					<Route path='/ships' component={ShipsPage} />
				</Switch>
			</Router>
		)
	}
}
