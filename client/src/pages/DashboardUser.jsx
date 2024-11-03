import React, { useContext, useEffect } from "react";
import { message, Col, Row, Card } from "antd";
import { NavLink } from "react-router-dom";
import { ShiftContext } from "../contexts/ShiftContext";
import WorkShift from "../components/shift/WorkShift";
import { SalaryContext } from "../contexts/SalaryContext";

const DashboardUser = ({ userId, userData, shiftData }) => {
    const date = new Date();
    let isTrue = date.getDay() > 0;
    useEffect(() => {
        if (firstName === "") {
            info();
        } else {
            if (isTrue) {
                getTimeTable();
            }
            getSalary();
            success();
        }
    }, [isTrue]);

    const { firstName, lastName, gender, birth, email, role, address } = userData;

    const { shiftQuantity, userShift } = shiftData;
    userShift.sort();
    const gridStyle = {
        width: "25%",
        textAlign: "center",
    };

    const {
        shiftState: { assigned_shifts },
        getTimeTable,
    } = useContext(ShiftContext);

    const {
        salaryState: { totalEarnings, monthlyEarnings },
        getSalary,
    } = useContext(SalaryContext);

    // Main code
    const s2 = [];
    const s3 = [];
    const s4 = [];
    const s5 = [];
    const s6 = [];
    const s7 = [];
    const s8 = [];
    assigned_shifts.sort((a, b) => a.shiftName - b.shiftName);

    if (assigned_shifts.length > 0) {
        assigned_shifts.forEach((shift) => {
            if (shift.shiftName === 21 || shift.shiftName === 22 || shift.shiftName === 23) {
                s2.push({ username: `${lastName}`, shiftName: shift.shiftName });
            }
            if (shift.shiftName === 31 || shift.shiftName === 32 || shift.shiftName === 33) {
                s3.push({ username: `${lastName}`, shiftName: shift.shiftName });
            }
            if (shift.shiftName === 41 || shift.shiftName === 42 || shift.shiftName === 43) {
                s4.push({ username: `${lastName}`, shiftName: shift.shiftName });
            }
            if (shift.shiftName === 51 || shift.shiftName === 52 || shift.shiftName === 53) {
                s5.push({ username: `${lastName}`, shiftName: shift.shiftName });
            }
            if (shift.shiftName === 61 || shift.shiftName === 62 || shift.shiftName === 63) {
                s6.push({ username: `${lastName}`, shiftName: shift.shiftName });
            }
            if (shift.shiftName === 71 || shift.shiftName === 72 || shift.shiftName === 73) {
                s7.push({ username: `${lastName}`, shiftName: shift.shiftName });
            }
            if (shift.shiftName === 81 || shift.shiftName === 82 || shift.shiftName === 83) {
                s8.push({ username: `${lastName}`, shiftName: shift.shiftName });
            }
        });
    }

    // Message
    const [messageApi, contextHolder] = message.useMessage();
    const info = () => {
        messageApi.info("Please fill your information in the Information section");
    };
    const success = () => {
        messageApi.open({
            type: "success",
            content: `Hello ${lastName}! Welcome back`,
        });
    };

    return (
        <div className="home-content">
            {contextHolder}
            <div className="dashboard__container">
                <Row gutter={16}>
                    <Col span={8}>
                        <NavLink to="/user/information">
                            <Card
                                title="Information"
                                bordered={false}
                                style={{ minHeight: 224 }}
                                className="hover"
                            >
                                <Row gutter={[8, 16]} justify={"space-between"}>
                                    <Col span={12}>
                                        Name: {firstName} {lastName}
                                    </Col>
                                    <Col span={12}>Gender: {gender}</Col>
                                    <Col span={12}>Birthday: {birth}</Col>
                                    <Col span={12}>Role: {role}</Col>
                                    <Col span={12}>Email: {email}</Col>
                                    <Col span={12}>Address: {address}</Col>
                                </Row>
                            </Card>
                        </NavLink>
                    </Col>

                    <Col span={8}>
                        <NavLink to="/user/shift">
                            <Card
                                title="Next week schedule"
                                bordered={false}
                                style={{ minHeight: 224 }}
                                className="hover"
                            >
                                <Row>
                                    <Col span={12}>Registered: {shiftQuantity}</Col>
                                </Row>
                                <Row gutter={[24, 8]} className="mt-8">
                                    {userShift.map((shift, index) => {
                                        return <Col key={index}>Shift: {shift}</Col>;
                                    })}
                                </Row>
                            </Card>
                        </NavLink>
                    </Col>

                    <Col span={8}>
                        <NavLink to="/user/salary">
                            <Card
                                title="Salary"
                                bordered={false}
                                style={{ minHeight: 224 }}
                                className="hover"
                            >
                                <Row>
                                    <Col span={24}>Total Earnings: {totalEarnings}</Col>
                                </Row>
                                <Row gutter={[24, 8]} className="mt-8">
                                    <Col span={24}>Monthly Earnings: {monthlyEarnings}</Col>
                                </Row>
                            </Card>
                        </NavLink>
                    </Col>
                </Row>

                <Row className="mt-24">
                    <Col span={24}>
                        <Card title="Shift Table" bordered={false}>
                            <Card.Grid style={gridStyle}>
                                <Card
                                    title="Monday"
                                    bordered={false}
                                    style={{ minHeight: 100 }}
                                    className="config-mouse"
                                >
                                    <WorkShift array={s2} />
                                </Card>
                            </Card.Grid>
                            <Card.Grid style={gridStyle}>
                                <Card
                                    title="Tuesday"
                                    bordered={false}
                                    style={{ minHeight: 100 }}
                                    className="config-mouse"
                                >
                                    <WorkShift array={s3} />
                                </Card>
                            </Card.Grid>
                            <Card.Grid style={gridStyle}>
                                <Card
                                    title="Wednesday"
                                    bordered={false}
                                    style={{ minHeight: 100 }}
                                    className="config-mouse"
                                >
                                    <WorkShift array={s4} />
                                </Card>
                            </Card.Grid>
                            <Card.Grid style={gridStyle}>
                                <Card
                                    title="Thursday"
                                    bordered={false}
                                    style={{ minHeight: 100 }}
                                    className="config-mouse"
                                >
                                    <WorkShift array={s5} />
                                </Card>
                            </Card.Grid>
                            <Card.Grid style={gridStyle}>
                                <Card
                                    title="Friday"
                                    bordered={false}
                                    style={{ minHeight: 100 }}
                                    className="config-mouse"
                                >
                                    <WorkShift array={s6} />
                                </Card>
                            </Card.Grid>
                            <Card.Grid style={gridStyle}>
                                <Card
                                    title="Saturday"
                                    bordered={false}
                                    style={{ minHeight: 100 }}
                                    className="config-mouse"
                                >
                                    <WorkShift array={s7} />
                                </Card>
                            </Card.Grid>
                            <Card.Grid style={gridStyle}>
                                <Card
                                    title="Sunday"
                                    bordered={false}
                                    style={{ minHeight: 100 }}
                                    className="config-mouse"
                                >
                                    <WorkShift array={s8} />
                                </Card>
                            </Card.Grid>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default DashboardUser;
