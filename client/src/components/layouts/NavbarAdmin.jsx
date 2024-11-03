import React, { useContext, useRef } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import "../../assets/css/navbar.css";

const NavbarAdmin = () => {
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
                            <NavLink to="/admin/dashboard">
                                <i className="bx bx-grid-alt"></i>
                                <span className="links-name">Dashboard</span>
                            </NavLink>

                            <span className="tooltip">Dashboard</span>
                        </li>

                        <li>
                            <NavLink to="/admin/information">
                                <i className="bx bx-info-circle"></i>
                                <span className="links-name">Information</span>
                            </NavLink>

                            <span className="tooltip">Information</span>
                        </li>

                        <li>
                            <NavLink to="/admin/staffs">
                                <i className="bx bx-user"></i>
                                <span className="links-name">Staffs</span>
                            </NavLink>
                            <span className="tooltip">Staffs</span>
                        </li>

                        <li>
                            <NavLink to="/admin/shifts">
                                <i className="bx bx-pie-chart-alt-2"></i>
                                <span className="links-name">Shifts Table</span>
                            </NavLink>
                            <span className="tooltip">Shifts Table</span>
                        </li>

                        <li>
                            <NavLink to="/admin/timesheet">
                                <i className="bx bx-timer"></i>
                                <span className="links-name">Time Sheet</span>
                            </NavLink>
                            <span className="tooltip">Time Sheet</span>
                        </li>

                        <li>
                            <NavLink to="/admin/create">
                                <i className="bx bx-user-plus"></i>
                                <span className="links-name">Create User</span>
                            </NavLink>
                            <span className="tooltip">Create User</span>
                        </li>

                        <li>
                            <NavLink to="/admin/change-user-password">
                                <i className="bx bxs-user-account"></i>
                                <span className="links-name">Staff's Account</span>
                            </NavLink>
                            <span className="tooltip">Staff's Account</span>
                        </li>

                        {/* <li>
                            <a href="/#">
                                <i className="bx bx-folder"></i>
                                <span className="links-name">File Manager</span>
                            </a>
                            <span className="tooltip">File Manager</span>
                        </li>

                        <li>
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

export default NavbarAdmin;
