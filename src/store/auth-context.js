import React, { createContext, useState, useEffect } from 'react';
import { getUserByID } from '../api/UserApi';

const AuthContext = createContext({
    isLoggedIn: false,
    userId: '',
    userData: [],
    login: (userId) => { },
    logout: () => { }
});

export const AuthContextProvider = (props) => {

    const initialUserId = localStorage.getItem('userId');
    const [userId, setUserId] = useState(initialUserId);
    const [userData, setUserData] = useState([]);

    const userIsLoggedIn = !!userId;

    useEffect(() => {
        let mounted = true;
        if (userIsLoggedIn) {
            getUserByID(userId)
                .then(data => {
                    if (mounted) {
                        setUserData(data);
                    }
                })
        }
        return () => mounted = false;
    }, [userId, userIsLoggedIn])


    const logoutHandler = () => {
        setUserId(null);
        localStorage.removeItem('userId');
    }

    const loginHandler = (id) => {
        setUserId(id);
        localStorage.setItem('userId', id);
    }

    const ContextValue = {
        userId: userId,
        isLoggedIn: userIsLoggedIn,
        userData: userData,
        login: loginHandler,
        logout: logoutHandler
    }

    return (
        <AuthContext.Provider value={ContextValue}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;