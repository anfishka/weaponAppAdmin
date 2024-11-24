import React, { useState } from "react";
import { Layout, Input, Button, Spin, message } from "antd";
import { Link, useNavigate } from "react-router-dom";

const { Header } = Layout;

interface Product {
  id: number;
  name: string;
  category: string;
  model?: string;
  description?: string;
  imageUrl?: string;
}

interface AppHeaderProps {
  products: Product[]; // Данные из API
}

const AppHeader: React.FC<AppHeaderProps> = ({ products }) => {
  const [searchText, setSearchText] = useState<string>(""); // Текст ввода
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); // Результаты поиска
  const [loading, setLoading] = useState<boolean>(false); // Индикатор загрузки
  const navigate = useNavigate(); // Для навигации между страницами

  const performSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredProducts([]); // Очищаем результаты, если запрос пустой
      return;
    }

    setLoading(true);

    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        (product.model && product.model.toLowerCase().includes(query.toLowerCase())) ||
        product.id.toString().includes(query)
    );

    if (filtered.length > 0) {
      setFilteredProducts(filtered);
    } else {
      message.error("Товары не найдены");
      setFilteredProducts([]);
    }

    setLoading(false);
  };

  // Обработчик изменения текста поиска
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value); // Обновление текста
    performSearch(value); // Автопоиск при изменении
  };

  // Обработчик нажатия кнопки "Поиск"
  const handleSearchClick = () => {
    performSearch(searchText); // Выполняем поиск
  };

  return (
    <>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "rgb(0, 21, 41)",
          borderRadius: 5,
          padding: "0 20px",
        }}
      >
        <Link
          to="/"
          style={{
            color: "white",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          Weapon - Product Panel
        </Link>

        {/* Поле поиска с кнопкой */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Spin spinning={loading}>
            <Input
              placeholder="Введите название, категорию или модель"
              size="middle"
              value={searchText}
              onChange={handleInputChange} // Автопоиск при вводе текста
              style={{ maxWidth: 400 }}
            />
          </Spin>
          <Button
            type="primary"
            style={{
              backgroundColor: "rgb(0, 120, 95)",
              border: "none",
            }}
            onClick={handleSearchClick} // Поиск при нажатии на кнопку
          >
            Поиск
          </Button>
        </div>
      </Header>

      {/* Результаты поиска */}
      <div style={{ padding: "20px" }}>
        <h3>Результаты поиска:</h3>
        {filteredProducts.length > 0 ? (
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {filteredProducts.map((product) => (
              <li
                key={product.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <div>
                  <strong>ID:</strong> {product.id}, <strong>Название:</strong> {product.name},{" "}
                  <strong>Категория:</strong> {product.category}
                </div>
                <Button
                  type="primary"
                  onClick={() => navigate(`/product/${product.id}`)}
                  style={{
                    backgroundColor: "rgb(0, 120, 95)",
                    border: "none",
                  }}
                >
                  Подробнее
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Введите данные для поиска...</p>
        )}
      </div>
    </>
  );
};

export default AppHeader;
