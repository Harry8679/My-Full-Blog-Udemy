import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", formData);
      alert("Inscription réussie ! Connecte-toi maintenant.");
      navigate("/login");
    } catch (error) {
      alert("Erreur lors de l'inscription");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold">Inscription</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="username" placeholder="Nom" className="input" onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" className="input" onChange={handleChange} />
        <input type="password" name="password" placeholder="Mot de passe" className="input" onChange={handleChange} />
        <button type="submit" className="btn">S'inscrire</button>
      </form>
    </div>
  );
};

export default Register;
