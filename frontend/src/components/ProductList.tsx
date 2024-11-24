import React from "react";
import { Table, Spin, Alert, Button, Switch } from "antd";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  category: string;
  description?: string;
  model?: string;
}

interface ProductListProps {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const ProductList: React.FC<ProductListProps> = ({ products, loading, error }) => {
  const navigate = useNavigate();
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Картинка",
      dataIndex: "image", // Используем локальное поле
      key: "image",
      render: (text: string) => (
        <img src={text} alt="Product" style={{ width: 100, height: 100 }} />
      ),
    },
    {
      title: "Название",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Модель",
      dataIndex: "model",
      key: "model",
    },
    {
      title: "Категория",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Описание",
      dataIndex: "description",
      key: "description",
    },
   
    {
      title: "Дата добавления",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) => new Date(text).toLocaleDateString(),
    },
    
    {
      title: "Видимость",
      dataIndex: "isVisible",
      key: "isVisible",
      render: (isVisible: boolean) => (
        <Switch
          checked={isVisible}
          checkedChildren="Вкл"
          unCheckedChildren="Выкл"
          disabled
          style={{
            backgroundColor: isVisible ? "#52c41a" : "#ff4d4f", // Зелёный для "Вкл", красный для "Выкл"
          }}
        />
      ),
    },
    {
      title: "Действия",
      key: "actions",
      render: (text: any, record: Product) => (
        <Button
          type="primary"
          onClick={() => navigate(`/edit-product/${record.id}`)}
          style={{ backgroundColor: "#BC4A00", border: "none", color: "#fff" }}
        >
          Редактировать
        </Button>
      ),
    },
  ];
  if (loading) {
    return <Spin tip="Загрузка данных..." />;
  }

  if (error) {
    return <Alert message="Ошибка" description={error} type="error" showIcon />;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Список товаров</h2>
      <Table dataSource={products} columns={columns} rowKey="id" />
    </div>
  );
};

export default ProductList;
