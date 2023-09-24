import { Navigate, Outlet } from "react-router-dom"
import { useEffect, useState } from "react"
import jwtDecode from "jwt-decode";


export const OwnerRoute = () => {
    useEffect(() => {
        setToken(localStorage.getItem('USER_TOKEN'));
        const userToken = jwtDecode(localStorage.getItem('USER_TOKEN'));
        setRole(userToken.Role);
    }, []);
    const [token, setToken] = useState();
    const [role, setRole] = useState();
    let auth = { 'token': token, 'role': role }
    if (auth.role === "Owner") {
        return (
            <>
                auth.token ? <Outlet /> : <Navigate to="/user-management" />
            </>
        )
    }
}