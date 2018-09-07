import { Router, Route } from '../../../config/route'
import { TranslationTestPage } from '../../test/TranslationTest';

interface RoutesState{
}

interface RoutesProps{
}

export class Routes extends Component<RoutesProps, RoutesState>{
	render(){
		return (
			<Router>
				<Route path='/profile/test' component={TranslationTestPage} />
			</Router>
		)
	}
}
