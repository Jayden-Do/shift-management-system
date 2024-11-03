import { Card } from "antd";
import React from "react";

const SingleShift = ({ shift, timekeeper }) => {
    // Check if shift.shiftName is present in the timekeeper array
    const isShiftTimeInTimekeeper = timekeeper.includes(shift.shiftName);

    // Define the border color based on the condition
    const borderColor = isShiftTimeInTimekeeper ? "#7ed7c1" : "default"; // Use "default" or any other color you prefer

    // Style object for the Card component
    const cardStyle = {
        border: `2px solid ${borderColor}`,
    };

    // Calculate the date based on shiftDay
    const shiftDay = Math.floor(shift.shiftName / 10);
    const currentDate = new Date(); // Use your desired date as a starting point
    currentDate.setDate(currentDate.getDate() + shiftDay - 2); // Add shiftDay to the current date

    // Format the date to a string (you can customize the format as needed)
    const formattedDate = currentDate.toDateString();

    return (
        <Card extra={formattedDate} bordered hoverable style={cardStyle}>
            <h2>Shift: {shift.shiftName}</h2>
        </Card>
    );
};

export default SingleShift;
