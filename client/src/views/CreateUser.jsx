import { Form, Input, Button, Checkbox } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import "../assets/css/create/create.css";
import "../assets/css/dashboard/dashboard.css";
import { AuthContext } from "../contexts/AuthContext";

const CreateUser = () => {
    useEffect(() => {
        info();
    }, []);

    const { registerUser } = useContext(AuthContext);

    // Local state
    const [registerForm, setRegisterForm] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        userType: "",
    });

    const onChangeRegisterForm = (event) =>
        setRegisterForm({ ...registerForm, [event.target.name]: event.target.value });

    const { username, password, confirmPassword } = registerForm;

    const onChangeCheck = (event) => {
        if (event.target.checked) {
            setRegisterForm({ ...registerForm, [event.target.name]: event.target.value });
        } else {
            setRegisterForm({ ...registerForm, [event.target.name]: "" });
        }
    };

    const register = async () => {
        if (password !== confirmPassword) {
            error();
            return;
        }
        try {
            const registerData = await registerUser(registerForm);

            if (registerData.success) {
                success();
            } else {
                error(registerData.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const info = () => {
        Swal.fire({
            title: "Info",
            text: "You are creating a new user",
            icon: "info",
            confirmButtonText: "OK",
        });
    };

    const success = () => {
        Swal.fire({
            title: "Success!",
            text: "Create user successfully",
            icon: "success",
            confirmButtonText: "OK",
        });
    };

    const error = (errorMessage) => {
        Swal.fire({
            title: "Error!",
            text: errorMessage || "Password do not match",
            icon: "error",
            confirmButtonText: "OK",
        });
    };

    return (
        <div className="home-content">
            <div className="container--v2">
                <div className="glass">
                    <Form
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={register}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Username!",
                                },
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder="Username"
                                name="username"
                                value={username}
                                required
                                onChange={onChangeRegisterForm}
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Password!",
                                },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={password}
                                required
                                onChange={onChangeRegisterForm}
                            />
                        </Form.Item>
                        <Form.Item
                            name="confirmPassword"
                            rules={[
                                {
                                    required: true,
                                    message: "Please confirm your Password!",
                                },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                value={confirmPassword}
                                required
                                onChange={onChangeRegisterForm}
                            />
                        </Form.Item>
                        <Form.Item name="Manager" valuePropName="checked" noStyle>
                            <Checkbox name="userType" value="Manager" onChange={onChangeCheck}>
                                Manager
                            </Checkbox>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button mt-24"
                            >
                                Create User
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default CreateUser;
