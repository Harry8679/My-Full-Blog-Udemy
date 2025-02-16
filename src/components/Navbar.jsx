import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  // Fonction pour la déconnexion
  const handleLogout = () => {
    localStorage.removeItem("token"); // Supprime le token
    setUser(null); // Réinitialise l'utilisateur
    navigate("/login"); // Redirige vers la page de connexion
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-lg font-bold">📝 Blog</Link>
      
      <div>
        {user ? (
          // Si l'utilisateur est connecté
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
          // Si l'utilisateur n'est PAS connecté
          <div>
            <Link to="/login" className="px-4">Connexion</Link>
            <Link to="/register" className="px-4">Inscription</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;