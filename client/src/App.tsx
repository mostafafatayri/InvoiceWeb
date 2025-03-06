import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
//import { useTranslation } from "react-i18next"; // Import translation hook
import LoginForm from "./Pages/Login/Login";
import { Home } from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import Sidebar from "./Components/SideBar/Sidebar";
import Dashboard from "./Pages/Dashboard/DashBoard";

const queryClient = new QueryClient();

// 🏠 Layout with Sidebar (for main pages)
const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  //const { i18n } = useTranslation(); // Get translation functions

  return (
    <QueryClientProvider client={queryClient}>
      <div className="app-container">
        {/* Language Switcher */}
        

        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div className={`main-content ${isSidebarOpen ? "" : "expanded"}`}>
          <Outlet context={{ isSidebarOpen }} />
        </div>
      </div>
    </QueryClientProvider>
  );
};

// 🔑 Layout without Sidebar (for auth pages like login)
const AuthLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
};

// Define routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // Includes Sidebar
    children: [
      { path: "/home", element: <Home /> },
      { path: "/profile", element: <Profile /> },
      { path: "/Dashboard", element: <Dashboard /> }
    ],
  },
  {
    path: "/login",
    element: <AuthLayout />, // No Sidebar
    children: [{ index: true, element: <LoginForm /> }],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;


/*import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import LoginForm from "./Pages/Login/Login";
import { Home } from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import Sidebar from "./Components/SideBar/Sidebar";
import Dashboard from "./Pages/Dashboard/DashBoard";

const queryClient = new QueryClient();

// 🏠 Layout with Sidebar (for main pages)
const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="app-container">
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div className={`main-content ${isSidebarOpen ? "" : "expanded"}`}>
          <Outlet context={{ isSidebarOpen }} />
        </div>
      </div>
    </QueryClientProvider>
  );
};

// 🔑 Layout without Sidebar (for auth pages like login)
const AuthLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
};

// Define routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // Includes Sidebar
    children: [
      { path: "/home", element: <Home /> },
      { path: "/profile", element: <Profile /> },
      { path: "/Dashboard", element: <Dashboard /> }
    ],
  },
  {
    path: "/login",
    element: <AuthLayout />, // No Sidebar
    children: [{ index: true, element: <LoginForm /> }],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;*/
