import React from "react";
import { Link } from "react-router-dom";

const Help = () => {
    return (
        <>
            <div className="container ">
                <span className="h1 fw-bold mb-0">Need Help</span>
                <div className="pt-1 mb-4">
                    <Link to="/login">
                        <button className="btn btn-dark btn-lg btn-block" type="button">
                            Go Back
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Help;
