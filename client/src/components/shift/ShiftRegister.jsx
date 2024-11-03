import React, { useContext, useEffect, useState } from "react";
import { ShiftContext } from "../../contexts/ShiftContext";
import { message } from "antd";
import Swal from "sweetalert2";

const ShiftRegister = () => {
    useEffect(() => {
        info();
    }, []);

    // Context
    const { registerTable } = useContext(ShiftContext);

    // State
    const [shifts, setShifts] = useState([]);
    const [shiftQuantity, setShiftsQuantity] = useState(0);
    const addShift = (event) => {
        if (event.target.checked) {
            const isExisted = shifts.some(
                (shift) => shift.shiftName === parseInt(event.target.value)
            );
            console.log("is existed: ", !isExisted);
            if (!isExisted) {
                setShifts([...shifts, { [event.target.name]: parseInt(event.target.value) }]);
            }
            setShiftsQuantity(shiftQuantity + 1);
        } else {
            const newShifts = shifts.filter(
                (shift) => shift.shiftName !== parseInt(event.target.value)
            );
            setShifts(newShifts);
            setShiftsQuantity(newShifts.length);
        }
    };

    if (shiftQuantity !== shifts.length) {
        setShiftsQuantity(shifts.length);
    }

    let currentDate = new Date(); // currentDate là một đối tượng Date đại diện cho ngày hiện tại

    // Tính toán ngày bắt đầu của tuần (ngày thứ 2 đầu tuần)
    let startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1); // Bắt đầu từ ngày 1 của tháng hiện tại
    let dayOfWeek = startDate.getDay(); // Lấy thứ của ngày 1
    let diff = 1 - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Xác định số ngày cần thêm hoặc bớt để có ngày thứ 2 đầu tuần
    startDate.setDate(startDate.getDate() + diff); // Đặt startDate thành ngày thứ 2 đầu tuần

    // Tính toán ngày kết thúc của tuần (ngày Chủ nhật cuối tuần)
    let endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6); // Ngày kết thúc là ngày thứ 7 sau ngày bắt đầu (6 ngày sau)

    // Format ngày thành chuỗi "YYYY-MM-DD"
    function formatDate(date) {
        let year = date.getFullYear();
        let month = String(date.getMonth() + 1).padStart(2, "0");
        let day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    // Format và hiển thị ngày bắt đầu và kết thúc của tuần
    let formattedStartDate = formatDate(startDate);
    let formattedEndDate = formatDate(endDate);

    // Tính toán tuần thứ mấy của năm hiện tại
    let currentWeek = Math.ceil(
        ((startDate - new Date(startDate.getFullYear(), 0, 1)) / 86400000 + 1) / 7
    );

    const shiftInfo = {
        week: currentWeek,
        dateStart: formattedStartDate,
        dateEnd: formattedEndDate,
        registered_shifts: shifts,
    };

    const saveShifts = async (event) => {
        event.preventDefault();
        if (shiftQuantity >= 5) {
            await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to delete this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, register it!",
                preConfirm: async () => {
                    // Call registerTable() here
                    const data = await registerTable(shiftInfo);
                    if (data.success) {
                        success();
                    } else {
                        Swal.fire({
                            icon: "Error",
                            title: "Error!",
                            text: data.message,
                        });
                    }
                },
            });
        } else {
            error();
        }
    };

    // message
    const [messageApi, contextHolder] = message.useMessage();
    const info = () => {
        messageApi.info("Registering for the next week");
    };

    const success = () => {
        Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Register successfully",
        });
    };

    const error = () => {
        Swal.fire({
            icon: "error",
            title: "Error!",
            text: "You have to register at least 5 shifts",
        });
    };

    return (
        <div className="shift">
            {contextHolder}
            <div className="shift__title">
                <h2>Shift Registering</h2>
            </div>

            <form onSubmit={saveShifts}>
                <div className="shift__content">
                    <div className="shift__item">
                        <h3>Monday</h3>
                        <div className="shift__check">
                            <label className="checkbox path">
                                <input
                                    type="checkbox"
                                    name="shiftName"
                                    value={21}
                                    onChange={addShift}
                                />
                                <svg viewBox="0 0 21 21">
                                    <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                </svg>
                                <span>St 1</span>
                            </label>
                        </div>
                        <div className="shift__check">
                            <label className="checkbox path">
                                <input
                                    type="checkbox"
                                    name="shiftName"
                                    value={22}
                                    onChange={addShift}
                                />
                                <svg viewBox="0 0 21 21">
                                    <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                </svg>
                                <span>St 2</span>
                            </label>
                        </div>
                        <div className="shift__check">
                            <label className="checkbox path">
                                <input
                                    type="checkbox"
                                    name="shiftName"
                                    value={23}
                                    onChange={addShift}
                                />
                                <svg viewBox="0 0 21 21">
                                    <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                </svg>
                                <span>St 3</span>
                            </label>
                        </div>
                    </div>
                    <div className="shift__item">
                        <h3>Tuesday</h3>
                        <div className="shift__check">
                            <label className="checkbox path">
                                <input
                                    type="checkbox"
                                    name="shiftName"
                                    value={31}
                                    onChange={addShift}
                                />
                                <svg viewBox="0 0 21 21">
                                    <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                </svg>
                                <span>St 1</span>
                            </label>
                        </div>
                        <div className="shift__check">
                            <label className="checkbox path">
                                <input
                                    type="checkbox"
                                    name="shiftName"
                                    value={32}
                                    onChange={addShift}
                                />
                                <svg viewBox="0 0 21 21">
                                    <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                </svg>
                                <span>St 2</span>
                            </label>
                        </div>
                        <div className="shift__check">
                            <label className="checkbox path">
                                <input
                                    type="checkbox"
                                    name="shiftName"
                                    value={33}
                                    onChange={addShift}
                                />
                                <svg viewBox="0 0 21 21">
                                    <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                </svg>
                                <span>St 3</span>
                            </label>
                        </div>
                    </div>
                    <div className="shift__item">
                        <h3>Wednesday</h3>
                        <div className="shift__check">
                            <label className="checkbox path">
                                <input
                                    type="checkbox"
                                    name="shiftName"
                                    value={41}
                                    onChange={addShift}
                                />
                                <svg viewBox="0 0 21 21">
                                    <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                </svg>
                                <span>St 1</span>
                            </label>
                        </div>
                        <div className="shift__check">
                            <label className="checkbox path">
                                <input
                                    type="checkbox"
                                    name="shiftName"
                                    value={42}
                                    onChange={addShift}
                                />
                                <svg viewBox="0 0 21 21">
                                    <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                </svg>
                                <span>St 2</span>
                            </label>
                        </div>
                        <div className="shift__check">
                            <label className="checkbox path">
                                <input
                                    type="checkbox"
                                    name="shiftName"
                                    value={43}
                                    onChange={addShift}
                                />
                                <svg viewBox="0 0 21 21">
                                    <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                </svg>
                                <span>St 3</span>
                            </label>
                        </div>
                    </div>
                    <div className="shift__item">
                        <h3>Thursday</h3>
                        <div className="shift__check">
                            <label className="checkbox path">
                                <input
                                    type="checkbox"
                                    name="shiftName"
                                    value={51}
                                    onChange={addShift}
                                />
                                <svg viewBox="0 0 21 21">
                                    <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                </svg>
                                <span>St 1</span>
                            </label>
                        </div>
                        <div className="shift__check">
                            <label className="checkbox path">
                                <input
                                    type="checkbox"
                                    name="shiftName"
                                    value={52}
                                    onChange={addShift}
                                />
                                <svg viewBox="0 0 21 21">
                                    <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                </svg>
                                <span>St 2</span>
                            </label>
                        </div>
                        <div className="shift__check">
                            <label className="checkbox path">
                                <input
                                    type="checkbox"
                                    name="shiftName"
                                    value={53}
                                    onChange={addShift}
                                />
                                <svg viewBox="0 0 21 21">
                                    <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                </svg>
                                <span>St 3</span>
                            </label>
                        </div>
                    </div>
                    <div className="shift__item">
                        <h3>Friday</h3>
                        <div className="shift__check">
                            <label className="checkbox path">
                                <input
                                    type="checkbox"
                                    name="shiftName"
                                    value={61}
                                    onChange={addShift}
                                />
                                <svg viewBox="0 0 21 21">
                                    <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                </svg>
                                <span>St 1</span>
                            </label>
                        </div>
                        <div className="shift__check">
                            <label className="checkbox path">
                                <input
                                    type="checkbox"
                                    name="shiftName"
                                    value={62}
                                    onChange={addShift}
                                />
                                <svg viewBox="0 0 21 21">
                                    <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                </svg>
                                <span>St 2</span>
                            </label>
                        </div>
                        <div className="shift__check">
                            <label className="checkbox path">
                                <input
                                    type="checkbox"
                                    name="shiftName"
                                    value={63}
                                    onChange={addShift}
                                />
                                <svg viewBox="0 0 21 21">
                                    <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                </svg>
                                <span>St 3</span>
                            </label>
                        </div>
                    </div>
                    <div className="shift__item">
                        <h3>Saturday</h3>
                        <div className="shift__check">
                            <label className="checkbox path">
                                <input
                                    type="checkbox"
                                    name="shiftName"
                                    value={71}
                                    onChange={addShift}
                                />
                                <svg viewBox="0 0 21 21">
                                    <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                </svg>
                                <span>St 1</span>
                            </label>
                        </div>
                        <div className="shift__check">
                            <label className="checkbox path">
                                <input
                                    type="checkbox"
                                    name="shiftName"
                                    value={72}
                                    onChange={addShift}
                                />
                                <svg viewBox="0 0 21 21">
                                    <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                </svg>
                                <span>St 2</span>
                            </label>
                        </div>
                        <div className="shift__check">
                            <label className="checkbox path">
                                <input
                                    type="checkbox"
                                    name="shiftName"
                                    value={73}
                                    onChange={addShift}
                                />
                                <svg viewBox="0 0 21 21">
                                    <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                </svg>
                                <span>St 3</span>
                            </label>
                        </div>
                    </div>
                    <div className="shift__item">
                        <h3>Sunday</h3>
                        <div className="shift__check">
                            <label className="checkbox path">
                                <input
                                    type="checkbox"
                                    name="shiftName"
                                    value={81}
                                    onChange={addShift}
                                />
                                <svg viewBox="0 0 21 21">
                                    <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                </svg>
                                <span>St 1</span>
                            </label>
                        </div>
                        <div className="shift__check">
                            <label className="checkbox path">
                                <input
                                    type="checkbox"
                                    name="shiftName"
                                    value={82}
                                    onChange={addShift}
                                />
                                <svg viewBox="0 0 21 21">
                                    <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                </svg>
                                <span>St 2</span>
                            </label>
                        </div>
                        <div className="shift__check">
                            <label className="checkbox path">
                                <input
                                    type="checkbox"
                                    name="shiftName"
                                    value={83}
                                    onChange={addShift}
                                />
                                <svg viewBox="0 0 21 21">
                                    <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                </svg>
                                <span>St 3</span>
                            </label>
                        </div>
                    </div>
                </div>

                <footer className="form__footer">
                    <span className="total">Total shifts register: {shiftQuantity}</span>
                    <span className="">Week {currentWeek}</span>
                    <div className="button secondary">
                        <input type="submit" value="Submit" />
                    </div>
                </footer>
            </form>
        </div>
    );
};

export default ShiftRegister;
