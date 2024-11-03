import { createContext, useReducer } from "react";
import { ShiftReducer } from "../reducers/ShiftReducer";
import axios from "axios";
import {
    GET_TABLE_SUCCESS,
    NO_TABLE_FOUND,
    // =================================================================
    FIND_USER_SUCCESS,
    GET_SHIFT_FAIL,
    GET_SHIFT_SUCCESS,
    GET_WORKSHIFT_SUCCESS,
    POST_SHIFT_FAIL,
    POST_SHIFT_SUCCESS,
    UPDATE_SHIFT,
    apiUrl,
} from "./constants";

export const ShiftContext = createContext();

const ShiftContextProvider = ({ children }) => {
    const [shiftState, dispatch] = useReducer(ShiftReducer, {
        registered_shifts: [],
        assigned_shifts: [],
        user: null,
        shiftLoading: true,
    });

    const getTimeTable = async () => {
        try {
            const response = await axios.get(`${apiUrl}/user/timetable`);
            if (response.data.success) {
                dispatch({
                    type: GET_TABLE_SUCCESS,
                    payload: response.data.time_table,
                });
            } else {
                dispatch({ type: NO_TABLE_FOUND });
            }
        } catch (error) {
            console.log(error);
            dispatch({ type: NO_TABLE_FOUND });
        }
    };

    const registerTable = async (shiftInfo) => {
        try {
            const response = await axios.post(`${apiUrl}/user/timetable`, shiftInfo);
            if (response.data.success) {
                getTimeTable();
                return response.data;
            } else {
                console.log(response.data.message);
                return response.data;
            }
        } catch (error) {
            console.log(error);
            return error.response.data;
        }
    };

    // =================================================================

    // Get User's Shift
    const getShift = async () => {
        try {
            const response = await axios.get(`${apiUrl}/user/shift`);
            if (response.data.success) {
                dispatch({
                    type: GET_SHIFT_SUCCESS,
                    payload: response.data.userShift[0],
                });
            } else {
                dispatch({ type: GET_SHIFT_FAIL });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getWorkShift = async (userId) => {
        try {
            const response = await axios.get(`${apiUrl}/user/shift/${userId}`);
            if (response.data.success) {
                dispatch({
                    type: GET_WORKSHIFT_SUCCESS,
                    payload: response.data.shift,
                });
            }
        } catch (error) {}
    };

    // Post Shift
    const postShifts = async (shiftsInfo) => {
        try {
            const response = await axios.post(`${apiUrl}/user/shift`, shiftsInfo);
            if (response.data.success) {
                console.log(response.data.success, response.data.message);
                dispatch({
                    type: POST_SHIFT_SUCCESS,
                    payload: response.data.shiftInfo,
                });
            }
        } catch (error) {
            dispatch({
                type: POST_SHIFT_FAIL,
            });
        }
    };

    // Update Shift
    const updateShift = async (updatedShift) => {
        try {
            const response = await axios.put(`${apiUrl}/user/shift`, updatedShift);
            console.log(response.data);
            if (response.data.success) {
                dispatch({
                    type: UPDATE_SHIFT,
                    payload: response.data.shift,
                });
                return response.data;
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: "Server error" };
        }
    };

    // Get User
    const getUser = async () => {
        try {
            const response = await axios.get(`${apiUrl}/user/shift`);
            if (response.data.success) {
                console.log(response.data);
                dispatch({
                    type: FIND_USER_SUCCESS,
                    payload: response.data.userShift[0],
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const shiftContextData = {
        getTimeTable,
        registerTable,
        // =================================================================
        shiftState,
        postShifts,
        getShift,
        updateShift,
        getUser,
        getWorkShift,
    };
    return <ShiftContext.Provider value={shiftContextData}>{children}</ShiftContext.Provider>;
};

export default ShiftContextProvider;
