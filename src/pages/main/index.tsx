import { TabBar } from '../lib/antd-mobile'
import { HotPage, ShipsPage, ProfilePage } from './config/constant'
import { Icon } from '../lib/FontIcon'
import { pageStack } from '../lib/PageStack'
import { Routes } from './config/routes'

interface MainPropsState {
	selectedTab: string,
	hidden: boolean,
	fullScreen: boolean,
	itemBadges: { [key: string]: number },
	itemClicks: { [key: string]: () => void },
	itemHots: { [key: string]: boolean }
}

enum ItemKey {
	hot = 'hot',
	ships = 'ships',
	profile = 'profile'
}


export default class Main extends Component<{}, MainPropsState>{

	constructor(props: any) {
		super(props)
		this.state = {
			selectedTab: ItemKey.hot,
			hidden: false,
			fullScreen: true,
			itemBadges: { hot: 0, ships: 1, profile: 0 },
			itemHots: { hot: false, ships: false, profile: true },
			itemClicks: { hot: this.hotClick, ships: this.shipsClick, profile: this.profileClick }
		}
	}

	public componentDidMount() {
		pageStack.onPageChange(() => this.forceUpdate())
	}

	hotClick() {
		console.log('hotClick');
	}

	shipsClick() {
		console.log('shipsClick');
	}

	profileClick() {
		console.log('profileClick');
	}

	renderTabBar() {
		// 这里放一些东西
		let titles = ['热点', '船舶', '个人']
		let keys = [ItemKey.hot, ItemKey.ships, ItemKey.profile]
		let components = [HotPage, ShipsPage, ProfilePage]
		let icons = ['icon-redian2', 'icon-lunchuan', 'icon-my']
		return (
			<div style={{ width: '100%', height: '100%' }}>
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
								badge={this.state.itemBadges[keys[index]]}
								dot={this.state.itemHots[keys[index]]}
								onPress={() => {
									this.setState({
										selectedTab: keys[index],
									});
									this.state.itemClicks[keys[index]]()
								}}
							>
								<Component />
							</TabBar.Item>
						)
					})}
				</TabBar>
			</div>
		)
	}

	render() {
		return (
			<div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
				<Routes />
				{this.renderTabBar()}
			</div>
		);
	}
}
