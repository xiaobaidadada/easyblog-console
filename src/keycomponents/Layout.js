// import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import React from 'react';
import './layout.css';
import RouteMain from './RouteMain'
import { useNavigate } from 'react-router-dom';

const { Header, Content, Sider } = Layout;
// const items1 = ['1', '2', '3'].map((key) => ({
//   key,
//   label: `nav ${key}`,
// }));
// const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
//   const key = String(index + 1);
//   return {
//     key: `sub${key}`,
//     icon: React.createElement(icon),
//     label: `subnav ${key}`,
//     children: new Array(4).fill(null).map((_, j) => {
//       const subKey = index * 4 + j + 1;
//       return {
//         key: subKey,
//         label: `option${subKey}`,
//       };
//     }),
//   };
// });
const items1 = [
  {
    label: '退出'
  },
  {
    label: '后台'
  }
]
const items2 = [
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
    label: '评论管理'
  },
  {
    key: 'file',
    label: '文件'
  },
  {
    key: 'system',
    label: '系统设置',
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

  function menuControl({ item, key, keyPath, domEvent }) {
    console.log(keyPath)
    rout = '';
    // keyPath.map((path) => {
    //   rout += path + '/';
    // })
    keyPath.forEach(element => {
      rout = element + '/'+rout;
    });

    navigate(rout)
  }

  return (
    <Layout>
      {/* <--头部--> */}
      <Header className="header" theme="light" style={{
        background: colorBgContainer,
        boxShadow: ' 0 0 5px rgb(0 0 0 / 10%)',
        // position: 'fixed'
      }}>
        <div className="logo" />
        <Menu theme="light" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />
        <div style={{
          display: 'inline-block'
        }}>退出</div>
      </Header>

      {//中间
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
            items={items2} onClick={menuControl}
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
            <RouteMain rout={rout} />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default Loyout;
