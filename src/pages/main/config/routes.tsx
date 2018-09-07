import { Router, Route, Switch } from '../../../config/route'
import { HotPage, ShipsPage, ProfilePage } from './constant'
import {Routes as ProfileRoutes} from '../../profile/config/routes'
import {Routes as HotRoutes} from '../../hot/config/routes'
import {Routes as ShipsRoutes} from '../../ships/config/routes'

interface RoutesState {
}

interface RoutesProps {
}

export class Routes extends Component<RoutesProps, RoutesState>{
	render() {
		return (
			<Router>
				<Switch>
					<Route exact={true} path='/profile' component={ProfilePage} />
					<Route exact={true} path='/hot' component={HotPage} />
					<Route exact={true} path='/ships' component={ShipsPage} />
					<ProfileRoutes />
					<HotRoutes />
					<ShipsRoutes />
				</Switch>
			</Router>
		)
	}
}
