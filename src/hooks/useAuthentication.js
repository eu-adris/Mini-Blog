import { db } from '../firebase/config'

import { async } from '@firebase/util';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth'

import { useState, useEffect } from 'react'

export const useAuthentication = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null);

    // CLEANUP
    // deal with memory leak

    const [cancelled, setCancelled] = useState(false);

    const auth = getAuth()

    function checkIfIsCancelled() {
        if (cancelled) {
            return;
        }
    }
    // REGISTER
    const createUser = async (data) => {
        checkIfIsCancelled()

        setLoading(true)
        setError(null)

        try {

            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile(user, {
                displayName: data.displayName,
            })

            setLoading(false)

            return user

        } catch (error) {

            console.log(error.message)
            console.log(typeof error.message)


            let systemErrorMessage

            if (error.message.includes("Password")) {
                systemErrorMessage = "A senha precisa ter pelo menos 6 caracteres"
            } else if (error.message.includes("email-alredy")) {
                systemErrorMessage = "E-mail já cadastrado"
            } else {
                systemErrorMessage = "Ocorreu um erro, por favor tente novamente mais tarde."
            }

            setLoading(false)
            setError(systemErrorMessage)
        }
    }

    // LOGOUT
    const logout = () => {
        checkIfIsCancelled()

        signOut(auth)
    }

    // LOGIN
    const login = async (data) => {
        checkIfIsCancelled()

        setLoading()
        setError()

        try {
            
            await signInWithEmailAndPassword(auth, data.email, data.password)
            setLoading(false)

        } catch (error) {
            
            let systemErrorMessage

            if (error.message.includes("user-not-found")) {
                systemErrorMessage = "usuário não encontrado"
            }else if(error.message.includes("wrong-password")){
                systemErrorMessage = "senha incorreta"
            }else {
                systemErrorMessage = 'Ocorreu um erro, por favor tente mais tarde'
            }

            setError(systemErrorMessage)
            setLoading(false)

        }
    }


    useEffect(() => {
        return () => setCancelled(true)
    }, [])


    return {
        auth,
        createUser,
        error,
        loading,
        logout,
        login,
    }



}