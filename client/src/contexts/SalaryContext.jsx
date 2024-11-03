import { createContext, useReducer, useState } from "react";
import axios from "axios";
import { SalaryReducer } from "../reducers/SalaryReducer";
import { GET_ALL_SALARIES, GET_USER_SALARIES, UPDATE_SALARY, apiUrl } from "./constants";

export const SalaryContext = createContext();

const SalaryContextProvider = ({ children }) => {
    const [salaryState, dispatch] = useReducer(SalaryReducer, {
        timekeeper: [],
        totalEarnings: 0,
        monthlyEarnings: 0,
        user: null,
        checkouts: [],
    });

    const [salaryTemp, setSalaryTemp] = useState([]);

    // for Manager
    const getAllSalaries = async () => {
        try {
            const response = await axios.get(`${apiUrl}/admin/users/salary`);
            if (response.data.success) {
                dispatch({
                    type: GET_ALL_SALARIES,
                    payload: response.data.checkouts,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const updateSalary = async (salaryData) => {
        try {
            const response = await axios.put(`${apiUrl}/admin/salary/update`, salaryData);
            if (response.data.success) {
                getAllSalaries();
                return { success: true, message: response.data.message };
            }
        } catch (error) {
            return { success: false, message: "Error updating" };
        }
    };

    // for Staff
    const getSalary = async () => {
        try {
            const response = await axios.get(`${apiUrl}/user/salary`);
            if (response.data.success) {
                dispatch({
                    type: GET_USER_SALARIES,
                    payload: response.data.salary,
                });
                return { success: true, message: response.data.message };
            }
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const SalaryContextData = {
        salaryState,
        salaryTemp,
        setSalaryTemp,
        getAllSalaries,
        getSalary,
        updateSalary,
    };
    return <SalaryContext.Provider value={SalaryContextData}>{children}</SalaryContext.Provider>;
};

export default SalaryContextProvider;
