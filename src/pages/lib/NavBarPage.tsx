// 这个组键为基类NavigationBar Page
import { NavBar, Icon } from './antd'
export interface NavBarPageState {
	stateTitle: string,		// 标题
	onLeftClick: () => void,	// back回调
	rightContent: any,		// 右边内容
	leftContent: any 		// 左边内容
	mode?: "dark" | "light",			// mode values : 'dark','light'
	icon: string,
}

export interface NavBarPageProps {
	title: string, 			// 标题
}

export class NavBarPage<P, S> extends Component<NavBarPageProps & P, NavBarPageState & S>{

	constructor(props: NavBarPageProps & P) {
		super(props)
	}

	// 界面渲染
	public renderPage() { }

	render() {
		let { stateTitle, onLeftClick, rightContent, icon, mode, leftContent } = this.state
		let { title } = this.props

		return (
			<div>
				<NavBar
					mode={mode}
					icon={icon}
					onLeftClick={onLeftClick}
					rightContent={rightContent}
				>{stateTitle || title}</NavBar>
				{this.renderPage()}
			</div>
		)
	}
}