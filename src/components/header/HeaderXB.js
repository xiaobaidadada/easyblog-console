import React, { useContext, useState } from "react";
import { Breadcrumb, Layout, Menu, theme, Button, Modal, Space } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import styles from "./styles.module.scss";
import Logo from "../../assets/common/logo.png";
import { menuList } from "../../keycomponents/Layout";
// import { nameContext } from "../../keycomponents/Layout";

// 弹窗Modal
const LocalizedModal = (props) => {
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const hideModal = () => {
    setOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Modal
      </Button>
      <Modal
        title="Modal"
        open={open}
        onOk={hideModal}
        onCancel={hideModal}
        okText="确认"
        cancelText="取消"
      >
        <p>Bla bla ...</p>
        <p>Bla bla ...</p>
        <p>Bla bla ...</p>
      </Modal>
    </>
  );
};

/**
 * 登录状态组件
 * @param {Object} props
 * @returns
 */
function State(props) {
  //   const name = useContext(nameContext);
  const [modal, contextHolder] = Modal.useModal();
  const confirm = () => {
    modal.confirm({
      title: "提示",
      icon: <ExclamationCircleOutlined />,
      content: "确定退出登录？",
      okText: "确定",
      cancelText: "取消",
      onOk: (close) => {
        console.log("退出");
        return close();
      },
    });
  };
  return (
    <div>
      <Space>
        <Button className={styles.special} onClick={confirm}>
          退出登录
        </Button>
      </Space>
      {contextHolder}
    </div>
  );
}

/**
 * 编辑器修改状态
 * @param {显示保存js or css or 文章} yy
 * @returns
 */
function Update(yy) {
  return (
    <div>
      <button>取消</button>
      <button>确定修改{yy.name}</button>
    </div>
  );
}

/**
 * 直接点击编辑
 * @param {}
 * @returns
 */
function Add({ msg }) {
  if (msg)
    return (
      <div>
        <button>{msg}</button>
        <button>取消</button>
        <button>保存为css插件</button>
        <button>保存为js插件</button>
        <button>保存为文章</button>
      </div>
    );
}

// 标题
const Title = ({ title }) => {
  const text = title ? title.label ?? "" : "个人博客管理系统";
  return (
    <div className={styles.modal}>
      <img src={Logo} alt="logo" />
      <div className={styles.title}>{text}</div>
    </div>
  );
};

// 快速编辑
const StateEditor = ({ msg }) => {
  return (
    <div className={styles.modal}>
      <img src={Logo} alt="logo" />
      <div className={styles.title}>{msg}</div>
      <Button>取消</Button>
      <Button>保存为css插件</Button>
      <Button>保存为js插件</Button>
      <Button>保存为文章</Button>
      {/* <LocalizedModal /> */}
    </div>
  );
};

export default function HeaderXB(props) {
  const title = menuList.find((item) => item.key === props.route);
  return (
    <div id="header" className={styles.header}>
      {props.route !== "eaitor" && <Title title={title}></Title>}
      {props.route === "eaitor" && <StateEditor msg="快速编辑" />}
      <State />
    </div>
  );
}
