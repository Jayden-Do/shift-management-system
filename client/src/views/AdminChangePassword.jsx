import React, { useContext, useRef, useState } from "react";
import Input from "../components/layouts/Input";
import { ConfigProvider, Button, message } from "antd";
import { AuthContext } from "../contexts/AuthContext";
import Swal from "sweetalert2";
import "../assets/css/admin/adminChangePassword.css";

const AdminChangePassword = () => {
    // Context
    const { adminGetAccount, adminChangeUserPassword } = useContext(AuthContext);
    const searchBar = useRef();

    // State
    const [inputSearch, setInputSearch] = useState("");
    const [userData, setUserData] = useState({
        success: false,
        user: {
            username: "",
            userType: "",
            _id: "",
            createAt: "",
        },
    });
    const [passwordData, setPasswordData] = useState({
        newPassword: "",
        confirmNewPassword: "",
    });

    // Event Functions
    const handleSearch = () => {
        searchBar.current.classList.toggle("show-search");
    };
    const handleChangeSearch = (event) => {
        setInputSearch(event.target.value);
    };
    const searchUser = async (event) => {
        event.preventDefault();
        const dataFetched = await adminGetAccount(inputSearch);
        if (dataFetched) setUserData(dataFetched);
        else {
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "User not found",
            });
        }
    };
    const onChangeNewPassword = (event) => {
        setPasswordData({ ...passwordData, [event.target.name]: event.target.value });
    };

    const confirmChangePassword = (event) => {
        event.preventDefault();
        Swal.fire({
            title: "Are you sure?",
            text: "You are about to change the user's password.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, change it!",
        }).then((result) => {
            if (result.isConfirmed) {
                handleChangePassword();
            }
        });
    };

    const handleChangePassword = async () => {
        const changingSuccess = await adminChangeUserPassword(userData.user._id, passwordData);

        if (changingSuccess.success) {
            Swal.fire({
                icon: "success",
                title: "Success!",
                text: "Successfully changing User's Password! ^^",
                didClose: () => {
                    setInputSearch("");
                    setUserData({ ...userData, success: false });
                    setPasswordData({ newPassword: "", confirmNewPassword: "" });
                    searchBar.current.classList.remove("show-search");
                },
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: changingSuccess.message,
            });
        }
    };

    let infoUser = null;
    if (userData.success) {
        infoUser = (
            <>
                <div className="info-user">
                    <h3>
                        <span>User Name</span>: {userData.user.username}
                    </h3>
                    <h3>
                        <span>User Type</span>: {userData.user.userType}
                    </h3>
                    <h3>
                        <span>Create At</span>: {userData.user.createAt}
                    </h3>
                </div>

                <div className="change-password">
                    <h1 className="mb-16">Want to change this User's Password ?</h1>
                    <form onSubmit={confirmChangePassword}>
                        <Input
                            type="text"
                            field="New Password"
                            name="newPassword"
                            value={passwordData.newPassword}
                            onChange={onChangeNewPassword}
                        />
                        <Input
                            type="text"
                            field="Confirm New Password"
                            name="confirmNewPassword"
                            value={passwordData.confirmNewPassword}
                            onChange={onChangeNewPassword}
                        />
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
            </>
        );
    }

    // Message
    const [messageApi, contextHolder] = message.useMessage();

    return (
        <div className="home-content">
            {contextHolder}
            <div className="container--v4">
                <h1 className="fs-lg">Change User Password</h1>
                <form className="search" id="search-bar" onSubmit={searchUser} ref={searchBar}>
                    <input
                        type="search"
                        placeholder="Type username..."
                        name="q"
                        className="search__input"
                        value={inputSearch}
                        onChange={handleChangeSearch}
                    />

                    <div className="search__button" id="search-button" onClick={handleSearch}>
                        <i className="ri-search-2-line search__icon"></i>
                        <i className="ri-close-line search__close"></i>
                    </div>
                </form>

                {infoUser}
            </div>
        </div>
    );
};

export default AdminChangePassword;
