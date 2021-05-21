import { useRef, useState, useEffect } from 'react'
import { useHistory, Link} from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function SignupForm() {
    const { signup } = useAuth()
    const [ error, setError ] = useState('')
    const [ loading, setLoading ] = useState(false)
    const history = useHistory()
    const errorBarRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()
 
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
        errorBarRef.current.classList.remove('animation-fadeout')
        if ( !emailRef.current.value.length ) {
            return setError('Please input an email address')
        }
        if ( !passwordRef.current.value.length ) {
            return setError('Please input a password')
        }
        if ( passwordRef.current.value !== confirmPasswordRef.current.value ) {
            return setError('Passwords do not match!')
        }
        try {
            setError('')
            setLoading(true)
            await signup( emailRef.current.value, passwordRef.current.value )
            return history.push('/')
        } catch (error) {
            setError(error.message)
        }
        setLoading(false)
    }

    return <>
        <div className="relative w-full text-center pb-8">
            <h2 className="text-gray-800 text-3xl font-NovaFlat mb-5">Sign Up</h2>

            <div className={`rounded w-full bg-red-200 text-center ${ !error.length ? 'invisible' : ''} absolute`} ref={errorBarRef}>
                <p className="text-white text-sm px-4 py-2">{error}</p>
            </div>
        </div>
        <form className="w-full flex flex-col gap-7 items-center justify-center mt-5" onSubmit={handleSubmit}>
            <input className={`bg-opacity-0 w-full p-2 bg-transparent border-b-2 `} name="email" type="email" ref={emailRef} placeholder="Email"/>
            <input className={`bg-opacity-0 w-full p-2 bg-transparent border-b-2 `} name="password" type="password" ref={passwordRef} placeholder="Password"/>
            <input className={`bg-opacity-0 w-full p-2 bg-transparent border-b-2 `} name="confirm-password" type="password" ref={confirmPasswordRef} placeholder="Confirm Password"/>

            <button type="submit" disabled={loading} className="bg-gray-500 text-gray-200 w-full rounded py-3">Sign Up</button>

            <p className="text-gray-500">
                Already have an account? 
                <Link to="/login" className="text-green-300 hover:underline cursor-pointer ml-1">Log In</Link>
            </p>
        </form>
    </>
}
