// src/Services/Auth/authService.ts
import newRequest from "../../Utils/newRequest";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { UserState } from "../../Reducers/UserReducer/UserReducer";




interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  profileType: string;
  displayName: string;
  legalName: string;
  mobile: string;
  phone: string;
  jobPosition: string;
  title: string;
  website: string;
  vatNumber: string;
  street: string;
  street2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  companyLogo: string;
  licenseNumber: string;
}

export const register = async (data: RegisterData) => {
  try {
    const response = await newRequest.post("/auth/register", data);
    return {
      success: true,
      message: response.data?.message || "Registered successfully",
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error during registration:", error.response?.data || error.message);
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      };
    } else {
      console.error("Unexpected error:", error);
      return {
        success: false,
        message: "An unexpected error occurred",
      };
    }
  }
};


export const login = async (email: string, password: string) => {
  try {
    const response = await newRequest.post("/auth/login", {
      email,
      password,
    });

    // Decode the JWT token and log all key-value pairs
    const token = response.data.access_token;
    const decoded = jwt_decode<{
      sub: string;
      username: string;
      email: string;
      roles: string;
      isActive: boolean;
      exp: number;
      iat: number;
    }>(token);

    console.log("Decoded Token Information:");
    Object.entries(decoded).forEach(([key, value]) => {
      console.log(`${key}: ${value}`);
    });

    // Prepare the user data to be returned
    const userData: UserState = {
      isAuthenticated: true,
      name: decoded.username || "",
      email: decoded.email || "",
      role: decoded.roles || "user",
      token: token,
      sub: decoded.sub || "",
      isActive: decoded.isActive || false,
      exp: decoded.exp || 0,
      iat: decoded.iat || 0,
    };

    return { success: true, data: userData };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error during login:", error.response?.data || error.message);
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    } else {
      console.error("Unexpected error:", error);
      return {
        success: false,
        message: "An unexpected error occurred",
      };
    }
  }
};

export const forgotPass = async (email: string) => {
  try {
    const response = await newRequest.post("/auth/forgot-password", { email });
    return {
      success: true,
      message: response.data?.message || "Reset link sent successfully",
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error during sending ForgotPassword Link:", error.response?.data || error.message);
      return {
        success: false,
        message: error.response?.data?.message || "Error",
      };
    } else {
      console.error("Unexpected error:", error);
      return {
        success: false,
        message: "An unexpected error occurred",
      };
    }
  }
};


/*
v2
import newRequest from "../../Utils/newRequest";
import axios from "axios";
import jwt_decode from "jwt-decode";

export const login = async (email: string, password: string) => {
  try {
    const response = await newRequest.post("/auth/login", {
      email,
      password,
    });

    // Decode the JWT token and log all key-value pairs
    const token = response.data.access_token;
    const decoded: unknown = jwt_decode(token); // Use 'any' to avoid type issues
    console.log("Decoded Token Information:");
    if (typeof decoded === "object" && decoded !== null) {
      Object.entries(decoded).forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
      });
    } else {
      console.log("Decoded token is not an object");
    }

    return { success: true, data: response.data };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error during login:", error.response?.data || error.message);
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    } else {
      console.error("Unexpected error:", error);
      return {
        success: false,
        message: "An unexpected error occurred",
      };
    }
  }
};
*/


/* v1

import newRequest from "../../Utils/newRequest";
import axios from "axios";

export const login = async (email: string, password: string) => {
  try {
    const response = await newRequest.post("/auth/login", {
      email,
      password,
    });
    return { success: true, data: response.data };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error during login:", error.response?.data || error.message);
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    } else {
      console.error("Unexpected error:", error);
      return {
        success: false,
        message: "An unexpected error occurred",
      };
    }
  }
};
*/