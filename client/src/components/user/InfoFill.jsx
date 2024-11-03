import { InfoContext } from "../../contexts/InfoContext";
import Input from "../layouts/Input";
import { message } from "antd";
import Swal from "sweetalert2";

import React, { useContext, useEffect, useState } from "react";

const InfoFill = () => {
    useEffect(() => {
        info();
    }, []);

    // Context
    const { addInfo } = useContext(InfoContext);

    // State
    const [newInfo, setNewInfo] = useState({
        firstName: "",
        lastName: "",
        role: "Staff",
        email: "",
        birth: "",
        gender: "" || "Secret",
        address: "",
    });

    const { firstName, lastName, email, birth, gender, address } = newInfo;

    const onChangeNewInfoForm = (event) => {
        setNewInfo({ ...newInfo, [event.target.name]: event.target.value });
    };

    // message
    const [messageApi, contextHolder] = message.useMessage();
    const info = () => {
        messageApi.info("Please fill your Information here! ^^");
    };
    const success = () => {
        messageApi.open({
            type: "success",
            content: "Register successfully!",
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

    const onSubmit = async (event) => {
        event.preventDefault();

        // Show SweetAlert2 confirmation modal
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You are about to add new information.",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, add it!",
        });

        // If user confirms, proceed with adding new information
        if (result.isConfirmed) {
            const { message } = await addInfo(newInfo);
            success();
        }
    };

    return (
        <div className="home-content">
            {contextHolder}
            <div className="modal-form">
                <div className="form-container">
                    <h3>Information</h3>

                    <form onSubmit={onSubmit}>
                        <div className="field name-field">
                            <Input
                                field="First Name"
                                name="firstName"
                                type="text"
                                value={firstName}
                                onChange={onChangeNewInfoForm}
                            />
                            <Input
                                field="Last Name"
                                name="lastName"
                                type="text"
                                value={lastName}
                                onChange={onChangeNewInfoForm}
                            />
                        </div>

                        <div className="field email-field">
                            <Input
                                field="Email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={onChangeNewInfoForm}
                            />
                            <Input
                                field="Address"
                                name="address"
                                type="text"
                                value={address}
                                onChange={onChangeNewInfoForm}
                            />
                        </div>

                        <div className="test">
                            <div className="gender-field">
                                <div className="label-name">Gender</div>
                                <div className="container-radio">
                                    <label>
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="male"
                                            onChange={onChangeNewInfoForm}
                                        />
                                        <span>Male</span>
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="female"
                                            onChange={onChangeNewInfoForm}
                                        />
                                        <span>Female</span>
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="secret"
                                            onChange={onChangeNewInfoForm}
                                        />
                                        <span>Secret</span>
                                    </label>
                                </div>
                            </div>
                            <div className="blank"></div>

                            <div className="birth-field">
                                <label htmlFor="dateofbirth">Date Of Birth</label>
                                <input
                                    type="date"
                                    name="birth"
                                    id="dateofbirth"
                                    value={birth}
                                    onChange={onChangeNewInfoForm}
                                />
                            </div>
                        </div>

                        <div className="button secondary">
                            <input type="submit" value="Save" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default InfoFill;
