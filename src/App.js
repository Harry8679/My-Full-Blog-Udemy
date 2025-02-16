import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile"; // Ajout de la page profil

function App() {
  const [user, setUser] = useState(null);

  // Vérifier le token au chargement
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserProfile(token);
    }
  }, []);

  const fetchUserProfile = async (token) => {
    try {
      const response = await fetch("http://localhost:4400/api/auth/profile", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });

      if (!response.ok) throw new Error("Erreur lors de la récupération du profil");

      const data = await response.json();
      console.log("Données utilisateur :", data);
      if (data.user) setUser(data.user);
    } catch (error) {
      console.error("Erreur lors de la récupération du profil :", error);
    }
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar user={user} setUser={setUser} />
        <main className="flex-grow p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile user={user} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;