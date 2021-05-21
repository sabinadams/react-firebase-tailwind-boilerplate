import { useRef, useState, useEffect } from 'react'
import { Link} from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function ForgotPasswordForm() {
    const { resetPassword } = useAuth()
    const [ error, setError ] = useState('')
    const [ message, setMessage ] = useState('')
    const [ loading, setLoading ] = useState(false)
    const errorBarRef = useRef()
    const emailRef = useRef()
 
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
        try {
            setMessage('')
            setError('')
            setLoading(true)
            await resetPassword( emailRef.current.value )
            setMessage('Check your inbox for instructions')
        } catch (error) {
            setError(error.message)
        }
        setLoading(false)
    }

    return <>
        <div className="relative w-full text-center pb-8">
            <h2 className="text-gray-800 text-3xl font-NovaFlat mb-5">Password Reset</h2>
            
            <div className={`rounded w-full bg-green-200 text-center ${ !message.length ? 'invisible' : ''} absolute`}>
                <p className="text-white text-sm px-4 py-2">{message}</p>
            </div>

            <div className={`rounded w-full bg-red-200 text-center ${ !error.length ? 'invisible' : ''} absolute`} ref={errorBarRef}>
                <p className="text-white text-sm px-4 py-2">{error}</p>
            </div>
        </div>
        <form className="w-full flex flex-col gap-7 items-center justify-center mt-5" onSubmit={handleSubmit}>
            <input className={`bg-opacity-0 w-full p-2 bg-transparent border-b-2 `} name="email" type="email" ref={emailRef} placeholder="Email"/>
            <button type="submit" disabled={loading} className="bg-gray-500 text-gray-200 w-full rounded py-3">Reset password</button>
            <Link to="/login" className="text-green-300 hover:underline cursor-pointer ml-1">Log In</Link>
        </form>
    </>
}
