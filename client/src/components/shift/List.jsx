import React, { useContext, useState } from "react";
import { ShiftAdminContext } from "../../contexts/ShiftAdminContext";

const List = ({ array, code }) => {
    // Context
    const { deleteShiftArray, setDeleteShiftArray } = useContext(ShiftAdminContext);

    const handleClick = (event) => {
        const shiftTime = code;
        const isAlreadyMarked = event.target.classList.contains("marked");

        if (isAlreadyMarked) {
            // If already marked, remove the element from deleteShiftArray
            const updatedArray = deleteShiftArray.filter((item) => item.shiftTime !== shiftTime);
            setDeleteShiftArray(updatedArray);
        } else {
            // If not marked, add the element to deleteShiftArray
            setDeleteShiftArray([
                ...deleteShiftArray,
                { shiftId: event.target.getAttribute("name"), shiftTime },
            ]);
        }

        // Toggle the "marked" class
        event.target.classList.toggle("marked");
    };

    return (
        <div>
            <ul className="shift__name-list">
                {array.map((user, index) => {
                    return (
                        <li key={index} onClick={handleClick} name={user._id}>
                            {user.username}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default List;
