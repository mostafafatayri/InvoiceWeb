import React, { useState, useEffect } from "react";
import {/*useNavigate,*/useParams,useLocation} from "react-router-dom"
import { useOutletContext } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./FetchARole.scss";
import {  FaSearch } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { FetchARoleById} from "../../Services/AdminServices/AdminActions";
import type { Claims, FetchzRoleResponse } from "../../Services/AdminServices/AdminActions";

interface ClaimData {  
    id: number;
    uuid:string,
    name: string;
    description: string;
    createdAt: string;
   // updatedAt: string;

}

const ROW_OPTIONS = [5, 10, 25, 50, 100];
const PAGE_LIMIT = 5;

const FetchARole: React.FC = () => {
   
    const { id } = useParams(); // 👈 this gets the UUID from the URL
    const location = useLocation(); // ✅ add this line
    const passedData = location.state?.claims;  
    console.log(JSON.stringify(passedData)); 
  const { isSidebarOpen } = useOutletContext<{ isSidebarOpen: boolean }>();
  const { t } = useTranslation();

  const [searchTerm, setSearchTerm] = useState("");
 // const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [localSubscribers, setLocalSubscribers] = useState<ClaimData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [Role,setRoleType]=useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  //const navigate = useNavigate();
  const { data, isLoading, error } = useQuery<FetchzRoleResponse>({
    queryKey: ["role", id],
    queryFn: () => FetchARoleById(id || ""), // pass the UUID from the URL
    enabled: !!id, // only run query if id exists
  });
  
//
///const toggleMenu = (id: number) => {
 // setOpenMenuId(prev => (prev === id ? null : id));
//};//
useEffect(() => {
    if (data?.success && data.data?.claims) {
      setRoleType(data.data.name);
      const transformed = data.data.claims.map((claim: Claims, index: number): ClaimData => ({
        id: index + 1,
        uuid: `${claim.id}`,
        name: `${claim.name}`.trim(),
        description: `${claim.description}`,
        createdAt: claim.createdAt,
       //updatedAt: claim.updatedAt,
      }));
      setLocalSubscribers(transformed);
    }
  }, [data]);
  

  /*const handleDelete = async (uuid: string) => {
   console.log("hello world "+uuid);
  };*/

  //handleInvite

  

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredSubscribers = localSubscribers.filter((subscriber) =>
    [subscriber.name, subscriber.description]
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
      <h2>Manage {Role}</h2>
      <p>{t("admin.subscription.description")}</p>

      <div className="search-filter">
        <div className="search-bar">
          <FaSearch className="icon" />
          <input
            type="text"
            placeholder={t("admin.subscription.searchRole_A_Role")}
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
  
  

      {isLoading ? (
        <p>Loading users...</p>
      ) : error || !data?.success ? (
        <p>Error fetching users. Please try again later.</p>
      ) : (
        <>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>{t("admin.subscription.claims.id")}</th>
                  <th>{t("admin.subscription.claims.claim")}</th>
                  <th>{t("admin.subscription.claims.description")}</th>
                  <th>{t("admin.subscription.claims.createAt")}</th>
                  
                  <th>{t("admin.subscription.table.actions")}</th>
                </tr>
              </thead>
              <tbody>
              
  {currentSubscribers.map((claim, index) => (
    <tr key={claim.id}>
      <td>{index + 1}</td>
      <td>{claim.name}</td>
      <td>{claim.description || "—"}</td>
      <td>{new Date(claim.createdAt).toLocaleString()}</td>
     
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

export default FetchARole;





/***
 import React, { useState, useEffect } from "react";
import {useParams} from "react-router-dom"
import { useOutletContext } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./FetchARole.scss";
import {  FaSearch } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { FetchARoleById} from "../../Services/AdminServices/AdminActions";
import type { Claims, FetchzRoleResponse } from "../../Services/AdminServices/AdminActions";

interface ClaimData {  
    id: number;
    uuid:string,
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;

}

const ROW_OPTIONS = [5, 10, 25, 50, 100];
const PAGE_LIMIT = 5;

const FetchARole: React.FC = () => {
    const { id } = useParams(); // 👈 this gets the UUID from the URL
  const { isSidebarOpen } = useOutletContext<{ isSidebarOpen: boolean }>();
  const { t } = useTranslation();

  const [searchTerm, setSearchTerm] = useState("");
 // const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [localSubscribers, setLocalSubscribers] = useState<ClaimData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [Role,setRoleType]=useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  //const navigate = useNavigate();
  const { data, isLoading, error } = useQuery<FetchzRoleResponse>({
    queryKey: ["role", id],
    queryFn: () => FetchARoleById(id || ""), // pass the UUID from the URL
    enabled: !!id, // only run query if id exists
  });
  

useEffect(() => {
    if (data?.success && data.data?.claims) {
      setRoleType(data.data.name);
      const transformed = data.data.claims.map((claim: Claims, index: number): ClaimData => ({
        id: index + 1,
        uuid: `${claim.id}`,
        name: `${claim.name}`.trim(),
        description: `${claim.description}`,
        createdAt: claim.createdAt,
        updatedAt: claim.updatedAt,
      }));
      setLocalSubscribers(transformed);
    }
  }, [data]);
  


  

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredSubscribers = localSubscribers.filter((subscriber) =>
    [subscriber.name, subscriber.description]
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
      <h2>Manage {Role}</h2>
      <p>{t("admin.subscription.description")}</p>

      <div className="search-filter">
        <div className="search-bar">
          <FaSearch className="icon" />
          <input
            type="text"
            placeholder={t("admin.subscription.searchRole_A_Role")}
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
  
  

      {isLoading ? (
        <p>Loading users...</p>
      ) : error || !data?.success ? (
        <p>Error fetching users. Please try again later.</p>
      ) : (
        <>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>{t("admin.subscription.claims.id")}</th>
                  <th>{t("admin.subscription.claims.claim")}</th>
                  <th>{t("admin.subscription.claims.description")}</th>
                  <th>{t("admin.subscription.claims.createAt")}</th>
                  
                  <th>{t("admin.subscription.table.actions")}</th>
                </tr>
              </thead>
              <tbody>
              
  {currentSubscribers.map((claim, index) => (
    <tr key={claim.id}>
      <td>{index + 1}</td>
      <td>{claim.name}</td>
      <td>{claim.description || "—"}</td>
      <td>{new Date(claim.createdAt).toLocaleString()}</td>
      <td>{new Date(claim.updatedAt).toLocaleString()}</td>
    </tr>
  ))}
</tbody>

                    
            
            </table>

           
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

export default FetchARole;



 */


