import React, { createContext, useState, useContext } from "react";
import axios from "axios";

// Типы для контекста авторизации
interface AuthContextType {
  isAuthenticated: boolean;
  user: { id: string; name: string } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Создание контекста
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ id: string; name: string } | null>(null);

  // Функция для входа
  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      const { token, user } = response.data;

      // Сохраняем токен в localStorage
      localStorage.setItem("token", token);

      // Обновляем состояние авторизации
      setIsAuthenticated(true);
      setUser(user);
    } catch (error) {
      console.error("Ошибка авторизации", error);
      throw new Error("Неверный логин или пароль");
    }
  };

  // Функция для выхода
  const logout = () => {
    // Удаляем токен из localStorage
    localStorage.removeItem("token");

    // Сбрасываем состояние
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Хук для использования AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth должен использоваться внутри AuthProvider");
  }
  return context;
};