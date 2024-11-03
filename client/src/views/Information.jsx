import React, { useContext, useEffect } from "react";
import "../assets/css/userInfo.css";
import "../assets/css/input.css";
import "../assets/css/button.css";
import InfoFill from "../components/user/InfoFill";
import { InfoContext } from "../contexts/InfoContext";
import InfoShow from "../components/user/InfoShow";
import Loader from "./Loader";
import InfoFilled from "../components/user/InfoFilled";

const Information = () => {
    // Context
    const {
        infoState: { infoFilled, info, infoLoading },
        getInfo,
    } = useContext(InfoContext);

    // Start get info
    useEffect(() => {
        getInfo();
    }, []);
    const data = info[0];

    let body = null;
    if (infoLoading) {
        body = (
            <div className="container">
                <Loader />
            </div>
        );
    } else if (infoFilled !== null) {
        body = <InfoFilled />;
    } else if (info.length === 0) {
        body = <InfoFill />;
    } else {
        body = <InfoShow info={data} />;
    }
    return <>{body}</>;
};

export default Information;
