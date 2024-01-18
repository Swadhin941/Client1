import React, { useContext, useEffect } from 'react';
import { SharedData } from '../SharedData/SharedContext';
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';

const DesignerRouter = ({children}) => {
    const {user, loading, logout}= useContext(SharedData);
    const location = useLocation();
    useEffect(()=>{
        if(!loading && user?.role!=='designer'){
            logout();
        }
    },[loading, user])
    if(loading){
        return <Spinner></Spinner>
    }
    if(user && user?.role==='designer'){
        return children;
    }
    return <Navigate to={'/login'} state={{from : location}} replace></Navigate>

};

export default DesignerRouter;