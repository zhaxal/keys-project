import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AdminPage from "./pages/admin-page-components/AdminPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import { AuthProvider } from "./contexts/AuthContext";
import SecuredRoute from "./components/SecuredRoute";
import Footer from "./components/Footer";
import AdminNavbar from "./pages/admin-page-components/AdminNavbar";
import ApiPage from "./pages/admin-page-components/api-page-components/ApiPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/admin",
    element: (
      <SecuredRoute>
        <AdminNavbar />
        <AdminPage />
      </SecuredRoute>
    ),
  },
  {
    path: "/admin/api",
    element: (
      <SecuredRoute>
        <AdminNavbar />
        <ApiPage />
      </SecuredRoute>
    ),
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className="flex flex-col h-full">
          <div className="flex-grow">
            <RouterProvider router={router} />
          </div>
          <Footer />
        </div>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
