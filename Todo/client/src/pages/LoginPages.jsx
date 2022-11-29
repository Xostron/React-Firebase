import React, { useContext } from "react"
import { firebaseContext } from "../index"
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

export const LoginPage = () => {
    const { auth, firestore } = useContext(firebaseContext)

    // const isUser = auth.currentUser

    const loginHandler = async () => {
        const provider = new GoogleAuthProvider()
        const { user } = await signInWithPopup(auth, provider)
        const isUser = auth.currentUser
        console.log('test login ', user, isUser)
    }

    const logoutHandler = async () => {
        const logout = await signOut(auth)
        const isUser = auth.currentUser
        console.log('test logout = ', logout, isUser)
    }

    return (
        <div>

            <div onClick={loginHandler}>
                Login
            </div>

            <div onClick={logoutHandler}>
                Logout
            </div>

        </div>
    )
}