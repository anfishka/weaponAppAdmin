import React from "react";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  category: string;
  description?: string;
  model?: string;
}

const mockData: Product[] = [
  { id: 1, name: "АК-47", category: "Огнестрельное оружие", model: "AKM" },
  { id: 2, name: "Катана 'Хищник'", category: "Холодное оружие", model: "Katana-X" },
  { id: 3, name: "Глок 17", category: "Огнестрельное оружие", model: "G17" },
];

const ProductList: React.FC = () => {
  const navigate = useNavigate();

  const columns = [
    {
      title: "Название",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Категория",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Действия",
      key: "actions",
      render: (text: any, record: Product) => (
        <button onClick={() => navigate(`/edit-product/${record.id}`)}>Редактировать</button>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Список товаров</h2>
      <Table dataSource={mockData} columns={columns} rowKey="id" />
    </div>
  );
};

export default ProductList;
