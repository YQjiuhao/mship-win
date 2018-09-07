import { Route, Switch } from '../../../config/route'
// import { TranslationTestPage } from '../../test/TranslationTest';

interface RoutesState {
}

interface RoutesProps {
}

export class Routes extends Component<RoutesProps, RoutesState>{
	render() {
		return (
			<Switch>
				{/* <Route path='/profile/test' component={TranslationTestPage} />
				<Route path='/profile/testA' component={TranslationTestPage}/> */}
			</Switch>
		)
	}
}
