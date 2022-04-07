import { useLocation,Navigate,Outlet } from "react-router-dom";

const RequireAuth = () =>{
    // const {auth} = useAuth();
    const userId = JSON.parse(localStorage.getItem("user"))?._id;
    const location = useLocation();

    return (
        userId
            ?<Outlet/>
            :<Navigate to="/" state={{from:location}} replace />
    )

}

export default RequireAuth;