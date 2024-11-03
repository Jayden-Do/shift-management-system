import {
    DELETE_STAFF,
    FIND_STAFF,
    GET_STAFF_INFO,
    GET_STAFF_INFO_FAIL,
} from "../contexts/constants";

export const StaffReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_STAFF_INFO:
            return {
                ...state,
                staffs: payload,
                staffLoading: false,
            };
        case GET_STAFF_INFO_FAIL:
            return {
                ...state,
                staffs: [],
                staffLoading: false,
            };
        case FIND_STAFF:
            return {
                ...state,
                staff: payload,
            };
        case DELETE_STAFF:
            return {
                ...state,
                staffs: payload,
            };
        default:
            return state;
    }
};
