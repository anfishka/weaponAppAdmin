import React from "react";
import { Table, Button } from "antd";
import { useLocation } from "react-router-dom";

const AdminsWorkloads: React.FC = () => {
  const location = useLocation();
  const admin = location.state; // Получение данных администратора из состояния маршрута

  // Данные для таблицы (замените на реальные данные нагрузок)
  const data = [
    {
      key: "1",
      id: 1,
      weaponName: "AK-47",
      dateAdded: "2024-10-10",
      dateEdited: "2024-10-12",
    },
    {
      key: "2",
      id: 2,
      weaponName: "M16",
      dateAdded: "2024-10-11",
      dateEdited: "2024-10-13",
    },
    {
      key: "3",
      id: 3,
      weaponName: "Sniper Rifle",
      dateAdded: "2024-10-15",
      dateEdited: "2024-10-17",
    },
  ];

  // Обработчик кнопки "Показать"
  const handleShowClick = (id: number) => {
    const clientHost = "https://client-landing.com"; // URL лендинга клиента
    const anchor = `#card-${id}`; // Якорь на конкретный элемент
    window.location.href = `${clientHost}${anchor}`;
  };

  // Колонки таблицы
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text: number) => <span style={{ color: "#BC4A00" }}>{text}</span>,
    },
    {
      title: "Название оружия",
      dataIndex: "weaponName",
      key: "weaponName",
    },
    {
      title: "Дата добавления",
      dataIndex: "dateAdded",
      key: "dateAdded",
    },
    {
      title: "Дата редактирования",
      dataIndex: "dateEdited",
      key: "dateEdited",
    },
    {
      title: "Действие",
      key: "action",
      render: (_: any, record: { id: number }) => (
        <Button
          type="primary"
          onClick={() => handleShowClick(record.id)}
          style={{
            backgroundColor: "#BC4A00",
            border: "none",
          }}
        >
          Показать
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px", backgroundColor: "#001529", color: "white" }}>
      {/* Отображение информации о выбранном администраторе */}
      {admin && (
        <h2 style={{ color: "rgb(0, 120, 95)", marginBottom: "20px" }}>
          Нагрузки администратора: {admin.id} - {admin.name}
        </h2>
      )}

      <Table
        dataSource={data}
        columns={columns}
        bordered
        pagination={{ pageSize: 5 }}
        style={{ backgroundColor: "#252525" }}
      />
    </div>
  );
};

export default AdminsWorkloads;
