import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";


export const PrivateRoute = ({ children, component }) => {
    const { currentUser } = useAuth();
    if( !currentUser ){
        return <Navigate to = "/login" />
    }
    
    console.log(currentUser)
    return ( component || children );
}