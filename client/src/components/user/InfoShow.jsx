import { InfoContext } from "../../contexts/InfoContext";
import "../../assets/css/button.css";
import { message } from "antd";

import React, { useContext, useEffect } from "react";

const InfoShow = ({ info: { _id, firstName, lastName, email, birth, gender, address, role } }) => {
    const { findInfo } = useContext(InfoContext);
    const chooseInfo = (infoId) => {
        findInfo(infoId);
    };

    useEffect(() => {
        success();
    }, []);

    // Message
    const [messageApi, contextHolder] = message.useMessage();
    const success = () => {
        messageApi.open({
            type: "success",
            content: `Here is your Information!`,
        });
    };
    const error = () => {
        messageApi.open({
            type: "error",
            content: "You need to register at least 5 shifts",
        });
    };
    const warning = () => {
        messageApi.open({
            type: "warning",
            content: "This is a warning message",
        });
    };
    return (
        <div className="home-content">
            {contextHolder}
            <div className="modal-form">
                <div className="form-container">
                    <h3>Information</h3>

                    <div className="info-container">
                        <div className="info-item">
                            <h2>
                                First Name: <span>{firstName}</span>
                            </h2>
                            <h2>
                                Email: <span>{email}</span>
                            </h2>
                            <h2>
                                Gender: <span>{gender}</span>
                            </h2>
                            <h2>
                                Role: <span>{role}</span>
                            </h2>
                        </div>
                        <div className="info-item">
                            <h2>
                                Last Name: <span>{lastName}</span>
                            </h2>
                            <h2>
                                Address: <span>{address}</span>
                            </h2>
                            <h2>
                                Birth: <span>{birth}</span>
                            </h2>
                        </div>
                    </div>
                    <div
                        className="button secondary button--position"
                        onClick={chooseInfo.bind(this, _id)}
                    >
                        <input type="button" value="Change" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoShow;
