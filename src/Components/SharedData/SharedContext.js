import React, { createContext, useEffect, useState } from 'react';

export const SharedData = createContext();

const SharedContext = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [forceLoading, setForceLoading]= useState(false);
    

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
        // console.log("From observer");
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
                    // console.log(data.user);
                    setUser(data.user);
                }
                else {
                    setUser(null);
                }
            }
            catch(error){
                setUser(null);
            }
            setLoading(false);
        }
        return () => subscriber();
    }, [forceLoading])

    const authInfo = { login, setUser, loading, setLoading, user, logout, setForceLoading, forceLoading }
    return (
        <div>
            <SharedData.Provider value={authInfo}>
                {children}
            </SharedData.Provider>
        </div>
    );
};

export default SharedContext;