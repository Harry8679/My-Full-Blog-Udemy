import React from "react";

const Profile = ({ user }) => {
  if (!user) return <p className="text-center text-gray-500">Chargement du profil...</p>;

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-semibold text-center">Profil Utilisateur</h2>
      <div className="mt-4">
        <p><strong>Nom :</strong> {user.username}</p>
        <p><strong>Email :</strong> {user.email}</p>
      </div>
    </div>
  );
};

export default Profile;