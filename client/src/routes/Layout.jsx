import { useContext } from "react";
import Navbar from "../components/Navbar";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export function Layout() {
    return (
        <div className="flex flex-col max-w-[100%] md:max-w-[90%] xl:max-w-[90%] h-screen mx-auto px-[20px] text-[#0d1321] oveflow-x-hidden">
            <div className="">
                <Navbar />
            </div>
            <div className="h-fit">
                <Outlet />
            </div>
        </div>
    );
}

export function RequireAuth() {
    const { currentUser } = useContext(AuthContext);
    
    return (
        !currentUser ? <Navigate to="/login" /> :
            <div className="flex flex-col max-w-[100%] md:max-w-[90%] xl:max-w-[90%] h-screen mx-auto px-[20px] text-[#0d1321] oveflow-x-hidden">
                <div className="">
                    <Navbar />
                </div>
                <div className="h-screen">
                    <Outlet />
                </div>
            </div>
    );
}

export function RequireAdmin() {
    const { currentUser } = useContext(AuthContext);
    
    return (
        !(currentUser.role === 'admin') ? <Navigate to="/" /> :
            <div className="flex flex-col max-w-[100%] md:max-w-[90%] xl:max-w-[90%] h-screen mx-auto px-[20px] text-[#0d1321] oveflow-x-hidden">
                <div className="">
                    <Navbar />
                </div>
                <div className="h-screen">
                    <Outlet />
                </div>
            </div>
    );
}