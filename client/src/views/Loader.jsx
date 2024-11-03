import React from "react";
import "../assets/css/loader.css";

const Loader = () => {
    return (
        <svg id="loading" viewBox="0 0 100 80">
            <defs>
                <linearGradient id="gradient" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#D3CCE3" />
                    <stop offset="100%" stopColor="#E9E4F0" />
                </linearGradient>

                <clipPath id="rects">
                    <rect
                        className="rect"
                        id="rect1"
                        x="0"
                        y="0"
                        width="30"
                        height="30"
                        rx="2"
                        ry="2"
                    />
                    <rect
                        className="rect"
                        id="rect2"
                        x="0"
                        y="0"
                        width="30"
                        height="30"
                        rx="2"
                        ry="2"
                    />
                    <rect
                        className="rect"
                        id="rect3"
                        x="0"
                        y="0"
                        width="30"
                        height="30"
                        rx="2"
                        ry="2"
                    />
                    <rect
                        className="rect"
                        id="rect4"
                        x="0"
                        y="0"
                        width="30"
                        height="30"
                        rx="2"
                        ry="2"
                    />
                    <rect
                        className="rect"
                        id="rect5"
                        x="0"
                        y="0"
                        width="30"
                        height="30"
                        rx="2"
                        ry="2"
                    />
                    <rect
                        className="rect"
                        id="rect6"
                        x="0"
                        y="0"
                        width="30"
                        height="30"
                        rx="2"
                        ry="2"
                    />
                    <rect
                        className="rect"
                        id="rect7"
                        x="0"
                        y="0"
                        width="30"
                        height="30"
                        rx="2"
                        ry="2"
                    />
                </clipPath>
            </defs>
            <rect
                id="container"
                transform="translate(50) scale(0.707, 0.707) rotate(45)"
                x="0"
                y="0"
                width="100"
                height="100"
                fill="url(#gradient)"
                clipPath="url(#rects)"
            ></rect>
        </svg>
    );
};

export default Loader;
