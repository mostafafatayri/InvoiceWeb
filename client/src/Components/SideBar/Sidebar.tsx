import React from "react";
import { useTranslation } from "react-i18next"; // Import translation hook
import { FaHome, FaFileInvoice, FaUsers, FaCog, FaBars, FaTimes, FaCommentDots, FaCreditCard, FaChartBar, FaGlobe } from "react-icons/fa";
import "./Sidebar.scss";
import { Link } from "react-router-dom";

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, toggleSidebar }) => {
  const { t, i18n } = useTranslation(); // Access translations

  // Function to change language
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
      {/* Toggle Button */}
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Logo */}
      <div className="logo">
        <h2>{isSidebarOpen ? "Invoicer" : ""}</h2>
      </div>

      {/* Sidebar Menu */}
      <ul className="menu">
        <li>
        <Link to="/Dashboard" className="sidebar-link">
            <FaHome className="icon" />
            {isSidebarOpen && <span>{t("sidebar.dashboard")}</span>}
          
          </Link>
        </li>
        <li>
          <Link to="/admin/subscribers" className="sidebar-link">
            <FaFileInvoice className="icon" />
            {isSidebarOpen && <span>{t("sidebar.invoices")}</span>}
          </Link>
        </li>
        <li>
        <Link to="/admin/subscribers" className="sidebar-link">
            <FaUsers className="icon" />
            {isSidebarOpen && <span>{t("sidebar.clients")}</span>}
        </Link>
        </li>
        
        <li>
             <Link to="/subscriptions" className="sidebar-link">
             <FaCreditCard className="icon" />
             {isSidebarOpen && <span>{t("sidebar.subscription")}</span>}
             </Link>
         </li>


        <li>
          <a href="#">
            <FaChartBar className="icon" />
            {isSidebarOpen && <span>{t("sidebar.sales")}</span>}
          </a>
        </li>
        <li>
          <a href="#">
            <FaCommentDots className="icon" />
            {isSidebarOpen && <span>{t("sidebar.support")}</span>}
          </a>
        </li>
        <li>
          <a href="#">
            <FaCog className="icon" />
            {isSidebarOpen && <span>{t("sidebar.settings")}</span>}
          </a>
        </li>
      </ul>

      {/* Language Selector */}
      <div className="language-selector">
        <FaGlobe className="icon" />
        <select onChange={(e) => changeLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="ar">العربية</option>
        </select>
      </div>

    </div>
  );
};

export default Sidebar;


/*import React from "react";
import { FaHome, FaFileInvoice, FaUsers, FaCog, FaBars, FaTimes, FaCommentDots, FaCreditCard, FaChartBar } from "react-icons/fa";
import "./Sidebar.scss";

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
     
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

    
      <div className="logo">
        <h2>{isSidebarOpen ? "Invoicer" : "I"}</h2>
      </div>

     
      <ul className="menu">
        <li>
          <a href="#">
            <FaHome className="icon" />
            {isSidebarOpen && <span>Dashboard</span>}
          </a>
        </li>
        <li>
          <a href="#">
            <FaFileInvoice className="icon" />
            {isSidebarOpen && <span>Invoices</span>}
          </a>
        </li>
        <li>
          <a href="#">
            <FaUsers className="icon" />
            {isSidebarOpen && <span>Clients</span>}
          </a>
        </li>
        <li>
          <a href="#">
            <FaCreditCard className="icon" />
            {isSidebarOpen && <span>Subscription</span>}
          </a>
        </li>
        <li>
          <a href="#">
            <FaChartBar className="icon" />
            {isSidebarOpen && <span>Sales</span>}
          </a>
        </li>
        <li>
          <a href="#">
            <FaCommentDots className="icon" />
            {isSidebarOpen && <span>Support</span>}
          </a>
        </li>
        <li>
          <a href="#">
            <FaCog className="icon" />
            {isSidebarOpen && <span>Settings</span>}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
*/