import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { createContext, useState, useEffect } from "react";
import { auth, db } from "FIrebase/Firebase";


export const AuthContext = createContext()
export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({})


    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            console.log(user)

        })
        return () => {
            unsub()
        }
    }, []);


    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    )

}