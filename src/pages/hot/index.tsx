import { NavBarPage, NavBarPageProps, NavBarPageState } from '../lib/NavBarPage'
interface HotPageState extends NavBarPageState {
}

interface HotPageProps extends NavBarPageProps {
}

export class HotPage extends NavBarPage<HotPageProps, HotPageState>{

	protected title = '热点'

	public constructor(props: HotPageProps) {
		super(props)
	}

	public componentDidMount() {
	}

	protected pageRender() {
		return (
			<div
				style={{ position: 'fixed',height: '100%', width: '100%'}}
			>
				<div>新闻热点</div>
			</div>
		)
	}
}