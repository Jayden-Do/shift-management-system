import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { LockOutlined, LoginOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import "../../assets/css/login/login.css";

const Login = () => {
    useEffect(() => {
        success();
    }, []);
    // Context
    const { loginUser } = useContext(AuthContext);

    // Local state
    const [loginForm, setLoginForm] = useState({
        username: "",
        password: "",
    });
    const [alert, setAlert] = useState(null);

    const onChangeLoginForm = (event) =>
        setLoginForm({ ...loginForm, [event.target.name]: event.target.value });

    const { username, password } = loginForm;

    const login = async (event) => {
        try {
            const loginData = await loginUser(loginForm);

            if (!loginData.success) {
                messageApi.open({
                    type: "error",
                    content: loginData.message,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    // message
    const [messageApi, contextHolder] = message.useMessage();
    const info = () => {
        messageApi.info("Please fill your Information here! ^^");
    };
    const success = () => {
        messageApi.open({
            type: "success",
            content: "Please login here and work with us! ^^",
            icon: <LoginOutlined />,
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
        <div className="door-content">
            <div className="container--v2">
                {contextHolder}
                <div className="glass">
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={login}
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
                                autoFocus
                                placeholder="Username"
                                name="username"
                                value={username}
                                required
                                onChange={onChangeLoginForm}
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
                                onChange={onChangeLoginForm}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                            <Link to="/help" className="login-form-forgot" href="">
                                Forgot password
                            </Link>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                            Or <Link to="/help">Contact to Manager</Link>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Login;
