import React, { useContext, useEffect, useState } from "react";
import { ShiftContext } from "../../contexts/ShiftContext";
import { message } from "antd";
import Swal from "sweetalert2";

const ShiftUpdater = ({ updateData }) => {
    useEffect(() => {
        const shiftContent = document.getElementById("shift-content");
        const checkboxes = shiftContent.querySelectorAll('input[type="checkbox"]');
        const inputs = Array.from(checkboxes);
        updateData.forEach((shift) => {
            for (let i = 0; i < inputs.length; i++) {
                if (+inputs[i].value === shift.shiftTime) {
                    inputs[i].checked = true;
                }
            }
        });
        info();
    }, []);

    // Context
    const { updateShift } = useContext(ShiftContext);

    // State
    const [shifts, setShifts] = useState(updateData);
    const [shiftQuantity, setShiftsQuantity] = useState(updateData.length);
    const addShift = (event) => {
        if (event.target.checked) {
            const isExisted = shifts.some((shift) => shift.shiftTime === +event.target.value);

            if (!isExisted) {
                setShifts([...shifts, { [event.target.name]: +event.target.value }]);
            }
            setShiftsQuantity(shiftQuantity + 1);
        } else {
            const newShifts = shifts.filter((shift) => shift.shiftTime !== +event.target.value);
            setShifts(newShifts);
            setShiftsQuantity(newShifts.length);
        }

        // if (event.target.checked === false) {
        //     const newShifts = shifts.filter((shift) => shift.shiftTime !== +event.target.value);

        //     console.log(newShifts, event.target.value, event.target.checked);
        //     setShifts(newShifts);
        //     setShiftsQuantity(newShifts.length);
        // }
    };

    const shiftInfo = { shiftQuantity: shiftQuantity, shifts: shifts };

    console.log(shiftInfo);

    // Message
    const [messageApi, contextHolder] = message.useMessage();
    const info = () => {
        messageApi.info("You are changing the schedule");
    };

    const success = () => {
        messageApi.open({
            type: "success",
            content: "Updating successfully",
        });
    };
    const error = () => {
        Swal.fire({
            icon: "error",
            title: "Error!",
            text: "You have to register at least 5 shifts",
        });
    };
    const warning = () => {
        messageApi.open({
            type: "warning",
            content: "This is a warning message",
        });
    };

    const saveShifts = async (event) => {
        event.preventDefault();
        if (shiftQuantity >= 5) {
            await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, update it!",
                preConfirm: async () => {
                    // Call updateShift() here
                    await updateShift(shiftInfo);
                },
            });

            // After the user clicks "OK" and updateShift() is called, reload the page
            window.location.reload(false);
        } else {
            error();
        }
    };

    // Date
    let currentDate = new Date("2023-10-23");
    let startDate = new Date(currentDate.getFullYear(), 0, 1);
    let days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));

    let weekNumber = Math.ceil(days / 7);

    return (
        <div className="home-content">
            {contextHolder}
            <div className="shift">
                <div className="shift__title">
                    <h2>Shift Updating</h2>
                </div>

                <form onSubmit={saveShifts}>
                    <div className="shift__content" id="shift-content">
                        <div className="shift__item">
                            <h3>Monday</h3>
                            <div className="shift__check">
                                <label className="checkbox path">
                                    <input
                                        type="checkbox"
                                        name="shiftTime"
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
                                        name="shiftTime"
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
                                        name="shiftTime"
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
                                        name="shiftTime"
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
                                        name="shiftTime"
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
                                        name="shiftTime"
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
                                        name="shiftTime"
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
                                        name="shiftTime"
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
                                        name="shiftTime"
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
                                        name="shiftTime"
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
                                        name="shiftTime"
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
                                        name="shiftTime"
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
                                        name="shiftTime"
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
                                        name="shiftTime"
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
                                        name="shiftTime"
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
                                        name="shiftTime"
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
                                        name="shiftTime"
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
                                        name="shiftTime"
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
                                        name="shiftTime"
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
                                        name="shiftTime"
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
                                        name="shiftTime"
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
                        <span>Week {weekNumber}</span>
                        <div className="button secondary">
                            <input type="submit" value="Save" />
                        </div>
                    </footer>
                </form>
            </div>
        </div>
    );
};

export default ShiftUpdater;
