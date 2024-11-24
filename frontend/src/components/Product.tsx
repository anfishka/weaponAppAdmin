export interface Product {
  id: number;               // Уникальный идентификатор продукта
  name: string;             // Название продукта
  description: string;      // Описание продукта
  category: string;         // Категория продукта
  imageUrl: string;         // Поле, возвращаемое API для изображения
  image?: string;           // Локальное поле для работы с изображениями (например, placeholder)
  updatedAt: string;        // Дата обновления (для сортировки)
  isVisible: boolean;       // Поле для управления видимостью
  createdAt: string;        // Дата создания
  model: string;            // Модель продукта
}