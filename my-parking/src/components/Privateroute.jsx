import { useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setloading] = useState(true)
    const [role, setrole] = useState("")
    useEffect(() => {
        const token = localStorage.getItem("token");
        setrole(localStorage.getItem("role"))
        if (token) {
        setIsAuthenticated(true);
        }
        setloading(false)
    }, []);
    
    return {isAuthenticated,loading};
}

export const PrivateRoute = () => {
    const isAuthenticated = useAuth();
    if (isAuthenticated.loading) {
        return <div>Loading...</div>;
    }
    else if (!isAuthenticated.isAuthenticated) {
        return <Navigate to="/login" />;
    }
    
    return <Outlet/>;
}