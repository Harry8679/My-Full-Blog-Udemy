import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", formData);
      console.log("Réponse API :", data); // Vérifier la structure de la réponse
      localStorage.setItem("token", data.token);
      
      if (setUser) {
        setUser(data); // Vérifie que setUser est bien défini
      } else {
        console.error("setUser est indéfini !");
      }
  
      navigate("/");
    } catch (error) {
      console.error("Erreur de connexion :", error.response?.data || error);
      alert("Connexion échouée");
    }
  };
  
  

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const { data } = await API.post("/auth/login", formData);
  //     localStorage.setItem("token", data.token);
  //     setUser(data);
  //     navigate("/");
  //   } catch (error) {
  //     alert("Connexion échouée");
  //   }
  // };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Connexion</h2>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input 
              type="email" 
              name="email" 
              placeholder="Email" 
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
              onChange={handleChange} 
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
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Se connecter
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Pas encore de compte ? <a href="/register" className="text-blue-500 hover:underline">S'inscrire</a>
        </p>
      </div>
    </div>
  );
};

export default Login;