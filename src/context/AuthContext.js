"use client"

import { createContext, useContext, useState } from "react"

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    
    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </AuthContext.Provider >
    )
};