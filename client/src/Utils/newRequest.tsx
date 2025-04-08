import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://gigsters-production.up.railway.app/",
  withCredentials: true,
  
});


export default newRequest;
// we will be calling them for every time we need to do a server connection 


/***
 // src/Utils/newRequest.ts
import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://gigsters-production.up.railway.app/",
  withCredentials: true,
});

newRequest.interceptors.request.use(
  (config) => {
    console.log("Before the request");
    return config;
  },
  (error) => {
    console.error("Error before sending request:", error);
    return Promise.reject(error);
  }
);

newRequest.interceptors.response.use(
  (response) => {
    console.log("Response received");
    return response;
  },
  (error) => {
    console.error("Error in response:", error);
    return Promise.reject(error);
  }
);

export default newRequest;

 */