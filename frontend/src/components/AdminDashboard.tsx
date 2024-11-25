import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../utils/apiClient";
import { Product } from "./Product";

const AdminDashboard: React.FC = () => {
    const [data, setData] = useState<Product[]>([]); // Типизируем как массив Product

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get("/admins");
        setData(response.data);
      } catch (err) {
        console.error("Ошибка:", err);
        navigate("/login"); // Перенаправляем на логин при ошибке
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div>
      <h1>Панель администратора</h1>
      {data ? (
        <ul>
          {data.map((admin: any) => (
            <li key={admin.id}>
              {admin.first_name} {admin.last_name} - {admin.username}
            </li>
          ))}
        </ul>
      ) : (
        <p>Загрузка...</p>
      )}
    </div>
  );
};

export default AdminDashboard;
