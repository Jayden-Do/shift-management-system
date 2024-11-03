import React, { useContext, useEffect } from "react";
import { StaffContext } from "../contexts/StaffContext";
import StaffItem from "../components/user/StaffItem";
import "../assets/css/staff/staff.css";
import "../assets/css/userInfo.css";
import Loader from "./Loader";
import { message } from "antd";
import UpdateStaffModal from "../components/user/UpdateStaffModal";

const Staffs = () => {
    // Context
    const {
        staffState: { staffs, staffLoading, staff },
        showStaffInfo,
    } = useContext(StaffContext);

    useEffect(() => {
        info();
        showStaffInfo();
    }, []);

    let body = null;
    if (staffLoading) {
        body = (
            <div className="container">
                <Loader />
            </div>
        );
    }

    // message
    const [messageApi, contextHolder] = message.useMessage();
    const info = () => {
        messageApi.info("All staff's Information here! ^^");
    };
    const success = () => {
        messageApi.open({
            type: "success",
            content: "Register successfully",
        });
    };
    const error = () => {
        messageApi.open({
            type: "error",
            content: "You need to register at least 5 shifts",
        });
    };
    const warning = () => {
        messageApi.open({
            type: "warning",
            content: "This is a warning message",
        });
    };

    return (
        <>
            {contextHolder}
            {staff !== null && <UpdateStaffModal />}
            {body}
            <div className="home-content">
                <ul className="staff__container">
                    {staffs.map((staff, index) => {
                        return (
                            <li key={index}>
                                <StaffItem userInfo={staff} />
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
};

export default Staffs;
