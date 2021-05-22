import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Alert  from './Alert'

export default function LoginForm() {    
    const { login, twitterSignIn, googleSignIn, facebookSignIn } = useAuth()
    const emailRef = useRef()
    const passwordRef = useRef()
    const errorRef = useRef()
    const history = useHistory()
    const [ loading, setLoading ] = useState(false)

    // Handles email/password login action
    async function handleSubmit(e) {
        e.preventDefault()
        const email = emailRef.current.value.trim()
        const password = passwordRef.current.value.trim()
        if ( !email.length || !password.length ) {
            return errorRef.current.newAlert('Please input your email and password')
        }

        try {
            setLoading(true)
            await login( email, password )
            return history.push('/')
        } catch (error) {
            if ( error.code === 'auth/user-not-found' ) {
                errorRef.current.newAlert('Login or password is incorrect. Please try again.')
            } else {
                errorRef.current.newAlert('Hmm, something went wrong. We could not log you in.')
            }
        }
        setLoading(false)
    }

    // Handles social provider login action
    async function handleProviderSignin(signinFunction) {
        try {
            setLoading(true)
            await signinFunction()
            return history.push('/')
        } catch (error) {
            errorRef.current.newAlert('Hmm, something went wrong. We could not log you in.')
        }
    }

    return <>
        <div className="relative w-full text-center pb-8">
            <h2 className="text-gray-800 text-3xl font-NovaFlat mb-5">Log In</h2>
            <p className="mb-5 text-gray-500">Log in to do whatever it is you do here</p>
            <Alert type="error" ref={errorRef}/>
        </div>
        <form className="w-full flex flex-col gap-7 items-center justify-center" onSubmit={handleSubmit}>
            <input className="bg-opacity-0 w-full p-2 bg-transparent border-b-2" type="email" ref={emailRef} placeholder="Email"/>
            <input className="bg-opacity-0 w-full p-2 bg-transparent border-b-2" type="password" ref={passwordRef} placeholder="Password"/>

            <button disabled={loading} type="submit" className="bg-gray-500 text-gray-200 w-full rounded py-3">Login</button>

            <Link to="/forgot-password" className="text-green-300 hover:underline cursor-pointer ml-1">Forgot your password?</Link>

            <p className="text-gray-500">
                Need an account? 
                <Link to="/signup" className="text-green-300 hover:underline cursor-pointer ml-1">Sign Up</Link>
            </p>
        </form>
        <hr className="w-full border-t-2"/>

        <div className="w-full flex flex-row gap-2">
            <button className="bg-gray-500 text-gray-200 w-full rounded py-3" onClick={() => handleProviderSignin(googleSignIn)}>
                <FontAwesomeIcon icon={["fab", "google"]} />
            </button>
            <button className="bg-gray-500 text-gray-200 w-full rounded py-3" onClick={() => handleProviderSignin(twitterSignIn)}>
                <FontAwesomeIcon icon={["fab", "twitter"]} />
            </button>
            <button className="bg-gray-500 text-gray-200 w-full rounded py-3" onClick={() => handleProviderSignin(facebookSignIn)}>
                <FontAwesomeIcon icon={["fab", "facebook"]} />
            </button>
        </div>
    </>
}
