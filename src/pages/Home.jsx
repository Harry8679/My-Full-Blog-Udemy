import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4400/api/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">📝 Articles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <div key={post._id} className="border p-4 rounded-lg shadow-lg">
            <img src={post.image} alt={post.title} className="w-full h-40 object-cover rounded-lg" />
            <h2 className="text-xl font-semibold mt-2">{post.title}</h2>
            <p className="text-gray-600">{post.content.substring(0, 100)}...</p>
            <Link to={`/post/${post._id}`} className="text-blue-500 mt-2 block">Lire plus</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;