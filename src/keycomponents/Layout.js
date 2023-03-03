// import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import { Breadcrumb, Layout, Menu, theme, Button, Modal, Space } from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import RouteMain from "./RouteMain";
import HeaderXB from "../components/header/HeaderXB";
import "./layout.css";

const { Header, Content, Sider } = Layout;

// export const nameContext = React.createContext("名nameContext");
let routeName = ""; // 当前路由名
// 顶部提示按钮
const headerList = [
  {
    label: "退出",
  },
  {
    label: "后台",
  },
];
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
  var rout = "/";
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  /**
   * 菜单点击路由函数
   * @param {*} param0
   */
  function menuControl({ item, key, keyPath, domEvent }) {
    console.log(keyPath);
    routeName = keyPath[0];
    rout = "";
    keyPath.forEach((element) => {
      rout = element + "/" + rout;
    });
    navigate(rout); //路由跳转
  }

  return (
    <Layout>
      {/* <--顶部--> */}
      <HeaderXB route={routeName} />
      {/* <Header className="header" theme="light" style={{
        background: colorBgContainer,
        boxShadow: ' 0 0 5px rgb(0 0 0 / 10%)',
        // position: 'fixed'
      }}>
        <div className="logo" />
        <Menu theme="light" mode="horizontal" defaultSelectedKeys={['2']} items={顶部提示按钮} />
        <div style={{
          display: 'inline-block'
        }}>退出</div>
      </Header> */}

      {
        //中部
      }
      <Layout>
        {
          //侧边栏
        }
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
          }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={['essay']}
            defaultOpenKeys={['essay']}
            style={{
              height: "100%",
              borderRight: 0,
            }}
            items={menuList}
            onClick={menuControl}
          />
        </Sider>

        {
          //内容
        }
        <Layout
          style={{
            padding: "0 24px 24px",
          }}
        >
          <Content
            style={{
              marginTop: 30,
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <RouteMain rout={rout} />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
  
};
export default Loyout;
