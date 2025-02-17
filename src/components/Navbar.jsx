import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Utilisateur dans Navbar :", user);
  }, [user]);

  const handleLogout = async () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-lg font-bold">📝 Blog</Link>
      
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <Link to="/create" className="px-4 py-2 bg-green-500 rounded hover:bg-green-600 transition">
              ✏️ Créer un post
            </Link>
            <Link to="/profile" className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 transition">
              👤 {user.username}
            </Link>
            <button 
              onClick={handleLogout} 
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Déconnexion
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="px-4">Connexion</Link>
            <Link to="/register" className="px-4">Inscription</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;