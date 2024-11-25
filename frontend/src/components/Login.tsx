import React, { useState } from "react";
import axios from "axios";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      setError(null); // Очистка ошибок перед запросом
      const response = await axios.post("http://localhost:7185/api/auth/login", {
        username,
        password,
      });

      const { Token } = response.data;

      // Сохраняем токен в localStorage
      localStorage.setItem("token", Token);

      alert("Вы успешно вошли в систему!");
    } catch (err: any) {
      setError(err.response?.data?.message || "Ошибка входа.");
    }
  };

  return (
    <div>
      <h1>Вход</h1>
      <input
        type="text"
        placeholder="Логин"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Войти</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;
