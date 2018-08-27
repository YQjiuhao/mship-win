import { NavBarPage, NavBarPageProps, NavBarPageState } from '../lib/NavBarPage'

interface ProfileState extends NavBarPageState{
}

interface ProfileProps extends NavBarPageProps{
}

export class Profile extends NavBarPage<ProfileProps, ProfileState>{

	componentDidMount(){
		this.setState({
			stateTitle:'个人中心',
			mode:'light'
		})
	}
	renderPage(){
		return (
			<div style={{ position: 'fixed',height: '100%', width: '100%'}}>个人中心</div>
		)
	}
}