// import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import React, { useState } from 'react';
import './layout.css';
import RouteMain from './RouteMain'
import { useNavigate } from 'react-router-dom';
import {  Outlet  } from "react-router-dom";
import HeaderXB from '../components/header/HeaderXB'

const { Header, Content, Sider } = Layout;

const 顶部提示按钮 = [
  {
    label: '退出'
  },
  {
    label: '后台'
  }
]
const 菜单 = [
  {
    key: 'essay',
    label: '文章管理'
  },

  {
    key: 'plug',
    label: '插件管理',
    children: [{
      key: 'css',
      label: 'CSS'
    },
    {
      key: 'js',
      label: 'JS'
    }
    ]
  },

  {
    key: 'eaitor',
    label: '快速编辑'
  },
  {
    label: '评论管理',
    key: 'comment'
  },
  {
    key: 'file',
    label: '文件'
  },
  {
    key: 'system',
    label: '设置',
    children: [{
      key: 'function',
      label: '账号'
    }]
  }
]
const Loyout = () => {
  const navigate = useNavigate();
  var rout = '/'
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  //状态设置
  //顶部导航栏设置
  const [bar, setBar] = useState("index");
  const [mode, setMd] = useState({
    mode:"markdown",
    input:"输入文章标题"
  });

  

  /**
   * 菜单点击路由函数
   * @param {*} param0
   */
  function menuControl({ item, key, keyPath, domEvent }) {
    console.log(keyPath)
    rout = '';
    keyPath.forEach(element => {
      rout = element + '/' + rout;
    });

    if (rout === 'eaitor/') {
      setBar("eaitor")
    }
    else {
      setBar("index")
    }
    navigate(rout)//路由跳转

  }

  //给头部提供函数
  function md_f(md_p){
    setMd(md_p)
  }

  //给内容提供函数
  function header_f(header){
    setBar(header)
  }

  return (
    <Layout>
      {/* <--顶部--> */}
      <HeaderXB md_f={md_f} header_type={bar} />


      {//中部
      }
      <Layout>
        {//侧边栏
        }
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
          }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{
              height: '100%',
              borderRight: 0,
            }}
            items={菜单} onClick={menuControl}
          />
        </Sider>

        {//内容
        }
        <Layout
          style={{
            padding: '0 24px 24px',
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
            <Outlet context={[mode,header_f]}  />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default Loyout;
