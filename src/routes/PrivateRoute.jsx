import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router';

const PrivateRoute = ({children}) => {

    const {user, loading} = useAuth();

    if(loading){
        <span className="loading loading-spinner loading-xl"></span>
    }
    if(!user){
        <Navigate to="/login" state={{from : location}}></Navigate>
    }

    return children;
};

export default PrivateRoute;