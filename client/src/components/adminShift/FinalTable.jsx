import React, { useState } from "react";

const FinalTable = ({ timetables }) => {
    // Tạo một mảng 2 chiều để lưu trữ thông tin về bảng lịch làm
    // Mỗi phần tử trong mảng này đại diện cho một ô trong bảng lịch
    const schedule = new Array(7).fill(null).map(() => new Array(3).fill(null));

    // Lặp qua từng bảng lịch làm
    timetables.forEach((timetable) => {
        // Lặp qua từng ca làm việc đã đăng ký trong bảng lịch
        timetable.assigned_shifts.forEach((shift) => {
            // Lấy thứ và ca làm việc từ shiftName
            const day = Math.floor(shift.shiftName / 10); // Lấy số đầu tiên
            const shiftIndex = shift.shiftName % 10; // Lấy số sau cùng

            // Kiểm tra xem ô trong bảng lịch đã được khởi tạo chưa
            if (!schedule[day - 2][shiftIndex - 1]) {
                // Nếu ô chưa được khởi tạo, tạo một đối tượng mới để lưu thông tin
                schedule[day - 2][shiftIndex - 1] = { usernames: [] };
            }

            // Đẩy username vào mảng usernames của ô tương ứng
            schedule[day - 2][shiftIndex - 1].usernames.push(timetable.user.username);
        });
    });

    const [selectedUsers, setSelectedUsers] = useState([]); // State để lưu danh sách người dùng được chọn

    // Hàm toggle chọn người dùng
    const toggleUserSelection = (username) => {
        if (selectedUsers.includes(username)) {
            // Nếu người dùng đã được chọn, loại bỏ khỏi danh sách
            setSelectedUsers(selectedUsers.filter((user) => user !== username));
        } else {
            // Nếu người dùng chưa được chọn, thêm vào danh sách
            setSelectedUsers([...selectedUsers, username]);
        }
    };

    // Render bảng lịch
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
                {schedule[0].map((column, columnIndex) => (
                    <tr key={columnIndex}>
                        {/* Lặp qua từng ô của mỗi cột */}
                        {schedule.map((row, rowIndex) => (
                            <td key={rowIndex}>
                                {schedule[rowIndex][columnIndex] &&
                                    schedule[rowIndex][columnIndex].usernames.map(
                                        (username, index) => (
                                            <div
                                                key={index}
                                                className={`schedule-username ${
                                                    selectedUsers.includes(username)
                                                        ? "selected"
                                                        : ""
                                                }`}
                                                onClick={() => toggleUserSelection(username)}
                                            >
                                                {username}
                                            </div>
                                        )
                                    )}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default FinalTable;
