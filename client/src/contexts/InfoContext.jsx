import { createContext, useReducer } from "react";
import axios from "axios";
import { InfoReducer } from "../reducers/InfoReducer";
import {
    ADD_INFO,
    FIND_INFO,
    INFO_LOADED_FAIL,
    INFO_LOADED_SUCCESS,
    UPDATE_INFO,
    apiUrl,
} from "./constants";

export const InfoContext = createContext();

const InfoContextProvider = ({ children }) => {
    const [infoState, dispatch] = useReducer(InfoReducer, {
        infoFilled: null,
        info: [],
        infoLoading: true,
    });

    // Get Info
    const getInfo = async () => {
        try {
            const response = await axios.get(`${apiUrl}/user/info`);
            if (response.data.success) {
                dispatch({
                    type: INFO_LOADED_SUCCESS,
                    payload: response.data.info,
                });
            }
        } catch (error) {
            dispatch({ type: INFO_LOADED_FAIL });
        }
    };

    // Add Info
    const addInfo = async (newInfo) => {
        try {
            const response = await axios.post(`${apiUrl}/user/info`, newInfo);
            if (response.data.success) {
                dispatch({ type: ADD_INFO, payload: response.data.info });
                return response.data;
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: "Server error" };
        }
    };

    // Find info
    const findInfo = (infoId) => {
        const info = infoState.info.find((info) => info._id === infoId);
        dispatch({ type: FIND_INFO, payload: info });
    };

    // Update info
    const updateInfo = async (updatedInfo) => {
        try {
            const response = await axios.put(`${apiUrl}/user/info/${updatedInfo._id}`, updatedInfo);
            console.log(response.data);
            if (response.data.success) {
                dispatch({ type: UPDATE_INFO, payload: response.data.info });
                return response.data;
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: "Server error" };
        }
    };

    // Info context data
    const infoContextData = { infoState, getInfo, addInfo, findInfo, updateInfo, dispatch };

    return <InfoContext.Provider value={infoContextData}>{children}</InfoContext.Provider>;
};

export default InfoContextProvider;
