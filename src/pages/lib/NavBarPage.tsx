// 这个组键为基类NavigationBar Page
import { NavBar, Icon } from './antd-mobile'
import { history } from '../../config/route';
import { CSSProperties } from 'react'

export interface NavBarPageState {
}

export interface NavBarPageProps {
	onLeftClick?: () => void
	className?: string
}

const styles: { [key: string]: CSSProperties } = {
	wrapper: {
		height: '100%',
		position: 'relative',
		display: 'flex',
		flexDirection: 'column'
	},
	body: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column'
	},
	container: {
		height: '100%',
		width: '100%',
		overflow: 'scroll'
	}
}

export abstract class NavBarPage<P={}, S={}> extends Component<NavBarPageProps & P, NavBarPageState & S>{
	protected abstract title: string 	// 标题
	protected rightContent?: () => void	// React.ReactNode | void
	protected icon?: React.ReactNode = ''
	protected mode?: string = 'light'	// "dark" | "light"
	protected leftContent?: () => void	// React.ReactNode | void
	protected hasBack: boolean = false
	protected abstract pageRender(): React.ReactNode

	public render() {
		let { onLeftClick } = this.props
		return (
			<div style={{ ...styles.wrapper }} className={this.props.className}>
				<NavBar
					mode={this.mode as "dark" | "light"}
					icon={this.hasBack ? (this.icon ? this.icon : <Icon type="left" />) : ''}
					onLeftClick={onLeftClick || (this.hasBack ? () => history.goBack() : undefined)}
					rightContent={this.rightContent}
					leftContent={this.leftContent}
				>{this.title}</NavBar>

				<div style={{ ...styles.body }}>
					<div style={{ ...styles.container }}
					>
						{this.pageRender()}
					</div>
				</div>
			</div>
		)
	}

}
