import React from "react";
import "./Navbar.scss";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="logo">
          <span className="logo-icon">📄</span> Invoicer
        </div>

        {/* Navigation Links */}
        <ul className="nav-links">
          <li><a href="#">Dashboard</a></li>
          <li><a href="#">Invoices</a></li>
          <li><a href="#">Clients</a></li>
          <li><a href="#">Settings</a></li>
        </ul>

        {/* User Profile */}
        <div className="user-profile">
          <img src="https://via.placeholder.com/40" alt="User" className="user-avatar" />
          <span className="user-name">John Doe</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
