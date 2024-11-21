import React from "react";
import { useParams } from "react-router-dom";
import { Product } from "../components/Product";

interface ProductDetailProps {
  products: Product[];
}

const ProductDetail: React.FC<ProductDetailProps> = ({ products }) => {
  const { id } = useParams<{ id: string }>(); // Получаем ID из URL
  const product = products.find((product) => product.id === Number(id)); // Ищем продукт по ID

  if (!product) {
    return <div>Товар не найден</div>;
  }

  return (
    <div className="product-detail">
      <img src={product.image} alt={product.name} className="product-detail-image" />
      <h2>{product.name}</h2>
      <p>Категория: {product.category}</p>
      <p>Описание: {product.description}</p>
    </div>
  );
};

export default ProductDetail;