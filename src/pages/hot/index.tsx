import { NavBarPage, NavBarPageProps, NavBarPageState } from '../lib/NavBarPage'
interface HotState extends NavBarPageState {
}

interface HotProps extends NavBarPageProps {
}

export class Hot extends NavBarPage<HotProps, HotState>{

	constructor(props: HotProps) {
		super(props)
	}

	componentDidMount() {
		this.setState({
			stateTitle: '新闻热点',
			mode: 'light'
		})
	}

	renderPage() {
		return (
			<div
				style={{ position: 'fixed',height: '100%', width: '100%'}}
			>
				<div>新闻热点</div>
			</div>
		)
	}
}