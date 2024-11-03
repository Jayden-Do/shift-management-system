import React, { useContext } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import Swal from "sweetalert2";
import { StaffContext } from "../../contexts/StaffContext";

const ActionButton = ({ _id }) => {
    const { findStaff, deleteStaff, setOpen } = useContext(StaffContext);

    const chooseInfo = (infoId) => {
        findStaff(infoId);
        setOpen(true);
    };

    const chooseUser = async (userId) => {
        // Show SweetAlert2 confirmation modal
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });

        // If user confirms deletion, proceed with deletion
        if (result.isConfirmed) {
            deleteStaff(userId);
        }
    };

    return (
        <>
            <Tooltip title="Edit">
                <Button
                    type="text"
                    shape="circle"
                    icon={<EditOutlined />}
                    onClick={chooseInfo.bind(this, _id)}
                />
            </Tooltip>
            <Tooltip title="Delete">
                <Button
                    type="text"
                    shape="circle"
                    icon={<DeleteOutlined style={{ color: "#FF8F8F" }} />}
                    onClick={chooseUser.bind(this, _id)}
                />
            </Tooltip>
        </>
    );
};

export default ActionButton;
