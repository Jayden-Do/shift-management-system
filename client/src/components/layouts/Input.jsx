import React from "react";

const Input = ({ field, name, type, value, onChange }) => {
    return (
        <div className="form">
            <input
                type={type}
                name={name}
                autoComplete="off"
                value={value}
                onChange={onChange}
                required
            />
            <label className="label-name">
                <span className="content-name">{field}</span>
            </label>
        </div>
    );
};

export default Input;
