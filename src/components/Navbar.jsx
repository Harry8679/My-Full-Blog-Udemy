import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-lg font-bold">📝 Blog</Link>
      
      <div>
        {user ? (
          <div className="flex items-center space-x-4">
            <span className="text-gray-300">👤 {user.username}</span>
            <button 
              onClick={handleLogout} 
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Déconnexion
            </button>
          </div>
        ) : (
          <div className="flex space-x-4">
            <Link to="/login" className="px-4">Connexion</Link>
            <Link to="/register" className="px-4">Inscription</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;