import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBox,
  FaFileAlt,
  FaCog,
  FaUser,
  FaPen,
  FaCashRegister,
  FaMarker,
  FaTable,
  FaDatabase,
  FaUserFriends,
  FaWrench,
  FaMoneyBillWaveAlt,
  FaAngleLeft,
  FaAngleRight,
  FaAngrycreative,
} from "react-icons/fa";
import "./Navbar.css";
import exxicon from './images/blue2.png';

const Navbar = ({ darkMode, onToggleSidebar }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    onToggleSidebar?.(!isCollapsed);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button className="mobile-menu-toggle" onClick={() => setIsMobileOpen(!isMobileOpen)}>
        ☰
      </button>

      {/* Overlay for mobile sidebar */}
      {isMobileOpen && (
        <div className="sidebar-overlay" onClick={() => setIsMobileOpen(false)}></div>
      )}

      <div className={`sidebar ${darkMode ? "dark" : ""} ${isCollapsed ? "collapsed" : ""} ${isMobileOpen ? "open" : ""}`}>
        <button className={`sidebar-toggle ${darkMode ? "dark" : ""}`} onClick={toggleSidebar}>
          {isCollapsed ? <FaAngleRight /> : <FaAngleLeft />}
        </button>

        <div className={`sidebar-logo ${darkMode ? "dark" : ""}`}>
          <img src={exxicon} alt="logo" width="30" height="30" className="logo" />
        </div>

        <ul className="sidebar-menu">
          <li><NavLink to="/Dashboard" className={({ isActive }) => isActive ? "sidebar-link active-link" : "sidebar-link"} onClick={() => isMobileOpen && setIsMobileOpen(false)}><FaTachometerAlt className="icon" /><span>DASHBOARD</span></NavLink></li>
          <li><NavLink to="/productsRepair" className={({ isActive }) => isActive ? "sidebar-link active-link" : "sidebar-link"} onClick={() => isMobileOpen && setIsMobileOpen(false)}><FaWrench className="icon" /><span>JOB LIST</span></NavLink></li>
          <li><NavLink to="/products" className={({ isActive }) => isActive ? "sidebar-link active-link" : "sidebar-link"} onClick={() => isMobileOpen && setIsMobileOpen(false)}><FaBox className="icon" /><span>PRODUCT</span></NavLink></li>
          <li><NavLink to="/StockUpdateList" className={({ isActive }) => isActive ? "sidebar-link active-link" : "sidebar-link"} onClick={() => isMobileOpen && setIsMobileOpen(false)}><FaPen className="icon" /><span>STOCK UPDATE</span></NavLink></li>
          <li><NavLink to="/SupplierList" className={({ isActive }) => isActive ? "sidebar-link active-link" : "sidebar-link"} onClick={() => isMobileOpen && setIsMobileOpen(false)}><FaUserFriends className="icon" /><span>SUPPLIER LIST</span></NavLink></li>
          <li><NavLink to="/payment" className={({ isActive }) => isActive ? "sidebar-link active-link" : "sidebar-link"} onClick={() => isMobileOpen && setIsMobileOpen(false)}><FaFileAlt className="icon" /><span>PAYMENT</span></NavLink></li>
          <li><NavLink to="/PaymentTable" className={({ isActive }) => isActive ? "sidebar-link active-link" : "sidebar-link"} onClick={() => isMobileOpen && setIsMobileOpen(false)}><FaDatabase className="icon" /><span>PAYMENT TABLE</span></NavLink></li>
          <li><NavLink to="/maintenance-list" className={({ isActive }) => isActive ? "sidebar-link active-link" : "sidebar-link"} onClick={() => isMobileOpen && setIsMobileOpen(false)}><FaCog className="icon" /><span>MAINTENANCE</span></NavLink></li>
          <li><NavLink to="/CashierAttendance" className={({ isActive }) => isActive ? "sidebar-link active-link" : "sidebar-link"} onClick={() => isMobileOpen && setIsMobileOpen(false)}><FaMarker className="icon" /><span>ATTENDANCE</span></NavLink></li>
          <li><NavLink to="/CashierAttendanceTable" className={({ isActive }) => isActive ? "sidebar-link active-link" : "sidebar-link"} onClick={() => isMobileOpen && setIsMobileOpen(false)}><FaTable className="icon" /><span>ATTENDANCE LIST</span></NavLink></li>
          <li><NavLink to="/cashiers" className={({ isActive }) => isActive ? "sidebar-link active-link" : "sidebar-link"} onClick={() => isMobileOpen && setIsMobileOpen(false)}><FaCashRegister className="icon" /><span>EMPLOYEES</span></NavLink></li>
          <li><NavLink to="/Users" className={({ isActive }) => isActive ? "sidebar-link active-link" : "sidebar-link"} onClick={() => isMobileOpen && setIsMobileOpen(false)}><FaUser className="icon" /><span>USERS</span></NavLink></li>
          <li><NavLink to="/salaries" className={({ isActive }) => isActive ? "sidebar-link active-link" : "sidebar-link"} onClick={() => isMobileOpen && setIsMobileOpen(false)}><FaMoneyBillWaveAlt className="icon" /><span>SALARIES</span></NavLink></li>
          <li><NavLink to="/ShopSettings" className={({ isActive }) => isActive ? "sidebar-link active-link" : "sidebar-link"} onClick={() => isMobileOpen && setIsMobileOpen(false)}><FaAngrycreative className="icon" /><span>BILL SETTING</span></NavLink></li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
