export const apiUrl =
    process.env.NODE_ENV !== "production"
        ? "http://localhost:5000/api"
        : "https://timekeeping-1kob.onrender.com/api";

export const LOCAL_STORAGE_TOKEN_NAME = "user";
export const INFO_LOADED_SUCCESS = "INFO_LOADED_SUCCESS";
export const INFO_LOADED_FAIL = "INFO_LOADED_FAIL";
export const ADD_INFO = "ADD_INFO";
export const UPDATE_INFO = "UPDATE_INFO";
export const FIND_INFO = "FIND_INFO";
export const CONFIRM_CHANGE_INFO = "CONFIRM_CHANGE_INFO";

// Administration
export const GET_ALL_TABLES_SUCCESS = "GET_ALL_TABLES_SUCCESS";
export const GENERATE_ASSIGN_SHIFT = "GENERATE_ASSIGN_SHIFT";
export const CONFIRM_ASSIGN = "CONFIRM_ASSIGN";
export const WORK_FAILS = "WORK_FAILS";

// =================================================================
export const GET_STAFF_INFO = "GET_STAFF_INFO";
export const GET_STAFF_INFO_FAIL = "GET_STAFF_INFO_FAIL";
export const GET_ALL_SHIFT = "GET_ALL_SHIFT";
export const DELETE_SHIFT = "DELETE_SHIFT";
export const GET_ALL_SALARIES = "GET_ALL_SALARIES";

// Shifts

export const GET_TABLE_SUCCESS = "GET_TABLE_SUCCESS";
export const NO_TABLE_FOUND = "NO_TABLE_FOUND";

// =================================================================
export const POST_SHIFT_SUCCESS = "POST_SHIFT_SUCCESS";
export const POST_SHIFT_FAIL = "POST_SHIFT_FAIL";
export const GET_SHIFT_SUCCESS = "GET_SHIFT_SUCCESS";
export const GET_SHIFT_FAIL = "GET_SHIFT_FAIL";
export const UPDATE_SHIFT = "UPDATE_SHIFT";
export const GET_WORKSHIFT_SUCCESS = "GET_WORKSHIFT_SUCCESS";

export const FIND_USER_SUCCESS = "FIND_USER_SUCCESS";

// STAFF
export const FIND_STAFF = "FIND_STAFF";
export const DELETE_STAFF = "DELETE_STAFF";

// SALARY
export const CREATE_SALARY = "CREATE_SALARY";
export const UPDATE_SALARY = "UPDATE_SALARY";
export const GET_USER_SALARIES = "GET_USER_SALARIES";
