import { Router, Route } from '../../../config/route'

interface RoutesState{
}

interface RoutesProps{
}

export class Routes extends Component<RoutesProps, RoutesState>{
	render(){
		return (
			<Router>
				<Route />
			</Router>
		)
	}
}
