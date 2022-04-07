import { useLocation,Navigate,Outlet } from "react-router-dom";

const Authenticated = () =>{
    // const {auth} = useAuth();
    const userId = JSON.parse(localStorage.getItem("user"))?._id;
    const location = useLocation();

    return (
        userId
            ?<Navigate to="/home" state={{from:location}} replace />:<Outlet/>
    )

}

export default Authenticated;