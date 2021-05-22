import { useRef, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Alert from './Alert'

export default function SignupForm() {
    const { signup } = useAuth()
    const [ loading, setLoading ] = useState(false)
    const history = useHistory()
    const errorAlert = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()

    // Handles signup actions & form validation
    async function handleSubmit(e) {
        e.preventDefault()
        const email = emailRef.current.value.trim()
        const password = passwordRef.current.value.trim()
        const confirmPassword = confirmPasswordRef.current.value.trim()
        if ( !email.length ) {
            return errorAlert.current.newAlert('Please input an email address')
        }
        if ( !password.length ) {
            return errorAlert.current.newAlert('Please input a password')
        }
        if ( password !== confirmPassword ) {
            return errorAlert.current.newAlert('Passwords do not match!')
        }
        try {
            errorAlert.current.newAlert('')
            setLoading(true)
            await signup( email, password )
            return history.push('/')
        } catch (error) {
            errorAlert.current.newAlert(error.message)
        }
        setLoading(false)
    }

    return <>
        <div className="relative w-full text-center pb-8">
            <h2 className="text-gray-800 text-3xl font-NovaFlat mb-5">Sign Up</h2>
            <Alert type="error" ref={errorAlert}/>
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
