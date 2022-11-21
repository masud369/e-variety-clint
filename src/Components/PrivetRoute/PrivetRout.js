import React, { useContext } from 'react';
import { UserContext } from '../../App';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivetRout = () => {
    const [loginUser, setLoginUser] = useContext(UserContext);
    console.log(loginUser.email);
    const location = useLocation();
    return (
        loginUser.email? <Outlet />: <Navigate to="/login" replace state={{from:location}} />
    );
};

export default PrivetRout;