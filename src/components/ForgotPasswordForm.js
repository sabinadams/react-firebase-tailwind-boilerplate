import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Alert from '../components/Alert'

export default function ForgotPasswordForm() {
    const { resetPassword } = useAuth()
    const [ loading, setLoading ] = useState(false)
    const errorAlert = useRef()
    const successAlert = useRef()
    const emailRef = useRef()

    // Handles Reset Password action
    async function handleSubmit(e) {
        e.preventDefault()
        if ( !emailRef.current.value.length ) {
            return errorAlert.current.newAlert('Please input an email address')
        }
        try {
            setLoading(true)
            await resetPassword( emailRef.current.value )
            successAlert.current.newAlert('Check your inbox for instructions')
        } catch (error) {
            if ( error.code === 'auth/user-not-found' ) {
                errorAlert.current.newAlert('Email does not exist')
            } else {
                errorAlert.current.newAlert('Hmm, something went wrong. We could not send an email.')
            }
        }
        setLoading(false)
    }

    return <>
        <div className="relative w-full text-center pb-8">
            <h2 className="text-gray-800 text-3xl font-NovaFlat mb-5">Password Reset</h2>
            <Alert type="success" ref={successAlert} />
            <Alert type="error" ref={errorAlert} />
        </div>
        <form className="w-full flex flex-col gap-7 items-center justify-center mt-5" onSubmit={handleSubmit}>
            <input className={`bg-opacity-0 w-full p-2 bg-transparent border-b-2 `} name="email" type="email" ref={emailRef} placeholder="Email"/>
            <button type="submit" disabled={loading} className="bg-gray-500 text-gray-200 w-full rounded py-3">Reset password</button>
            <Link to="/login" className="text-green-300 hover:underline cursor-pointer ml-1">Log In</Link>
        </form>
    </>
}
