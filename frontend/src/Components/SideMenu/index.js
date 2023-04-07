import {
  AppstoreOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SideMenu() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();
  return (
    <div className="SideMenu">
      <Menu
        className="SideMenuVertical"
        mode="vertical"
        onClick={(item) => {
          //item.key
          navigate(item.key);
        }}
        selectedKeys={[selectedKeys]}
        items={[
          {
            label: "Home",
            icon: <AppstoreOutlined />,
            key: "/",
          },
          {
            label: "Profile",
            key: "/Profile",
            icon: <ShopOutlined />,
          },
          {
            label: "Item Donation",
            key: "/Item Donation",
            icon: <ShoppingCartOutlined />,
          },
          {
            label: "Money Donation",
            key: "/Money Donation",
            icon: <UserOutlined />,
          },
          {
            label: "Setting",
            key: "/Setting",
            icon: <UserOutlined />,
          },
          {
            label: "FAQ`s",
            key: "/FAQ`s",
            icon: <UserOutlined />,
          },
        ]}
      ></Menu>
    </div>
  );
}
export default SideMenu;
