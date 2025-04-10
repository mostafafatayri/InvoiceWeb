import "./i18n"; // Language config
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { UserProvider } from "./Reducers/UserReducer/UserContext";

// ✅ Import for React Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// ✅ Create a query client instance
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}> {/* ✅ React Query wrapper */}
      <UserProvider> {/* ✅ User context */}
        <App />
      </UserProvider>
    </QueryClientProvider>
  </React.StrictMode>
);



/*import "./i18n"; // Language config
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { UserProvider } from './Reducers/UserReducer/UserContext'; // ✅ Add this

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider> 
      <App />
    </UserProvider>
  </React.StrictMode>
);

*/