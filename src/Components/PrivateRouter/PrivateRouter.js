import React, { useContext } from 'react';
import { SharedData } from '../SharedData/SharedContext';
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';

const PrivateRouter = ({children}) => {
    const {user, loading} = useContext(SharedData);
    const location = useLocation();

    if(loading){
        return <Spinner></Spinner>
    };
    console.log(loading, Date.now(), user);
    if(user !== false && user?.email){
        return children;
    }

    return <Navigate to={'/login'} state={{from: location}} replace></Navigate>
};

export default PrivateRouter;