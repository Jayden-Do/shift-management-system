import React, { useContext, useEffect, useState } from "react";
import { ShiftContext } from "../contexts/ShiftContext";
import ShiftRegister from "../components/shift/ShiftRegister";
import "../assets/css/shift/shift.css";
import "../assets/css/button.css";
import ShiftShow from "../components/shift/ShiftShow";
import Loader from "./Loader";
import ShiftShowAssigned from "../components/shift/ShiftShowAssigned";
import FinalTable from "../components/adminShift/FinalTable";
import { ShiftAdminContext } from "../contexts/ShiftAdminContext";

const Shift = () => {
    const {
        shiftState: { registered_shifts, assigned_shifts, shiftLoading },
        getTimeTable,
    } = useContext(ShiftContext);

    const {
        shiftAdminState: { tables },
        getAllTables,
    } = useContext(ShiftAdminContext);

    const [showComponent, setShowComponent] = useState("A");

    const showComponentA = () => {
        setShowComponent("A");
    };

    const showComponentB = () => {
        setShowComponent("B");
    };

    const showComponentC = () => {
        setShowComponent("C");
    };

    useEffect(() => {
        getTimeTable();
        getAllTables();
    }, []);

    let body = null;
    if (shiftLoading) {
        body = (
            <div className="container">
                <Loader />
            </div>
        );
    }
    // else if (user !== null) {
    //     body = <ShiftUpdater updateData={registered_shifts} />;
    // }
    else if (registered_shifts.length === 0) {
        body = (
            <div className="home-content">
                <ShiftRegister />
            </div>
        );
    } else {
        body = (
            <div className="home-content">
                <div className="button__container-shift shift-user">
                    <button onClick={showComponentA}>Register</button>
                    <button onClick={showComponentB}>Assign</button>
                    {/* <button onClick={showComponentC}>Staffs</button> */}
                </div>
                <div>
                    {showComponent === "A" && <ShiftShow shifts={registered_shifts} />}
                    {showComponent === "B" && <ShiftShowAssigned shifts={assigned_shifts} />}
                    {showComponent === "C" && (
                        <div className="shift">
                            <div className="shift__title">
                                <h2>Staffs Table</h2>
                            </div>
                            <FinalTable timetables={tables} />
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return <>{body}</>;
};

export default Shift;
