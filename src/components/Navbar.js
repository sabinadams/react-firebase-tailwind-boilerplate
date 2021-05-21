import { Link } from 'react-router-dom'
import { useHistory, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Navbar() {
    const { logout } = useAuth()
    const { pathname } = useLocation()
    const history = useHistory()
    const handleLogout = async () => {
      await logout()
      history.push('/login')
    }
    return (
        <div className="flex bg-gray-200 p-4 ">
            <Link className={`bg-${ pathname === '/' ? 'green' : 'gray'}-400 px-4 text-white py-1 rounded-lg mr-2`} to="/">Home</Link>
            <Link className={`bg-${ pathname === '/about' ? 'green' : 'gray'}-400 px-4 text-white py-1 rounded-lg mr-2`} to="/about">About</Link>
            <Link className={`bg-${ pathname === '/another' ? 'green' : 'gray'}-400 px-4 text-white py-1 rounded-lg mr-2`} to="/another">Another Page</Link>
            <div className="flex-grow"/>

            <button className="bg-green-300 text-white px-4  py-1 rounded-lg justify-self-end" onClick={handleLogout}>Log Out</button>
        </div>
    )
}
