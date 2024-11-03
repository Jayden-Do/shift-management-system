import {
    CREATE_SALARY,
    GET_ALL_SALARIES,
    GET_USER_SALARIES,
    UPDATE_SALARY,
} from "../contexts/constants";

export const SalaryReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_ALL_SALARIES:
            return {
                ...state,
                checkouts: payload,
            };
        case GET_USER_SALARIES:
            return {
                ...state,
                user: payload.user,
                timekeeper: payload.timekeeper,
                totalEarnings: payload.totalEarnings,
                monthlyEarnings: payload.monthlyEarnings,
            };
        default:
            return state;
    }
};
