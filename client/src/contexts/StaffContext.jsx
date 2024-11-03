import React, { createContext, useReducer, useState } from "react";
import { StaffReducer } from "../reducers/StaffReducer";
import axios from "axios";
import { DELETE_STAFF, FIND_STAFF, GET_STAFF_INFO, GET_STAFF_INFO_FAIL, apiUrl } from "./constants";

export const StaffContext = createContext();

const StaffContextProvider = ({ children }) => {
    const [staffState, dispatch] = useReducer(StaffReducer, {
        staffs: [],
        staffLoading: true,
        staff: null,
    });

    // State Staff Modal
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    // Show Staff's information
    const showStaffInfo = async () => {
        try {
            const response = await axios.get(`${apiUrl}/admin/users`);
            if (response.data.success) {
                dispatch({ type: GET_STAFF_INFO, payload: response.data.users });
            }
        } catch (error) {
            dispatch({
                type: GET_STAFF_INFO_FAIL,
            });
        }
    };

    //Find staff
    const findStaff = (userId) => {
        const staff = staffState.staffs.find((staff) => staff._id === userId);
        dispatch({
            type: FIND_STAFF,
            payload: staff,
        });
    };

    //Find staff
    const deleteStaff = (userId) => {
        const newStaffs = staffState.staffs.filter((staff) => staff._id !== userId);
        dispatch({
            type: DELETE_STAFF,
            payload: newStaffs,
        });
    };

    // Context Data
    const staffContextData = {
        staffState,
        showStaffInfo,
        findStaff,
        deleteStaff,
        open,
        setOpen,
        confirmLoading,
        setConfirmLoading,
    };
    return <StaffContext.Provider value={staffContextData}>{children}</StaffContext.Provider>;
};

export default StaffContextProvider;
