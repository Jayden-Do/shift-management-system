import React, { useContext, useEffect } from "react";
import { ShiftContext } from "../contexts/ShiftContext";
import Swal from "sweetalert2";
import Loader from "./Loader";
import { Button, Col, Row, ConfigProvider, message, Statistic, Card } from "antd";

import "../assets/css/timekeeping/timekeeping.css";
import SingleShift from "../components/shift/SingleShift";
import { SalaryContext } from "../contexts/SalaryContext";
import { AuthContext } from "../contexts/AuthContext";

const Timekeeping = () => {
    useEffect(() => {
        messageApi.info("Here is your timekeeping! ^^");
        getTimeTable();
        getSalary();
    }, []);

    // Context
    const {
        authState: { user },
    } = useContext(AuthContext);

    const {
        shiftState: { assigned_shifts, shiftLoading },
        getTimeTable,
    } = useContext(ShiftContext);

    const {
        salaryState: { timekeeper, totalEarnings, monthlyEarnings },
        getSalary,
    } = useContext(SalaryContext);
    let salaryChecked = [];
    assigned_shifts.sort((a, b) => a.shiftName - b.shiftName);
    console.log(assigned_shifts);
    salaryChecked = timekeeper;

    // Message
    const [messageApi, contextHolder] = message.useMessage();

    let body = null;
    if (shiftLoading) {
        body = (
            <>
                <div className="container">
                    <Loader />
                </div>
            </>
        );
    } else {
        body = (
            <>
                <Card className="mt-16" style={{ width: 400, border: "2px solid #E7BCDE" }}>
                    <Statistic title="Monthly Earnings" value={monthlyEarnings} prefix="VND" />
                    <Statistic title="Total Earnings" value={totalEarnings} prefix="VND" />
                </Card>

                <Row gutter={[16, 16]}>
                    {assigned_shifts.map((shift, index) => (
                        <Col span={6} key={index}>
                            <SingleShift shift={shift} timekeeper={salaryChecked} />
                        </Col>
                    ))}
                </Row>
            </>
        );
    }

    return (
        <div className="home-content">
            {contextHolder}
            <div className="container--v5">{body}</div>
        </div>
    );
};

export default Timekeeping;
