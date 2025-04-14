import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./SecurityRoles.scss";
import { FaCheckCircle, FaTimesCircle, FaSearch } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { fetchAllRoles } from "../../Services/AdminServices/AdminActions";
import type { FetchzRolesResponse, Roles } from "../../Services/AdminServices/AdminActions";
//import { useUserState } from "../../Reducers/UserReducer/UserContext";
interface Role {  
  id: number;
  uuid: string;
  name: string;
  description:string,
  isSuperAdmin: string;
 // status: "Active" | "Pending" | "Canceled";

}

const ROW_OPTIONS = [5, 10, 25, 50, 100];
const PAGE_LIMIT = 5;

const RolePage: React.FC = () => {

  const { isSidebarOpen } = useOutletContext<{ isSidebarOpen: boolean }>();
  const { t } = useTranslation();

  const [searchTerm, setSearchTerm] = useState("");
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [localSubscribers, setLocalSubscribers] = useState<Role[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data, isLoading, error } = useQuery<FetchzRolesResponse>({
    queryKey: ["Roles"],
    queryFn: fetchAllRoles,
  });
//
const toggleMenu = (id: number) => {
  setOpenMenuId(prev => (prev === id ? null : id));
};//
  useEffect(() => {
    if (data?.success && data.data) {
      const transformed = data.data.map((role: Roles, index: number): Role => ({
        id: index + 1,
        uuid: `${role.id}`,
        name: `${role.name}`.trim(),
        description:`${role.description}`,
        isSuperAdmin: role.isSuperAdmin ? "True" : "False"
       
      }));
      setLocalSubscribers(transformed);
    }
  }, [data]);

 /* const handleDelete = async (uuid: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;
    const result = await deleteUserById(uuid);
    if (result.success) {
      alert("User deleted successfully.");
      setLocalSubscribers((prev) => prev.filter((user) => user.uuid !== uuid));
    } else {
      alert(result.message);
    }
  };*/

 

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredSubscribers = localSubscribers.filter((subscriber) =>
    [subscriber.name, subscriber.uuid, subscriber.uuid, subscriber.uuid]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredSubscribers.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentSubscribers = filteredSubscribers.slice(startIndex, startIndex + rowsPerPage);

  const getVisiblePages = () => {
    const start = Math.max(1, currentPage - Math.floor(PAGE_LIMIT / 2));
    const end = Math.min(start + PAGE_LIMIT - 1, totalPages);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <div className={`admin-subscription-page ${isSidebarOpen ? "" : "expanded"}`}>
      <h2>{t("admin.subscription.Rolestable.title")}</h2>
      <p>{t("admin.subscription.Rolestable.titleDesc")}</p>

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
  
   

      {isLoading ? (
        <p>Loading users...</p>
      ) : error || !data?.success ? (
        <p>Error fetching Roles. Please try again later.</p>
      ) : (
        <>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>{t("admin.subscription.Rolestable.id")}</th>
                  <th>{t("admin.subscription.Rolestable.name")}</th>
                  <th>{t("admin.subscription.Rolestable.description")}</th>

                  <th>{t("admin.subscription.Rolestable.isSuperAdmin")}</th>
                
                 
                  <th>{t("admin.Rolestable.actions")}</th>
                </tr>
              </thead>
              <tbody>
                {currentSubscribers.map((subscriber) => (
                  <tr key={subscriber.uuid}>
                    <td>{subscriber.id}</td>
                    <td>{subscriber.name}</td>
                    <td>{subscriber.description}</td>
                  
                    <td className={subscriber.isSuperAdmin.toLowerCase()}>
                      {subscriber.isSuperAdmin === "Active" ? (
                        <FaCheckCircle className="active-icon" />
                      ) : (
                        <FaTimesCircle className="inactive-icon" />
                      )}
                      {t(`admin.subscription.status.${subscriber.isSuperAdmin.toLowerCase()}`)}
                    </td>
                   
                    <td style={{ position: "relative" }}>
                      <button className="manage-btn" onClick={() => toggleMenu(subscriber.id)}>
                        {t("admin.subscription.buttons.manage")}
                      </button>
                      {openMenuId === subscriber.id && (
                        <div className="dropdown-menu">
                         
                       
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Section */}
            <div className="pagination-footer">
              <div className="rows-per-page">
                <label className="RowPerPage">Rows per page:</label>
                <select
                  value={rowsPerPage}
                  onChange={(e) => {
                    setRowsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                >
                  {ROW_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className="pagination-controls">
                <div className="pagination-info">
                  Showing {startIndex + 1}–{Math.min(startIndex + rowsPerPage, filteredSubscribers.length)} of {filteredSubscribers.length}
                </div>

                <div className="pagination-buttons">
                  <button
                    className="page-btn"
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    &lt;
                  </button>

                  {getVisiblePages().map((page) => (
                    <button
                      key={page}
                      className={`page-btn ${currentPage === page ? "active" : ""}`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    className="page-btn"
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                  >
                    &gt;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RolePage;

