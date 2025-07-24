import React, { createContext, useContext, useState } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const updateUser = (userData) => {
        setUser(userData);  
    }


    const [token, setToken] = useState(localStorage.getItem('token') || null);
    
    const login = (userData, authToken) => {
        setUser(userData);
        setToken(authToken);
        localStorage.setItem('token', authToken);
    };
    
    const clearUser = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
    };
    
    return (
        <UserContext.Provider value={{ user, token, updateUser, clearUser }}>
        {children}
        </UserContext.Provider>
    );
}

export default UserProvider;