import React, { useEffect, useState } from "react";
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./layouts/Footer";
import { AuthProvider } from "./contexts/AuthContext";
import Sidebar from "./components/Sidebar";
import AppHeader from "./components/AppHeader";
import Home from "./components/Home";
import InvoiceUpload from "./components/InvoiceUpload";
import ProductDetails from "./components/ProductDetails";
import EditProduct from "./components/EditProduct";
import ProductList from "./components/ProductList";
import axios from "axios";
import { Product } from "./components/Product";

const App: React.FC = () => {
  const [data, setData] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>(`https://localhost:7208/api/Products/`);
        console.log("API response:", response.data);
    
        const mappedData = response.data.map((item): Product => ({
          id: item.id,
          name: item.name,
          description: item.description,
          category: item.category,
          imageUrl: item.imageUrl,              // Оригинальное поле из API
          image: item.imageUrl || "/placeholder.png", // Локальное поле для замены отсутствующего изображения
          updatedAt: item.updatedAt || "Дата не указана",
          createdAt: item.createdAt,
          isVisible: item.isVisible,
          model: item.model,
        }));
        
    
        setData(mappedData);
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
      <AppHeader products={data} />
        <div style={{ display: "flex", flex: 1 }}>
          <Sidebar />
          <div style={{ marginLeft: 80, padding: 10, width: "100%" }}>
            <main>
              <Routes>
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
