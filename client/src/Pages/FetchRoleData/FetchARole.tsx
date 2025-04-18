import React, { useState, useEffect } from "react";
import { useParams, useLocation, useOutletContext } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./FetchARole.scss";
import { FaSearch, FaPlus } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { FetchARoleById, UpdateRole } from "../../Services/AdminServices/AdminActions";
import type { Claims, FetchzRoleResponse } from "../../Services/AdminServices/AdminActions";
import { toast } from "react-toastify";

interface ClaimData {
  id: number;
  uuid: string;
  name: string;
  description: string;
  createdAt: string;
}

const ROW_OPTIONS = [5, 10, 25, 50, 100];
const PAGE_LIMIT = 5;

const FetchARole: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const passedData = location.state?.claims?.data;
  const { isSidebarOpen } = useOutletContext<{ isSidebarOpen: boolean }>();
  const { t } = useTranslation();

  const [localSubscribers, setLocalSubscribers] = useState<ClaimData[]>([]);
  const [theClaims, setTheClaims] = useState<ClaimData[]>([]);
  const [selectedClaimIds, setSelectedClaimIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [Role, setRoleType] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);

  const { data, isLoading, error } = useQuery<FetchzRoleResponse>({
    queryKey: ["role", id],
    queryFn: () => FetchARoleById(id || ""),
    enabled: !!id,
  });

  useEffect(() => {
    if (data?.success && data.data?.claims) {
      setRoleType(data.data.name);

      const assigned = data.data.claims.map((claim: Claims, index: number): ClaimData => ({
        id: index + 1,
        uuid: `${claim.id}`,
        name: claim.name.trim(),
        description: claim.description,
        createdAt: claim.createdAt,
      }));

      setLocalSubscribers(assigned);

      if (Array.isArray(passedData)) {
        const assignedIds = new Set(data.data.claims.map((c) => c.id));
        const unassigned = passedData
          .filter((claim: Claims) => !assignedIds.has(claim.id))
          .map((claim: Claims, index: number): ClaimData => ({
            id: index + 1,
            uuid: `${claim.id}`,
            name: claim.name.trim(),
            description: claim.description,
            createdAt: claim.createdAt,
          }));
        setTheClaims(unassigned);
      }
    }
  }, [data, passedData]);

  const handleAssignClaim = (claimId: string) => {
    if (selectedClaimIds.includes(claimId)) {
      toast.error("⚠️ This claim is already in the staged list!");
    } else {
      setSelectedClaimIds((prev) => [...prev, claimId]);
      toast.success("✅ Claim added to staged list. Confirm to apply changes.");
    }
  };
  
  /*const handleAssignClaim = (claimId: string) => {
    toast.success("Claim added to Staged table confirm to change claims")
    if (!selectedClaimIds.includes(claimId)) {
      setSelectedClaimIds((prev) => [...prev, claimId]);
    }
   
  };*/


