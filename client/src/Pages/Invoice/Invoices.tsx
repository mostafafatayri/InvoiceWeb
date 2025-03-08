import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaSearch, FaFileInvoiceDollar, FaFilter, FaEye, FaDownload, FaEdit, FaTrash } from "react-icons/fa";
import "./Invoices.scss";

const sampleInvoices = [
  { id: "INV-001", client: "John Doe", date: "2024-03-01", due: "2024-03-15", amount: "$200.00", status: "Paid" },
  { id: "INV-002", client: "Alice Smith", date: "2024-03-05", due: "2024-03-20", amount: "$350.00", status: "Pending" },
  { id: "INV-003", client: "Mark Johnson", date: "2024-02-15", due: "2024-03-01", amount: "$150.00", status: "Overdue" },
];

const Invoices: React.FC = () => {
  const { isSidebarOpen } = useOutletContext<{ isSidebarOpen: boolean }>();
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className={`invoices-page ${isSidebarOpen ? "" : "expanded"}`}>
      <h2>{t("invoices.title")}</h2>
      <div className="top-bar">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder={t("invoices.searchPlaceholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="filter-btn"><FaFilter /> {t("invoices.filter")}</button>
        <button className="new-invoice-btn"><FaFileInvoiceDollar /> {t("invoices.newInvoice")}</button>
      </div>

      <table className="invoice-table">
        <thead>
          <tr>
            <th>{t("invoices.invoiceNo")}</th>
            <th>{t("invoices.client")}</th>
            <th>{t("invoices.date")}</th>
            <th>{t("invoices.dueDate")}</th>
            <th>{t("invoices.amount")}</th>
            <th>{t("invoices.status")}</th>
            <th>{t("invoices.actions")}</th>
          </tr>
        </thead>
        <tbody>
          {sampleInvoices.filter(inv => inv.client.toLowerCase().includes(searchTerm.toLowerCase())).map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.id}</td>
              <td>{invoice.client}</td>
              <td>{invoice.date}</td>
              <td>{invoice.due}</td>
              <td>{invoice.amount}</td>
              <td>

              <td>
  <span className={`status ${invoice.status.toLowerCase()}`}>
    { (t("invoices.status", { returnObjects: true }) as Record<string, string>)[invoice.status.toLowerCase()] }
  </span>
</td>


              </td>
              <td className="actions">
                <FaEye className="view-icon" />
                <FaDownload className="download-icon" />
                <FaEdit className="edit-icon" />
                <FaTrash className="delete-icon" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Invoices;
