import React from "react";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: number;
  name: string;
  description: string;
  category: string;
  image: string;
  onSelect: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, description, category, image, onSelect }) => (
  <div className="product-card">
    <img src={image} alt={name} className="product-image" />
    <div className="product-details">
      <h3 className="product-name">{name}</h3>
      <p className="product-category">Категория: {category}</p>
      <p className="product-description">{description}</p>
    </div>
    
  <Link to={`/product/${id}`} className="details-link">
  Выбрать
  </Link>
  </div>
);

export default ProductCard;