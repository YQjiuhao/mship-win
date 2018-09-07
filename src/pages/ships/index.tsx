import { NavBarPage, NavBarPageProps, NavBarPageState } from '../lib/NavBarPage'

interface ShipsPageState extends NavBarPageState {
}

interface ShipsPageProps extends NavBarPageProps {
}

export class ShipsPage extends NavBarPage<ShipsPageProps, ShipsPageState>{
	protected title = '船舶'
	public componentDidMount() {
	}

	protected pageRender() {
		return (
			<div style={{ height: '100%', width: '100%' }}>
				船舶界面
			</div>
		)
	}
}