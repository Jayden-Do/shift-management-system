import { createContext, useEffect, useReducer } from "react";
import axios from "axios";
import { AuthReducer } from "../reducers/AuthReducer";
import { LOCAL_STORAGE_TOKEN_NAME, apiUrl } from "./constants";
import setAuthToken from "../utils/setAuthToken";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(AuthReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null,
    });

    // Authenticate the user
    const loadUser = async () => {
        if (localStorage[LOCAL_STORAGE_TOKEN_NAME])
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);

        try {
            const response = await axios.get(`${apiUrl}/auth`);
            if (response.data.success) {
                dispatch({
                    type: "SET_AUTH",
                    payload: { isAuthenticated: true, user: response.data.user },
                });
            }
        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
            setAuthToken(null);
            dispatch({ type: "SET_AUTH", payload: { isAuthenticated: false, user: null } });
        }
    };

    useEffect(() => {
        loadUser();
    }, []);

    // register
    const registerUser = async (userForm) => {
        try {
            const response = await axios.post(`${apiUrl}/auth/register`, userForm);
            if (response.data.success)
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken);

            return response.data;
        } catch (error) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    };

    // Login
    const loginUser = async (userForm) => {
        try {
            const response = await axios.post(`${apiUrl}/auth/login`, userForm);
            if (response.data.success)
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken);
            loadUser();

            return response.data;
        } catch (error) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    };

    // Logout
    const logoutUser = async () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
        dispatch({ type: "SET_AUTH", payload: { isAuthenticated: false, user: null } });
    };

    // Change Password
    const changeUserPassword = async (passwordData) => {
        try {
            const response = await axios.put(`${apiUrl}/auth/change-password`, passwordData);
            if (response.data.success) return response.data;
        } catch (error) {
            return error.response.data;
        }
    };

    // Admin get user's account by username
    const adminGetAccount = async (username) => {
        try {
            const response = await axios.get(`${apiUrl}/admin/user-account/${username}`);
            if (response.data.success) return response.data;
        } catch (error) {
            console.log(error);
        }
    };

    // Admin change user's password
    const adminChangeUserPassword = async (userId, passwordData) => {
        try {
            const response = await axios.put(
                `${apiUrl}/admin/change-user-password/${userId}`,
                passwordData
            );
            if (response.data.success) return response.data;
        } catch (error) {
            return error.response.data;
        }
    };

    // Context data
    const authContextData = {
        registerUser,
        loginUser,
        logoutUser,
        changeUserPassword,
        authState,
        adminGetAccount,
        adminChangeUserPassword,
    };

    return <AuthContext.Provider value={authContextData}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
