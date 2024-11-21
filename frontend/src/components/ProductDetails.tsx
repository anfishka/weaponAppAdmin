import React from "react";
import { useParams } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  category: string;
  model?: string;
  description?: string;
  imageUrl?: string;
}

// Пример данных товаров (вместо API)
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

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Получение ID из URL
  const product = mockData.find((p) => p.id === Number(id)); // Поиск товара по ID

  if (!product) {
    return <p>Товар не найден</p>; // Если товар не найден
  }

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>Детали товара</h2>
      <p>
        <strong>ID:</strong> {product.id}
      </p>
      <p>
        <strong>Название:</strong> {product.name}
      </p>
      <p>
        <strong>Категория:</strong> {product.category}
      </p>
      <p>
        <strong>Модель:</strong> {product.model}
      </p>
      <p>
        <strong>Описание:</strong> {product.description}
      </p>
      <img
        src={product.imageUrl}
        alt={product.name}
        style={{ width: "150px", height: "150px", marginTop: "10px" }}
      />
    </div>
  );
};

export default ProductDetails;
