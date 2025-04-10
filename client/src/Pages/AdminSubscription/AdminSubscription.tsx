
import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./AdminSubscription.scss";
import { FaCheckCircle, FaTimesCircle, FaSearch } from "react-icons/fa";
  
interface Subscriber {
  id: number;
  name: string;
  email: string;
  plan: string;
  status: "Active" | "Pending" | "Canceled";
  nextBillingDate: string;
}

const sampleSubscribers: Subscriber[] = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", plan: "Pro", status: "Active", nextBillingDate: "2025-04-01" },
  { id: 2, name: "Alice Johnson", email: "alice.j@example.com", plan: "Basic", status: "Pending", nextBillingDate: "2025-03-15" },
  { id: 3, name: "Mark Smith", email: "mark.smith@example.com", plan: "Enterprise", status: "Active", nextBillingDate: "2025-03-28" },
  { id: 4, name: "Sara Lee", email: "sara.lee@example.com", plan: "Basic", status: "Canceled", nextBillingDate: "-" },
];

const AdminSubscription: React.FC = () => {
  const { isSidebarOpen } = useOutletContext<{ isSidebarOpen: boolean }>();
  const { t } = useTranslation();
  const [subscribers, setSubscribers] = useState<Subscriber[]>(sampleSubscribers);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Simulating an API call that updates the subscribers
    setTimeout(() => {
      setSubscribers([...sampleSubscribers, { id: 5, name: "New User", email: "new@example.com", plan: "Pro", status: "Active", nextBillingDate: "2025-05-10" }]);
    }, 2000);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredSubscribers = subscribers.filter(subscriber =>
    subscriber.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subscriber.plan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subscriber.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`admin-subscription-page ${isSidebarOpen ? "" : "expanded"}`}>
      <h2>{t("admin.subscription.title")}</h2>
      <p>{t("admin.subscription.description")}</p>

      <div className="search-filter">
        <div className="search-bar">
          <FaSearch className="icon" />
          <input
            type="text"
            placeholder={t("admin.subscription.search_placeholder")}
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>{t("admin.subscription.table.id")}</th>
              <th>{t("admin.subscription.table.name")}</th>
              <th>{t("admin.subscription.table.email")}</th>
              <th>{t("admin.subscription.table.plan")}</th>
              <th>{t("admin.subscription.table.status")}</th>
              <th>{t("admin.subscription.table.next_billing")}</th>
              <th>{t("admin.subscription.table.actions")}</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubscribers.map(subscriber => (
              <tr key={subscriber.id}>
                <td>{subscriber.id}</td>
                <td>{subscriber.name}</td>
                <td>{subscriber.email}</td>
                <td>{subscriber.plan}</td>
                <td className={subscriber.status.toLowerCase()}>
                  {subscriber.status === "Active" ? <FaCheckCircle className="active-icon" /> : <FaTimesCircle className="inactive-icon" />}
                  {t(`admin.subscription.status.${subscriber.status.toLowerCase()}`)}
                </td>
                <td>{subscriber.nextBillingDate}</td>
                <td>
                  <button className="manage-btn">{t("admin.subscription.buttons.manage")}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminSubscription;
