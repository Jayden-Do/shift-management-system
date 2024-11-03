import React, { useContext, useEffect, useState } from "react";
import { Modal, Form } from "antd";
import Input from "../layouts/Input";
import Swal from "sweetalert2";

import { StaffContext } from "../../contexts/StaffContext";
import { InfoContext } from "../../contexts/InfoContext";

const UpdateStaffModal = () => {
    const {
        staffState: { staff },
        setOpen,
        setConfirmLoading,
        confirmLoading,
        open,
    } = useContext(StaffContext);

    const { updateInfo } = useContext(InfoContext);

    const [updatedInfo, setUpdatedInfo] = useState(staff);
    useEffect(() => {
        setUpdatedInfo(staff);
    }, [staff]);

    const onChangeUpdatedInfoForm = (event) => {
        setUpdatedInfo({ ...updatedInfo, [event.target.name]: event.target.value });
    };

    const { firstName, lastName, birth, email, gender, address, role } = updatedInfo;
    // Modal
    const handleOk = async () => {
        // Show SweetAlert2 confirmation modal
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You are about to update user information.",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, update it!",
        });

        // If user confirms update, proceed with the update
        if (result.isConfirmed) {
            const { message } = await updateInfo(updatedInfo);
            setConfirmLoading(true);
            setTimeout(() => {
                setOpen(false);
                setConfirmLoading(false);
                window.location.reload(false);
            }, 2000);
        }
    };

    const handleCancel = () => {
        setUpdatedInfo(staff);
        setOpen(false);
    };

    // Form
    const [form] = Form.useForm();

    return (
        <>
            <Modal
                title="Updating user information"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                style={{ top: "42px" }}
            >
                <Form
                    layout={{ labelCol: { span: 4 }, wrapperCol: { span: 14 } }}
                    form={form}
                    initialValues={{ layout: { labelCol: { span: 4 }, wrapperCol: { span: 14 } } }}
                    style={{ maxWidth: 600 }}
                >
                    <Form.Item label="First Name:">
                        <Input
                            placeholder="input placeholder"
                            name="firstName"
                            type="text"
                            value={firstName}
                            onChange={onChangeUpdatedInfoForm}
                        />
                    </Form.Item>
                    <Form.Item label="Last Name">
                        <Input
                            placeholder="input placeholder"
                            name="lastName"
                            type="text"
                            value={lastName}
                            onChange={onChangeUpdatedInfoForm}
                        />
                    </Form.Item>
                    <Form.Item label="Email">
                        <Input
                            placeholder="input placeholder"
                            name="email"
                            type="email"
                            value={email}
                            onChange={onChangeUpdatedInfoForm}
                        />
                    </Form.Item>
                    <Form.Item label="Address">
                        <Input
                            placeholder="input placeholder"
                            name="address"
                            type="text"
                            value={address}
                            onChange={onChangeUpdatedInfoForm}
                        />
                    </Form.Item>
                    <Form.Item label="Gender">
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
                    </Form.Item>
                    <Form.Item label="Date Of Birth">
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
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default UpdateStaffModal;
