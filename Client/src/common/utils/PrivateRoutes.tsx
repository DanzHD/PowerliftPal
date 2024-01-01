import { Outlet, Navigate } from "react-router-dom";
import {useAuthContext} from "../../Contexts/AuthContext.tsx";

const PrivateRoutes = () => {
    const {user} = useAuthContext();
    return user ? <Outlet/> : <Navigate to='/login' />
}

export default PrivateRoutes