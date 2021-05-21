import { useEffect, useMemo } from 'react'
import { Switch, Route, useHistory, useLocation } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import Home from './pages/Home'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute'

function App() {
	const { pathname } = useLocation()
	const { currentUser } = useAuth()
	const history = useHistory()
	const authRoutes = useMemo(() => ['/login', '/signup', '/forgot-password'], [])
	useEffect(() => {
		if ( currentUser && authRoutes.includes(pathname) ) { history.push('/') }
	}, [currentUser, history, authRoutes, pathname])

	return (
		<div className="min-h-screen flex flex-col">
			{ !authRoutes.includes(pathname) && currentUser && <Navbar/> }
			<Switch>
				<PrivateRoute exact path="/" component={Home}/>
				<Route path={authRoutes} component={Login}/>
				<PrivateRoute component={NotFound}/>
			</Switch>
		</div>
	)
}

export default App
