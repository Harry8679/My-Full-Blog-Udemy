import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <Link to="/" className="text-lg font-bold">📝 Blog</Link>
      <div>
        <Link to="/login" className="px-4">Connexion</Link>
        <Link to="/register" className="px-4">Inscription</Link>
      </div>
    </nav>
  );
};

export default Navbar;