import React, { useEffect } from "react";
import { message, Col, Row, Card } from "antd";
import { NavLink } from "react-router-dom";
import List from "../components/shift/List";

const DashboardAdmin = ({
    userData,
    adminTotalUser,
    adminTotalRegisterShift,
    adminTotalAssignShift,
    shiftsTable,
    salaries,
}) => {
    useEffect(() => {
        if (firstName === "") {
            info();
        } else success();
    }, []);
    const { firstName, lastName, gender, birth, email, role, address } = userData;

    let totalChecked = 0,
        totalSalary = 0;
    if (salaries) {
        salaries.forEach((salary) => {
            totalChecked += salary.timekeeper.length;
            totalSalary += salary.totalEarnings;
        });
    }

    console.log(totalChecked, totalSalary);

    const gridStyle = {
        width: "25%",
        textAlign: "center",
    };

    // Main code
    const s21 = [];
    const s22 = [];
    const s23 = [];
    const s31 = [];
    const s32 = [];
    const s33 = [];
    const s41 = [];
    const s42 = [];
    const s43 = [];
    const s51 = [];
    const s52 = [];
    const s53 = [];
    const s61 = [];
    const s62 = [];
    const s63 = [];
    const s71 = [];
    const s72 = [];
    const s73 = [];
    const s81 = [];
    const s82 = [];
    const s83 = [];
    shiftsTable.forEach((item) => {
        item.assigned_shifts.forEach((shift) => {
            if (shift.shiftName === 21) {
                s21.push({ username: item.user.username, _id: item._id });
            }
            if (shift.shiftName === 22) {
                s22.push({ username: item.user.username, _id: item._id });
            }
            if (shift.shiftName === 23) {
                s23.push({ username: item.user.username, _id: item._id });
            }
            if (shift.shiftName === 31) {
                s31.push({ username: item.user.username, _id: item._id });
            }
            if (shift.shiftName === 32) {
                s32.push({ username: item.user.username, _id: item._id });
            }
            if (shift.shiftName === 33) {
                s33.push({ username: item.user.username, _id: item._id });
            }
            if (shift.shiftName === 41) {
                s41.push({ username: item.user.username, _id: item._id });
            }
            if (shift.shiftName === 42) {
                s42.push({ username: item.user.username, _id: item._id });
            }
            if (shift.shiftName === 43) {
                s43.push({ username: item.user.username, _id: item._id });
            }
            if (shift.shiftName === 51) {
                s51.push({ username: item.user.username, _id: item._id });
            }
            if (shift.shiftName === 52) {
                s52.push({ username: item.user.username, _id: item._id });
            }
            if (shift.shiftName === 53) {
                s53.push({ username: item.user.username, _id: item._id });
            }
            if (shift.shiftName === 61) {
                s61.push({ username: item.user.username, _id: item._id });
            }
            if (shift.shiftName === 62) {
                s62.push({ username: item.user.username, _id: item._id });
            }
            if (shift.shiftName === 63) {
                s63.push({ username: item.user.username, _id: item._id });
            }
            if (shift.shiftName === 71) {
                s71.push({ username: item.user.username, _id: item._id });
            }
            if (shift.shiftName === 72) {
                s72.push({ username: item.user.username, _id: item._id });
            }
            if (shift.shiftName === 73) {
                s73.push({ username: item.user.username, _id: item._id });
            }
            if (shift.shiftName === 81) {
                s81.push({ username: item.user.username, _id: item._id });
            }
            if (shift.shiftName === 82) {
                s82.push({ username: item.user.username, _id: item._id });
            }
            if (shift.shiftName === 83) {
                s83.push({ username: item.user.username, _id: item._id });
            }
        });
    });

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
                        <NavLink to="/admin/information">
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
                        <NavLink to="/admin/shifts">
                            <Card
                                title="Users register shifts Information"
                                bordered={false}
                                style={{ minHeight: 224 }}
                                className="hover"
                            >
                                <Row>
                                    <Col span={12}>Total staffs registered: {adminTotalUser}</Col>
                                </Row>
                                <Row gutter={[24, 8]} className="mt-8">
                                    <Col span={12}>
                                        Total registered shifts: {adminTotalRegisterShift}
                                    </Col>
                                </Row>
                                <Row gutter={[24, 8]} className="mt-8">
                                    <Col span={12}>
                                        Total assigned shifts: {adminTotalAssignShift}
                                    </Col>
                                </Row>
                            </Card>
                        </NavLink>
                    </Col>

                    <Col span={8}>
                        <NavLink to="/admin/timesheet">
                            <Card
                                title="Time sheet"
                                bordered={false}
                                style={{ minHeight: 224 }}
                                className="hover"
                            >
                                <Row>
                                    <Col span={24}>Total shifts checked: {totalChecked}</Col>
                                </Row>
                                <Row gutter={[24, 8]} className="mt-8">
                                    <Col span={24}>Total salary checked: {totalSalary}</Col>
                                </Row>
                            </Card>
                        </NavLink>
                    </Col>
                </Row>

                <NavLink to="/admin/shifts">
                    <Row className="mt-24">
                        <Col span={24}>
                            <Card title="Shift Table" bordered={false}>
                                <Card.Grid style={gridStyle}>
                                    <Card
                                        title="Monday"
                                        bordered={false}
                                        style={{ minHeight: 100 }}
                                    >
                                        <div className="config-align">
                                            <List array={s21} code={21} />
                                            <List array={s22} code={22} />
                                            <List array={s23} code={23} />
                                        </div>
                                    </Card>
                                </Card.Grid>
                                <Card.Grid style={gridStyle}>
                                    <Card
                                        title="Tuesday"
                                        bordered={false}
                                        style={{ minHeight: 100 }}
                                    >
                                        <div className="config-align">
                                            <List array={s31} code={31} />
                                            <List array={s32} code={32} />
                                            <List array={s33} code={33} />
                                        </div>
                                    </Card>
                                </Card.Grid>
                                <Card.Grid style={gridStyle}>
                                    <Card
                                        title="Wednesday"
                                        bordered={false}
                                        style={{ minHeight: 100 }}
                                    >
                                        <div className="config-align">
                                            <List array={s41} code={41} />
                                            <List array={s42} code={42} />
                                            <List array={s43} code={43} />
                                        </div>
                                    </Card>
                                </Card.Grid>
                                <Card.Grid style={gridStyle}>
                                    <Card
                                        title="Thursday"
                                        bordered={false}
                                        style={{ minHeight: 100 }}
                                    >
                                        <div className="config-align">
                                            <List array={s51} code={51} />
                                            <List array={s52} code={52} />
                                            <List array={s53} code={53} />
                                        </div>
                                    </Card>
                                </Card.Grid>
                                <Card.Grid style={gridStyle}>
                                    <Card
                                        title="Friday"
                                        bordered={false}
                                        style={{ minHeight: 100 }}
                                    >
                                        <div className="config-align">
                                            <List array={s61} code={61} />
                                            <List array={s62} code={62} />
                                            <List array={s63} code={63} />
                                        </div>
                                    </Card>
                                </Card.Grid>
                                <Card.Grid style={gridStyle}>
                                    <Card
                                        title="Saturday"
                                        bordered={false}
                                        style={{ minHeight: 100 }}
                                    >
                                        <div className="config-align">
                                            <List array={s71} code={71} />
                                            <List array={s72} code={72} />
                                            <List array={s73} code={73} />
                                        </div>
                                    </Card>
                                </Card.Grid>
                                <Card.Grid style={gridStyle}>
                                    <Card
                                        title="Sunday"
                                        bordered={false}
                                        style={{ minHeight: 100 }}
                                    >
                                        <div className="config-align">
                                            <List array={s81} code={81} />
                                            <List array={s82} code={82} />
                                            <List array={s83} code={83} />
                                        </div>
                                    </Card>
                                </Card.Grid>
                            </Card>
                        </Col>
                    </Row>
                </NavLink>
            </div>
        </div>
    );
};

export default DashboardAdmin;
