import { hot } from 'react-hot-loader'
import Main from './pages/main'
import { Route, Router } from './config/route'


let App = () => (
	<Router>
		<Route path='/' component={Main} />
	</Router>
)

// api.user.shipmaster.getToken({})

api.user.common.getBaseInfo({ number:'153473612901' }).then(([value]) => {
	if (!value) {
		throw new Error('没有账号')
	}
	console.log(value);
	api.user.shipmaster.getToken({number:'153473612901',passwd:'123456',mainAccount:131}).then(info=>{
		console.log("info:",info);

		// 我要获取token
		// 设置过期时间
	})
}).catch(err => {
	console.log(err.message);
})

export default hot(module)(App)