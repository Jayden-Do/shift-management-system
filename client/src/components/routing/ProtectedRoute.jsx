import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import NavbarMenu from "../layouts/NavbarMenu";
import NavbarAdmin from "../layouts/NavbarAdmin";
import Loader from "../../views/Loader";

const ProtectedRoute = ({ children }) => {
    const {
        authState: { user, isAuthenticated, authLoading },
    } = useContext(AuthContext);

    if (authLoading) {
        return (
            // <div className="spinner-container">
            //     <Spinner animation="border" variant="info" />
            // </div>
            <div className="container">
                <Loader />
            </div>
        );
    }
    if (isAuthenticated) {
        if (user.userType === "Manager")
            return (
                <>
                    <NavbarAdmin />
                    {children}
                </>
            );
        else
            return (
                <>
                    <NavbarMenu />
                    {children}
                </>
            );
    } else {
        return <Navigate to="/login" />;
    }
};

export default ProtectedRoute;
