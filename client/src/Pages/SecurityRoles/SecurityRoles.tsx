import React, { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./SecurityRoles.scss";
import { FaCheckCircle, FaTimesCircle, FaSearch } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { deleteRoleById ,fetchAllRoles,UpdateRoleById,addRole,fetchAllClaims,deleteClaimById,addClaim} from "../../Services/AdminServices/AdminActions";
import type { FetchzRolesResponse, Roles ,Claims} from "../../Services/AdminServices/AdminActions";
import { FaPen, FaEye, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
//import { useUserState } from "../../Reducers/UserReducer/UserContext";
interface Role {  
  id: number;
  uuid: string;
  name: string;
  description:string,
  isSuperAdmin: string;
  
}
interface Claim {  
  id: number;
  uuid: string;
  name: string;
  description:string,
  isSuperAdmin:string
 
}

const ROW_OPTIONS = [5, 10, 25, 50, 100];
const PAGE_LIMIT = 5;

const RolePage: React.FC = () => {

  const { isSidebarOpen } = useOutletContext<{ isSidebarOpen: boolean }>();
  const { t } = useTranslation();

  const [searchTerm, setSearchTerm] = useState("");

  const [showAddRoleModal, setShowAddRoleModal] = useState(false);
  const [newRoleName, setNewRoleName] = useState("");
  //
  const [showRole, setShowRole] = useState(true); ////
  const [newClaimName, setNewClaimName] = useState("");
  //

  const [localSubscribers, setLocalSubscribers] = useState<Role[]>([]);
  const [localClaim, setlocalClaim] = useState<Claim[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const [editedName, setEditedName] = useState<string>("");
  const navigate = useNavigate()
  
  const { data, isLoading, error } = useQuery<FetchzRolesResponse>({
    queryKey: ["Roles"],
    queryFn: fetchAllRoles,
  });
  ///
  const { data:claims, isLoading:isLoadingCliams, error:cliamsError } = useQuery<FetchzRolesResponse>({
    queryKey: ["Claims"],
    queryFn: fetchAllClaims,
  });

  //


  useEffect(() => {
    if (data?.success && data.data) {
      //console.log("cl: "+claims);
      const transformed = data.data.map((role: Roles, index: number): Role => ({
        id: index + 1,
        uuid: `${role.id}`,
        name: `${role.name}`.trim(),
        description:`${role.description}`,
        isSuperAdmin: role.isSuperAdmin ? "True" : "False"
       
      }));
      setLocalSubscribers(transformed);
    }
    //
    if (claims?.success && claims.data) {
      //console.log("cl: "+claims);
      const claimsData = claims.data.map((Roleclaim: Claims, index: number): Claim => ({
        id: index + 1,
        uuid: `${Roleclaim.id}`,
        name: `${Roleclaim.name}`.trim(),
        isSuperAdmin:'',
        description:`${Roleclaim.description}`,
        
      }));
      setlocalClaim(claimsData);
    }
  }, [data,claims]);

 

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

 /* const filteredSubscribers = localSubscribers.filter((subscriber) =>
    [subscriber.name, subscriber.uuid, subscriber.uuid, subscriber.uuid]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );
*/
const filteredData = showRole
  ? localSubscribers.filter((item) =>
      [item.name, item.uuid, item.description]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
  : localClaim.filter((item) =>
      [item.name, item.uuid, item.description]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );


  /*const totalPages = Math.ceil(filteredSubscribers.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentSubscribers = filteredSubscribers.slice(startIndex, startIndex + rowsPerPage);*/
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentPageData = filteredData.slice(startIndex, startIndex + rowsPerPage);


  const getVisiblePages = () => {
    const start = Math.max(1, currentPage - Math.floor(PAGE_LIMIT / 2));
    const end = Math.min(start + PAGE_LIMIT - 1, totalPages);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  //

    const HandleRoleDelete = async (uuid: string) => {
      const confirmDelete = window.confirm("Are you sure you want to delete this role?");
      if (!confirmDelete) return;
      const result = await deleteRoleById(uuid);
      if (result.success) {
        alert("Role deleted successfully.");
        setLocalSubscribers((prev) => prev.filter((user) => user.uuid !== uuid));
      } else {
        alert(result.message);
      }
    };

    //
    const HandleClaimDelete = async (uuid: string) => {
      const confirmDelete = window.confirm("Are you sure you want to delete this claim?");
      if (!confirmDelete) return;
      const result = await deleteClaimById(uuid);
      if (result.success) {
        alert("Claim deleted successfully.");
        setlocalClaim((prev) => prev.filter((user) => user.uuid !== uuid));
      } else {
        alert(result.message);
      }
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
            placeholder={t("admin.subscription.searchRole_placeholder")}
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
       

      </div>
  
   

      { isLoading||isLoadingCliams ? (
        <p>Loading users...</p>
      ) : error || !data?.success||cliamsError ? (
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

                  {showRole && (
        <th>{t("admin.subscription.Rolestable.isSuperAdmin")}</th>
      )}
                 
                  <th>{t("admin.subscription.Rolestable.actions")}</th>
                  <th>  <button
                  className="icon-btn add-role"
                  onClick={() => setShowAddRoleModal(true) }
                  title="Add New Role"
                  > +</button></th>
               <th>
               <button
               className="toggle-role-claims-btn"
               onClick={() => {
                setShowRole((prev) => !prev);
                setCurrentPage(1); // 👈 Reset page number to 1 on toggle
              }}
               title={showRole ? "View Claims" : "View Roles"}
               >
               {showRole ? "View Claims" : "View Roles"}
              </button>
              </th>
              </tr>
              </thead>
              <tbody>
              {showRole?
                currentPageData.map((subscriber) => (
                  <tr key={subscriber.uuid}>
                    <td>{subscriber.id}</td>
                    <td>
                   {editingRowId === subscriber.uuid ? (
                   <input
                   type="text"
                   value={editedName}
                   onChange={(e) => setEditedName(e.target.value)}
                   className="editable-input"
                   />
                   ) : (
                   subscriber.name
                  )}
                   </td>

                    <td>{subscriber.description}</td>
                  
                    <td className={subscriber.isSuperAdmin.toLowerCase()}>
                      {subscriber.isSuperAdmin === "True" ? (
                        <FaCheckCircle className="active-icon" />
                      ) : (
                        <FaTimesCircle className="inactive-icon" />
                      )}
                      {t(`admin.subscription.status.${subscriber.isSuperAdmin.toLowerCase()}`)}
                    </td>
                   
                    <td style={{ position: "relative" }}>
                    <div className="action-buttons">
                     {editingRowId === subscriber.uuid ? (
                     <button
                     className="icon-btn confirm"
                     onClick={async() => {
                     const updatedList = localSubscribers.map((role) =>
                     role.uuid === subscriber.uuid ? { ...role, name: editedName } : role
                     );
                     setLocalSubscribers(updatedList);
                     setEditingRowId(null);
                    try {
                     const response = await UpdateRoleById(subscriber.uuid, editedName);
                     if (response.success) {
                     toast.success("Role updated successfully.");
                     } else {
                     toast.error("Error while updating role.");
                     }
                     } catch (err) {
                     console.log(err)
                     toast.error("Unexpected error occurred.");
                     }
                     }}
                    >
                   <FaCheckCircle />
                   </button>
                 ) : (
               <button
               className="icon-btn edit"
               onClick={() => {
               setEditingRowId(subscriber.uuid);
               setEditedName(subscriber.name);
               }}
               >
               <FaPen />
              </button>
             )}
            <button
            className="icon-btn view"
            onClick={() => navigate(`/admin/roles/${subscriber.uuid}`, {
            state: { claims: claims} // pass your role or claims or anything here
            })}
            >
            <FaEye />
            </button>

            <button className="icon-btn delete" onClick={() => HandleRoleDelete(subscriber.uuid)}>
            <FaTrash />
            </button>
            </div>
            </td>
            </tr>
               )):currentPageData.map((claim, index) => (
                <tr key={claim.uuid}>
                  <td>{claim.id || index }</td>
                  <td>{claim.name}</td>
                  <td>{claim.description || "—"}</td>
                 
                  <td>
                    <div className="action-buttons">
                    <button className="icon-btn delete" onClick={() => HandleClaimDelete(claim.uuid)}>
                    <FaTrash />
                     </button>
                     
                    </div>
                  </td>
                </tr>
              ))
              
              }
            </tbody>
            </table>



            {/* Pagination Section start heree */}
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
                Showing {startIndex + 1}–{Math.min(startIndex + rowsPerPage, filteredData.length)} of {filteredData.length}

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

{showAddRoleModal && (
  <div className="modal-overlay">
    <div className="modal-content">
      <h3>{showRole ? "Enter New Role Name" : "Enter New Claim Name"}</h3>

      <input
        type="text"
        value={showRole ? newRoleName : newClaimName}
        onChange={(e) =>
          showRole ? setNewRoleName(e.target.value) : setNewClaimName(e.target.value)
        }
        placeholder={showRole ? "New Role Name" : "New Claim Name"}
      />

      <div className="modal-actions">
        <button
          className="confirm-btn"
          onClick={async () => {
            const value = showRole ? newRoleName : newClaimName;

            if (!value.trim()) {
              toast.error(`${showRole ? "Role" : "Claim"} name is required.`);
              return;
            }

            try {
              if (showRole) {
                const response = await addRole(newRoleName);
                if (response.success) toast.success("Role added successfully!");
                else toast.error("Error while trying to upload new role :(");
              } else {
                const response = await addClaim(newClaimName); // Make sure you have this service.
                if (response.success) toast.success("Claim added successfully!");
                else toast.error("Error while trying to upload new claim :(");
              }
            } catch (err) {
              console.error(err);
              toast.error("Unexpected error occurred.");
            }

            setShowAddRoleModal(false);
            setNewRoleName("");
            setNewClaimName("");
          }}
        >
          Confirm
        </button>

        <button
          className="cancel-btn"
          onClick={() => {
            setShowAddRoleModal(false);
            setNewRoleName("");
            setNewClaimName("");
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}


    </div>
  );
};  

export default RolePage;







/**
 * import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./SecurityRoles.scss";
import { FaCheckCircle, FaTimesCircle, FaSearch } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { deleteRoleById ,fetchAllRoles,UpdateRoleById,addRole,fetchAllClaims,deleteClaimById} from "../../Services/AdminServices/AdminActions";
import type { FetchzRolesResponse, Roles ,Claims} from "../../Services/AdminServices/AdminActions";
import { FaPen, FaEye, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
//import { useUserState } from "../../Reducers/UserReducer/UserContext";
interface Role {  
  id: number;
  uuid: string;
  name: string;
  description:string,
  isSuperAdmin: string;
 
}
interface Claim {  
  id: number;
  uuid: string;
  name: string;
  description:string,
 
 
}

const ROW_OPTIONS = [5, 10, 25, 50, 100];
const PAGE_LIMIT = 5;

const RolePage: React.FC = () => {

  const { isSidebarOpen } = useOutletContext<{ isSidebarOpen: boolean }>();
  const { t } = useTranslation();

  const [searchTerm, setSearchTerm] = useState("");

  const [showAddRoleModal, setShowAddRoleModal] = useState(false);
  const [newRoleName, setNewRoleName] = useState("");
  //
  const [showRole, setShowRole] = useState(true); ////
  const [newClaimName, setNewClaimName] = useState("");
  //

  const [localSubscribers, setLocalSubscribers] = useState<Role[]>([]);
  const [localClaim, setlocalClaim] = useState<Claim[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const [editedName, setEditedName] = useState<string>("");
  
  const { data, isLoading, error } = useQuery<FetchzRolesResponse>({
    queryKey: ["Roles"],
    queryFn: fetchAllRoles,
  });
  ///
  const { data:claims, isLoading:isLoadingCliams, error:cliamsError } = useQuery<FetchzRolesResponse>({
    queryKey: ["Claims"],
    queryFn: fetchAllClaims,
  });

  //


  useEffect(() => {
    if (data?.success && data.data) {
      //console.log("cl: "+claims);
      const transformed = data.data.map((role: Roles, index: number): Role => ({
        id: index + 1,
        uuid: `${role.id}`,
        name: `${role.name}`.trim(),
        description:`${role.description}`,
        isSuperAdmin: role.isSuperAdmin ? "True" : "False"
       
      }));
      setLocalSubscribers(transformed);
    }
    //
    if (claims?.success && claims.data) {
      //console.log("cl: "+claims);
      const claimsData = claims.data.map((Roleclaim: Claims, index: number): Claim => ({
        id: index + 1,
        uuid: `${Roleclaim.id}`,
        name: `${Roleclaim.name}`.trim(),
        description:`${Roleclaim.description}`,
        
      }));
      setlocalClaim(claimsData);
    }
  }, [data,claims]);

 

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

  //

    const HandleRoleDelete = async (uuid: string) => {
      const confirmDelete = window.confirm("Are you sure you want to delete this role?");
      if (!confirmDelete) return;
      const result = await deleteRoleById(uuid);
      if (result.success) {
        alert("Role deleted successfully.");
        setLocalSubscribers((prev) => prev.filter((user) => user.uuid !== uuid));
      } else {
        alert(result.message);
      }
    };

    //
    const HandleClaimDelete = async (uuid: string) => {
      const confirmDelete = window.confirm("Are you sure you want to delete this claim?");
      if (!confirmDelete) return;
      const result = await deleteClaimById(uuid);
      if (result.success) {
        alert("Claim deleted successfully.");
        setlocalClaim((prev) => prev.filter((user) => user.uuid !== uuid));
      } else {
        alert(result.message);
      }
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
            placeholder={t("admin.subscription.searchRole_placeholder")}
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
       

      </div>
  
   

      { isLoading||isLoadingCliams ? (
        <p>Loading users...</p>
      ) : error || !data?.success||cliamsError ? (
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

                  {showRole && (
      <th>{t("admin.subscription.Rolestable.isSuperAdmin")}</th>
    )}
                 
                  <th>{t("admin.subscription.Rolestable.actions")}</th>
                  <th>  <button
                  className="icon-btn add-role"
                  onClick={() => setShowAddRoleModal(true)}
                  title="Add New Role"
                  > +</button></th>
               <th>
               <button
               className="toggle-role-claims-btn"
               onClick={() => setShowRole((prev) => !prev)}
               title={showRole ? "View Claims" : "View Roles"}
               >
               {showRole ? "View Claims" : "View Roles"}
              </button>
              </th>
              </tr>
              </thead>
              <tbody>
              {showRole?
                currentSubscribers.map((subscriber) => (
                  <tr key={subscriber.uuid}>
                    <td>{subscriber.id}</td>
                    <td>
                   {editingRowId === subscriber.uuid ? (
                   <input
                   type="text"
                   value={editedName}
                   onChange={(e) => setEditedName(e.target.value)}
                   className="editable-input"
                   />
                   ) : (
                   subscriber.name
                  )}
                   </td>

                    <td>{subscriber.description}</td>
                  
                    <td className={subscriber.isSuperAdmin.toLowerCase()}>
                      {subscriber.isSuperAdmin === "True" ? (
                        <FaCheckCircle className="active-icon" />
                      ) : (
                        <FaTimesCircle className="inactive-icon" />
                      )}
                      {t(`admin.subscription.status.${subscriber.isSuperAdmin.toLowerCase()}`)}
                    </td>
                   
                    <td style={{ position: "relative" }}>
                    <div className="action-buttons">
                     {editingRowId === subscriber.uuid ? (
                     <button
                     className="icon-btn confirm"
                     onClick={async() => {
                     const updatedList = localSubscribers.map((role) =>
                     role.uuid === subscriber.uuid ? { ...role, name: editedName } : role
                     );
                     setLocalSubscribers(updatedList);
                     setEditingRowId(null);
                    try {
                     const response = await UpdateRoleById(subscriber.uuid, editedName);
                     if (response.success) {
                     toast.success("Role updated successfully.");
                     } else {
                     toast.error("Error while updating role.");
                     }
                     } catch (err) {
                     console.log(err)
                     toast.error("Unexpected error occurred.");
                     }
                     }}
                    >
                   <FaCheckCircle />
                   </button>
                 ) : (
               <button
               className="icon-btn edit"
               onClick={() => {
               setEditingRowId(subscriber.uuid);
               setEditedName(subscriber.name);
               }}
               >
               <FaPen />
              </button>
             )}
            <button className="icon-btn view" onClick={() => console.log("View", subscriber)}>
            <FaEye />
            </button>
            <button className="icon-btn delete" onClick={() => HandleRoleDelete(subscriber.uuid)}>
            <FaTrash />
            </button>
            </div>
            </td>
            </tr>
               )):localClaim.map((claim, index) => (
                <tr key={claim.id || index}>
                  <td>{index + 1}</td>
                  <td>{claim.name}</td>
                  <td>{claim.description || "—"}</td>
                 
                  <td>
                    <div className="action-buttons">
                    <button className="icon-btn delete" onClick={() => HandleClaimDelete(claim.uuid)}>
                    <FaTrash />
                     </button>
                     
                    </div>
                  </td>
                </tr>
              ))
              
              }
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

      {showAddRoleModal && (
  <div className="modal-overlay">
    <div className="modal-content">
      <h3>Enter New Role Name</h3>
      <input
        type="text"
        value={newRoleName}
        onChange={(e) => setNewRoleName(e.target.value)}
        placeholder="New Role Name"
      />
      <div className="modal-actions">
        <button
          className="confirm-btn"
          onClick={async() => {
            if (!newRoleName.trim()) {
              toast.error("Role name is required.");
              return;
            }
            try{
              const response = await addRole(newRoleName);
                if(response.success){
                  toast.success("Role added successfully!");
                }else{
                  toast.error("Error while trying to upload new role :(");
                }
              
            }catch(err){
              console.log(err)
            }
           
            setShowAddRoleModal(false);
            setNewRoleName("");
          }}
        >
          Confirm
        </button>
        <button
          className="cancel-btn"
          onClick={() =>{
           setShowAddRoleModal(false);
         

          } }
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};  

export default RolePage;



**/