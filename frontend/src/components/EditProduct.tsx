import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Button, Card, Row, Col, Typography, message, Image } from "antd";
import axios from "axios";

const { Text } = Typography;

interface Product {
  id: number;
  name: string;
  category: string;
  model?: string;
  description?: string;
  imageUrl?: string;
}

const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<Product | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get<Product>(`https://localhost:7208/api/Products/${id}`);
        setProduct(response.data);
        form.setFieldsValue(response.data);
      } catch (error) {
        message.error("Ошибка загрузки данных продукта.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, form]);

  const handleSave = async (values: Partial<Product>) => {
    try {
      // Формируем массив изменений
      const patchDoc = Object.keys(values).reduce((acc: any[], key) => {
        const newValue = values[key as keyof Product];
        const oldValue = product?.[key as keyof Product];

        // Добавляем только те поля, которые изменились
        if (newValue !== oldValue && newValue !== undefined) {
          acc.push({ op: "replace", path: `/${key}`, value: newValue });
        }

        return acc;
      }, []);

      // Если изменений нет
      if (patchDoc.length === 0) {
        message.info("Нет изменений для сохранения.");
        return;
      }

      // Отправка PATCH-запроса
      await axios.patch(`https://localhost:7208/api/Products/${id}`, patchDoc, {
        headers: { "Content-Type": "application/json-patch+json" },
      });

      message.success("Данные успешно обновлены!");
      navigate("/products");
    } catch (error) {
      console.error("Ошибка сохранения данных:", error);
      message.error("Не удалось сохранить изменения.");
    }
  };

  if (loading) {
    return <p>Загрузка данных...</p>;
  }

  if (!product) {
    return <p>Продукт не найден</p>;
  }

  return (
    <Card
      title="Редактирование продукта"
      style={{
        backgroundColor: "rgb(0, 120, 95)",
        color: "white",
        borderRadius: 8,
      }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSave}
        initialValues={product}
      >
        <Row gutter={32}>
          {/* Левая часть: Информация о продукте */}
          <Col span={12}>
            <Card
              bordered={false}
              style={{
                backgroundColor: "transparent",
                color: "white",
              }}
            >
              <Form.Item label={<Text style={{ color: "white", fontSize: 12 }}>ID</Text>}>
                <Text
                  style={{
                    color: "#BC4A00",
                    fontWeight: 600,
                    backgroundColor: "#eee",
                    padding: 8,
                    borderRadius: 5,
                    width: 180,
                    display: "inline-block",
                    textAlign: "center",
                  }}
                >
                  {product.id}
                </Text>
              </Form.Item>

              <Form.Item label={<Text style={{ color: "white", fontSize: 12 }}>Картинка</Text>}>
                <Image
                  src={product.imageUrl}
                  alt="Продукт"
                  style={{
                    width: 180,
                    height: 180,
                    borderRadius: 5,
                    objectFit: "contain",
                    backgroundColor: "#eee",
                  }}
                />
              </Form.Item>
            </Card>
          </Col>

          {/* Правая часть: Редактирование */}
          <Col span={12}>
            <Form.Item
              label={<Text style={{ color: "white" }}>Название</Text>}
              name="name"
              rules={[{ required: true, message: "Введите название!" }]}
            >
              <Input
                placeholder="Введите название"
                style={{
                  backgroundColor: "#1e1e1e",
                  color: "white",
                }}
              />
            </Form.Item>
            <Form.Item
              label={<Text style={{ color: "white" }}>Категория</Text>}
              name="category"
            >
              <Input
                placeholder="Введите категорию"
                style={{
                  backgroundColor: "#1e1e1e",
                  color: "white",
                }}
              />
            </Form.Item>
            <Form.Item
              label={<Text style={{ color: "white" }}>Модель</Text>}
              name="model"
            >
              <Input
                placeholder="Введите модель"
                style={{
                  backgroundColor: "#1e1e1e",
                  color: "white",
                }}
              />
            </Form.Item>
            <Form.Item
              label={<Text style={{ color: "white" }}>Описание</Text>}
              name="description"
            >
              <Input.TextArea
                placeholder="Введите описание"
                style={{
                  backgroundColor: "#1e1e1e",
                  color: "white",
                }}
              />
            </Form.Item>
            <Form.Item
              label={<Text style={{ color: "white" }}>URL изображения</Text>}
              name="imageUrl"
            >
              <Input
                placeholder="Введите URL изображения"
                style={{
                  backgroundColor: "#1e1e1e",
                  color: "white",
                }}
              />
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    width: "100%",
                    padding: "10px",
                    backgroundColor: "#BC4A00",
                    border: "none",
                  }}
                >
                  Сохранить
                </Button>
              </Col>
              <Col span={12}>
                <Button
                  htmlType="button"
                  onClick={() => navigate("/products")}
                  style={{
                    width: "100%",
                    padding: "10px",
                    backgroundColor: "#BC4A00",
                    border: "none",
                    color: "white",
                  }}
                >
                  Отмена
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default EditProduct;
