import React, { useState } from "react";
import { Table, Button, Input, Form, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import axios from "axios";



interface Product {
  id: number;
  name: string;
  category: string;
  model?: string;
  description?: string;
  imageUrl?: string;
}

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
    description: "Японский меч с идеально заточенным клинком",
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

const InvoiceAndProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(mockData); // Текущие данные продуктов
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockData); // Отфильтрованные товары
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false); // Состояние загрузки

  const handleGenerate = async () => {
    const name = form.getFieldValue("name");

    if (!name) {
      message.error("Введите название товара для генерации");
      return;
    }

    // Имитируем GPT-запрос
    setTimeout(() => {
      form.setFieldsValue({
        description: `Сгенерированное описание для ${name}`,
        imageUrl: "https://via.placeholder.com/150",
      });
      message.success("Данные успешно сгенерированы");
    }, 1000);
  };

  // Отправка данных на сервер
  const addProduct = async (values: Omit<Product, "id">) => {
    setLoading(true);
    try {
      const response = await axios.post("https://localhost:7208/api/Products", values, {
        headers: { "Content-Type": "application/json" },
      });

      const newProduct = response.data; // Новый продукт с ID от сервера
      setProducts([...products, newProduct]);
      setFilteredProducts([...products, newProduct]);
      form.resetFields();
      message.success("Товар успешно добавлен!");
    } catch (error: any) {
      console.error("Ошибка при добавлении товара:", error);
      message.error("Не удалось добавить товар.");
    } finally {
      setLoading(false);
    }
  };

  // Колонки таблицы
  const columns: ColumnsType<Product> = [
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
      title: "Модель",
      dataIndex: "model",
      key: "model",
    },
    {
      title: "Описание",
      dataIndex: "description",
      key: "description",
    },
    
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", padding: "20px" }}>
      {/* Основной контент */}
      <div style={{ display: "flex", gap: "20px" }}>
        {/* Таблица слева */}
        <div style={{ flex: 1, border: "1px solid #bc4a00", padding: "20px", borderRadius: "8px" }}>
          <h2>Список товаров</h2>
          <Table
            columns={columns}
            dataSource={filteredProducts} // Отображаем только отфильтрованные товары
            rowKey="id"
            pagination={false}
            bordered
          />
        </div>

        {/* Форма справа */}
        <div
          style={{
            flex: 1,
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "8px",
            backgroundColor: "#bc4a00",
          }}
        >
          <h2 style={{ color: "white" }}>Добавить товар</h2>
          <Form
            form={form}
            layout="vertical"
            onFinish={addProduct}
            initialValues={{ isVisible: true }}
          >
            <Form.Item
              label={<span style={{ color: "white" }}>Название</span>}
              name="name"
              rules={[{ required: true, message: "Введите название товара!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={<span style={{ color: "white" }}>Категория</span>}
              name="category"
              rules={[{ required: true, message: "Введите категорию товара!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label={<span style={{ color: "white" }}>Модель</span>} name="model">
              <Input />
            </Form.Item>
            <Form.Item label={<span style={{ color: "white" }}>Описание</span>} name="description">
              <Input.TextArea />
            </Form.Item>
            <Form.Item label={<span style={{ color: "white" }}>URL изображения</span>} name="imageUrl">
              <Input />
            </Form.Item>
            <Form.Item label={<span style={{ color: "white" }}>isVisible</span>} name="isVisible">
              <Input />
            </Form.Item>
             {/*TODELETE */}
           
            <Form.Item label={<span style={{ color: "white" }}>adminId</span>} name="adminId">
              <Input />
            </Form.Item>
            <Form.Item label={<span style={{ color: "white" }}>adminName</span>} name="adminName">
              <Input />
            </Form.Item>
                  {/*TODELETE  */}
            <Button type="primary" htmlType="submit" loading={loading}>
              Добавить товар
            </Button>
            <Button
              type="dashed"
              onClick={handleGenerate}
              style={{
                marginLeft: "10px",
                color: "rgb(0, 100, 80)",
                fontWeight: 600,
                border: "3px solid rgb(0, 100, 80)",
              }}
            >
              Сгенерировать с GPT
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default InvoiceAndProducts;

