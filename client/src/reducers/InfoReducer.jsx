import {
    ADD_INFO,
    FIND_INFO,
    INFO_LOADED_FAIL,
    INFO_LOADED_SUCCESS,
    UPDATE_INFO,
} from "../contexts/constants";

export const InfoReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case INFO_LOADED_SUCCESS:
            return {
                ...state,
                info: payload,
                infoLoading: false,
            };
        case INFO_LOADED_FAIL:
            return {
                ...state,
                info: [],
                infoLoading: false,
            };
        case ADD_INFO:
            return {
                ...state,
                info: [...state.info, payload],
            };
        case UPDATE_INFO:
            return {
                ...state,
                info: payload,
            };
        case FIND_INFO:
            return { ...state, infoFilled: payload };
        default:
            return state;
    }
};
