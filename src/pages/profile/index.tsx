import { NavBarPage, NavBarPageProps, NavBarPageState } from '../lib/NavBarPage'
import { history } from '../../config/route';
// import { Routes } from './config/routes';


interface ProfileState extends NavBarPageState {
	disabled: boolean
}

interface ProfileProps extends NavBarPageProps {
}

export class ProfilePage extends NavBarPage<ProfileProps, ProfileState>{
	protected title = '个人中心'
	componentDidMount() {
	}

	protected pageRender() {		
		return (
			<div>
				{/* <a onClick={()=>{
					history.push('/profile/testA')
				}}>
					点击Push
				</a> */}
			</div>
		)
	}
}

