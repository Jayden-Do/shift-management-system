import React, { useContext, useState } from "react";
import { SalaryContext } from "../../contexts/SalaryContext";

const CheckoutTable = ({ timetables }) => {
    const {
        salaryState: { checkouts },
        salaryTemp,
        setSalaryTemp,
    } = useContext(SalaryContext);

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
                schedule[day - 2][shiftIndex - 1] = { shifts: [] };
            }

            // Kiểm tra xem đã có shiftName trong mảng shifts của ô tương ứng chưa
            const existingShift = schedule[day - 2][shiftIndex - 1].shifts.find(
                (item) => item.username === timetable.user.username
            );

            // Nếu chưa có, thêm shiftName vào mảng shifts của ô tương ứng
            if (!existingShift) {
                schedule[day - 2][shiftIndex - 1].shifts.push({
                    username: timetable.user.username,
                    userId: timetable.user._id,
                    shiftName: shift.shiftName,
                });
            }
        });
    });

    const [selectedUsers, setSelectedUsers] = useState([]); // State để lưu danh sách người dùng được chọn

    // Hàm toggle chọn người dùng
    const toggleUserSelection = (username, shiftName) => {
        const newUser = { username, shiftName };
        const isUserSelected = selectedUsers.some(
            (user) => user.username === username && user.shiftName === shiftName
        );
        if (isUserSelected) {
            // Nếu người dùng đã được chọn, loại bỏ khỏi danh sách
            setSelectedUsers(
                selectedUsers.filter(
                    (user) => !(user.username === username && user.shiftName === shiftName)
                )
            );
        } else {
            // Nếu người dùng chưa được chọn, thêm vào danh sách
            setSelectedUsers([...selectedUsers, newUser]);
        }
    };

    const handleSaveSalary = (userId, shiftName) => {
        // Kiểm tra xem userId đã tồn tại trong salaryTemp chưa
        const existingUserIndex = salaryTemp.findIndex((item) => item.userId === userId);

        if (existingUserIndex !== -1) {
            const existingUser = salaryTemp[existingUserIndex];
            const existingShiftIndex = existingUser.checkoutShifts.indexOf(shiftName);

            // Kiểm tra xem shiftName đã tồn tại trong mảng checkoutShifts của userId đó chưa
            if (existingShiftIndex !== -1) {
                // Nếu đã tồn tại, loại bỏ shiftName khỏi mảng checkoutShifts
                const updatedCheckoutShifts = [...existingUser.checkoutShifts];
                updatedCheckoutShifts.splice(existingShiftIndex, 1);
                const updatedSalaryTemp = [...salaryTemp];
                updatedSalaryTemp[existingUserIndex] = {
                    ...existingUser,
                    checkoutShifts: updatedCheckoutShifts,
                };
                setSalaryTemp(updatedSalaryTemp);
            } else {
                // Nếu chưa tồn tại, thêm shiftName vào mảng checkoutShifts
                const updatedSalaryTemp = [...salaryTemp];
                updatedSalaryTemp[existingUserIndex] = {
                    ...existingUser,
                    checkoutShifts: [...existingUser.checkoutShifts, shiftName],
                };
                setSalaryTemp(updatedSalaryTemp);
            }
        } else {
            // Nếu userId chưa tồn tại, thêm một đối tượng mới vào salaryTemp với checkoutShifts chứa shiftName
            setSalaryTemp([...salaryTemp, { userId: userId, checkoutShifts: [shiftName] }]);
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
                                    schedule[rowIndex][columnIndex].shifts.map((item, index) => {
                                        // Kiểm tra xem item.username có tồn tại trong mảng checkouts không
                                        const checkout = checkouts.find(
                                            (checkout) => checkout.user.username === item.username
                                        );
                                        if (
                                            checkout &&
                                            checkout.timekeeper.includes(item.shiftName)
                                        ) {
                                            return (
                                                <div
                                                    key={index}
                                                    className={`schedule-username ${
                                                        selectedUsers.some(
                                                            (user) =>
                                                                user.username === item.username &&
                                                                user.shiftName === item.shiftName
                                                        )
                                                            ? "selected"
                                                            : "disabled" // Thêm class disabled nếu điều kiện đúng
                                                    }`}
                                                    onClick={() => {
                                                        toggleUserSelection(
                                                            item.username,
                                                            item.shiftName
                                                        );
                                                        handleSaveSalary(
                                                            item.userId,
                                                            item.shiftName
                                                        );
                                                    }}
                                                >
                                                    {item.username}
                                                </div>
                                            );
                                        } else {
                                            // Nếu không đáp ứng điều kiện, render div bình thường
                                            return (
                                                <div
                                                    key={index}
                                                    className={`schedule-username ${
                                                        selectedUsers.some(
                                                            (user) =>
                                                                user.username === item.username &&
                                                                user.shiftName === item.shiftName
                                                        )
                                                            ? "selected"
                                                            : ""
                                                    }`}
                                                    onClick={() => {
                                                        toggleUserSelection(
                                                            item.username,
                                                            item.shiftName
                                                        );
                                                        handleSaveSalary(
                                                            item.userId,
                                                            item.shiftName
                                                        );
                                                    }}
                                                >
                                                    {item.username}
                                                </div>
                                            );
                                        }
                                    })}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default CheckoutTable;
