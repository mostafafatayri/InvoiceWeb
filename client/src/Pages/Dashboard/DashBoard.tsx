import React from "react";
import { FaFileInvoiceDollar, FaCheckCircle, FaHourglassHalf, FaPlus } from "react-icons/fa";
import "./Dashboard.scss";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { useOutletContext } from "react-router-dom"; // Import for getting sidebar state

Chart.register(...registerables);

const Dashboard: React.FC = () => {
  // Get sidebar state from Outlet context
  const { isSidebarOpen } = useOutletContext<{ isSidebarOpen: boolean }>();

  // Sample Data for Summary Cards
  const summaryData = [
    { title: "Total Invoices", value: "$152.9k", icon: <FaFileInvoiceDollar />, change: "+1.5%" },
    { title: "Paid Invoices", value: "$109.3k", icon: <FaCheckCircle />, change: "-0.47%" },
    { title: "Pending Invoices", value: "$43k", icon: <FaHourglassHalf />, change: "-0.75%" },
  ];

  // Chart Data
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Cash Flow",
        data: [40, 45, 50, 55, 60, 70, 65, 80, 85, 90, 95, 100],
        borderColor: "#4a90e2",
        backgroundColor: "rgba(74, 144, 226, 0.2)",
        tension: 0.3,
      },
    ],
  };

  // Sample Invoices
  const invoices = [
    { id: "BF82349", customer: "Robert Baratheon", status: "Paid", amount: "$928.41", due: "7/17/19" },
    { id: "ECF7C97", customer: "Arlene McCoy", status: "Overdue", amount: "$399.64", due: "9/23/16" },
    { id: "FA03817", customer: "Deven Lane", status: "Due Soon", amount: "$490.51", due: "3/4/19" },
    { id: "FA03817", customer: "Ronald Richards", status: "Partially Paid", amount: "$601.13", due: "5/27/15" },
  ];

  return (
    <div className={`dashboard ${isSidebarOpen ? "" : "expanded"}`}>
      <h2>Dashboard</h2>

      {/* Summary Cards */}
      <div className="summary-cards">
        {summaryData.map((card, index) => (
          <div className="card" key={index}>
            <div className="card-icon">{card.icon}</div>
            <div className="card-info">
              <h4>{card.title}</h4>
              <p>{card.value}</p>
              <small>{card.change} this month</small>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="chart-container">
        <h3>Cash Flow</h3>
        <Line data={chartData} />
      </div>

      {/* Recent Invoices Table */}
      <div className="invoices-section">
        <h3>All Invoices</h3>
        <button className="new-invoice-btn">
          <FaPlus /> New Invoice
        </button>
        <table>
          <thead>
            <tr>
              <th>Invoice Number</th>
              <th>Customer Name</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td>{invoice.id}</td>
                <td>{invoice.customer}</td>
                <td className={`status ${invoice.status.toLowerCase().replace(" ", "-")}`}>{invoice.status}</td>
                <td>{invoice.amount}</td>
                <td>{invoice.due}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
