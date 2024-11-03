import React, { useContext, useEffect, useRef } from "react";
import { ShiftContext } from "../../contexts/ShiftContext";
import { message } from "antd";

const ShiftShow = ({ shifts }) => {
    console.log(shifts);
    useEffect(() => {
        const shiftContent = document.getElementById("shift-content");
        const checkboxes = shiftContent.querySelectorAll('input[type="checkbox"]');
        const inputs = Array.from(checkboxes);
        shifts.forEach((shift) => {
            for (let i = 0; i < inputs.length; i++) {
                if (inputs[i].value == shift.shiftName) {
                    inputs[i].checked = true;
                }
            }
        });
        success();
    }, []);

    const { getUser } = useContext(ShiftContext);

    // Message
    const [messageApi, contextHolder] = message.useMessage();
    const success = () => {
        messageApi.open({
            type: "success",
            content: `Here is your Shift Register next week!`,
        });
    };

    const changeShift = () => {
        getUser();
    };

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

    return (
        <div className="shift">
            {contextHolder}
            <div className="shift__title">
                <h2>Shift Registration</h2>
            </div>

            <form>
                <div className="shift__content" id="shift-content">
                    <div className="shift__item">
                        <h3>Monday</h3>
                        <div className="shift__check input--disabled">
                            <label className="checkbox path">
                                <input type="checkbox" name="shiftName" value={21} />
                                <svg viewBox="0 0 21 21">
                                    <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                </svg>
                                <span>St 1</span>
                            </label>
                        </div>
                        <div className="shift__check input--disabled">
                            <label className="checkbox path">
                                <input type="checkbox" name="shiftName" value={22} />
                                <svg viewBox="0 0 21 21">
                                    <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                </svg>
                                <span>St 2</span>
                            </label>
                        </div>
                        <div className="shift__check input--disabled">
                            <label className="checkbox path">
                                <input type="checkbox" name="shiftName" value={23} />
                                <svg viewBox="0 0 21 21">
                                    <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                </svg>
                                <span>St 3</span>
                            </label>
                        </div>
                    </div>
                    <div className="shift__item">
                        <h3>Tuesday</h3>
                        <div className="shift__check input--disabled">
                            <label className="checkbox path">
                                <input type="checkbox" name="shiftName" value={31} />
                                <svg viewBox="0 0 21 21">
                                    <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                </svg>
                                <span>St 1</span>
                            </label>
                        </div>
                        <div className="shift__check input--disabled">
                            <label className="checkbox path">
                                <input type="checkbox" name="shiftName" value={32} />
                                <svg viewBox="0 0 21 21">
                                    <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                </svg>
                                <span>St 2</span>
                            </label>
                        </div>
                        <div className="shift__check input--disabled">
                            <label className="checkbox path">
                                <input type="checkbox" name="shiftName" value={33} />
                                <svg viewBox="0 0 21 21">
                                    <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                </svg>
                                <span>St 3</span>
                            </label>
                        </div>
                    </div>
                    <div className="shift__item">
                        <h3>Wednesday</h3>
                        <div className="shift__check input--disabled">
                            <label className="checkbox path">
                                <input type="checkbox" name="shiftName" value={41} />
                                <svg viewBox="0 0 21 21">
                                    <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                </svg>
                                <span>St 1</span>
                            </label>
                        </div>
                        <div className="shift__check input--disabled">
                            <label className="checkbox path">
                                <input type="checkbox" name="shiftName" value={42} />
                                <svg viewBox="0 0 21 21">
                                    <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                </svg>
                                <span>St 2</span>
                            </label>
                        </div>
                        <div className="shift__check input--disabled">
                            <label className="checkbox path">
                                <input type="checkbox" name="shiftName" value={43} />
                                <svg viewBox="0 0 21 21">
                                    <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                </svg>
                                <span>St 3</span>
                            </label>
                        </div>
                    </div>
                    <div className="shift__item">
                        <h3>Thursday</h3>
                        <div className="shift__check input--disabled">
                            <label className="checkbox path">
                                <input type="checkbox" name="shiftName" value={51} />
                                <svg viewBox="0 0 21 21">
                                    <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                </svg>
                                <span>St 1</span>
                            </label>
                        </div>
                        <div className="shift__check input--disabled">
                            <label className="checkbox path">
                                <input type="checkbox" name="shiftName" value={52} />
                                <svg viewBox="0 0 21 21">
                                    <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                </svg>
                                <span>St 2</span>
                            </label>
                        </div>
                        <div className="shift__check input--disabled">
                            <label className="checkbox path">
                                <input type="checkbox" name="shiftName" value={53} />
                                <svg viewBox="0 0 21 21">
                                    <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                </svg>
                                <span>St 3</span>
                            </label>
                        </div>
                    </div>
                    <div className="shift__item">
                        <h3>Friday</h3>
                        <div className="shift__check input--disabled">
                            <label className="checkbox path">
                                <input type="checkbox" name="shiftName" value={61} />
                                <svg viewBox="0 0 21 21">
                                    <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                </svg>
                                <span>St 1</span>
                            </label>
                        </div>
                        <div className="shift__check input--disabled">
                            <label className="checkbox path">
                                <input type="checkbox" name="shiftName" value={62} />
                                <svg viewBox="0 0 21 21">
                                    <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                </svg>
                                <span>St 2</span>
                            </label>
                        </div>
                        <div className="shift__check input--disabled">
                            <label className="checkbox path">
                                <input type="checkbox" name="shiftName" value={63} />
                                <svg viewBox="0 0 21 21">
                                    <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                </svg>
                                <span>St 3</span>
                            </label>
                        </div>
                    </div>
                    <div className="shift__item">
                        <h3>Saturday</h3>
                        <div className="shift__check input--disabled">
                            <label className="checkbox path">
                                <input type="checkbox" name="shiftName" value={71} />
                                <svg viewBox="0 0 21 21">
                                    <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                </svg>
                                <span>St 1</span>
                            </label>
                        </div>
                        <div className="shift__check input--disabled">
                            <label className="checkbox path">
                                <input type="checkbox" name="shiftName" value={72} />
                                <svg viewBox="0 0 21 21">
                                    <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                </svg>
                                <span>St 2</span>
                            </label>
                        </div>
                        <div className="shift__check input--disabled">
                            <label className="checkbox path">
                                <input type="checkbox" name="shiftName" value={73} />
                                <svg viewBox="0 0 21 21">
                                    <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                </svg>
                                <span>St 3</span>
                            </label>
                        </div>
                    </div>
                    <div className="shift__item">
                        <h3>Sunday</h3>
                        <div className="shift__check input--disabled">
                            <label className="checkbox path">
                                <input type="checkbox" name="shiftName" value={81} />
                                <svg viewBox="0 0 21 21">
                                    <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                </svg>
                                <span>St 1</span>
                            </label>
                        </div>
                        <div className="shift__check input--disabled">
                            <label className="checkbox path">
                                <input type="checkbox" name="shiftName" value={82} />
                                <svg viewBox="0 0 21 21">
                                    <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                </svg>
                                <span>St 2</span>
                            </label>
                        </div>
                        <div className="shift__check input--disabled">
                            <label className="checkbox path">
                                <input type="checkbox" name="shiftName" value={83} />
                                <svg viewBox="0 0 21 21">
                                    <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                </svg>
                                <span>St 3</span>
                            </label>
                        </div>
                    </div>
                </div>

                <aside>
                    <h3>
                        <span>Shift 1 :</span> From 7h55 to 13h
                    </h3>
                    <h3>
                        <span>Shift 2:</span> From 12h55 to 18h
                    </h3>
                    <h3>
                        <span>Shift 3:</span> From 17h55 to 23h
                    </h3>
                </aside>
                <footer className="form__footer">
                    <span className="">Week {currentWeek}</span>
                    <div className="button secondary button--disabled">
                        <input type="button" value="Change" onClick={changeShift} />
                    </div>
                </footer>
            </form>
        </div>
    );
};

export default ShiftShow;
