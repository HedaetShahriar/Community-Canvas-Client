import { use } from "react";
import AuthContext from "../contexts/AuthContext";
import { useLocation } from "react-router";

const PrivateRoutes = ({children}) => {
   const {user,loading} = use(AuthContext);
    const location = useLocation();
    // console.log(location.state);

    if(loading){
        // return <Spinner/>;
        return <div>Loading...</div>; 
    }
    
    if(user){
        return children;
    }
    return <Navigate state={location.pathname} to="/auth/login"/>;

};

export default PrivateRoutes;