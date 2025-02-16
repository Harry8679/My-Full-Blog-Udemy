import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

const Register = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState(""); // Gestion des erreurs
  const navigate = useNavigate();

  // ✅ Redirection si déjà connecté
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/"); // 🔄 Redirige vers l'accueil si l'utilisateur est connecté
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Vérification des mots de passe en temps réel
    if (e.target.name === "confirmPassword") {
      if (e.target.value !== formData.password) {
        setError("Les mots de passe ne correspondent pas");
      } else {
        setError("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Vérifier avant d'envoyer la requête
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      await API.post("/auth/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      alert("Inscription réussie ! Connecte-toi maintenant.");
      navigate("/login");
    } catch (error) {
      alert("Erreur lors de l'inscription");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Inscription</h2>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-gray-700">Nom</label>
            <input 
              type="text" 
              name="username" 
              placeholder="Nom" 
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
              onChange={handleChange} 
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input 
              type="email" 
              name="email" 
              placeholder="Email" 
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
              onChange={handleChange} 
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Mot de passe</label>
            <input 
              type="password" 
              name="password" 
              placeholder="Mot de passe" 
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
              onChange={handleChange} 
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Confirmer le mot de passe</label>
            <input 
              type="password" 
              name="confirmPassword" 
              placeholder="Confirmer le mot de passe" 
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
              onChange={handleChange} 
              required
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
          <button 
            type="submit" 
            className={`w-full py-2 rounded-lg text-white transition ${
              formData.password !== formData.confirmPassword || !formData.password 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={formData.password !== formData.confirmPassword || !formData.password}
          >
            S'inscrire
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Déjà un compte ? <a href="/login" className="text-blue-500 hover:underline">Se connecter</a>
        </p>
      </div>
    </div>
  );
};

export default Register;