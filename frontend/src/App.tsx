import React from "react";
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

const App: React.FC = () => ( 
  <AuthProvider>
    <BrowserRouter>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        {/* Header — фиксированная шапка */}
        <AppHeader />
        <div style={{ display: "flex", flex: 1 }}>
          {/* Sidebar слева */}
          <Sidebar />

          {/* Контент справа от Sidebar */}
          <div style={{ marginLeft: 256, padding: 20, width: "100%" }}>
            <main>
              <Routes>
                {/* Главная страница */}
                <Route path="/" element={<Home />} />

                {/* Другие маршруты */}
                {/* Uncomment these when the components are ready */}
                {/* <Route path="/products" element={<ProductList />} />
                <Route path="/add-product" element={<AddProduct />} /> */}
                <Route path="/upload-invoice" element={<InvoiceUpload />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/edit-product/:id" element={<EditProduct />} />

              </Routes>
            </main>
          </div>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  </AuthProvider> 
);

export default App;

