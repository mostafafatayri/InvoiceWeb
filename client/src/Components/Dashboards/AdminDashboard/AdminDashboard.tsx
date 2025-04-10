import React, { useState ,useEffect} from "react";
import { useOutletContext } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./AdminSubscription.scss";
import { FaCheckCircle, FaTimesCircle, FaSearch } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { fetchAllUsers ,deleteUserById} from "../../../Services/AdminServices/AdminActions";
import type { FetchUsersResponse ,BackendUser} from "../../../Services/AdminServices/AdminActions"; // ✅ Add this




interface Subscriber {
  id: number;
  //
  uuid:string,
  //
  name: string;
  email: string;
  plan: string;
  status: "Active" | "Pending" | "Canceled";
  nextBillingDate: string;
}

const AdminSubscription: React.FC = () => {
  const { isSidebarOpen } = useOutletContext<{ isSidebarOpen: boolean }>();
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [localSubscribers, setLocalSubscribers] = useState<Subscriber[]>([]); ///

  const toggleMenu = (id: number) => {
    setOpenMenuId(prev => (prev === id ? null : id));
  };
  
  // Fetch users using React Query
  const { data, isLoading, error } = useQuery<FetchUsersResponse>({
    queryKey: ["users"],
    queryFn: fetchAllUsers,
  });
  

  // Transform backend data to fit your UI table structure
 /* const transformedSubscribers: Subscriber[] =
    data?.success && data.data
      ? data.data.map((user: BackendUser , index: number) => ({
          id: index + 1,
          uuid:`${user.id}`,
          name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
          email: user.email || "N/A",
          plan: "Basic", // You can change this if real plan data is available
          status: user.isActive ? "Active" : "Pending",
          nextBillingDate: "-", // Adjust if your API includes this
        }))
      : [];

  // Filter subscribers based on search input
  const filteredSubscribers = transformedSubscribers.filter((subscriber) =>
    [subscriber.name, subscriber.email, subscriber.plan, subscriber.status]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );*/
  useEffect(() => {
    if (data?.success && data.data) {
      const transformed = data.data.map((user: BackendUser, index: number): Subscriber => ({
        id: index + 1,
        uuid: `${user.id}`,
        name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
        email: user.email || "N/A",
        plan: "Basic",
        status: user.isActive ? "Active" : "Pending",
        nextBillingDate: "-",
      }));
      setLocalSubscribers(transformed);
    }
  }, [data]);

  const filteredSubscribers = localSubscribers.filter((subscriber) =>
    [subscriber.name, subscriber.email, subscriber.plan, subscriber.status]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
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
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      
      {isLoading ? (
        <p>Loading users...</p>
      ) : error || !data?.success ? (
        <p>Error fetching users. Please try again later.</p>
      ) : (
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
              {filteredSubscribers.map((subscriber) => (
                <tr key={subscriber.id}>  
                  <td>{subscriber.id}</td>
                  <td>{subscriber.name}</td>
                  <td>{subscriber.email}</td>
                  <td>{subscriber.plan}</td>
                  <td className={subscriber.status.toLowerCase()}>
                    {subscriber.status === "Active" ? (
                      <FaCheckCircle className="active-icon" />
                    ) : (
                      <FaTimesCircle className="inactive-icon" />
                    )}
                    {t(`admin.subscription.status.${subscriber.status.toLowerCase()}`)}
                  </td>
                  <td>{subscriber.nextBillingDate}</td>
                  
                  <td style={{ position: "relative" }}>
                     <button className="manage-btn" onClick={() => toggleMenu(subscriber.id)}>
                      {t("admin.subscription.buttons.manage")}
                     </button>
                    {openMenuId === subscriber.id && (
                   <div className="dropdown-menu">
                      <button onClick={() => console.log("View", subscriber)}>{t("admin.subscription.buttons.view")}</button>
                      <button onClick={() => console.log("Edit", subscriber)}>{t("admin.subscription.buttons.edit")}</button>
                      <button
                      onClick={async () => {
                      const confirmDelete = window.confirm(`Are you sure you want to delete ${subscriber.name}?`);
                      if (confirmDelete) {
                      const result = await deleteUserById(subscriber.uuid);
                      if (result.success) {
                        alert("User deleted successfully.");
                        setLocalSubscribers(prev => prev.filter(u => u.uuid !== subscriber.uuid)); // ✅ this line removes the <tr> in UI
                  
          
                     
                      } else {
                      alert(result.message);
                     }
                    }
                }}
              >
               {t("admin.subscription.buttons.delete")}
            </button>

                   </div>
                  )}
                  </td>

                    
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminSubscription;


/*import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./AdminSubscription.scss";
import { FaCheckCircle, FaTimesCircle, FaSearch } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { fetchAllUsers ,deleteUserById} from "../../../Services/AdminServices/AdminActions";
import type { FetchUsersResponse ,BackendUser} from "../../../Services/AdminServices/AdminActions"; // ✅ Add this




interface Subscriber {
  id: number;
  //
  uuid:string,
  //
  name: string;
  email: string;
  plan: string;
  status: "Active" | "Pending" | "Canceled";
  nextBillingDate: string;
}

const AdminSubscription: React.FC = () => {
  const { isSidebarOpen } = useOutletContext<{ isSidebarOpen: boolean }>();
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const toggleMenu = (id: number) => {
    setOpenMenuId(prev => (prev === id ? null : id));
  };
  
  // Fetch users using React Query
  const { data, isLoading, error } = useQuery<FetchUsersResponse>({
    queryKey: ["users"],
    queryFn: fetchAllUsers,
  });
  

  // Transform backend data to fit your UI table structure
  const transformedSubscribers: Subscriber[] =
    data?.success && data.data
      ? data.data.map((user: BackendUser , index: number) => ({
          id: index + 1,
          uuid:`${user.id}`,
          name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
          email: user.email || "N/A",
          plan: "Basic", // You can change this if real plan data is available
          status: user.isActive ? "Active" : "Pending",
          nextBillingDate: "-", // Adjust if your API includes this
        }))
      : [];

  // Filter subscribers based on search input
  const filteredSubscribers = transformedSubscribers.filter((subscriber) =>
    [subscriber.name, subscriber.email, subscriber.plan, subscriber.status]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
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
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      
      {isLoading ? (
        <p>Loading users...</p>
      ) : error || !data?.success ? (
        <p>Error fetching users. Please try again later.</p>
      ) : (
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
              {filteredSubscribers.map((subscriber) => (
                <tr key={subscriber.id}>
                  <td>{subscriber.id}</td>
                  <td>{subscriber.name}</td>
                  <td>{subscriber.email}</td>
                  <td>{subscriber.plan}</td>
                  <td className={subscriber.status.toLowerCase()}>
                    {subscriber.status === "Active" ? (
                      <FaCheckCircle className="active-icon" />
                    ) : (
                      <FaTimesCircle className="inactive-icon" />
                    )}
                    {t(`admin.subscription.status.${subscriber.status.toLowerCase()}`)}
                  </td>
                  <td>{subscriber.nextBillingDate}</td>
                  
                  <td style={{ position: "relative" }}>
                     <button className="manage-btn" onClick={() => toggleMenu(subscriber.id)}>
                      {t("admin.subscription.buttons.manage")}
                     </button>
                    {openMenuId === subscriber.id && (
                   <div className="dropdown-menu">
                      <button onClick={() => console.log("View", subscriber)}>{t("admin.subscription.buttons.view")}</button>
                      <button onClick={() => console.log("Edit", subscriber)}>{t("admin.subscription.buttons.edit")}</button>
                      <button
                      onClick={async () => {
                      const confirmDelete = window.confirm(`Are you sure you want to delete ${subscriber.name}?`);
                      if (confirmDelete) {
                      const result = await deleteUserById(subscriber.uuid);
                      if (result.success) {
                      alert("User deleted successfully.");
                     
                      } else {
                      alert(result.message);
                     }
                    }
                }}
              >
               {t("admin.subscription.buttons.delete")}
            </button>

                   </div>
                  )}
                  </td>

                    
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminSubscription;*/

