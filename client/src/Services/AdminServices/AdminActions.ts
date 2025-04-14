import newRequest from "../../Utils/newRequest";
import  { AxiosError } from "axios"; // ✅ Add AxiosError here


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

///

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
  

/// this is the function, it will be performed and will be store in the FetchUsersResponse
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





// continue here 
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



/*import newRequest from "../../Utils/newRequest";


export const fetchAllUsers = async () => {
  try {
    const token = localStorage.getItem("accessToken"); // Get token from storage

    const response = await newRequest.get(`/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    console.log("Fetched users:", response.data); // 👀 Just log for now
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return {
      success: false,
      message: "Failed to fetch users",
    };
  }
};*/
