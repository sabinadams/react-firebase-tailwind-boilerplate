import Home from './pages/Home'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute'
import { useAuth } from './contexts/AuthContext'
import {
	Switch,
	Route,
	useHistory,
	useLocation
} from 'react-router-dom'
import { useEffect } from 'react'

function App() {
	const { pathname } = useLocation()
	const { currentUser } = useAuth()
	const history = useHistory()
	const noHeaderRoutes = ['/login', '/signup', '/forgot-password']

	useEffect(() => {
		if ( currentUser ) {
			history.push('/')
		}
	}, [currentUser, history])

	return (
		<div className="min-h-screen flex flex-col">
			{ !noHeaderRoutes.includes(pathname) && <Navbar/> }
			<Switch>
				<PrivateRoute exact path="/" component={Home}/>
				<Route path={["/login", "/signup", "/forgot-password"]} component={Login}/>
			</Switch>
		</div>
	)
}

export default App
