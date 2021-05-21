import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import SignupForm from '../components/SignupForm'
import LoginForm from '../components/LoginForm'
import ForgotPasswordForm from '../components/ForgotPasswordForm'
function LoginPage() {
    const { pathname } = useLocation()
    const [ view, setView ] = useState('login')
    const [ locationDetermined, setLocationDetermined ] = useState(false)
    const views = {
        'signup': <SignupForm/>,
        'login': <LoginForm/>,
        'forgot-password': <ForgotPasswordForm/>
    }
    // Update the view to the correct form based on the URL
    useEffect(() => {
        if ( pathname === '/signup' ) {
            setView('signup')
        } else if ( pathname === '/login' ) {
            setView('login')
        } else if ( pathname === '/forgot-password' ) {
            setView('forgot-password')  
        } else {
            setView('login')
        }
        // To prevent flashes of the wrong view, only render the view after the correct one has been determined
        setLocationDetermined(true)
    }, [pathname, locationDetermined])

    return locationDetermined && (
        <div className="flex flex-end w-screen min-h-screen">
            <div className={`bg-gray-200 w-0 ${ view === 'login' ? 'lg:block lg:w-1/3' : '' } transition-width ease-in-out duration-300`}></div>
            <div className={`flex flex-col flex-grow justify-center items-center bg-gray-100 transition-width ease-in-out duration-300 ${ view === 'login' ? 'lg:w-2/3' : '' }`}>
                <div className="w-80 flex flex-col gap-7 justify-center items-center">
                    {views[view]}
                </div>
            </div>
        </div>
    )
}

export default LoginPage