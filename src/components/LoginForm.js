import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRef, useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function LoginForm() {    
    const { login, twitterSignIn, googleSignIn, facebookSignIn } = useAuth()
    const emailRef = useRef()
    const passwordRef = useRef()
    const errorBarRef = useRef()
    const history = useHistory()
    const [ error, setError ] = useState('')
    const [ loading, setLoading ] = useState(false)
    
    useEffect( () => {
        if ( error ) {
            setTimeout( () => {
                if ( errorBarRef.current ) {
                    errorBarRef.current.classList.add('animate-fadeout')
                    setTimeout(() => setError(''), 300)
                }
            }, 3000)
        }
    }, [error])

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError('')
            setLoading(true)
            await login( emailRef.current.value, passwordRef.current.value )
            return history.push('/')
        } catch (error) {
            setError(error.message)
        }
        setLoading(false)
    }

    async function handleProviderSignin(signinFunction) {
        try {
            setError('')
            setLoading(true)
            await signinFunction()
            return history.push('/')
        } catch (error) {
            setError(error.message)
        }
    }

    return <>
        <div className="relative w-full text-center pb-8">
            <h2 className="text-gray-800 text-3xl font-NovaFlat mb-5">Log In</h2>
            <p className="mb-5 text-gray-500">Log in to do whatever it is you do here</p>

            <div className={`rounded w-full bg-red-200 text-center ${ !error.length ? 'invisible' : ''} absolute`} ref={errorBarRef}>
                <p className="text-white text-sm px-4 py-2">{error}</p>
            </div>
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
