import React from "react";
import {Navigate} from "react-router-dom";

const PrivateRoute = ({children,token }) => {

    let isAuthenticated=false
  
    console.log("privateRoute",token)
    
  
    if(token !==undefined)
      isAuthenticated=token
  
    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;