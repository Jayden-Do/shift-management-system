import { InfoContext } from "../../contexts/InfoContext";
import Input from "../layouts/Input";
import { message } from "antd";
import Swal from "sweetalert2";

import React, { useContext, useEffect, useState } from "react";

const InfoFilled = () => {
    // Context
    const {
        infoState: { infoFilled },
        updateInfo,
    } = useContext(InfoContext);

    // State
    const [updatedInfo, setUpdatedInfo] = useState(infoFilled);

    useEffect(() => {
        info();
        setUpdatedInfo(infoFilled);
    }, []);

    const { firstName, lastName, email, birth, gender, address } = updatedInfo;

    const onChangeUpdatedInfoForm = (event) => {
        setUpdatedInfo({ ...updatedInfo, [event.target.name]: event.target.value });
    };

    // Message
    const [messageApi, contextHolder] = message.useMessage();
    const info = () => {
        messageApi.info("Updating Information");
    };
    const success = () => {
        messageApi.open({
            type: "success",
            content: `Information successfully updated!`,
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
            text: "You are about to update your information.",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, update it!",
        });

        // If user confirms, proceed with updating information
        if (result.isConfirmed) {
            const { message } = await updateInfo(updatedInfo);
            success();
            setTimeout(() => {
                window.location.reload(false);
            }, 1000);
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
                                onChange={onChangeUpdatedInfoForm}
                            />
                            <Input
                                field="Last Name"
                                name="lastName"
                                type="text"
                                value={lastName}
                                onChange={onChangeUpdatedInfoForm}
                            />
                        </div>

                        <div className="field email-field">
                            <Input
                                field="Email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={onChangeUpdatedInfoForm}
                            />
                            <Input
                                field="Address"
                                name="address"
                                type="text"
                                value={address}
                                onChange={onChangeUpdatedInfoForm}
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
                                            onChange={onChangeUpdatedInfoForm}
                                        />
                                        <span>Male</span>
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="female"
                                            onChange={onChangeUpdatedInfoForm}
                                        />
                                        <span>Female</span>
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="secret"
                                            onChange={onChangeUpdatedInfoForm}
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
                                    onChange={onChangeUpdatedInfoForm}
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

export default InfoFilled;
