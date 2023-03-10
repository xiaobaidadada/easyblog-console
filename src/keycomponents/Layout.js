// import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import RouteMain from "@router/RouteMain";
import HeaderXB from "../components/header/HeaderXB";
import styles from "./styles.module.css";


const { Content, Sider } = Layout;
let routeName = ""; // 当前路由名

// 菜单
export const menuList = [
  {
    key: "essay",
    label: "文章管理",
  },

  {
    key: "plug",
    label: "插件管理",
    children: [
      {
        key: "css",
        label: "CSS",
      },
      {
        key: "js",
        label: "JS",
      },
    ],
  },

  {
    key: "eaitor",
    label: "快速编辑",
  },
  {
    label: "评论管理",
    key: "comment",
  },
  {
    key: "file",
    label: "文件",
  },
  {
    key: "system",
    label: "系统设置",
    children: [
      {
        key: "setting",
        label: "账号",
      },
    ],
  },
];

const Loyout = () => {
  const navigate = useNavigate();
  let rout = "";

  /**
   * 菜单点击路由函数
   * @param {*} param0
   */
  function menuControl({ item, key, keyPath, domEvent }) {
    console.log(keyPath);
    routeName = keyPath[0];
    keyPath.forEach((element) => {
      rout = element + "/" + rout;
    });
    navigate(rout); //路由跳转
  }

  return (
    <Layout className={styles["layout-wrapper"]}>
      {/* <--顶部--> */}
      <HeaderXB route={routeName} />

      <Layout>
        {/* 侧边 */}
        <Sider className={styles.aside}>
          <Menu
            mode="inline"
            defaultSelectedKeys={["essay"]}
            defaultOpenKeys={["essay"]}
            className={styles.menu}
            items={menuList}
            onClick={menuControl}
          />
        </Sider>
        {/* 内容 */}
        <Layout className={styles["inner-layout"]}>
          <Content className={styles.content}>
            <RouteMain rout={rout} />
          </Content>
        </Layout>

      </Layout>
    </Layout>
  );
};
export default Loyout;
