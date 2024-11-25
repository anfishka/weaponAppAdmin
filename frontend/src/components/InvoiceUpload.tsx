import React, { useState } from "react";
import { Table, Button, Input, Form, message, Spin, Image, Upload } from "antd";
import type { ColumnsType } from "antd/es/table";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  category: string;
  model?: string;
  description?: string;
  imageUrl?: string;
  adminId?: number;
  adminName?: string;
}

const mockAdmin = {
  adminId: 17, // ID администратора
  adminName: "Дмитрий Смирнов", // Имя администратора
};

const placeholderImage = "https://via.placeholder.com/150?text=No+Image";

const InvoiceAndProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  const handleGenerate = async () => {
    const name = form.getFieldValue("name");
    const model = form.getFieldValue("model");

    if (!name || !model) {
      message.error("Введите название и модель товара для генерации.");
      return;
    }

    setLoading(true);
    try {
      // Генерация текста с помощью GPT
      const textResponse = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: `Сгенерируй подробное описание товара с названием "${name}" и моделью "${model}". Упомяни его основные характеристики, особенности и предназначение.`,
            },
          ],
          max_tokens: 150,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer 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`, // Замените на ваш API-ключ
          },
        }
      );

      const generatedDescription = textResponse.data.choices[0].message.content.trim();
      form.setFieldsValue({ description: generatedDescription });

      // Генерация изображения с помощью DALL-E
      const imageResponse = await axios.post(
        "https://api.openai.com/v1/images/generations",
        {
          prompt: `Изображение товара: ${generatedDescription}. Современный стиль, высокое качество.`,
          n: 1,
          size: "512x512",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer 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`, // Замените на ваш API-ключ
          },
        }
      );

      const generatedImageUrl = imageResponse.data.data[0].url;
      form.setFieldsValue({ imageUrl: generatedImageUrl });
      setUploadedImageUrl(generatedImageUrl);
    } catch (error: any) {
      console.error("Ошибка генерации:", error);
      message.error("Не удалось сгенерировать данные. Проверьте ключ API или подключение.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setUploadedImageUrl(reader.result as string);
      form.setFieldsValue({ imageUrl: reader.result as string });
    };
    reader.readAsDataURL(file);
    return false; // Отключить автоматическую загрузку
  };

  const addProduct = async (values: Omit<Product, "id">) => {
    setLoading(true);

    // Добавляем данные администратора к значению формы
    const productData = {
      ...values,
      adminId: mockAdmin.adminId, // ID администратора
      adminName: mockAdmin.adminName, // Имя администратора
    };

    try {
      console.log("Отправляем данные:", productData); // Лог для проверки

      const response = await axios.post("https://weaponadminapi20241125032218.azurewebsites.net/api/Products", productData, {
        headers: { "Content-Type": "application/json" },
      });

      const newProduct = response.data;

      // Обновляем список товаров
      setProducts([...products, newProduct]);

      // Очищаем форму и состояние изображения
      form.resetFields();
      setUploadedImageUrl(null);

      message.success("Товар успешно добавлен!");
    } catch (error: any) {
      console.error("Ошибка при добавлении товара:", error);
      message.error("Не удалось добавить товар.");
    } finally {
      setLoading(false);
    }
  };

  const columns: ColumnsType<Product> = [
    {
      title: "Превью",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (url: string) => (
        <Image
          src={url || placeholderImage}
          alt="Product Preview"
          style={{ width: 200, height: 200, objectFit: "contain", borderRadius: 5 }}
          preview={{ visible: true }}
        />
      ),
    },
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
    }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", padding: "20px" }}>
      <div style={{ display: "flex", gap: "20px" }}>
        <div style={{ flex: 1, border: "1px solid #bc4a00", padding: "20px", borderRadius: "8px" }}>
          <h2>Список товаров</h2>
          <Table columns={columns} dataSource={products} rowKey="id" pagination={false} bordered />
        </div>
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
            <Form.Item label={<span style={{ color: "white" }}>Загрузить изображение</span>}>
              <Upload
                beforeUpload={handleUpload}
                showUploadList={false}
                accept="image/*"
                style={{ marginBottom: "10px" }}
              >
                <Button icon={<UploadOutlined />} type="dashed" style={{ color: "rgb(0, 100, 80)", margin: "15px" }}>
                  Загрузить изображение
                </Button>
              </Upload>
              <Image
                src={uploadedImageUrl || placeholderImage}
                alt="Uploaded Preview"
                style={{ width: 250, height: 250, objectFit: "contain", marginTop: "10px" }}
              />
            </Form.Item>
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
              {loading ? <Spin /> : "Сгенерировать с GPT"}
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default InvoiceAndProducts;
