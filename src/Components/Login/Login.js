import React, { useContext, useState } from "react";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../firebaseconfig";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { UserContext } from "../../App";
import { useNavigate, Outlet, useLocation } from 'react-router-dom';

const provider = new GoogleAuthProvider();

const app = initializeApp(firebaseConfig);

const Login = () => {


    const [loginUser,setLoginUser] = useContext(UserContext);

    const location = useLocation()
    const navigate = useNavigate();

    //google signin
  const handelGoogleLogin = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => { 
         const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        const newUser = {...loginUser}
        newUser.email = user.email;
        newUser.name = user.displayName;
        setLoginUser(newUser);
        console.log(user)
        if(location?.state.from){
            navigate(location.state.from)
        }
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode,errorMessage,email,credential)
        // ...
      });
  };

  return (
    <div style={{ marginTop: "200px" }}>
      <button onClick={handelGoogleLogin}>login with google</button>
    </div>
  );
};

export default Login;
