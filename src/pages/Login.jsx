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
      localStorage.setItem("token", data.token);
      setUser(data);
      navigate("/");
    } catch (error) {
      alert("Connexion échouée");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold">Connexion</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="email" name="email" placeholder="Email" className="input" onChange={handleChange} />
        <input type="password" name="password" placeholder="Mot de passe" className="input" onChange={handleChange} />
        <button type="submit" className="btn">Se connecter</button>
      </form>
    </div>
  );
};

export default Login;