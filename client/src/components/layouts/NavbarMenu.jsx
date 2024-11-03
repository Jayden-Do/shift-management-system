import React, { useContext, useRef } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import "../../assets/css/navbar.css";

const NavbarMenu = () => {
    const sidebar = useRef();

    const handleToggle = () => {
        sidebar.current.classList.toggle("active");
    };

    // Context
    const {
        authState: {
            user: { username, userType },
        },
        logoutUser,
    } = useContext(AuthContext);

    const logout = () => {
        logoutUser();
    };

    // Style
    const NavUnlisted = styled.ul`
        a {
            color: #11101d;
            text-decoration: none;
        }
        .active {
            color: #11101d;
            background-color: #fff;
        }
    `;

    return (
        <>
            <div className="sidebar" ref={sidebar}>
                <div className="logo-content">
                    <div className="logo">
                        <i className="bx bxl-react"></i>
                        <div className="logo__name">IKIGAI 2.0</div>
                    </div>
                    <i className="bx bx-menu" id="btn" onClick={handleToggle}></i>
                </div>

                <NavUnlisted>
                    <ul className="nav-list">
                        <li>
                            <i className="bx bx-search" onClick={handleToggle}></i>
                            <input type="text" placeholder="Search..." />
                            <span className="tooltip">Search</span>
                        </li>

                        <li>
                            <NavLink to="/user/dashboard">
                                <i className="bx bx-grid-alt"></i>
                                <span className="links-name">Dashboard</span>
                            </NavLink>
                            <span className="tooltip">Dashboard</span>
                        </li>

                        <li>
                            <NavLink to="/user/information">
                                <i className="bx bx-user"></i>
                                <span className="links-name">Information</span>
                            </NavLink>
                            <span className="tooltip">Information</span>
                        </li>

                        <li>
                            <NavLink to="/user/shift">
                                <i className="bx bx-briefcase"></i>
                                <span className="links-name">Shift</span>
                            </NavLink>
                            <span className="tooltip">Shift</span>
                        </li>

                        <li>
                            <NavLink to="/user/salary">
                                <i className="bx bx-timer"></i>
                                <span className="links-name">Salary</span>
                            </NavLink>
                            <span className="tooltip">Salary</span>
                        </li>

                        <li>
                            <NavLink to="/user/change_password">
                                <i className="bx bxs-user-account"></i>
                                <span className="links-name">Account</span>
                            </NavLink>
                            <span className="tooltip">Account</span>
                        </li>

                        {/* <li>
                            <a href="/#">
                                <i className="bx bx-cart-alt"></i>
                                <span className="links-name">Order</span>
                            </a>
                            <span className="tooltip">Order</span>
                        </li>

                        <li>
                            <a href="/#">
                                <i className="bx bx-heart"></i>
                                <span className="links-name">Saved</span>
                            </a>
                            <span className="tooltip">Saved</span>
                        </li>

                        <li>
                            <a href="/#">
                                <i className="bx bx-cog"></i>
                                <span className="links-name">Setting</span>
                            </a>
                            <span className="tooltip">Setting</span>
                        </li> */}
                    </ul>
                </NavUnlisted>

                <div className="profile-content">
                    <div className="profile">
                        <div className="profile-details">
                            <div className="name-job">
                                <div className="name" style={{ marginBottom: "8px" }}>
                                    {username}
                                </div>
                                <div className="job">{userType}</div>
                            </div>
                        </div>
                        <i className="bx bx-log-out" id="log-out" onClick={logout}></i>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NavbarMenu;
