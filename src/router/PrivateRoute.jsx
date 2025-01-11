import { useContext } from "react";

import { Navigate, useLocation } from "react-router-dom";

import Authcontext from "../context/Authcontext/Authcontext";
import Loading from "../layouts/Loading";



// eslint-disable-next-line react/prop-types
const PrivateRoute = ({children}) => {
    const { user, loading } = useContext(Authcontext);
    const location=useLocation()
   

    if(loading){
        return <Loading></Loading>
    }
    if (!user) {
        return (
          <Navigate to="/login" state={{ from: location }} replace />
        );
      }
    
      return children;
};

export default PrivateRoute;