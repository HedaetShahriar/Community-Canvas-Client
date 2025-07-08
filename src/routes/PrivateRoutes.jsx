import { use } from "react";
import AuthContext from "../contexts/AuthContext";
import { Navigate, useLocation } from "react-router";
import Spinner from "../components/Spinner";

const PrivateRoutes = ({children}) => {
   const {user,loading} = use(AuthContext);
    const location = useLocation();
    // console.log(location.state);

    if(loading){
        return <Spinner/>;
    }
    
    if(user){
        return children;
    }
    return <Navigate state={location.pathname} to="/auth/login" />;
    // replace={true} />;

};

export default PrivateRoutes;