import React, { useContext, useEffect } from 'react';
import { SharedData } from '../SharedData/SharedContext';
import Spinner from '../Spinner/Spinner';
import { Navigate, useLocation } from 'react-router-dom';

const AdminRouter = ({children}) => {
    const {user, loading, logout}= useContext(SharedData);
    const location = useLocation();
    useEffect(()=>{
        if(!loading && user?.role!=='admin'){
            logout()
        }
    },[loading, user])

    if(loading){
        return <Spinner></Spinner>;
    }
    if(user && user?.role==='admin'){
        return children;
    }   
    return <Navigate to={'/login'} state={{from: location}} replace></Navigate>
};

export default AdminRouter;