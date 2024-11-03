import React, { useContext, useEffect } from "react";
import Loader from "./Loader";

import "../assets/css/dashboard/dashboard.css";
import { InfoContext } from "../contexts/InfoContext";
import { ShiftContext } from "../contexts/ShiftContext";
import { ShiftAdminContext } from "../contexts/ShiftAdminContext";
import DashboardAdmin from "../pages/DashboardAdmin";
import DashboardUser from "../pages/DashboardUser";
import { AuthContext } from "../contexts/AuthContext";
import { SalaryContext } from "../contexts/SalaryContext";

const Dashboard = () => {
    useEffect(() => {
        getInfo();
        getTimeTable();
        getAllTables();
        getAllSalaries();
    }, []);

    // State
    const {
        authState: { user },
    } = useContext(AuthContext);

    const {
        infoState: { info, infoLoading },
        getInfo,
    } = useContext(InfoContext);

    const {
        shiftState: { registered_shifts, assigned_shifts, shiftLoading },
        getTimeTable,
    } = useContext(ShiftContext);

    const {
        shiftAdminState: { tables },
        getAllTables,
    } = useContext(ShiftAdminContext);
    const totalShiftUser = tables.length;

    const {
        salaryState: { checkouts },
        getAllSalaries,
    } = useContext(SalaryContext);

    const userShift = assigned_shifts.map((shift) => shift.shiftName);
    const shiftData = { shiftQuantity: registered_shifts.length, userShift };
    let userData = {
        firstName: "",
        lastName: "unknown",
        gender: "unknown",
        birth: "unknown",
        email: "unknown",
        role: "unknown",
        address: "unknown",
    };
    if (info.length > 0) {
        userData = info[0];
    }

    let totalRegisterShifts = 0;
    if (tables.length > 0) {
        tables.forEach((item) => {
            totalRegisterShifts += item.registered_shifts.length;
        });
    }
    let totalAssignShifts = 0;
    if (tables.length > 0) {
        tables.forEach((item) => {
            totalAssignShifts += item.assigned_shifts.length;
        });
    }

    let body = null;
    if (infoLoading || shiftLoading) {
        body = (
            <>
                <div className="container">
                    <Loader />
                </div>
            </>
        );
    } else {
        if (userData.role === "Manager")
            body = (
                <DashboardAdmin
                    userData={userData}
                    shiftData={shiftData}
                    adminTotalUser={totalShiftUser}
                    adminTotalRegisterShift={totalRegisterShifts}
                    adminTotalAssignShift={totalAssignShifts}
                    shiftsTable={tables}
                    salaries={checkouts}
                />
            );
        else body = <DashboardUser userId={user._id} userData={userData} shiftData={shiftData} />;
    }

    return <>{body}</>;
};

export default Dashboard;
