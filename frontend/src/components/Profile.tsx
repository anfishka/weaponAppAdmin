import React from "react";
import { useAuth } from "../contexts/AuthContext";

const Profile: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <p>Вы не авторизованы. Пожалуйста, войдите.</p>;
  }

  return (
    <div>
      <h2>Добро пожаловать, {user?.name}</h2>
      <button onClick={logout}>Выйти</button>
    </div>
  );
};

export default Profile;