import "./assets/css/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/layouts/Landing";
import Auth from "./views/Auth";
import AuthContextProvider from "./contexts/AuthContext";
import Dashboard from "./views/Dashboard";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import InfoContextProvider from "./contexts/InfoContext";
import Information from "./views/Information";
import Staffs from "./views/Staffs";
import StaffContextProvider from "./contexts/StaffContext";
import ShiftContextProvider from "./contexts/ShiftContext";
import Shift from "./views/ShiftTable";
import CreateUser from "./views/CreateUser";
import ShiftAdminContextProvider from "./contexts/ShiftAdminContext";
import AdminShift from "./views/AdminShift";
import ChangePassword from "./views/ChangePassword";
import AdminChangePassword from "./views/AdminChangePassword";
import Timekeeping from "./views/Timekeeping";
import SalaryContextProvider from "./contexts/SalaryContext";
import AdminSalary from "./views/AdminSalary";

function App() {
    return (
        <AuthContextProvider>
            <InfoContextProvider>
                <StaffContextProvider>
                    <ShiftAdminContextProvider>
                        <ShiftContextProvider>
                            <SalaryContextProvider>
                                <Router>
                                    <Routes>
                                        <Route exact path="/" element={<Landing />}></Route>
                                        <Route
                                            exact
                                            path="/login"
                                            element={<Auth authRoute="login" />}
                                        ></Route>
                                        <Route
                                            exact
                                            path="/help"
                                            element={<Auth authRoute="help" />}
                                        ></Route>
                                        {/* Admin */}

                                        <Route
                                            exact
                                            path="/admin/dashboard"
                                            element={
                                                <ProtectedRoute>
                                                    <Dashboard />
                                                </ProtectedRoute>
                                            }
                                        ></Route>
                                        <Route
                                            exact
                                            path="/admin/information"
                                            element={
                                                <ProtectedRoute>
                                                    <Information />
                                                </ProtectedRoute>
                                            }
                                        ></Route>
                                        <Route
                                            exact
                                            path="/admin/staffs"
                                            element={
                                                <ProtectedRoute>
                                                    <Staffs />
                                                </ProtectedRoute>
                                            }
                                        ></Route>
                                        <Route
                                            exact
                                            path="/admin/create"
                                            element={
                                                <ProtectedRoute>
                                                    <CreateUser />
                                                </ProtectedRoute>
                                            }
                                        ></Route>
                                        <Route
                                            exact
                                            path="/admin/shifts"
                                            element={
                                                <ProtectedRoute>
                                                    <AdminShift />
                                                </ProtectedRoute>
                                            }
                                        ></Route>
                                        <Route
                                            exact
                                            path="/admin/timesheet"
                                            element={
                                                <ProtectedRoute>
                                                    <AdminSalary />
                                                </ProtectedRoute>
                                            }
                                        ></Route>
                                        <Route
                                            exact
                                            path="/admin/change-user-password"
                                            element={
                                                <ProtectedRoute>
                                                    <AdminChangePassword />
                                                </ProtectedRoute>
                                            }
                                        ></Route>

                                        {/* User */}
                                        <Route
                                            exact
                                            path="/user/dashboard"
                                            element={
                                                <ProtectedRoute>
                                                    <Dashboard />
                                                </ProtectedRoute>
                                            }
                                        ></Route>
                                        <Route
                                            exact
                                            path="/user/information"
                                            element={
                                                <ProtectedRoute>
                                                    <Information />
                                                </ProtectedRoute>
                                            }
                                        ></Route>
                                        <Route
                                            exact
                                            path="/user/shift"
                                            element={
                                                <ProtectedRoute>
                                                    <Shift />
                                                </ProtectedRoute>
                                            }
                                        ></Route>
                                        <Route
                                            exact
                                            path="/user/change_password"
                                            element={
                                                <ProtectedRoute>
                                                    <ChangePassword />
                                                </ProtectedRoute>
                                            }
                                        ></Route>
                                        <Route
                                            exact
                                            path="/user/Salary"
                                            element={
                                                <ProtectedRoute>
                                                    <Timekeeping />
                                                </ProtectedRoute>
                                            }
                                        ></Route>
                                    </Routes>
                                </Router>
                            </SalaryContextProvider>
                        </ShiftContextProvider>
                    </ShiftAdminContextProvider>
                </StaffContextProvider>
            </InfoContextProvider>
        </AuthContextProvider>
    );
}

export default App;
