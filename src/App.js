import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ État de chargement

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserProfile(token);
    } else {
      setLoading(false); // Stop le chargement si pas de token
    }
  }, []);

  const fetchUserProfile = async (token) => {
    try {
      const response = await fetch("http://localhost:4400/api/auth/profile", {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
      });
  
      if (!response.ok) {
        if (response.status === 401) { // Si le token a expiré
          console.warn("🔴 Token expiré, suppression du token...");
          localStorage.removeItem("token");
          setUser(null);
          return;
        }
        console.error("Échec de la récupération du profil, statut :", response.status);
        return;
      }
  
      const data = await response.json();
      console.log("🔹 Données utilisateur :", data);
      if (data.user) setUser(data.user);
    } catch (error) {
      console.error("Erreur lors de la récupération du profil :", error);
    }
  };  

  // 👉 Attendre que `loading` soit `false` avant d'afficher l'UI
  if (loading) {
    return <div className="text-center mt-10">Chargement...</div>;
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar user={user} setUser={setUser} />
        <main className="flex-grow p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="/login" element={user ? <Home /> : <Login setUser={setUser} />} />
            <Route path="/register" element={user ? <Home /> : <Register />} />
            <Route path="/profile" element={user ? <Profile user={user} /> : <Login setUser={setUser} />} />
            <Route path="/create" element={user ? <CreatePost token={localStorage.getItem("token")} /> : <Login setUser={setUser} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;