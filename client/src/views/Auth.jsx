import React, { useContext } from "react";
import Login from "../components/auth/Login";
import Help from "../components/auth/Help";
import { AuthContext } from "../contexts/AuthContext";
import Spinner from "react-bootstrap/Spinner";
import { Navigate } from "react-router-dom";
import Loader from "./Loader";

const Auth = ({ authRoute }) => {
    const {
        authState: { user, authLoading, isAuthenticated },
    } = useContext(AuthContext);

    let body;
    if (authLoading) {
        body = (
            // <div className="d-flex justify-content-center mt-2">
            //     <Spinner animation="border" variant="info" />
            // </div>
            <div className="container">
                <Loader />
            </div>
        );
    } else if (isAuthenticated) {
        if (user.userType === "Manager") return <Navigate to="/admin/dashboard" />;
        return <Navigate to="/user/dashboard" />;
    } else {
        body = (
            <>
                {authRoute === "login" && <Login />}
                {authRoute === "help" && <Help />}
            </>
        );
    }
    return <>{body}</>;
};

export default Auth;
