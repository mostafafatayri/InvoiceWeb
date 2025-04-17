import newRequest from "../../Utils/newRequest";
import  { AxiosError } from "axios"; // ✅ Add AxiosError here

///
export interface Claims {
  id: string;
  name: string;
  description: string;
  createdAt: string;
 // updatedAt: string;
}

export interface RoleWithClaims {
  id: string;
  name: string;
  description: string | null;
  isSuperAdmin: boolean;
  createdAt: string;
  updatedAt: string;
  claims: Claims[];
}

export interface FetchzRoleResponse {
  success: boolean;
  status: number;
  data: RoleWithClaims;
  message?: string;
}

///// 
export const FetchARoleById = async (id: string): Promise<FetchzRoleResponse> => {
  try {
    const token = localStorage.getItem("accessToken");

    const res = await newRequest.get(`/roles/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      success: true,
      status: res.status,
      data: res.data, // 👈 must return actual data from API
    };
  } catch (error) {
    console.error("Error Fetching Role Data :", error);
    return {
      success: false,
      status: 500,
      data: {} as RoleWithClaims, // 👈 fallback if needed
      message: "Failed to Fetch Data",
    };
  }
};


////
export interface FetchClaimsResponse {
  success: boolean;
  data: Roles[];
  message?: string;
}

/*export interface Claims{
  id:string,
  name:string,
  description:string,
 
  createdAt:string
}*/

//above 
export interface Roles{
  id:string,
  name:string,
  description:string,
  isSuperAdmin:boolean,
  createdAt:string
}
export interface FetchzRolesResponse {
  success: boolean;
  data: Roles[];
  message?: string;
}


export interface BackendUser {
  id:string,
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
}

export interface FetchUsersResponse {
    success: boolean;
    data: BackendUser[];
    message?: string;
  }
  
export const fetchAllRoles = async (): Promise<FetchzRolesResponse> => {
  try {
    const token = localStorage.getItem("accessToken");

    const res = await newRequest.get("/roles", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
console.log(res.data);
    return {
      success: true,
      data: res.data,
    };
   } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message: string }>;
    const status = axiosError?.response?.status;

    // 👉 Check if unauthorized
    if (status === 401) {
      alert("Session expired. Please log in again.");
      localStorage.removeItem("accessToken"); // Optional: clear token
      window.location.href = "/login"; // 🔁 Redirect
    }

    return {
      success: false,
      data: [],
      message: axiosError?.response?.data?.message || "Something went wrong",
    };
  }
}



export const fetchAllUsers = async (): Promise<FetchUsersResponse> => {
  try {
    const token = localStorage.getItem("accessToken");

    const res = await newRequest.get("/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      success: true,
      data: res.data,
    };
   } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message: string }>;
    const status = axiosError?.response?.status;

    // 👉 Check if unauthorized
    if (status === 401) {
      alert("Session expired. Please log in again.");
      localStorage.removeItem("accessToken"); // Optional: clear token
      window.location.href = "/login"; // 🔁 Redirect
    }

    return {
      success: false,
      data: [],
      message: axiosError?.response?.data?.message || "Something went wrong",
    };
  }
}



export const deleteUserById = async (id: string) => {
  try {
    const token = localStorage.getItem("accessToken");

    const res = await newRequest.delete(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, status: res.status };
  } catch (error) {
    console.error("Delete error:", error);
    return { success: false, message: "Failed to delete user" };
  }
};

export const SendInvitationToUser = async (email: string) => {
  try {
    const token = localStorage.getItem("accessToken");

    const res = await newRequest.post(
      `/auth/resend-activation`,
      { email }, // 🟢 email goes in the body
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return { success: true, status: res.status };
  } catch (error) {
    const err = error as AxiosError;
    console.error("Invitation error:", err?.response?.data || error);
    return {
      success: false,
      message: err?.response?.data || "Failed to send invitation",
    };
  }
};


///
export const deleteRoleById = async (id: string) => {
  try {
    const token = localStorage.getItem("accessToken");
    console.log("the uuid : "+id);

    const res = await newRequest.delete(`/roles/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, status: res.status };
  } catch (error) {
    console.error("Delete error:", error);
    return { success: false, message: "Failed to delete role" };
  }
};

export const UpdateRoleById = async(id:string,name:string)=>{
  try {
    const token = localStorage.getItem("accessToken");
    //console.log("the uuid : "+id);
//alert("from the service check")
    const res = await newRequest.patch(`/roles/${id}`,
      { name:name }, {

      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, status: res.status };
  } catch (error) {
    console.error("update error:", error);
    return { success: false, message: "Failed to update role" };
  }

}
export const addRole=async(newRole:string)=>{
  try {
    const token = localStorage.getItem("accessToken");
    console.log("the new role is "+newRole);
    //console.log("the uuid : "+id);
//alert("from the service check")
    const res = await newRequest.post(`/roles`,
      { name:newRole }, {

      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, status: res.status };
  } catch (error) {
    console.error("update error:", error);
    return { success: false, message: "Failed to update role" };
  }
}

//addClaim
export const addClaim=async(newClaim:string)=>{
  try {
    const token = localStorage.getItem("accessToken");
    console.log("the new role is "+newClaim);
    //console.log("the uuid : "+id);
//alert("from the service check")
    const res = await newRequest.post(`/claims`,
      { name:newClaim }, {

      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, status: res.status };
  } catch (error) {
    console.error("update error:", error);
    return { success: false, message: "Failed to update role" };
  }
}
export const fetchAllClaims = async (): Promise<FetchClaimsResponse> => {
  try {
    const token = localStorage.getItem("accessToken");

    const res = await newRequest.get("/claims", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
console.log(res.data);
    return {
      success: true,
      data: res.data,
    };
   } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message: string }>;
    const status = axiosError?.response?.status;

    // 👉 Check if unauthorized
    if (status === 401) {
      alert("Session expired. Please log in again.");
      localStorage.removeItem("accessToken"); // Optional: clear token
      window.location.href = "/login"; // 🔁 Redirect
    }

    return {
      success: false,
      data: [],
      message: axiosError?.response?.data?.message || "Something went wrong",
    };
  }
}


export const deleteClaimById = async (id: string) => {
  try {
    const token = localStorage.getItem("accessToken");
    console.log("the uuid : "+id);

    const res = await newRequest.delete(`/claims/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, status: res.status };
  } catch (error) {
    console.error("Delete error:", error);
    return { success: false, message: "Failed to delete role" };
  }
};



