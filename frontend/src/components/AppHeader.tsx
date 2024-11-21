import React, { useState } from "react";
import { Layout, Input, message } from "antd";
import { Link } from "react-router-dom";

const { Header } = Layout;
const { Search } = Input;

interface Product {
  id: number;
  name: string;
  category: string;
  model?: string;
  description?: string;
  imageUrl?: string;
}

// Пример данных
const mockData: Product[] = [
  {
    id: 1,
    name: "АК-47",
    category: "Огнестрельное оружие",
    model: "AKM",
    description: "Легендарный автомат с высокой надёжностью",
    imageUrl: "https://via.placeholder.com/100",
  },
  {
    id: 2,
    name: "Катана 'Хищник'",
    category: "Холодное оружие",
    model: "Katana-X",
    description: "Традиционный японский меч с идеально заточенным клинком",
    imageUrl: "https://via.placeholder.com/100",
  },
  {
    id: 3,
    name: "Глок 17",
    category: "Огнестрельное оружие",
    model: "G17",
    description: "Компактный пистолет с магазином на 17 патронов",
    imageUrl: "https://via.placeholder.com/100",
  },
];

const AppHeader: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockData);

  const handleSearch = (value: string) => {
    setSearchText(value);

    const filtered = mockData.filter(
      (product) =>
        product.name.toLowerCase().includes(value.toLowerCase()) ||
        product.category.toLowerCase().includes(value.toLowerCase()) ||
        (product.model && product.model.toLowerCase().includes(value.toLowerCase()))
    );

    if (filtered.length > 0) {
      setFilteredProducts(filtered);
    } else {
      message.error("Товары не найдены");
      setFilteredProducts([]);
    }
  };

  return (
    <>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "rgb(0, 21, 41)",
          border: "1px solid #eee",
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

        <Search
          placeholder="Введите название, категорию или модель"
          enterButton="Поиск"
          onSearch={handleSearch}
          style={{ maxWidth: 400 }}
        />
      </Header>

      {/* Результаты поиска */}
      <div style={{ padding: "20px" }}>
        <h3>Результаты поиска:</h3>
        {filteredProducts.length > 0 ? (
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {filteredProducts.map((product) => (
              <li key={product.id} style={{ marginBottom: "10px" }}>
                <Link
                  to={`/product/${product.id}`}
                  style={{
                    padding: "10px",
                    display: "block",
                    background: "#f5f5f5",
                    borderRadius: "5px",
                    color: "black", // Устанавливаем начальный цвет текста
                    textDecoration: "none", // Убираем подчеркивание
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "black")} // Цвет при наведении
                  onMouseLeave={(e) => (e.currentTarget.style.color = "black")} // Цвет при убирании курсора
                >
                
                  <strong>ID:</strong> {product.id}, <strong>Название:</strong> {product.name},{" "}
                  <strong>Категория:</strong> {product.category}
                </Link>
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
