import React from 'react'
import { TabBar } from '../lib/antd'
import './styles/tabbar.less'
import { Hot, Ships, Profile } from './constant'

interface MainPropsState {
	selectedTab: string,
	hidden: boolean,
	fullScreen: boolean
}

export default class Main extends Component<{}, MainPropsState> {

	constructor(props: any) {
		super(props)
		this.state = {
			selectedTab: 'hot',
			hidden: false,
			fullScreen: true
		}
	}

	renderIcon(icon: string) {
		return (
			<div
				style={{
					height: 22,
					width: 22,
					background: `url(https://gw.alipayobjects.com/zos/rmsportal/${icon}.svg) center center /  21px 21px no-repeat`
				}}
			/>
		)
	}

	renderTabBar() {
		// 这里放一些东西
		let titles = ['热点', '船舶', '个人']
		let keys = ['hot', 'ships', 'profile']
		let components = [Hot, Ships, Profile]
		let icons = ['sifuoDUQdAFKAVcFGROC', 'BTSsmHkPsQSPTktcXyTV', 'asJMfBrNqpMMlVpeInPQ']
		let selectedIcons = ['iSrlOTqrKddqbOmlvUfq', 'ekLecvKBnRazVLXbWOnE', 'gjpzzcrPMkhfEqgbYvmN']

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
							icon={this.renderIcon(icons[index])}
							selectedIcon={this.renderIcon(selectedIcons[index])}
							selected={this.state.selectedTab === keys[index]}
							badge={0}
							dot={false}
							onPress={() => {
								this.setState({
									selectedTab: keys[index],
								});
							}}
						>
							<Component />
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
