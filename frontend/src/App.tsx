import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Footer from "./layouts/Footer";
import { AuthProvider } from "./contexts/AuthContext";
import Sidebar from "./components/Sidebar";
import AppHeader from "./components/AppHeader";
import Home from "./components/Home";
import InvoiceUpload from "./components/InvoiceUpload";
import ProductDetails from "./components/ProductDetails";
import EditProduct from "./components/EditProduct";
import ProductList from "./components/ProductList";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import apiClient from "./utils/apiClient";
import { Product } from "./components/Product";

const App: React.FC = () => {
  const [data, setData] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const isAuthenticated = !!localStorage.getItem("token"); // Проверяем, авторизован ли пользователь

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiClient.get<Product[]>(`/Products`);
        setData(
          response.data.map((item): Product => ({
            id: item.id,
            name: item.name,
            description: item.description,
            category: item.category,
            imageUrl: item.imageUrl || "/placeholder.png", // Добавляем плейсхолдер
            updatedAt: item.updatedAt || "Дата не указана",
            createdAt: item.createdAt,
            isVisible: item.isVisible,
            model: item.model,
          }))
        );
      } catch (err) {
        console.error("Ошибка при загрузке данных:", err);
        setError("Ошибка загрузки данных.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <AppHeader products={data}/>
        <div style={{ display: "flex", flex: 1 }}>
          <Sidebar />
          <div style={{ marginLeft: 80, padding: 10, width: "100%" }}>
            <main>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                  path="/dashboard"
                  element={
                    isAuthenticated ? <AdminDashboard /> : <Navigate to="/login" />
                  }
                />
                <Route path="/" element={<Home />} />
                <Route
                  path="/products"
                  element={<ProductList products={data} loading={loading} error={error} />}
                />
                <Route path="/upload-invoice" element={<InvoiceUpload />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/edit-product/:id" element={<EditProduct />} />
              </Routes>
            </main>
          </div>
        </div>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
