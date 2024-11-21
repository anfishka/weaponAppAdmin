import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Form, Input, Button, message } from "antd";

interface Product {
  id: number;
  name: string;
  category: string;
  model?: string;
  description?: string;
  imageUrl?: string;
}

const mockData: Product[] = [
  { id: 1, name: "АК-47", category: "Огнестрельное оружие", model: "AKM" },
  { id: 2, name: "Катана 'Хищник'", category: "Холодное оружие", model: "Katana-X" },
  { id: 3, name: "Глок 17", category: "Огнестрельное оружие", model: "G17" },
];

const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = mockData.find((p) => p.id === Number(id));

  const [form] = Form.useForm();
  const [generatedDescription, setGeneratedDescription] = useState<string | undefined>("");
  const [generatedImage, setGeneratedImage] = useState<string | undefined>("");

  if (!product) {
    return <p>Товар не найден</p>;
  }

  const handleGenerate = async () => {
    const name = form.getFieldValue("name");

    if (!name) {
      message.error("Введите название товара для генерации");
      return;
    }

    // Имитируем GPT-запрос
    setTimeout(() => {
      setGeneratedDescription(`Сгенерированное описание для ${name}`);
      setGeneratedImage("https://via.placeholder.com/150");
      message.success("Данные успешно сгенерированы");
    }, 1000);
  };

  const handleSubmit = (values: Product) => {
    console.log("Сохраненные данные:", values);
    message.success("Изменения сохранены");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Редактировать товар</h2>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          name: product.name,
          category: product.category,
          model: product.model,
          description: product.description,
          imageUrl: product.imageUrl,
        }}
        onFinish={handleSubmit}
      >
        <Form.Item label={<span style={{ color: "white" }}>Название</span>} name="name" rules={[{ required: true, message: "Введите название!" }]}>
          <Input />
        </Form.Item>
        <Form.Item  label={<span style={{ color: "white" }}>Категория</span>} name="category">
          <Input />
        </Form.Item>
        <Form.Item  label={<span style={{ color: "white" }}>Модель</span>}  name="model">
          <Input />
        </Form.Item>
        <Form.Item label={<span style={{ color: "white" }}>Описание</span>} name="description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item label={<span style={{ color: "white" }}>URL изображения</span>} name="imageUrl">
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Сохранить изменения
        </Button>
        <Button type="dashed" onClick={handleGenerate} style={{ marginLeft: "10px", color:"rgb(0, 100, 80)", fontWeight:600, border:"3px solid rgb(0, 100, 80)" }}>
          Сгенерировать с GPT
        </Button>
      </Form>

      {/* Отображение сгенерированных данных */}
      {generatedDescription && (
        <div style={{ marginTop: "20px" }}>
          <h3>Сгенерированное описание:</h3>
          <p>{generatedDescription}</p>
          {generatedImage && <img src={generatedImage} alt="Сгенерированное изображение" />}
        </div>
      )}
    </div>
  );
};

export default EditProduct;
