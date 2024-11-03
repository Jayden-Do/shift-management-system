import {
    DELETE_SHIFT,
    GET_ALL_SHIFT,
    WORK_FAILS,
    GET_ALL_TABLES_SUCCESS,
    GENERATE_ASSIGN_SHIFT,
    CONFIRM_ASSIGN,
} from "../contexts/constants";

export const ShiftAdminReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_ALL_TABLES_SUCCESS:
            return {
                ...state,
                tables: payload,
                AdminLoading: false,
            };
        case GENERATE_ASSIGN_SHIFT:
            return {
                ...state,
                assignedShifts: payload,
                AdminLoading: false,
            };
        case CONFIRM_ASSIGN:
            return {
                ...state,
                confirmAssign: true,
            };
        case WORK_FAILS:
            return {
                ...state,
                AdminLoading: false,
            };

        // =================================================================
        case GET_ALL_SHIFT:
            return {
                ...state,
                totalShiftUser: payload.length,
                shiftsTable: payload,
                AdminLoading: false,
            };
        case DELETE_SHIFT:
            return {
                ...state,
                totalShiftUser: payload.length,
                shiftsTable: [...state.shiftsTable, payload],
            };
        default:
            return state;
    }
};
