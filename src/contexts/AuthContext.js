import React, { useContext, useState, useEffect } from 'react'
import { auth, googleProvider, twitterProvider, facebookProvider } from '../util/firebase'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [ currentUser, setCurrentUser ] = useState()
    const [ loading, setLoading ] = useState(true)

    function signup( email, password ) {
       return auth.createUserWithEmailAndPassword( email, password )
    }

    function login( email, password ) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function resetPassword( email ) {
        return auth.sendPasswordResetEmail( email )
    }
    function googleSignIn() {
        return auth.signInWithPopup(googleProvider)
    }

    function twitterSignIn() {
        return auth.signInWithPopup(twitterProvider)
    }

    function facebookSignIn() {
        return auth.signInWithPopup(facebookProvider)
    }

    function logout() {
        return auth.signOut()
    }

    useEffect( () => {
        const unsubscribe = auth.onAuthStateChanged( user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        signup,
        login,
        resetPassword,
        logout,
        googleSignIn,
        twitterSignIn,
        facebookSignIn
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}