import React, { useContext, useEffect } from "react";
import { ShiftAdminContext } from "../contexts/ShiftAdminContext";
import { message } from "antd";
import Loader from "./Loader";
import CheckoutTable from "../components/adminShift/CheckoutTable";
import { SalaryContext } from "../contexts/SalaryContext";
import Swal from "sweetalert2";

const AdminSalary = () => {
    const {
        shiftAdminState: { tables, adminLoading },
        getAllTables,
    } = useContext(ShiftAdminContext);

    const { salaryTemp, updateSalary, getAllSalaries } = useContext(SalaryContext);
    useEffect(() => {
        getAllTables();
        getAllSalaries();
        info();
    }, []);

    console.log("Test: ");
    console.log(salaryTemp);

    const handleCheckout = () => {
        Swal.fire({
            title: "Checkout",
            text: "Are you sure you want to checkout these shifts?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
        }).then((result) => {
            if (result.isConfirmed) {
                updateSalary({ checkouts: salaryTemp });
                Swal.fire({
                    icon: "success",
                    title: "Success!",
                    text: "Checkout Successfully",
                });
            } else {
                Swal.fire({
                    icon: "warning",
                    title: "Canceled",
                    text: "The checkout progress was not made",
                });
            }
        });
    };

    // message
    const [messageApi, contextHolder] = message.useMessage();
    const info = () => {
        messageApi.info("Here is the Checkout Table Section");
    };

    let body = null;
    if (adminLoading && tables.length === 0) {
        body = <Loader />;
    } else {
        body = (
            <>
                <div className="shift__container mt-32">
                    <h1>Checkout Table</h1>
                    <CheckoutTable timetables={tables} />
                </div>
                <div className="button__container-shift shift-admin">
                    <button onClick={handleCheckout}>Checkout</button>
                </div>
            </>
        );
    }
    return (
        <div className="home-content">
            {contextHolder}
            {body}
        </div>
    );
};

export default AdminSalary;
