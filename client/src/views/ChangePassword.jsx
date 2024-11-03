import React, { useContext, useEffect, useState } from "react";
import Input from "../components/layouts/Input";
import Swal from "sweetalert2";
import { Button, message, ConfigProvider } from "antd";
import "../assets/css/changePassword/changePass.css";
import { AuthContext } from "../contexts/AuthContext";

const ChangePassword = () => {
    useEffect(() => {
        messageApi.open({
            type: "info",
            content: `Change your password here! ^^`,
        });
    }, []);

    // Context
    const { changeUserPassword, logoutUser } = useContext(AuthContext);

    // State
    const [passwordData, setPasswordData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });

    const onChangeNewPassword = (event) => {
        setPasswordData({ ...passwordData, [event.target.name]: event.target.value });
    };

    const handleChangePassword = async (event) => {
        event.preventDefault();
        const changingSuccess = await changeUserPassword(passwordData);

        if (changingSuccess.success) {
            Swal.fire({
                icon: "success",
                title: "Success!",
                text: "Successfully changing password! Please login again with your new password ^^",
            }).then((result) => {
                if (result.isConfirmed) {
                    logoutUser();
                }
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: changingSuccess.message,
            });
        }
    };

    const [messageApi, contextHolder] = message.useMessage();
    return (
        <div className="home-content">
            {contextHolder}
            <div className="container--v3">
                <h2 className="fs-lg mb-16">Change Password</h2>
                <form className="lg-width" onSubmit={handleChangePassword}>
                    <div className="mb-8">
                        <Input
                            type="password"
                            field="Old Password"
                            name="oldPassword"
                            value={passwordData.oldPassword}
                            onChange={onChangeNewPassword}
                        />
                    </div>
                    <div className="mb-8">
                        <Input
                            type="password"
                            field="New Password"
                            name="newPassword"
                            value={passwordData.newPassword}
                            onChange={onChangeNewPassword}
                        />
                    </div>
                    <div className="mb-8">
                        <Input
                            type="password"
                            field="Confirm New Password"
                            name="confirmNewPassword"
                            value={passwordData.confirmNewPassword}
                            onChange={onChangeNewPassword}
                        />
                    </div>

                    <ConfigProvider
                        theme={{
                            components: {
                                Button: {
                                    colorPrimary: "#33BBC5",
                                    colorPrimaryHover: "#85E6C5",
                                },
                            },
                        }}
                    >
                        <Button
                            className="right mt-16 transition"
                            type="primary"
                            size="large"
                            htmlType="Submit"
                        >
                            Submit
                        </Button>
                    </ConfigProvider>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
