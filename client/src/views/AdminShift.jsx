import React, { useContext, useEffect } from "react";
import { message, Button, Modal } from "antd";
import { ShiftAdminContext } from "../contexts/ShiftAdminContext";
import "../assets/css/shift/adminShift.css";
import Loader from "./Loader";
import AssignedTable from "../components/adminShift/AssignedTable";
import RegisterTable from "../components/adminShift/RegisterTable";
import FinalTable from "../components/adminShift/FinalTable";
import Swal from "sweetalert2";

const AdminShift = () => {
    const {
        shiftAdminState: { tables, assignedShifts, adminLoading, confirmAssign },
        getAllTables,
        generateAssignShifts,
        updateAssignedShifts,
        confirmAssignShifts,
        deleteAssignShifts,
    } = useContext(ShiftAdminContext);

    useEffect(() => {
        getAllTables();
        info();
    }, []);
    console.log("register tables:");
    console.log(tables);

    const handleGenerate = () => {
        generateAssignShifts();
    };
    console.log("assign tables:");
    console.log(assignedShifts);

    const updateTable = (schedule) => {
        updateAssignedShifts(schedule);
    };

    const handleConfirm = () => {
        Swal.fire({
            title: "Confirm",
            text: "Are you sure you want to save these shifts?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
        }).then((result) => {
            if (result.isConfirmed) {
                // Nếu người dùng xác nhận, gọi hàm confirmAssignShifts
                confirmAssignShifts({ assignedTable: assignedShifts });
                success();
            } else {
                cancelInfo();
            }
        });
    };

    const handleDelete = () => {
        Swal.fire({
            title: "Confirm",
            text: "Are you sure you want to delete these shifts?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteAssignShifts();
                Swal.fire({
                    icon: "success",
                    title: "Success!",
                    text: "Delete Shift Table Successfully",
                });
            } else {
                Swal.fire({
                    icon: "warning",
                    title: "Canceled",
                    text: "The delete progress was not made",
                });
            }
        });
    };

    // message
    const [messageApi, contextHolder] = message.useMessage();
    const info = () => {
        messageApi.info("Here is the Shift Table Section");
    };

    const success = () => {
        Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Save Shift Table Successfully",
        });
    };

    const cancelInfo = () => {
        Swal.fire({
            icon: "warning",
            title: "Canceled",
            text: "The save progress was not made",
        });
    };

    let body = null;
    if (adminLoading && tables.length === 0) {
        body = (
            <div className="home-content">
                <Loader />
            </div>
        );
    } else if (tables.length > 0 && tables[0].assigned_shifts.length > 1) {
        body = (
            <div className="home-content">
                <div className="shift__container">
                    <h1>Register Table</h1>
                    <RegisterTable timetables={tables} />
                </div>

                <div className="shift__container mt-32">
                    <h1>Final Table</h1>
                    <FinalTable timetables={tables} />
                </div>
                <div className="button__container-shift shift-admin">
                    <button onClick={handleDelete}>Delete</button>
                </div>
            </div>
        );
    } else {
        body = (
            <div className="home-content">
                <div className="shift__container">
                    <h1>Register Table</h1>
                    <RegisterTable timetables={tables} />
                </div>
                <div className="button__container-shift shift-admin">
                    <button onClick={handleGenerate}>Generate</button>
                </div>
                {!confirmAssign && assignedShifts.length !== 0 && (
                    <>
                        <div className="shift__container">
                            <h1>Assign Table</h1>
                            <AssignedTable
                                assignedTable={assignedShifts}
                                updateAssignedShifts={updateTable}
                            />
                        </div>
                        <div className="button__container-shift shift-admin">
                            <button onClick={handleConfirm}>Confirm</button>
                        </div>
                    </>
                )}
            </div>
        );
    }

    return (
        <>
            {contextHolder}
            {body}
        </>
    );
};

export default AdminShift;
