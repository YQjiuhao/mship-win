import { TabBar } from '../lib/antd'
import './styles/tabbar.less'
import { Hot, Ships, Profile } from './constant'
import { Icon } from '../lib/FontIcon'

interface MainPropsState {
	selectedTab: string,
	hidden: boolean,
	fullScreen: boolean
}

export default class Main extends Component<{}, MainPropsState>{

	constructor(props: any) {
		super(props)
		this.state = {
			selectedTab: 'hot',
			hidden: false,
			fullScreen: true
		}
	}

	renderTabBar() {
		// 这里放一些东西
		let titles = ['热点', '船舶', '个人']
		let keys = ['hot', 'ships', 'profile']
		let components = [Hot, Ships, Profile]
		let icons = ['icon-redian2', 'icon-lunchuan', 'icon-my']

		return (
			<TabBar
				unselectedTintColor="#949494"
				tintColor="#33A3F4"
				barTintColor="white"
				hidden={this.state.hidden}
			>
				{components.map((Component, index) => {
					return (
						<TabBar.Item
							title={titles[index]}
							key={keys[index]}
							icon={<Icon name={icons[index]} size={24} color={'gray'} />}
							selectedIcon={<Icon name={icons[index]} size={24} color={'rgb(51, 163, 244)'} />}
							selected={this.state.selectedTab === keys[index]}
							badge={0}
							dot={false}
							onPress={() => {
								this.setState({
									selectedTab: keys[index],
								});
							}}
						>
							<Component title={titles[index]} />
						</TabBar.Item>
					)
				})}
			</TabBar>
		)
	}

	render() {
		return (
			<div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
				{this.renderTabBar()}
			</div>
		);
	}
}
