import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import Translation Hook
import {
  FaUser, FaEnvelope, FaPhone, FaBuilding, FaBriefcase, FaCreditCard,
  FaLock, FaBell, FaKey, FaCamera
} from "react-icons/fa";
import "./Profile.scss";

const Profile: React.FC = () => {
  const { isSidebarOpen } = useOutletContext<{ isSidebarOpen: boolean }>();
  const { t } = useTranslation(); // Access translations
  const [activeSection, setActiveSection] = useState("user");

  return (
    <div className={`profile-page ${isSidebarOpen ? "" : "expanded"}`}>
      <h2>{t("profile.title")}</h2>

      <div className="profile-container">
        {/* Profile Menu */}
        <aside className="profile-menu">
          <button className={activeSection === "user" ? "active" : ""} onClick={() => setActiveSection("user")}>
            <FaUser /> {t("profile.user_info")}
          </button>
          <button className={activeSection === "company" ? "active" : ""} onClick={() => setActiveSection("company")}>
            <FaBuilding /> {t("profile.company_info")}
          </button>
          <button className={activeSection === "billing" ? "active" : ""} onClick={() => setActiveSection("billing")}>
            <FaCreditCard /> {t("profile.billing")}
          </button>
          <button className={activeSection === "security" ? "active" : ""} onClick={() => setActiveSection("security")}>
            <FaLock /> {t("profile.security")}
          </button>
          <button className={activeSection === "notifications" ? "active" : ""} onClick={() => setActiveSection("notifications")}>
            <FaBell /> {t("profile.notifications")}
          </button>
        </aside>

        {/* Profile Content */}
        <div className="profile-content">
          {/* User Info */}
          {activeSection === "user" && (
            <div className="section">
              <h3>{t("profile.user_information")}</h3>
              <div className="avatar-container">
                <img src="https://robbreport.com/wp-content/uploads/2024/02/RR_2024_F1_Car_Roundup_lead.jpg?w=1024" alt="User Avatar" className="avatar" />
                <label className="upload-btn">
                  <FaCamera className="camera-icon" />
                  <input type="file" accept="image/*" hidden />
                </label>
              </div>
              <div className="input-group">
                <label><FaUser className="input-icon" /> {t("profile.name")}</label>
                <input type="text" placeholder="John Doe" />
              </div>
              <div className="input-group">
                <label><FaEnvelope className="input-icon" /> {t("profile.email")}</label>
                <input type="email" placeholder="john.doe@example.com" />
              </div>
              <div className="input-group">
                <label><FaPhone className="input-icon" /> {t("profile.phone")}</label>
                <input type="tel" placeholder="+1 234 567 890" />
              </div>
            </div>
          )}

          {/* Company Info */}
          {activeSection === "company" && (
            <div className="section">
              <h3>{t("profile.company_information")}</h3>
              <div className="input-group">
                <label><FaBuilding className="input-icon" /> {t("profile.company")}</label>
                <input type="text" placeholder="Invoicer Inc." />
              </div>
              <div className="input-group">
                <label><FaBriefcase className="input-icon" /> {t("profile.role")}</label>
                <input type="text" placeholder="Administrator" />
              </div>
            </div>
          )}

          {/* Billing */}
          {activeSection === "billing" && (
            <div className="section">
              <h3>{t("profile.billing_subscription")}</h3>
              <div className="input-group">
                <label><FaCreditCard className="input-icon" /> {t("profile.payment_method")}</label>
                <input type="text" placeholder="Visa **** 1234" />
              </div>
            </div>
          )}

          {/* Security */}
          {activeSection === "security" && (
            <div className="section">
              <h3>{t("profile.security_settings")}</h3>
              <div className="input-group">
                <label><FaLock className="input-icon" /> {t("profile.change_password")}</label>
                <input type="password" placeholder="********" />
              </div>
              <div className="input-group">
                <label><FaKey className="input-icon" /> {t("profile.two_factor_auth")}</label>
                <select>
                  <option>{t("profile.enabled")}</option>
                  <option>{t("profile.disabled")}</option>
                </select>
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeSection === "notifications" && (
            <div className="section">
              <h3>{t("profile.notifications_settings")}</h3>
              <div className="input-group">
                <label><FaBell className="input-icon" /> {t("profile.email_notifications")}</label>
                <select>
                  <option>{t("profile.enabled")}</option>
                  <option>{t("profile.disabled")}</option>
                </select>
              </div>
            </div>
          )}

          <button type="submit" className="save-btn">{t("profile.save_changes")}</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;




/*import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  FaUser, FaEnvelope, FaPhone, FaBuilding, FaBriefcase, FaCreditCard,
  FaLock, FaBell, FaKey, FaCamera
} from "react-icons/fa";
import "./Profile.scss";

const Profile: React.FC = () => {
  const { isSidebarOpen } = useOutletContext<{ isSidebarOpen: boolean }>();
  const [activeSection, setActiveSection] = useState("user");

  return (
    <div className={`profile-page ${isSidebarOpen ? "" : "expanded"}`}>
      <h2>Profile Settings</h2>

      <div className="profile-container">
       
        <aside className="profile-menu">
          <button className={activeSection === "user" ? "active" : ""} onClick={() => setActiveSection("user")}>
            <FaUser /> User Info
          </button>
          <button className={activeSection === "company" ? "active" : ""} onClick={() => setActiveSection("company")}>
            <FaBuilding /> Company Info
          </button>
          <button className={activeSection === "billing" ? "active" : ""} onClick={() => setActiveSection("billing")}>
            <FaCreditCard /> Billing
          </button>
          <button className={activeSection === "security" ? "active" : ""} onClick={() => setActiveSection("security")}>
            <FaLock /> Security
          </button>
          <button className={activeSection === "notifications" ? "active" : ""} onClick={() => setActiveSection("notifications")}>
            <FaBell /> Notifications
          </button>
        </aside>

      
        <div className="profile-content">
         
          {activeSection === "user" && (
            <div className="section">
              <h3>User Information</h3>
             
              <div className="avatar-container">
  <img src="https://robbreport.com/wp-content/uploads/2024/02/RR_2024_F1_Car_Roundup_lead.jpg?w=1024" alt="User Avatar" className="avatar" />
  <label className="upload-btn">
    <FaCamera className="camera-icon" />
    <input type="file" accept="image/*" hidden />
  </label>
</div>

              <div className="input-group">
                <label><FaUser className="input-icon" /> Name</label>
                <input type="text" placeholder="John Doe" />
              </div>
              <div className="input-group">
                <label><FaEnvelope className="input-icon" /> Email</label>
                <input type="email" placeholder="john.doe@example.com" />
              </div>
              <div className="input-group">
                <label><FaPhone className="input-icon" /> Phone</label>
                <input type="tel" placeholder="+1 234 567 890" />
              </div>
            </div>
          )}

         
          {activeSection === "company" && (
            <div className="section">
              <h3>Company Information</h3>
              <div className="input-group">
                <label><FaBuilding className="input-icon" /> Company</label>
                <input type="text" placeholder="Invoicer Inc." />
              </div>
              <div className="input-group">
                <label><FaBriefcase className="input-icon" /> Role</label>
                <input type="text" placeholder="Administrator" />
              </div>
            </div>
          )}

          
          {activeSection === "billing" && (
            <div className="section">
              <h3>Billing & Subscription</h3>
              <div className="input-group">
                <label><FaCreditCard className="input-icon" /> Payment Method</label>
                <input type="text" placeholder="Visa **** 1234" />
              </div>
            </div>
          )}

         
          {activeSection === "security" && (
            <div className="section">
              <h3>Security Settings</h3>
              <div className="input-group">
                <label><FaLock className="input-icon" /> Change Password</label>
                <input type="password" placeholder="********" />
              </div>
              <div className="input-group">
                <label><FaKey className="input-icon" /> Two-Factor Authentication</label>
                <select>
                  <option>Enabled</option>
                  <option>Disabled</option>
                </select>
              </div>
            </div>
          )}

          
          {activeSection === "notifications" && (
            <div className="section">
              <h3>Notifications</h3>
              <div className="input-group">
                <label><FaBell className="input-icon" /> Email Notifications</label>
                <select>
                  <option>Enabled</option>
                  <option>Disabled</option>
                </select>
              </div>
            </div>
          )}

          <button type="submit" className="save-btn">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;*/
