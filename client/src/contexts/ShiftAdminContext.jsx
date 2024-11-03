import { createContext, useReducer, useState } from "react";
import { ShiftAdminReducer } from "../reducers/ShiftAdminReducer";
import axios from "axios";
import {
    GET_ALL_SHIFT,
    GET_ALL_TABLES_SUCCESS,
    GENERATE_ASSIGN_SHIFT,
    CONFIRM_ASSIGN,
    WORK_FAILS,
    apiUrl,
} from "./constants";

export const ShiftAdminContext = createContext();

const ShiftAdminContextProvider = ({ children }) => {
    // State
    const [shiftAdminState, dispatch] = useReducer(ShiftAdminReducer, {
        tables: [],
        assignedShifts: [],
        AdminLoading: true,
        confirmAssign: false,
    });

    const [deleteShiftArray, setDeleteShiftArray] = useState([]);

    const getAllTables = async () => {
        try {
            const response = await axios.get(`${apiUrl}/admin/tables`);
            if (response.data.success) {
                dispatch({
                    type: GET_ALL_TABLES_SUCCESS,
                    payload: response.data.time_tables,
                });
            } else {
                dispatch({
                    type: WORK_FAILS,
                });
            }
        } catch (error) {
            dispatch({
                type: WORK_FAILS,
            });
        }
    };

    const generateAssignShifts = async () => {
        try {
            const response = await axios.get(`${apiUrl}/admin/generate_assign_shifts`);
            if (response.data.success) {
                dispatch({
                    type: GENERATE_ASSIGN_SHIFT,
                    payload: response.data.assignedTable,
                });
            } else {
                dispatch({
                    type: WORK_FAILS,
                });
            }
        } catch (error) {
            console.error(error);
            dispatch({
                type: WORK_FAILS,
            });
        }
    };

    const updateAssignedShifts = (payload) => {
        if (payload) {
            dispatch({
                type: GENERATE_ASSIGN_SHIFT,
                payload: payload,
            });
        }
    };

    const confirmAssignShifts = async (assignTable) => {
        try {
            const response = await axios.post(`${apiUrl}/admin/confirm_assign_shifts`, assignTable);
            if (response.data.success) {
                getAllTables();
                dispatch({
                    type: CONFIRM_ASSIGN,
                });
            } else {
                dispatch({
                    type: WORK_FAILS,
                });
            }
        } catch (error) {
            console.error(error);
            dispatch({
                type: WORK_FAILS,
            });
        }
    };

    const deleteAssignShifts = async () => {
        try {
            const response = await axios.delete(`${apiUrl}/admin/delete_assignments`);
            if (response.data.success) {
                getAllTables();
            } else {
                dispatch({
                    type: WORK_FAILS,
                });
            }
        } catch (error) {
            console.error(error);
            dispatch({
                type: WORK_FAILS,
            });
        }
    };

    // =================================================================
    // Admin get all shift users
    const getAllShifts = async (req, res) => {
        try {
            const response = await axios.get(`${apiUrl}/admin/shifts`);
            if (response.data.success) {
                dispatch({
                    type: GET_ALL_SHIFT,
                    payload: response.data.shiftAdmin,
                });
            } else console.log("Failed to get shift");
        } catch (error) {
            console.error(error);
        }
    };

    // Update shift after deleting shift
    const deleteShift = async (shiftId, shiftTime) => {
        try {
            const response = await axios.put(`${apiUrl}/admin/shift/${shiftId}`, {
                shiftTime: shiftTime,
            });
            // if (response.data.success) {
            //     dispatch({
            //         type: DELETE_SHIFT,
            //         payload: response.data.shift,
            //     });
            // }
            return response.data;
        } catch (error) {
            console.log("hello", error);
        }
    };

    const ShiftAdminContextData = {
        getAllTables,
        generateAssignShifts,
        updateAssignedShifts,
        confirmAssignShifts,
        deleteAssignShifts,
        // =================================================================

        shiftAdminState,
        getAllShifts,
        deleteShift,
        deleteShiftArray,
        setDeleteShiftArray,
    };
    return (
        <ShiftAdminContext.Provider value={ShiftAdminContextData}>
            {children}
        </ShiftAdminContext.Provider>
    );
};

export default ShiftAdminContextProvider;
