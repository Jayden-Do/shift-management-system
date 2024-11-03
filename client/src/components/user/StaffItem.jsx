import React, { useEffect } from "react";
import ActionButton from "./ActionButton";

const StaffItem = ({ userInfo }) => {
    return (
        <>
            <div className="staff__card">
                <div className="staff__name flex">
                    <h3>Staff's name: </h3>
                    <span>
                        {userInfo.firstName} {userInfo.lastName}
                    </span>
                </div>
                <div className="staff__role flex">
                    <h3 className="special">Role: </h3>
                    <span>{userInfo.role}</span>
                </div>
                <div className="staff__email flex">
                    <h3>Email: </h3>
                    <span>{userInfo.email}</span>
                </div>
                <div className="staff__birth flex">
                    <h3>Birthday: </h3>
                    <span>{userInfo.birth}</span>
                </div>
                <div className="staff__gender flex">
                    <h3>Gender: </h3>
                    <span>{userInfo.gender}</span>
                </div>
                <div className="staff__address flex">
                    <h3>Address: </h3>
                    <span>{userInfo.address}</span>
                </div>

                <div className="button__container">
                    <ActionButton _id={userInfo._id} />
                </div>
            </div>
        </>
    );
};

export default StaffItem;
