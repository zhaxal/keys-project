import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function AdminNavbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">Admin Dashboard</div>
        <div className="flex items-center space-x-4">
          <Link
            to="/admin/api"
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            API
          </Link>
          <Link
            to="/admin"
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Records
          </Link>
          {user && (
            <span className="bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium">
              {user.login}
            </span>
          )}
          <button
            onClick={logout}
            className="bg-red-600 text-white hover:bg-red-700 px-3 py-2 rounded-md text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;
