import React, { createContext, useEffect, useState } from 'react';

export const SharedData = createContext();

const SharedContext = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const login = (email, password) => {
        setLoading(true);
        return fetch(`${process.env.REACT_APP_SERVER}/login`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ email: email, password: password })
        })
    }

    const logout = () => {
        setLoading(true);
        localStorage.removeItem("specialToken");
        setUser(null);
        setLoading(false);
    }

    useEffect(() => {
        setLoading(true);
        const subscriber = async () => {
            setLoading(true);
            try{
                const response = await fetch(`${process.env.REACT_APP_SERVER}/authSubscriberCheck`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("specialToken")}`
                },
                body: JSON.stringify({})
            });
            const data = await response.json();
                if (data.user) {
                    setUser(data.user);
                }
                else {
                    setUser(null);
                }
            }
            catch(error){
                setUser(null);
            }
            
            // console.log(data, Date.now());
            setLoading(false);
        }
        return () => subscriber();
    }, [])

    const authInfo = { login, setUser, loading, setLoading, user, logout }
    return (
        <div>
            <SharedData.Provider value={authInfo}>
                {children}
            </SharedData.Provider>
        </div>
    );
};

export default SharedContext;