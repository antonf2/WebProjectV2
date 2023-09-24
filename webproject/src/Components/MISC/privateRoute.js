import { Navigate, Outlet } from "react-router-dom"
import { useEffect, useState } from "react"


export const PrivateRoute = (path) => {
    useEffect(() => {
        setToken(localStorage.getItem('USER_TOKEN'));
    }, []);
    const [token, setToken] = useState();
    let auth = { 'token': token }
    return auth.token ? <Outlet /> : <Navigate to={path} />
}