import { NavBarPage, NavBarPageProps, NavBarPageState } from '../lib/NavBarPage'
import { Icon } from '../lib/FontIcon'

interface ShipsState extends NavBarPageState {
}

interface ShipsProps extends NavBarPageProps {
}

export class Ships extends NavBarPage<ShipsProps, ShipsState>{

	componentDidMount() {
		this.setState({
			mode:'light'
		})
	}

	renderPage() {
		return (
			<div style={{ position: 'fixed',height: '100%', width: '100%'}}>
				<Icon name={'icon-lunchuan'} size={30}></Icon>
			</div>
		)
	}
}