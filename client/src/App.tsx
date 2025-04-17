import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
//import { useTranslation } from "react-i18next"; // Import translation hook
import LoginForm from "./Pages/Login/Login";
import { Home } from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import Sidebar from "./Components/SideBar/Sidebar";
import Dashboard from "./Pages/Dashboard/DashBoard";
import SignUp from "./Pages/SignUp/Sign";
import Subscription from "./Pages/Subscription/Subscription";
import AdminSubscription from "./Pages/AdminSubscription/AdminSubscription";
import Invoices from "./Pages/Invoice/Invoices";
import ProtectedRoute from "./Utils/ProtectedRoute";
import ForgotPassword from "./Pages/Login/ForgetPassword/ForgetPassword";
import CheckEmail from "./Pages/Login/CheckEmail/CheckEmail";
import PasswordChanged from "./Pages/Login/PasswordChanged/PasswordIsChanged";
import ResetPassword from './Pages/Login/ResetPassword/ResetPassword'
import ProtectedRouteSuperAdmin from './Utils/OnlySuperAdmin';
import RolePage from './Pages/SecurityRoles/SecurityRoles';
import FetchARole from './Pages/FetchRoleData/FetchARole'
const queryClient = new QueryClient();
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


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
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </QueryClientProvider>
  );
};

// 🔑 Layout without Sidebar (for auth pages like login)
const AuthLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <ToastContainer position="top-right" autoClose={3000} />
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
       //{ path: "/Dashboard", element: <Dashboard /> },
       // Inside your route definitions:
      {path: "/dashboard",element: (<ProtectedRoute><Dashboard /></ProtectedRoute>),},
      
      {path:"/subscriptions",element:<Subscription/>},
      { path: "/admin/subscribers", element: <AdminSubscription /> } ,
      { path: "/admin/invoices", element: <Invoices /> } , 
      {path: "/admin/roles",element:(<ProtectedRouteSuperAdmin><RolePage /></ProtectedRouteSuperAdmin>),}, //<RolePage /> }
      {path: "/admin/roles/:id",element:(<ProtectedRouteSuperAdmin><FetchARole /></ProtectedRouteSuperAdmin>),},
     

    ],
  },
  {
    path: "/login",
    element: <AuthLayout />, // No Sidebar
    children: [{ index: true, element: <LoginForm /> }],
    
  },
  {
    path: "/SignUp",
    element: <AuthLayout />, // No Sidebar
    children: [{ index: true, element: <SignUp /> }],
    
  }, 
  {   path: "/forgot-password", 
    element: <ForgotPassword/>
  }
  , 
  {   path: "/checkEmail", 
    element: <CheckEmail/>
  },
  { path: "/passwordChnaged", element: <PasswordChanged /> } ,  // i need to make this onlyy accessbel if it was sent from the create pass
  { path:"/reset-password", element:<ResetPassword /> } ,
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
