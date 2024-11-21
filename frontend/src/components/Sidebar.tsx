import React from "react";
import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";

const Sidebar: React.FC = () => {
  const location = useLocation();
  const selectedKey = location.pathname.includes("/products")
    ? "1"
    : location.pathname.includes("/add-invoice")
    ? "2"
    : location.pathname.includes("/edit-product")
    ? "3"
    : "";

  return (
    <Menu
      style={{
        width: 256,
        height: "100vh",
        backgroundColor: "#001529",
        color: "#fff",
        fontSize: "16px",
      }}
      mode="inline"
      theme="dark"
      selectedKeys={[selectedKey]}
    >
      {/* Секция 1: Список добавленных товаров */}
      <Menu.Item key="1" style={{ marginTop: "20px" }}>
        <NavLink to="/products" style={{ color: "inherit" }}>
          🛒 Список добавленных товаров
        </NavLink>
      </Menu.Item>

      {/* Секция 2: Товары для добавления */}
      <Menu.Item key="2">
        <NavLink to="/upload-invoice" style={{ color: "inherit" }}>
          📄 Товары для добавления 
        </NavLink>
      </Menu.Item>

      {/* Секция 3: Детальная информация и редактирование 
      <Menu.Item key="3">
        <NavLink to="/edit-product" style={{ color: "inherit" }}>
          ✏️ Редактирование товара
        </NavLink>
      </Menu.Item>*/}
    </Menu>
  );
};

export default Sidebar;