const handleDeleteClaim = async (claimId: string) => {
  const updatedSubscribers = localSubscribers.filter((claim) => claim.uuid !== claimId);
  const updatedIds = updatedSubscribers.map((c) => c.uuid);

  const response = await UpdateRole(id!, { claimIds: updatedIds });

  if (response.success) {
    const removedClaim = localSubscribers.find((claim) => claim.uuid === claimId);

    if (removedClaim) {
      setTheClaims((prev) => [
        ...prev,
        {
          ...removedClaim,
          id: theClaims.length + 1, // Optional: keep unique ID if you want to use index
        },
      ]);
    }

    setLocalSubscribers(updatedSubscribers);
    toast.success("Claim revoked and moved back to available list ❌");
  } else {
    toast.error("⚠️ Failed to revoke claim");
  }
};

 /* const handleDeleteClaim = async (claimId: string) => {
    const updated = localSubscribers.filter((claim) => claim.uuid !== claimId);
    const updatedIds = updated.map((c) => c.uuid);

    const response = await UpdateRole(id!, { claimIds: updatedIds });

    if (response.success) {
     // alert("❌ Claim removed successfully");
      toast.success("Claim removed successfully ❌")
      setLocalSubscribers(updated);
    } else {
     
      toast.error("⚠️ Failed to remove claim")
    }
  };  *//// tablee is dynamically revoking it 


  const handleSubmitClaims = async () => {
    const existingIds = localSubscribers.map((c) => c.uuid);
    const combined = Array.from(new Set([...existingIds, ...selectedClaimIds]));
  
    const response = await UpdateRole(id!, { claimIds: combined });
  
    if (response.success) {
      // Push new selected claims to main table
      const newlyAddedClaims = theClaims.filter((claim) =>
        selectedClaimIds.includes(claim.uuid)
      );
  
      const updatedSubscribers = [
        ...localSubscribers,
        ...newlyAddedClaims.map((claim, index) => ({
          ...claim,
          id: localSubscribers.length + index + 1, // reindex if needed
        })),
      ];
  
      setLocalSubscribers(updatedSubscribers);
  
      // Remove added claims from the staging area
      const remainingClaims = theClaims.filter(
        (claim) => !selectedClaimIds.includes(claim.uuid)
      );
      setTheClaims(remainingClaims);
  
      setSelectedClaimIds([]);
      setShowModal(false);
      // You can also toast here:
      // toast.success("✅ Claims assigned successfully!");
    } else {
      alert("❌ Failed to update claims.");
    }
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
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="plus-button" onClick={() => setShowModal(true)}>
          <FaPlus />
        </button>
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
        <th>ID</th>
        <th>Claim</th>
        <th>Description</th>
        <th>Created At</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {currentSubscribers.map((claim, index) => (
        <tr key={claim.uuid}>
          <td>{claim.id|| index+1}</td>
          <td>{claim.name}</td>
          <td>{claim.description || "—"}</td>
          <td>{new Date(claim.createdAt).toLocaleString()}</td>
          <td>
            <button onClick={() => handleDeleteClaim(claim.uuid)} className="delete-btn">
              Revoke
            </button>
          </td>
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
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pagination-controls">
                <div className="pagination-info">
                  Showing {startIndex + 1}–{Math.min(startIndex + rowsPerPage, filteredSubscribers.length)} of{" "}
                  {filteredSubscribers.length}
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


{selectedClaimIds.length > 0 && (
  <div className="selected-claims-box">
    <h4>Staged for Assignment:</h4>
    <ul>
      {selectedClaimIds.map((id) => {
        const claim = theClaims.find((c) => c.uuid === id);
        return (
          <li key={id}>
            {claim?.name || "Unknown"}
            <button
              className="delete-btn"
              onClick={() =>
                setSelectedClaimIds((prev) => prev.filter((cid) => cid !== id))
              }
            >
              ×
            </button>
          </li>
        );
      })}
    </ul>
    <button className="submit-btn" onClick={handleSubmitClaims}>
      Submit Selected Claims
    </button>
  </div>
)}
      {showModal && (
  <div className="modal-overlay">
    <div className="modal-content">
      <h3>All Claims</h3>
      <button className="close-icon" onClick={() => setShowModal(false)}>×</button>

      <table className="modal-table">
        <thead>
          <tr>
            <th>Claim</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {theClaims.map((claim) => (
            <tr key={claim.uuid}>
              <td>{claim.name}</td>
              <td>
              <button
              className="check-btn"
              disabled={selectedClaimIds.includes(claim.uuid)}
              onClick={() => handleAssignClaim(claim.uuid)}
              >
               ✓
             </button>
              </td>
            </tr>
             ))}
             </tbody>
            </table>
          </div>
         </div>
         )}
         </div>
);};
export default FetchARole;





/*
import React, { useState, useEffect } from "react";
import { useParams, useLocation, useOutletContext } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./FetchARole.scss";
import { FaSearch, FaPlus } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { FetchARoleById, UpdateRole } from "../../Services/AdminServices/AdminActions";
import type { Claims, FetchzRoleResponse } from "../../Services/AdminServices/AdminActions";
import { toast } from "react-toastify";

interface ClaimData {
  id: number;
  uuid: string;
  name: string;
  description: string;
  createdAt: string;
}

const ROW_OPTIONS = [5, 10, 25, 50, 100];
const PAGE_LIMIT = 5;

const FetchARole: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const passedData = location.state?.claims?.data;
  const { isSidebarOpen } = useOutletContext<{ isSidebarOpen: boolean }>();
  const { t } = useTranslation();

  const [localSubscribers, setLocalSubscribers] = useState<ClaimData[]>([]);
  const [theClaims, setTheClaims] = useState<ClaimData[]>([]);
  const [selectedClaimIds, setSelectedClaimIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [Role, setRoleType] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);

  const { data, isLoading, error } = useQuery<FetchzRoleResponse>({
    queryKey: ["role", id],
    queryFn: () => FetchARoleById(id || ""),
    enabled: !!id,
  });

  useEffect(() => {
    if (data?.success && data.data?.claims) {
      setRoleType(data.data.name);

      const assigned = data.data.claims.map((claim: Claims, index: number): ClaimData => ({
        id: index + 1,
        uuid: `${claim.id}`,
        name: claim.name.trim(),
        description: claim.description,
        createdAt: claim.createdAt,
      }));

      setLocalSubscribers(assigned);

      if (Array.isArray(passedData)) {
        const assignedIds = new Set(data.data.claims.map((c) => c.id));
        const unassigned = passedData
          .filter((claim: Claims) => !assignedIds.has(claim.id))
          .map((claim: Claims, index: number): ClaimData => ({
            id: index + 1,
            uuid: `${claim.id}`,
            name: claim.name.trim(),
            description: claim.description,
            createdAt: claim.createdAt,
          }));
        setTheClaims(unassigned);
      }
    }
  }, [data, passedData]);

  const handleAssignClaim = (claimId: string) => {
    if (selectedClaimIds.includes(claimId)) {
      toast.error("⚠️ This claim is already in the staged list!");
    } else {
      setSelectedClaimIds((prev) => [...prev, claimId]);
      toast.success("✅ Claim added to staged list. Confirm to apply changes.");
    }
  };
  
 


  const handleDeleteClaim = async (claimId: string) => {
    const updatedSubscribers = localSubscribers.filter((claim) => claim.uuid !== claimId);
    const updatedIds = updatedSubscribers.map((c) => c.uuid);
  
    const response = await UpdateRole(id!, { claimIds: updatedIds });
  
    if (response.success) {
      const removedClaim = localSubscribers.find((claim) => claim.uuid === claimId);
  
      if (removedClaim) {
        setTheClaims((prev) => [
          ...prev,
          {
            ...removedClaim,
            id: theClaims.length + 1, // Optional: keep unique ID if you want to use index
          },
        ]);
      }
  
      setLocalSubscribers(updatedSubscribers);
      toast.success("Claim revoked and moved back to available list ❌");
    } else {
      toast.error("⚠️ Failed to revoke claim");
    }
  };
  
 
  
  
    const handleSubmitClaims = async () => {
      const existingIds = localSubscribers.map((c) => c.uuid);
      const combined = Array.from(new Set([...existingIds, ...selectedClaimIds]));
    
      const response = await UpdateRole(id!, { claimIds: combined });
    
      if (response.success) {
        // Push new selected claims to main table
        const newlyAddedClaims = theClaims.filter((claim) =>
          selectedClaimIds.includes(claim.uuid)
        );
    
        const updatedSubscribers = [
          ...localSubscribers,
          ...newlyAddedClaims.map((claim, index) => ({
            ...claim,
            id: localSubscribers.length + index + 1, // reindex if needed
          })),
        ];
    
        setLocalSubscribers(updatedSubscribers);
    
        // Remove added claims from the staging area
        const remainingClaims = theClaims.filter(
          (claim) => !selectedClaimIds.includes(claim.uuid)
        );
        setTheClaims(remainingClaims);
    
        setSelectedClaimIds([]);
        setShowModal(false);
        // You can also toast here:
        // toast.success("✅ Claims assigned successfully!");
      } else {
        alert("❌ Failed to update claims.");
      }
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
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="plus-button" onClick={() => setShowModal(true)}>
            <FaPlus />
          </button>
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
          <th>ID</th>
          <th>Claim</th>
          <th>Description</th>
          <th>Created At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {currentSubscribers.map((claim, index) => (
          <tr key={claim.uuid}>
            <td>{index + 1}</td>
            <td>{claim.name}</td>
            <td>{claim.description || "—"}</td>
            <td>{new Date(claim.createdAt).toLocaleString()}</td>
            <td>
              <button onClick={() => handleDeleteClaim(claim.uuid)} className="delete-btn">
                Revoke
              </button>
            </td>
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
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
  
                <div className="pagination-controls">
                  <div className="pagination-info">
                    Showing {startIndex + 1}–{Math.min(startIndex + rowsPerPage, filteredSubscribers.length)} of{" "}
                    {filteredSubscribers.length}
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
  
  
  {selectedClaimIds.length > 0 && (
    <div className="selected-claims-box">
      <h4>Staged for Assignment:</h4>
      <ul>
        {selectedClaimIds.map((id) => {
          const claim = theClaims.find((c) => c.uuid === id);
          return (
            <li key={id}>
              {claim?.name || "Unknown"}
              <button
                className="delete-btn"
                onClick={() =>
                  setSelectedClaimIds((prev) => prev.filter((cid) => cid !== id))
                }
              >
                ×
              </button>
            </li>
          );
        })}
      </ul>
      <button className="submit-btn" onClick={handleSubmitClaims}>
        Submit Selected Claims
      </button>
    </div>
  )}
        {showModal && (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>All Claims</h3>
        <button className="close-icon" onClick={() => setShowModal(false)}>×</button>
  
        <table className="modal-table">
          <thead>
            <tr>
              <th>Claim</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {theClaims.map((claim) => (
              <tr key={claim.uuid}>
                <td>{claim.name}</td>
                <td>
                <button
                className="check-btn"
                disabled={selectedClaimIds.includes(claim.uuid)}
                onClick={() => handleAssignClaim(claim.uuid)}
                >
                 ✓
               </button>
                </td>
              </tr>
               ))}
               </tbody>
              </table>
            </div>
           </div>
           )}
           </div>
  );};
  export default FetchARole;
 */