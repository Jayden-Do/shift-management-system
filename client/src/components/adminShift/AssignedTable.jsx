import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import React, { useState } from "react";
import Swal from "sweetalert2";

const AssignedTable = ({ assignedTable, updateAssignedShifts }) => {
    // Initialize a 2D array to store the schedule
    const initializeSchedule = () =>
        Array.from({ length: 7 }, () => Array.from({ length: 3 }, () => ({ usernames: [] })));

    // Populate the initial schedule with assignedTable data
    const populateSchedule = (assignedTable) => {
        const schedule = initializeSchedule();
        assignedTable.forEach((item) => {
            item.shifts.forEach((shift) => {
                const day = Math.floor(shift.shiftName / 10) - 2;
                const shiftIndex = (shift.shiftName % 10) - 1;
                schedule[day][shiftIndex].usernames.push(item.username);
            });
        });
        return schedule;
    };

    const [selectedUsers, setSelectedUsers] = useState([]); // State to track selected users
    const [scheduleState, setScheduleState] = useState(populateSchedule(assignedTable)); // State for schedule

    // Toggle selection of a user
    const toggleUserSelection = (username) => {
        setSelectedUsers((prevSelected) =>
            prevSelected.includes(username)
                ? prevSelected.filter((user) => user !== username)
                : [...prevSelected, username]
        );
    };

    const handleAddUsername = (rowIndex, columnIndex) => {
        Swal.fire({
            title: "Add New Employee",
            input: "text",
            inputPlaceholder: "Enter a username",
            showCancelButton: true,
            confirmButtonText: "Add",
            cancelButtonText: "Cancel",
            preConfirm: (inputValue) => {
                if (!inputValue) {
                    Swal.showValidationMessage("Username cannot be empty");
                }
                return inputValue;
            },
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                const newUsername = result.value.trim();
                const updatedSchedule = [...scheduleState];

                // Add the new username to the selected shift
                if (!updatedSchedule[rowIndex][columnIndex]) {
                    updatedSchedule[rowIndex][columnIndex] = { usernames: [] };
                }
                updatedSchedule[rowIndex][columnIndex].usernames.push(newUsername);

                // Update the state with the modified schedule
                setScheduleState(updatedSchedule);
            }
        });
    };

    const removeUsername = (rowIndex, columnIndex, username) => {
        // Calculate shift name based on position in table
        const shiftNeedToDelete = columnIndex + 1 + (rowIndex + 2) * 10;

        // Show SweetAlert2 confirmation dialog
        Swal.fire({
            title: "Are you sure?",
            text: `Do you really want to remove ${username} from this shift?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, remove it!",
        }).then((result) => {
            if (result.isConfirmed) {
                // Find and update the assignedTable data immutably
                const updatedTable = assignedTable.map((item) => ({
                    ...item,
                    shifts:
                        item.username === username
                            ? item.shifts.filter((shift) => shift.shiftName !== shiftNeedToDelete)
                            : item.shifts,
                }));

                // Update the scheduleState by cloning and modifying relevant parts
                const updatedSchedule = initializeSchedule();
                updatedTable.forEach((item) => {
                    item.shifts.forEach((shift) => {
                        const day = Math.floor(shift.shiftName / 10) - 2;
                        const shiftIndex = (shift.shiftName % 10) - 1;
                        updatedSchedule[day][shiftIndex].usernames.push(item.username);
                    });
                });

                // Update state with the modified schedule and assigned table
                setScheduleState(updatedSchedule);
                updateAssignedShifts(updatedTable);

                // Show success message
                Swal.fire("Removed!", `${username} has been removed from the shift.`, "success");
            }
        });
    };

    // Render the schedule table
    return (
        <table>
            <thead>
                <tr>
                    <th>Monday</th>
                    <th>Tuesday</th>
                    <th>Wednesday</th>
                    <th>Thursday</th>
                    <th>Friday</th>
                    <th>Saturday</th>
                    <th>Sunday</th>
                </tr>
            </thead>
            <tbody>
                {scheduleState[0].map((_, columnIndex) => (
                    <tr key={columnIndex}>
                        {scheduleState.map((_, rowIndex) => {
                            const usernames = scheduleState[rowIndex][columnIndex]?.usernames || [];
                            const hasConflict = usernames.length > 1;

                            return (
                                <td key={rowIndex}>
                                    {usernames.map((username, index) => (
                                        <div
                                            key={index}
                                            className={`schedule-username assign ${
                                                selectedUsers.includes(username) ? "selected" : ""
                                            }`}
                                            onClick={() => toggleUserSelection(username)}
                                        >
                                            <div>{username}</div>

                                            <Tooltip title="Delete">
                                                <Button
                                                    type="text"
                                                    shape="circle"
                                                    icon={<DeleteOutlined />}
                                                    onClick={() =>
                                                        removeUsername(
                                                            rowIndex,
                                                            columnIndex,
                                                            username
                                                        )
                                                    }
                                                />
                                            </Tooltip>
                                        </div>
                                    ))}
                                    {hasConflict && (
                                        <div className="schedule-username red">Shift Conflict</div>
                                    )}

                                    {/* Add New Username Button */}
                                    <div className="add-username">
                                        <Tooltip title="Add Username">
                                            <Button
                                                type="dashed"
                                                shape="circle"
                                                icon={<PlusOutlined />}
                                                onClick={() =>
                                                    handleAddUsername(rowIndex, columnIndex)
                                                }
                                            />
                                        </Tooltip>
                                    </div>
                                </td>
                            );
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default AssignedTable;
