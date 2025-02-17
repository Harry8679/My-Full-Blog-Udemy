import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

const CreatePost = ({ token }) => {
  const [formData, setFormData] = useState({ title: "", content: "", image: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/posts", formData, { headers: { Authorization: `Bearer ${token}` } });
      alert("Article publié !");
      navigate("/"); // Redirige vers la page d'accueil
    } catch (error) {
      alert("Erreur lors de la publication de l'article");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Créer un Article</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Titre</label>
          <input 
            type="text" 
            name="title" 
            className="w-full px-4 py-2 border rounded-lg" 
            placeholder="Titre de l'article" 
            onChange={handleChange} required 
          />
        </div>
        <div>
          <label className="block text-gray-700">Image (URL)</label>
          <input 
            type="text" 
            name="image" 
            className="w-full px-4 py-2 border rounded-lg" 
            placeholder="URL de l'image" 
            onChange={handleChange} 
          />
        </div>
        <div>
          <label className="block text-gray-700">Contenu</label>
          <textarea 
            name="content" 
            className="w-full px-4 py-2 border rounded-lg" 
            rows="4" 
            placeholder="Rédigez votre article ici..." 
            onChange={handleChange} required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
          Publier
        </button>
      </form>
    </div>
  );
};

export default CreatePost;